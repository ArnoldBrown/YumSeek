import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
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
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View, Animated, Easing } from 'react-native';
import CartScreen from './src/screens/CartScreen';
import LottieView from 'lottie-react-native';

import { createNotificationChannel } from './src/notification/notificationService';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const SplashScreen = ({ navigation }) => {
  const animation = useRef<LottieView>(null);
  // const animatedValue = useRef(new Animated.Value(0)).current;

  // const handleAnimation = () => {
  //   animatedValue.setValue(0);

  //   Animated.sequence([
  //     Animated.timing(animatedValue, {
  //       toValue: 1,
  //       useNativeDriver: true,
  //       easing: Easing.linear,
  //       duration: 400,
  //     }),
  //     Animated.spring(animatedValue, {
  //       toValue: 2,
  //       delay: 1000,
  //       friction: 1,
  //       useNativeDriver: true,
  //     }),
  //   ]).start();
  // };
 

  return (
    <View style={styles.splashContainer}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <LottieView
        ref={animation}
        source={require('./assets/animations/loader.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => navigation.replace('Main')}
        style={{ width: 100, height: 100 }}
      />
      <Text style={styles.splashText}>YupSeek</Text>
      {/* <Animated.View style={{height: 150, width: 150, backgroundColor: 'red', transform: [{ scale: handleAnimation() }] }} /> */}
    </View>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Search') iconName = 'magnify';
        else if (route.name === 'Profile') iconName = 'account';
        return <Icon name={iconName} color={color} size={size} />;
      },
      tabBarLabel: () => <View />,
      tabBarActiveBackgroundColor:COLORS.white,
      tabBarItemStyle:{alignSelf:'center',height:35, borderRadius:20, marginHorizontal:15},
      tabBarAccessibilityLabel: route.name,  // For accessibility
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.white,
      tabBarStyle: {
        position: 'absolute',
        bottom: 10,
        left: '4%',
        right: '4%',
        height: 55,
        borderRadius: 25,
        backgroundColor: COLORS.primary,
        elevation: 5,
        shadowColor: COLORS.text,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.white
      },
    })}

  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const App = () => {
  useEffect(() => {
    // Create notification channel on app startup (only once)
    createNotificationChannel();
  }, []);
 

  return (
    <Provider store={store}>
      <PaperProvider>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust this offset as needed
        >
          <NavigationContainer>
            <RootStack.Navigator>
              <RootStack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
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
              <RootStack.Screen
                name="CartScreen"
                component={CartScreen}
                options={{ title: 'Cart', headerShown: false }}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </KeyboardAvoidingView>
      </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  splashText: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default App;

