import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Dotd from '../screens/Dotd';
import Edit from '../screens/Edit';
import ShareScreen from '../screens/Share';
import Ionicons from "@expo/vector-icons/Ionicons";
import TabBar from './TabBar';



const Router = createBottomTabNavigator(
  {
    Share: {
      screen: ShareScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons
        name="ios-share"
        size={24}
        color={tintColor}
      />,
      },
    },
    Edit: {
      screen: Edit,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons
        name="md-person-circle-outline"
        size={24}
        color={tintColor}
      />,
      },
    },
    Dotd: {
      screen: Dotd,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons
        name="ios-home"
        size={24}
        color={tintColor}
      />,
      },
    },
  },
  {
    tabBarComponent: TabBar,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#4B4A4E',
    },
    initialRouteName: "Edit",
    navigationOptions:{
    }
  },
);

export default createAppContainer(Router);