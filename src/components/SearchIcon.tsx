import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SearchIconProps {
  isClearIcon: boolean;
  onPress: () => void;
}

const SearchIcon: React.FC<SearchIconProps> = ({ isClearIcon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.icon}>
      <Icon name={isClearIcon ? 'search-off' : 'search'} size={24} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
  },
});

export default SearchIcon;
