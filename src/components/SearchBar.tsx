import React, { useState } from 'react';
import { View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import SearchIcon from './SearchIcon';

interface SearchBarProps {
  onSearch: (searchText: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleClearText = () => {
    setSearchText('');
    if (onClear) {
      onClear();
    }
  };

  const handleSearch = (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    if (onSearch) {
        onSearch(searchText);
      }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={text => setSearchText(text)}
        placeholder="Search your favourite food"
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <SearchIcon
        isClearIcon={searchText.length > 0}
        onPress={searchText.length > 0 ? handleClearText : () => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginTop: 10
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
});

export default SearchBar;
