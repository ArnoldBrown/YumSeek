import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import store from './src/store';
import COLORS from './src/constants/colors';
import { KeyboardAvoidingView, Platform } from 'react-native';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Search') {
          iconName = 'magnify';
        } else if (route.name === 'Profile') {
          iconName = 'account';
        }

        return <Icon name={iconName} color={color} size={size} />;
      },
      tabBarLabel: () => null, // Hide the title in the tab bar
      tabBarActiveTintColor: COLORS.active, // Active icon color
      tabBarInactiveTintColor: 'gray', // Inactive icon color
      tabBarStyle: {
        position: 'absolute',
        bottom: 10,
        left: '2%',
        right: '2%',
        height: 50,
        borderRadius: 30,
        backgroundColor: COLORS.primary, // Background color of the tab bar
        borderTopWidth: 0,
        shadowColor: COLORS.text,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>

        <KeyboardAvoidingView style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust this offset as needed
        >
          <NavigationContainer>
            <RootStack.Navigator>
              <RootStack.Screen
                name="Main"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="Details"
                component={DetailsScreen}
                options={({ route }) => ({
                  title: route.params?.food?.strMeal,
                  headerShown: false
                })}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </KeyboardAvoidingView>


      </PaperProvider>
    </Provider>
  );
};

export default App;
