import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar, ToastAndroid, Alert, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import { getFoodCategory, getRandomFood, getFoodByCategory, getFoodByQuery } from '../network/apiService';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from '../components/SearchBar';
import { ScrollView } from 'react-native-gesture-handler';
import { RootState } from '../store';
import { getCategories } from '../store/slices/categorySlice';
import { getMealsByCategory } from '../store/slices/cateMealsSlice';
import { AppDispatch } from '../store';
import { addToCart, updateCartItemQuantity } from '../store/slices/cartSlice';
import LottieView from 'lottie-react-native';
import { displayNotification } from '../notification/notificationService'
// import { addFavorite , removeFavorite} from '../store/slices/favoritesSlice';


const HomeScreen = () => {

  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { categories, loading, error } = useSelector((state: RootState) => state.categories);
  const { meals, loadingM, errorM } = useSelector((state: RootState) => state.meals);
  // const favorites = useSelector((state: RootState) => state.favorites);
  // console.log("favorites", favorites)
  const animation = useRef<LottieView>(null);
  const [category, setCategory] = useState<any>(null);
  const [selectCat, setSelectCat] = useState(null);
  const [categoryFood, setCategoryFood] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const lastSearchTextRef = useRef<string | null>(null);

  const triggerNotification = () => {
    const title = 'Welcome back';
    const body = 'Find the best food around you.';
    
    // Call displayNotification with dynamic title and body
    displayNotification(title, body);
  };

  const handleSearch = useCallback((searchText: string) => {
    // Simulate a search operation
    if (lastSearchTextRef.current !== searchText) {
      simulateSearchCall(searchText);
      lastSearchTextRef.current = searchText;
    }
  }, []); // No dependencies, so it will only be created once

  useEffect(() => {
    animation.current?.play();
  }, []);

  const handleClear = () => {
    setSearchResults([]);
  };

  const simulateSearchCall = async (query: string) => {
    try {
      const searchedFood = await getFoodByQuery(query);
      if (searchedFood) {
        setSearchResults(searchedFood);
      } else {
        ToastAndroid.show('Food not available. But there are plenty to discover.', ToastAndroid.CENTER);
      }
    } catch (error) {
      console.error('Error fetching searched food:', error);
      Alert.alert('Error', 'Failed to fetch food items. Please try again.');
    }
  };

  useEffect(() => {
    triggerNotification();
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0 && categories[0]?.strCategory) {
      setSelectCat(categories[0].strCategory);
    }
  }, [categories])

  useEffect(() => {
    if (selectCat) {
      dispatch(getMealsByCategory(selectCat));
    }
  }, [dispatch, selectCat]);

  const handleAddToCart = useCallback((item) => {
    const existingItem = cartItems.find(cartItem => cartItem.idMeal === item.idMeal);

    if (existingItem) {
      dispatch(updateCartItemQuantity({ idMeal: existingItem.idMeal, quantity: existingItem.quantity + 1 }));
    } else {
      const newItem = { ...item, quantity: 1 };
      dispatch(addToCart(newItem));
    }

    ToastAndroid.show('Food added to cart.', ToastAndroid.CENTER);
  }, [cartItems, dispatch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ marginLeft: -5 }} onPress={() => setSelectCat(item.strCategory)}>
      <Text style={[styles.categoryLabel, { color: selectCat === item.strCategory ? COLORS.white : COLORS.black, backgroundColor: selectCat === item.strCategory ? COLORS.primary : COLORS.cardBg }]}>{item.strCategory}</Text>
    </TouchableOpacity>
  );

  const getItemQuantity = useCallback((itemId: string) => {
    const itemInCart = cartItems.find(cartItem => cartItem.idMeal === itemId);
    return itemInCart ? itemInCart.quantity : 0;
  }, [cartItems]);

  const renderFoodItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ padding: 10 }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ color: getItemQuantity(item.idMeal) === 0 ? COLORS.cardBg : COLORS.primary }}>{getItemQuantity(item.idMeal)}</Text>
          {/* <TouchableOpacity onPress={() => handleAddToFavour(item)}> */}
          <Icon name="favorite-outline" size={20} color={COLORS.text} />
          {/* </TouchableOpacity> */}
        </View>
        <View style={{ alignSelf: 'center' }}>
          <Image source={{ uri: item?.strMealThumb }} style={styles.itemImage} />
          <Text style={styles.itemName}>{item.strMeal}</Text>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.priceText}>$ {(item.price ?? 0).toFixed(2)}</Text>
          <TouchableOpacity onPress={() => handleAddToCart(item)}>
            <View style={styles.addToCartButton}>
              <Text style={styles.addToCartText}>+</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Header title="Your Screen Title" />

      <View style={{ margin: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={styles.titleLabelNormal}>Find The <Text style={styles.titleLabelBold}>Best</Text></Text>
            <Text style={styles.titleLabelNormal}><Text style={styles.titleLabelBold}>Food</Text> Around You</Text>
          </View>
          <LottieView
            ref={animation}
            source={require('../../assets/animations/loader.json')}
            autoPlay
            loop
            style={{ width: 70, height: 70, marginRight: 20 }}
          />
        </View>
        <SearchBar onSearch={handleSearch} onClear={handleClear} />
      </View>

      <ScrollView>
        <View>
          {searchResults?.length > 0 &&
            <View>
              <Text style={styles.searchedFoodText}>Searched Food</Text>

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
              <Text style={styles.findFoodText}>Find Food</Text>
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
        {loading || loadingM ? <View style={styles.loadingView}>
          <LottieView
            ref={animation}
            source={require('../../assets/animations/loader.json')}
            autoPlay
            loop
            style={{ width: 100, height: 100 }}
          />
        </View> : null}

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
  addToCartButton: {
    backgroundColor: COLORS.primary, 
    paddingHorizontal: 15, 
    paddingVertical: 2, 
    borderTopLeftRadius: 20, 
    borderBottomRightRadius: 20 
  },
  addToCartText: {
    fontSize: 20, color: COLORS.white
  },
  priceText: {
    marginLeft: 30, fontWeight: '700', color: COLORS.text 
  },
  titleLabelNormal: {
    fontSize: 25, color: COLORS.text_lite, letterSpacing: 1 
  },
  titleLabelBold: {
    fontWeight: 'bold', color: COLORS.black, letterSpacing: 3
  },
  searchedFoodText: {
    marginHorizontal: 10, fontWeight: 'bold', fontSize: 12, letterSpacing: 2, color: COLORS.black 
  },
  findFoodText: {
    margin: 10, fontWeight: 'bold', fontSize: 12, letterSpacing: 2, color: COLORS.black 
  },
  loadingView: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
});

export default HomeScreen;