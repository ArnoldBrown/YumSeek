import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { setPlace, setIngredient, setCategory } from './features/foodSlice';
import { View, TextInput, Button, Text } from 'react-native';

const FoodSearch = () => {
  const dispatch = useDispatch();
  const { place, ingredient, category } = useSelector((state: RootState) => state.food);

  const [localPlace, setLocalPlace] = useState(place);
  const [localIngredient, setLocalIngredient] = useState(ingredient);
  const [localCategory, setLocalCategory] = useState(category);

  const handleSearch = () => {
    dispatch(setPlace(localPlace));
    dispatch(setIngredient(localIngredient));
    dispatch(setCategory(localCategory));
  };

  return (
    <View>
      <Text>Search for Food</Text>
      <TextInput
        placeholder="Place"
        value={localPlace}
        onChangeText={setLocalPlace}
      />
      <TextInput
        placeholder="Ingredient"
        value={localIngredient}
        onChangeText={setLocalIngredient}
      />
      <TextInput
        placeholder="Category"
        value={localCategory}
        onChangeText={setLocalCategory}
      />
      <Button title="Search" onPress={handleSearch} />
      <Text>Current Search - Place: {place}, Ingredient: {ingredient}, Category: {category}</Text>
    </View>
  );
};

export default FoodSearch;