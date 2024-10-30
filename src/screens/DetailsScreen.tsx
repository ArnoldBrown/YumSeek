// DetailsScreen.tsx
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Linking, StatusBar, ImageBackground } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import COLORS from '../constants/colors';
import { getFoodDetail } from '../network/apiService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { APIS_ENDPOINT } from '../network/constant';
import LottieView from 'lottie-react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const DetailsScreen = ({ route, navigation }) => {
    const { mealId } = route.params;
    const [foodDetail, setFoodDetail] = useState<any>(null);
    const [ingredientArray, setIngredientArray] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const animation = useRef<LottieView>(null);

    console.log("mealIddd", mealId);

    useEffect(() => {
        animation.current?.play();
    }, []);

    useEffect(() => {
        if (mealId !== null) {
            setLoading(true)
            getFoodDetailCall(mealId);
        }
    }, [mealId])

    const getFoodDetailCall = async (mealId) => {
        try {
            const mealDetail = await getFoodDetail(mealId);
            setFoodDetail(mealDetail);
            const ingredients = getIngredients(mealDetail);
            console.log("ingredientt", ingredients);
            setIngredientArray(ingredients);
            setLoading(false)
            // setSelectCat(category[0].strCategory);
        } catch (error) {
            // Handle errors
            console.error('Error fetching random food:', error);
        }
    };

    function getIngredients(meal: any): string[] {
        const ingredients: string[] = [];

        // Loop through all possible ingredient keys (strIngredient1 to strIngredient20)
        for (let i = 1; i <= 20; i++) {
            const ingredientKey = `strIngredient${i}`;
            const ingredientValue = meal[ingredientKey];

            // Check if ingredientValue is not null or empty string
            if (ingredientValue && ingredientValue.trim() !== '') {
                ingredients.push(ingredientValue);
            }
        }

        return ingredients;
    }

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //       title: food.strMeal,
    //     });
    //   }, [navigation, food]);

    const handlePress = () => {
        const url = foodDetail?.strSource;
        Linking.openURL(url);
    };

    const renderItem = ({ item }) => (
        <View style={{ height: 70, width: 70, borderRadius: 40, borderWidth: 1, borderColor: COLORS.primary, justifyContent: 'center', margin: 2 }}>
            <Image source={{ uri: APIS_ENDPOINT.BASE_URL + APIS_ENDPOINT.IMG_INGREDIENT + item + '.png' }} style={styles.itemImage} />
        </View>
    );

    return (

        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

            <View style={{ flex: 0.3 }}>
                <ImageBackground source={require('../../assets/trans.png')} style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="arrow-back" size={25} color={COLORS.white} style={styles.icon} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.title}></Text>
                        </View>

                        <TouchableOpacity >
                            <Icon name="favorite-outline" size={24} color={COLORS.white} style={styles.icon} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, alignItems: 'center', position: 'relative', zIndex: 99, marginTop: screenHeight / 20 }}>
                        <Image source={{ uri: foodDetail?.strMealThumb }} style={styles.image} />
                    </View>
                </ImageBackground>
            </View>

            <View style={{ flex: 0.7 }}>
                {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LottieView
                        ref={animation}
                        source={require('../../assets/animations/loader.json')}
                        autoPlay
                        loop
                        style={{ width: 100, height: 100 }}
                    />
                </View> : <ScrollView>
                    <View style={{ padding: 20, backgroundColor: COLORS.white, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                        <Text style={[styles.foodTitle, { marginTop: 50 }]}>{foodDetail?.strMeal}</Text>
                        <Text style={styles.detail}><Text style={styles.labelTitle}>Area:</Text> {foodDetail?.strArea}</Text>
                        <Text style={styles.detail}><Text style={styles.labelTitle}>Category:</Text> {foodDetail?.strCategory}</Text>
                        <Text style={styles.detail}><Text style={styles.labelTitle}>Instructions:</Text> {foodDetail?.strInstructions}</Text>

                        {ingredientArray &&
                            <View>
                                <Text style={styles.labelTitle}>Ingredients</Text>
                                <FlatList
                                    data={ingredientArray}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    // keyExtractor={(item) => item.strCategory}
                                    renderItem={renderItem}
                                    style={{ marginBottom: 10 }}
                                // contentContainerStyle={styles.listContent}
                                />
                            </View>
                        }
                        {foodDetail?.strSource ? <TouchableOpacity onPress={() => handlePress()}>
                            <Text style={styles.extraLink}>Read More</Text>
                        </TouchableOpacity> : null}

                    </View>
                </ScrollView>}

            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        flexDirection: 'column',
    },
    title: {
        fontSize: 14,
        marginBottom: 10,
    },
    image: {
        width: screenWidth / 2,
        height: screenHeight / 4,
        marginBottom: 10,
        borderRadius: 200,
        resizeMode: 'cover'
    },
    detail: {
        fontSize: 14,
        marginBottom: 5,
        color: COLORS.text
    },
    foodTitle: {
        fontSize: 20,
        marginBottom: 5,
        color: COLORS.black,
        fontWeight: '700',
    },
    labelTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.black
    },
    extraLink: {
        fontSize: 14,
        marginBottom: 5,
        color: 'blue', textDecorationLine: 'underline'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 60,
    },
    icon: {
        paddingHorizontal: 1,
    },
    itemImage: {
        width: 60,
        height: 60,
        resizeMode: 'stretch',
        alignSelf: 'center'
    },
});

export default DetailsScreen;
