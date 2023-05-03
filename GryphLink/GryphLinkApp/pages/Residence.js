import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

class Residence extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header color="#FFF" title="Courses" navigation={this.props.navigation} />
        <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Residence Page</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Residence;
