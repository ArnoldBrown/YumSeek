import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, StatusBar } from 'react-native';
import COLORS from '../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getFoodArea, getFoodByArea, getFoodByCategory, getFoodByIngredient, getFoodCategory, getFoodIngredient } from '../network/apiService';
import { APIS_ENDPOINT } from '../network/constant';
import CountryFlag from 'react-native-country-flag';
import { countries } from '../constants/countries';
import { ActivityIndicator } from 'react-native-paper';
import LottieView from 'lottie-react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const SearchScreen = ({ navigation }) => {

  const animation = useRef<LottieView>(null);

  const [selectFilter, setFilter] = useState('Category');
  const [category, setCategory] = useState<any>(null);
  const [area, setArea] = useState<any>(null);
  const [ingredient, setIngredient] = useState<any>(null);
  const [selectFilterKey, setFilterKey] = useState('');
  const [food, setFood] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    animation.current?.play();
  }, []);

  useEffect(() => {
    getFoodCategoryCall();
    getFoodAreaCall();
    getFoodIngredientCall();
  }, []);

  useEffect(() => {
    setLoading(true)
    if (selectFilter === 'Category') {
      getFoodByCategoryCall(selectFilterKey);
    } else if (selectFilter === 'Area') {
      getFoodByAreaCall(selectFilterKey);
    } else {
      getFoodByIngredientCall(selectFilterKey);
    }
  }, [selectFilterKey])

  useEffect(() => {
    if (category !== null) {
      setFilterKey(category[0].strCategory);
    }
  }, [category])

  const getFoodCategoryCall = async () => {
    try {
      const category = await getFoodCategory();
      setCategory(category);
      // setSelectCat(category[0].strCategory);
      setLoading(false)
    } catch (error) {
      // Handle errors
      console.error('Error fetching random food:', error);
    }
  };

  const getFoodAreaCall = async () => {
    try {
      const area = await getFoodArea();
      setArea(area);
      setLoading(false)
      // setSelectCat(category[0].strCategory);
    } catch (error) {
      // Handle errors
      console.error('Error fetching random food:', error);
    }
  };

  const getFoodIngredientCall = async () => {
    try {
      const ingredient = await getFoodIngredient();
      const sortedIngredients = ingredient.sort((a: { strIngredient: string; }, b: { strIngredient: any; }) => a.strIngredient.localeCompare(b.strIngredient));

      setIngredient(sortedIngredients);
      setLoading(false)
      // setSelectCat(category[0].strCategory);
    } catch (error) {
      // Handle errors
      console.error('Error fetching random food:', error);
    }
  };

  const setCategoryMainFun = (cat: React.SetStateAction<string>) => {
    console.log("cattttt", cat);
    setFilter(cat);
    if (cat === 'Category') {
      setFilterKey(category[0].strCategory);
    } else if (cat === 'Area') {
      setFilterKey(area[0].strArea);
    } else {
      setFilterKey(ingredient[0].strIngredient);
    }
  }

  const setCategoryFun = (item: { strCategory: React.SetStateAction<string>; strArea: React.SetStateAction<string>; strIngredient: React.SetStateAction<string>; }) => {
    setFilterKey(selectFilter === 'Category' ? item.strCategory : selectFilter === 'Area' ? item.strArea : item.strIngredient);
  }

  const getFoodByCategoryCall = async (filterKey: string) => {
    try {
      const categoryFood = await getFoodByCategory(filterKey);
      setFood(categoryFood);
      // setSelectCat(category[0].strCategory);
      setLoading(false)
    } catch (error) {
      // Handle errors
      console.error('Error fetching random food:', error);
    }
  };

  const getFoodByAreaCall = async (filterKey: string) => {
    try {
      const areaFood = await getFoodByArea(filterKey);
      setFood(areaFood);
      // setSelectCat(category[0].strCategory);
      setLoading(false)
    } catch (error) {
      // Handle errors
      console.error('Error fetching random food:', error);
    }
  };

  const getFoodByIngredientCall = async (filterKey: string) => {
    try {
      const ingredFood = await getFoodByIngredient(filterKey);
      setFood(ingredFood);
      // setSelectCat(category[0].strCategory);
      setLoading(false)
    } catch (error) {
      // Handle errors
      console.error('Error fetching random food:', error);
    }
  };

  function getCountryIsoCode(countryName: string): string {
    const country = countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
    return country ? country.isoCode : 'Unknown'; // Return 'Unknown' if country not found
  }

  const handlePress = (id: any) => {
    navigation.navigate('Details', { mealId: id });
  };

  const renderItem = ({ item }) => {
    const isSelected =
      (selectFilter === 'Category' && selectFilterKey === item.strCategory) ||
      (selectFilter === 'Area' && selectFilterKey === item.strArea) ||
      (selectFilter === 'Ingredient' && selectFilterKey === item.strIngredient);

    return (
      <TouchableOpacity
        onPress={() => setCategoryFun(item)}
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: COLORS.white,
          backgroundColor: isSelected ? COLORS.white : COLORS.primary_two,
        }}
      >
        <Text style={styles.categoryLabel}>
          {selectFilter === 'Category'
            ? item.strCategory
            : selectFilter === 'Area'
              ? item.strArea
              : item.strIngredient}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.idMeal)} style={styles.itemContainer}>
      <Image source={{ uri: item?.strMealThumb }} style={styles.foodImage} />
      <Text style={styles.itemName}>{item.strMeal}</Text>
    </TouchableOpacity>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>- No foods to display -</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: COLORS.primary }}>
        <TouchableOpacity onPress={() => setCategoryMainFun('Category')}>
          <Text style={[styles.cateText, { color: selectFilter == 'Category' ? COLORS.white : COLORS.inactive_primary }]}>Category</Text>
          <View style={{ width: '100%', height: 5, backgroundColor: selectFilter == 'Category' ? COLORS.white : COLORS.primary }} />
        </TouchableOpacity>

        <View style={{ backgroundColor: COLORS.cardBg, width: 1 }} />
        <TouchableOpacity onPress={() => setCategoryMainFun('Area')}>
          <Text style={[styles.cateText, { color: selectFilter == 'Area' ? COLORS.white : COLORS.inactive_primary }]}>Area</Text>
          <View style={{ width: '100%', height: 5, backgroundColor: selectFilter == 'Area' ? COLORS.white : COLORS.primary }} />
        </TouchableOpacity>

        <View style={{ backgroundColor: COLORS.cardBg, width: 1 }} />
        <TouchableOpacity onPress={() => setCategoryMainFun('Ingredient')}>
          <Text style={[styles.cateText, { color: selectFilter == 'Ingredient' ? COLORS.white : COLORS.inactive_primary }]}>Ingredients</Text>
          <View style={{ width: '100%', height: 5, backgroundColor: selectFilter == 'Ingredient' ? COLORS.white : COLORS.primary }} />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ flex: 0.34, backgroundColor: COLORS.cardBg }}>

          <FlatList
            data={selectFilter === 'Category' ? category : selectFilter === 'Area' ? area : ingredient}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => selectFilter === 'Category' ? item.strCategory : selectFilter === 'Area' ? item.strArea : item.strIngredient}
            contentContainerStyle={{ paddingBottom: 70, paddingTop: 1 }}
          />

        </View>
        <View style={{ flex: 0.66, backgroundColor: COLORS.white, flexDirection: 'column' }}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.inactive_primary,
            width: 100,
            height: 100,
            borderRadius: 50,
            marginHorizontal: 70,
            marginTop: 5,
          }}>
            {selectFilter === "Area" ? <CountryFlag isoCode={getCountryIsoCode(selectFilterKey)} size={40} /> : <Image source={{ uri: selectFilter === 'Category' ? APIS_ENDPOINT.BASE_URL + APIS_ENDPOINT.IMG_CATEGORY + selectFilterKey + '.png' : APIS_ENDPOINT.BASE_URL + APIS_ENDPOINT.IMG_INGREDIENT + selectFilterKey + '.png' }} style={styles.itemImage} />}
          </View>

          {loading ? (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <LottieView
                ref={animation}
                source={require('../../assets/animations/loader.json')}
                autoPlay
                loop
                style={{ width: 100, height: 100 }}
              />
            </View>
          ) : (
            <FlatList
              data={food}
              renderItem={renderFoodItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.idMeal}
              numColumns={2}
              style={{ marginTop: 10 }}
              contentContainerStyle={
                food?.length === 0
                  ? { flexGrow: 1, justifyContent: 'center', paddingBottom: 70, paddingTop: 1 }
                  : { paddingBottom: 70, paddingTop: 1 }
              }
              columnWrapperStyle={styles.row}
              ListEmptyComponent={ListEmptyComponent}
            />
          )}

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  cateText: {
    textAlign: 'center', fontWeight: '700', padding: 10
  },
  categoryLabel: {
    color: COLORS.black,
    fontWeight: '700',
    fontSize: 12
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    resizeMode: 'center',
    marginHorizontal: 70,
  },
  foodImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  itemContainer: {
    width: screenWidth / 3.4,
    // height: screenHeight/6,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
    padding: 10,
    margin: 5
    // alignItems: 'center',
    // justifyContent: 'center',
    // margin: 5,
    // padding: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  itemName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.black,
    // minHeight:100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.inactive,
  },
});

export default SearchScreen;