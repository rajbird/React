import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';
import { Text } from 'react-native';

export default class CustomHeader extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    backScreen: PropTypes.string,
    courseCode: PropTypes.string,
    professorData: PropTypes.object,
    canReview: PropTypes.bool,
    type: PropTypes.string,
    size: PropTypes.number,
  };

  addReview = () => {
    if (this.props.type == 'Course') {
      this.props.navigation.navigate('AddCourseReview', {
        courseCode: this.props.courseCode,
      });
    } else if (type == 'Professor') {
      // this.props.navigation.navigate('AddReview', {
      //   type: 'Professor',
      //   course: this.props.professorData,
      // });
    }
  };

  render() {
    return (
      <Header
        leftComponent={
          this.props.backScreen ? (
            <Icon
              name="md-arrow-round-back"
              style={{ color: 'white' }}
              onPress={() => this.props.navigation.navigate(this.props.backScreen)}
            />
          ) : (
            <Icon name="menu" style={{ color: 'white' }} onPress={() => this.props.navigation.openDrawer()} />
          )
        }
        centerComponent={{
          text: this.props.title,
          style: { fontSize: this.props.size ? this.props.size : 24, fontWeight: 'bold', color: 'white' },
        }}
        rightComponent={
          this.props.canReview ? (
            <Text onPress={this.addReview} style={{ fontSize: 16, color: 'white', marginRight: 15 }}>
              Review
            </Text>
          ) : null
        }
        backgroundColor={this.props.color}
      />
    );
  }
}
