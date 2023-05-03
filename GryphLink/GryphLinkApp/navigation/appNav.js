import React from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Home, Courses, Professors, Food, Residence, Settings, Professor, Course, AddCourseReview } from '../pages';
const { width } = Dimensions.get('window');

const CustomDrawerNavigation = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 250, opacity: 0.9 }}>
        <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/gryphons_logo.png')} style={{ height: 150, width: 150, borderRadius: 60 }} />
        </View>
        <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Gryphlink</Text>
        </View>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

export const Drawer = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Courses: {
      screen: Courses,
    },
    Professors: {
      screen: Professors,
    },
    Food: {
      screen: Food,
    },
    Residence: {
      screen: Residence,
    },
    Settings: {
      screen: Settings,
    },
    Professor: {
      screen: Professor,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    Course: {
      screen: Course,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    AddCourseReview: {
      screen: AddCourseReview,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
  },
  {
    drawerPosition: 'left',
    contentComponent: CustomDrawerNavigation,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: (width / 3) * 2,
  }
);
