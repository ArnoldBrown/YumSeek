import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';

interface CommonButtonProps extends TouchableOpacityProps {
  text: string;
  width?: number | string; // Optional width prop
  textColor?: string; // Optional text color prop
}

const CommonButton: React.FC<CommonButtonProps> = ({ text, width, textColor, style, ...restProps }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: width ?? 'auto' }, // Default to 'auto' if width prop is not provided
        style, // Additional styles passed through props
      ]}
      {...restProps}
    >
      <Text style={[styles.buttonText, { color: textColor ?? '#fff' }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff', // Default background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff', // Default text color
    fontSize: 16,
  },
});

export default CommonButton;
