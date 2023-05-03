import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import _ from 'lodash';

import Header from '../components/Header';
import { Icon } from 'native-base';
import * as FileSystem from 'expo-file-system';

import { SearchBar } from 'react-native-elements';
import { gryphRed } from '../utils/colors';
import Accordion from 'react-native-collapsible/Accordion';

class Courses extends React.Component {
  state = {
    search: '',
    coursesData: [],
    filteredData: [],
    activeSections: [],
  };

  updateSearch = (search) => {
    // Filter coursesData
    let filteredData = _.cloneDeep(this.state.coursesData);

    _.forEach(filteredData, (section) => {
      section.sectionCourses = _.filter(section.sectionCourses, (course) => {
        return _.get(course, 'CourseName').includes(search) || _.get(course, 'CourseCode').includes(search);
      });
    });

    filteredData = _.filter(filteredData, (section) => !_.isEmpty(_.get(section, 'sectionCourses')));

    this.setState({ search, filteredData });
  };

  getSectionListItem = (courseData) => {
    //Function for click on an item
    this.props.navigation.navigate('Course', {
      courseCode: _.get(courseData, 'CourseCode'),
    });
  };

  componentDidMount() {
    FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'courses.json').then((data) => {
      let filteredData;
      filteredData = _.cloneDeep(JSON.parse(data));

      this.setState({ coursesData: data, filteredData });
    });
  }

  _renderHeader = (section) => {
    const index = _.findIndex(this.state.filteredData, ['key', section.key]);
    const open = _.includes(this.state.activeSections, index);
    return (
      <View style={styles.SectionHeaderStyle}>
        <Text style={styles.SectionHeaderTitleStyle}> {section.title} </Text>
        {open ? (
          <Icon type="FontAwesome" style={styles.SectionHeaderIconStyle} name="chevron-up" />
        ) : (
          <Icon type="FontAwesome" style={styles.SectionHeaderIconStyle} name="chevron-down" />
        )}
      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <View>
        {_.get(section, 'data')
          ? _.get(section, 'data').map((course) => {
              return (
                <View style={styles.SectionListElement} key={_.get(course, 'key')}>
                  <Text style={styles.SectionListItemStyle} onPress={this.getSectionListItem.bind(this, course)}>
                    {_.get(course, 'CourseCode') + ' - ' + _.get(course, 'CourseName')}
                  </Text>
                </View>
              );
            })
          : null}
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    const { search } = this.state;

    return (
      <View style={styles.container}>
        <Header color={gryphRed} title="Courses" navigation={this.props.navigation} />
        <View>
          <SearchBar platform="ios" placeholder="Search for a course..." onChangeText={this.updateSearch} value={search} />
        </View>

        <ScrollView style={styles.container}>
          <Accordion
            activeSections={this.state.activeSections}
            sections={
              !_.isEmpty(this.state.filteredData)
                ? this.state.filteredData.map((section) => {
                    return {
                      key: section.key,
                      title: section.sectionTitle,
                      data: section.sectionCourses,
                    };
                  })
                : []
            }
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
            expandMultiple
          ></Accordion>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  bigRed: {
    color: gryphRed,
    fontWeight: 'bold',
    fontSize: 30,
  },
  SectionHeaderStyle: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: gryphRed,
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  SectionHeaderTitleStyle: {
    fontSize: 20,
    color: '#fff',
  },
  SectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: '#000',
    backgroundColor: '#F5F5F5',
  },
  SectionHeaderIconStyle: {
    color: 'white',
    fontSize: 20,
  },
  SectionListElement: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
});

export default Courses;
