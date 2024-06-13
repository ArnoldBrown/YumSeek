import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/colors';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  const handleMenuPress = () => {
    // Handle menu press action
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection:'row', alignItems:'center', marginStart:-10}}>
        <Icon name="location-on" size={20} color={COLORS.primary} style={styles.icon} />
        <Text style={styles.country}>India</Text>
      </TouchableOpacity>
      <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <Text style={styles.title}>Welcome to <Text style={styles.titleApp}>YumSeek</Text></Text>
      
      </View>
      
      <TouchableOpacity onPress={handleMenuPress}>
        <Icon name="menu" size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      height: 60,
      // borderBottomWidth: 1,
      // borderBottomColor: '#e0e0e0',
    },
    title: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    titleApp: {
        fontSize: 15,
        fontWeight: 'bold',
        color:COLORS.primary
      },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    country: {
      marginLeft: -2,
      textAlign:'center',
      fontSize:12
    },
    icon: {
      paddingHorizontal: 1,
    },
  });
  

export default Header;
