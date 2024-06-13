import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import COLORS from '../constants/colors';

interface CommonInputProps extends TextInputProps {
  type: 'email' | 'password' | 'default';
}

const CommonInput: React.FC<CommonInputProps> = ({ type, ...restProps }) => {
  let keyboardType = 'default';
  let secureTextEntry = false;
  let placeholder = '';

  // Determine settings based on type prop
  switch (type) {
    case 'email':
      keyboardType = 'email-address';
      placeholder = 'Enter your email';
      break;
    case 'password':
      secureTextEntry = true;
      placeholder = 'Enter your password';
      break;
    default:
      placeholder = 'Enter text';
      break;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={COLORS.text_lite}
        {...restProps} // Pass through any additional props
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    color:COLORS.text
  },
});

export default CommonInput;
