import React from 'react';
import { View, StyleSheet, StatusBar, Dimensions, Text, ImageBackground } from 'react-native';
import COLORS from '../constants/colors';
import CommonInput from '../components/CommonInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonButton from '../components/CommonButton';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const ProfileScreen = () => {
  const handlePress = () => {
    // Handle button press action
    console.log('Button pressed');
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={100} enableOnAndroid={true} keyboardShouldPersistTaps="handled" style={styles.container}>
      <View >
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <View >
          <ImageBackground
            source={require('../../assets/profile_bg.jpg')}
            style={styles.backgroundImage}
            imageStyle={{ borderBottomLeftRadius: 150, borderBottomRightRadius: 150 }}
          >
            <Text style={styles.overlayText}>Yum<Text style={[styles.overlayText, { color: COLORS.primary, backgroundColor: 'transparent' }]}>Seek</Text></Text>
          </ImageBackground>
          {/* <Image
            source={require('../../assets/profile_bg.jpg')}
            style={{ height: screenHeight / 2.2, width: screenWidth, resizeMode: 'cover', borderBottomLeftRadius: 150, borderBottomRightRadius: 150 }} />

          <Text>YumSeek</Text> */}
        </View>

        {/* <Image
          source={require('../../assets/profile_bg.jpg')}
          style={{ height: screenHeight / 2.2, width: screenWidth, resizeMode: 'cover', borderBottomLeftRadius: 150, borderBottomRightRadius: 150 }} />
 */}

        <View style={{ marginHorizontal: 20, marginTop: 30, }}>
          <CommonInput type="email" onChangeText={(text) => console.log(text)} />

          <CommonInput type="password" onChangeText={(text) => console.log(text)} />

          <CommonButton text="SignUp" width="50%" onPress={handlePress} style={{ alignSelf: 'center', backgroundColor: COLORS.primary, borderRadius: 25 }} />
        </View>


      </View>
    </KeyboardAwareScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  backgroundImage: {
    height: screenHeight / 2.2,
    width: screenWidth,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 40,
    paddingHorizontal: 20
  },
});

export default ProfileScreen;