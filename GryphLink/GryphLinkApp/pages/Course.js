import React from 'react';
import _ from 'lodash';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { gryphRed } from '../utils/colors';
import Header from '../components/Header';
import { mockRatings, mockReviews } from '../utils/mockData';
import { Ratings, Reviews } from '../containers';
import * as FileSystem from 'expo-file-system';

class Course extends React.Component {
  state = {
    courseCode: '',
    courseData: {},
    courseRatings: null,
  };

  getCourseData() {
    FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'courses.json').then((data) => {
      const coursesData = JSON.parse(data);
      _.forEach(coursesData, (section) => {
        _.forEach(section.sectionCourses, (course) => {
          if (_.get(course, 'CourseCode') === _.get(this.state, 'courseCode')) {
            let courseRatings;
            const courseReviews = _.get(course, 'Reviews');
            // Calculate ratings
            if (!_.isEmpty(courseReviews)) {
              let easinessValue = 0,
                usefulnessValue = 0,
                enjoyabilityValue = 0;
              _.forEach(courseReviews, (review) => {
                _.forEach(review.ratings, (rating) => {
                  switch (rating.id) {
                    case '1':
                      easinessValue = easinessValue + rating.value;
                      break;
                    case '2':
                      usefulnessValue = usefulnessValue + rating.value;
                      break;
                    case '3':
                      enjoyabilityValue = enjoyabilityValue + rating.value;
                      break;
                  }
                });
              });
              easinessValue = (parseFloat(easinessValue) / courseReviews.length).toFixed(2);
              usefulnessValue = (parseFloat(usefulnessValue) / courseReviews.length).toFixed(2);
              enjoyabilityValue = (parseFloat(enjoyabilityValue) / courseReviews.length).toFixed(2);

              courseRatings = [
                {
                  id: '1',
                  name: 'Easiness',
                  value: easinessValue,
                },
                {
                  id: '2',
                  name: 'Usefulness',
                  value: usefulnessValue,
                },
                {
                  id: '3',
                  name: 'Enjoyability',
                  value: enjoyabilityValue,
                },
              ];
            }
            this.setState({ courseData: course, courseRatings });
          }
        });
      });
    });
  }

  componentDidUpdate(previousProps) {
    if (previousProps !== this.props) {
      this.setState({ courseCode: this.props.navigation.state.params.courseCode, courseData: {}, courseRatings: [] });
      this.getCourseData();
    }
  }

  componentDidMount() {
    this.setState({ courseCode: this.props.navigation.state.params.courseCode, courseData: {}, courseRatings: [] });
    this.getCourseData();
  }

  render() {
    const { courseRatings, courseData, courseCode } = this.state;
    const courseName = _.get(courseData, 'CourseName');
    const courseOffering = _.get(courseData, 'OfferedDuring');
    const courseDescription = _.get(courseData, 'Description');
    const courseReviews = _.get(courseData, 'Reviews');

    return (
      <View style={styles.container}>
        <Header
          color={gryphRed}
          title={courseCode}
          backScreen="Courses"
          courseCode={courseCode}
          navigation={this.props.navigation}
          canReview={true}
          type="Course"
        />
        <ScrollView>
          {/* Info */}
          <View style={styles.screenComponent}>
            <Text style={styles.subheader}>Overview</Text>
            <Divider></Divider>
            <View style={styles.screenComponent}>
              <Text style={{ paddingLeft: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Course name: </Text>
                <Text>{courseName}</Text>
              </Text>
            </View>
            <View style={styles.screenComponent}>
              <Text style={{ paddingLeft: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Offered during: </Text>
                <Text>{courseOffering}</Text>
              </Text>
            </View>
            <View style={styles.screenComponent}>
              <Text style={{ paddingLeft: 10, fontWeight: 'bold' }}>Description:</Text>
              <Text style={{ paddingLeft: 10 }}>{courseDescription}</Text>
            </View>
          </View>
          {/* Ratings */}
          {courseRatings ? (
            <View style={styles.screenComponent}>
              <Text style={styles.subheader}>Overall Rating</Text>
              <Divider></Divider>
              <Ratings data={courseRatings}></Ratings>
            </View>
          ) : null}
          {/* Reviews */}
          {courseReviews ? (
            <View style={styles.screenComponent}>
              <Text style={styles.subheader}>Reviews ({courseReviews.length})</Text>
              <Divider></Divider>
              <Reviews data={courseReviews}></Reviews>
            </View>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 150,
  },
  screenComponent: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
  subheader: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Course;
