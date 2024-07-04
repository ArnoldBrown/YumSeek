import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import Header from '../components/Header';
import { getFoodCategory, getRandomFood, getFoodByCategory, getFoodByQuery } from '../network/apiService';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from '../components/SearchBar';
import { ScrollView } from 'react-native-gesture-handler';
import { RootState } from '../store';
import { getCategories } from '../store/slices/categorySlice';
import { getMealsByCategory } from '../store/slices/cateMealsSlice';



const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state: RootState) => state.categories);
  const { meals, loadingM, errorM } = useSelector((state: RootState) => state.meals);


  const [category, setCategory] = useState<any>(null);
  const [selectCat, setSelectCat] = useState(null);
  const [categoryFood, setCategoryFood] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (searchText: string) => {
    // Simulate a search operation
    simulateSearchCall(searchText);
  };

  const handleClear = () => {
    setSearchResults([]);
  };

  const simulateSearchCall = async (query: string) => {
    try {
      const searchedFood = await getFoodByQuery(query);
      setSearchResults(searchedFood);
    } catch (error) {
      console.error('Error fetching random food:', error);
    }
  };

  function getRandomValue(min: number = 10.00, max: number = 99.99): number {
    const randomValue = Math.random() * (max - min) + min;
    return parseFloat(randomValue.toFixed(2));
  }
  

  // useEffect(() => {
  //   getFoodCategoryCall();
  // }, [])

  // const getFoodCategoryCall = async () => {
  //   try {
  //     const category = await getFoodCategory();
  //     setCategory(category);
  //     setSelectCat(category[0].strCategory);
  //   } catch (error) {
  //     // Handle errors
  //     console.error('Error fetching random food:', error);
  //   }
  // };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectCat(categories[0].strCategory);
    }
  }, [categories])

  // useEffect(() => {
  //   if (selectCat !== null) {
  //     getFoodByCategoryCall(selectCat);
  //   }
  // }, [selectCat])

  useEffect(() => {
    if (selectCat) {
      dispatch(getMealsByCategory(selectCat));
    }
  }, [dispatch, selectCat]);

  // const getFoodByCategoryCall = async (category) => {
  //   try {
  //     const categoryFood = await getFoodByCategory(category);
  //     setCategoryFood(categoryFood);
  //   } catch (error) {
  //     // Handle errors
  //     console.error('Error fetching random food:', error);
  //   }
  // };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ marginLeft: -5 }} onPress={() => setSelectCat(item.strCategory)}>
      <Text style={[styles.categoryLabel, { color: selectCat === item.strCategory ? COLORS.white : COLORS.black, backgroundColor: selectCat === item.strCategory ? COLORS.primary : COLORS.cardBg }]}>{item.strCategory}</Text>
    </TouchableOpacity>
  );

  const renderFoodItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ padding: 10 }}>
        <View style={{ alignSelf: 'flex-end' }}>
          <Icon name="favorite-outline" size={20} color={COLORS.text} />
        </View>
        <View style={{ alignSelf: 'center' }}>
          <Image source={{ uri: item?.strMealThumb }} style={styles.itemImage} />
          <Text style={styles.itemName}>{item.strMeal}</Text>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ marginLeft: 30, fontWeight: '700', color: COLORS.text }}>$ {getRandomValue()}</Text>
          <View style={{ backgroundColor: COLORS.primary, paddingHorizontal: 15, paddingVertical: 2, borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}>
            <Text style={{ fontSize: 20, color: COLORS.white }}>+</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Header title="Your Screen Title" />

      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 25, color: COLORS.text_lite, letterSpacing: 1 }}>Find The <Text style={{ fontWeight: 'bold', color: COLORS.black, letterSpacing: 3 }}>Best</Text></Text>
        <Text style={{ fontSize: 25, color: COLORS.text_lite, letterSpacing: 1 }}><Text style={{ fontWeight: 'bold', color: COLORS.black, letterSpacing: 3 }}>Food</Text> Around You</Text>

        <SearchBar onSearch={handleSearch} onClear={handleClear} />
      </View>

      <ScrollView>
        <View>
          {searchResults?.length > 0 &&
            <View>
              <Text style={{ marginHorizontal: 10, fontWeight: 'bold', fontSize: 12, letterSpacing: 2, color: COLORS.black }}>Searched Food</Text>

              <FlatList
                data={searchResults}
                renderItem={renderFoodItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.idMeal}
                numColumns={2}
                style={{ margin: 10 }}
              // contentContainerStyle={{ height:500, backgroundColor:COLORS.primary_two }}
              />
            </View>
          }

          {categories?.length > 0 &&
            <View>
              <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 12, letterSpacing: 2, color: COLORS.black }}>Find Food</Text>
              <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.strCategory}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
              />
            </View>
          }

          {meals &&
            <FlatList
              data={meals}
              renderItem={renderFoodItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.idMeal}
              numColumns={2}
              style={{ margin: 10 }}
              contentContainerStyle={{ paddingBottom: 70 }}
            />
          }
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  listContent: {
    paddingHorizontal: 10,
  },
  categoryLabel: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBg,
    color: COLORS.black,
    fontWeight: '700',
    fontSize: 12
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    margin: 5
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'stretch',
    marginTop: -10,
    alignSelf: 'center'
  },
  itemName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.black
  },
});

export default HomeScreen;