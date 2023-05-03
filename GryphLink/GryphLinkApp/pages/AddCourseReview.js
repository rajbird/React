import React from 'react';
import _ from 'lodash';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { gryphRed } from '../utils/colors';
import Header from '../components/Header';
import RadioGroup from 'react-native-radio-buttons-group';
import * as FileSystem from 'expo-file-system';

class AddCourseReview extends React.Component {
  state = {
    easiness: 0,
    usefulness: 0,
    enjoyability: 0,
    description: '',
    courseCode: '',
    coursesData: [],
  };

  _changeEasiness = (radioValues) => {
    const easiness = _.find(radioValues, ['selected', true]).value;
    this.setState({ easiness });
  };

  _changeEnjoyability = (radioValues) => {
    const enjoyability = _.find(radioValues, ['selected', true]).value;
    this.setState({ enjoyability });
  };

  _changeUsefulness = (radioValues) => {
    const usefulness = _.find(radioValues, ['selected', true]).value;
    this.setState({ usefulness });
  };

  _submitForm = () => {
    let coursesData = _.cloneDeep(this.state.coursesData);

    _.forEach(coursesData, (section) => {
      _.forEach(section.sectionCourses, (course) => {
        if (_.get(course, 'CourseCode') === this.state.courseCode) {
          const currentReviews = _.get(course, 'Reviews');
          const review = {
            id: currentReviews.length,
            text: this.state.description,
            ratings: [
              {
                id: '1',
                name: 'Easiness',
                value: this.state.easiness,
              },
              {
                id: '2',
                name: 'Usefulness',
                value: this.state.usefulness,
              },
              {
                id: '3',
                name: 'Enjoyability',
                value: this.state.enjoyability,
              },
            ],
          };

          _.get(course, 'Reviews').push(review);
        }
      });
    });

    FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'courses.json', JSON.stringify(coursesData))
      .then(() => {
        this.props.navigation.navigate('Course', {
          courseCode: this.state.courseCode,
        });
      })
      .catch((error) => {
        console.log('ERROR: ', error);
      });
  };

  UNSAFE_componentWillReceiveProps() {
    FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'courses.json').then((data) => {
      this.setState({ coursesData: JSON.parse(data) });

      const courseCode = this.props.navigation.state.params.courseCode;

      this.setState({ description: null, courseCode });
    });
  }

  componentDidMount() {
    FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'courses.json').then((data) => {
      this.setState({ coursesData: JSON.parse(data) });
    });

    const courseCode = this.props.navigation.state.params.courseCode;

    this.setState({ easiness: 1, usefulness: 1, enjoyability: 1, description: null, courseCode });
  }

  render() {
    const radioValues = [
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
    ];
    let easinessValues = _.cloneDeep(radioValues);
    let usefulnessValues = _.cloneDeep(radioValues);
    let enjoyabilityValues = _.cloneDeep(radioValues);

    const title = 'Reviewing: ' + this.state.courseCode;

    return (
      <View style={styles.container}>
        <Header color={gryphRed} size={20} title={title} backScreen="Course" navigation={this.props.navigation} />
        <View style={styles.screenComponent}>
          <View style={styles.formItem}>
            <Text style={styles.formTitle}>
              Easiness <Text style={styles.formRequired}>*</Text>
            </Text>
            <RadioGroup radioButtons={easinessValues} onPress={this._changeEasiness} flexDirection="row" />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formTitle}>
              Usefulness <Text style={styles.formRequired}>*</Text>
            </Text>
            <RadioGroup radioButtons={usefulnessValues} onPress={this._changeUsefulness} flexDirection="row" />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formTitle}>
              Enjoyability <Text style={styles.formRequired}>*</Text>
            </Text>
            <RadioGroup radioButtons={enjoyabilityValues} onPress={this._changeEnjoyability} flexDirection="row" />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formTitle}>Comments </Text>
            <TextInput
              style={{ height: 150, padding: 10, borderColor: 'gray', borderWidth: 1 }}
              multiline={true}
              numberOfLines={4}
              onChangeText={(description) => this.setState({ description })}
              value={this.state.description}
              blurOnSubmit
            />
          </View>
          <View style={styles.formItem}>
            <Button title="Submit" onPress={this._submitForm} />
          </View>
        </View>
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
  formItem: {
    padding: 10,
  },
  formTitle: {
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 24,
  },
  formRequired: {
    color: 'red',
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default AddCourseReview;
