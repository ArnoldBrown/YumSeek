import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { clearCart, increaseQuantity, decreaseQuantity } from '../store/slices/cartSlice';
import { RootState } from '../store';
import LottieView from 'lottie-react-native';

const CartScreen = () => {
    const { items, totalAmount } = useSelector((state: RootState) => state.cart);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const animation = useRef<LottieView>(null);

    useEffect(() => {
        animation.current?.play();
      }, []);

    const handleIncreaseQuantity = (idMeal) => {
        dispatch(increaseQuantity(idMeal));
    };

    const handleDecreaseQuantity = (idMeal) => {
        dispatch(decreaseQuantity(idMeal));
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.strMeal}</Text>
            <View style={styles.itemInnerContainer}>
                <View style={{ flex: 0.4 }}>
                    {/* <Text style={styles.itemName}>{item.strMeal}</Text> */}
                    <Image source={{ uri: item?.strMealThumb }} style={styles.itemImage} />
                </View>
                <View style={{ flex: 0.6 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.itemLabel}>Price</Text>
                        <Text style={styles.itemPrice}>$ {item.price.toFixed(2)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.itemLabel}>Quantity</Text>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={() => handleDecreaseQuantity(item.idMeal)}>
                                <Text style={styles.quantityButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => handleIncreaseQuantity(item.idMeal)}>
                                <Text style={styles.quantityButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>

        </View>
    );
    

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.primary, padding: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={25} color={COLORS.white} style={styles.icon} />
                </TouchableOpacity>

                <Text style={styles.header}>Cart</Text>

                <TouchableOpacity onPress={() => dispatch(clearCart())}>
                    <Icon name="remove-shopping-cart" size={25} color={COLORS.white} style={styles.icon} />
                </TouchableOpacity>
            </View>

            {items.length > 0 ? (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={items}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item.idMeal}
                    />

                    <View style={[styles.itemContainer, { justifyContent: 'space-between', flexDirection: 'row', marginBottom: 60 }]}>
                        <Text style={{ color: 'black' }}>Total</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>$ {totalAmount.toFixed(2)}</Text>
                    </View>

                    <View style={styles.bottomView}>
                        <Text style={styles.bottomText}>Proceed</Text>
                    </View>
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                ref={animation}
                source={require('../../assets/animations/empty_cart.json')}
                autoPlay
                loop
                style={{ width: 200, height: 200 }}
              />
                </View>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        // padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    itemContainer: {
        padding: 15,
        borderWidth: 1,
        borderColor: COLORS.cardBg,
        marginHorizontal: 10,
        marginVertical: 2,
        borderRadius: 10
    },
    itemInnerContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    itemName: {
        fontSize: 13,
        color: COLORS.text,
        fontWeight: 'bold'
    },
    itemPrice: {
        fontSize: 13,
        color: COLORS.text,
        fontWeight: 'bold'
    },
    itemLabel: {
        fontSize: 12,
        color: COLORS.text,
    },
    emptyCart: {
        fontSize: 18,
        color: COLORS.text,
        textAlign: 'center',
        marginTop: 20,
    },
    icon: {
        paddingHorizontal: 1,
        marginEnd: 20
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'center',
        marginTop: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 18,
        paddingHorizontal: 10,
        color: COLORS.green_btn,
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
        color: COLORS.black,
        fontWeight: 'bold'
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginHorizontal: 10,
        backgroundColor: COLORS.primary, // Example background
        padding: 15,
        alignItems: 'center', // Center the text
        justifyContent: 'center',
        borderTopWidth: 1, // Add border for separation
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 2
    },
    bottomText: {
        fontSize: 15,
        color: COLORS.white,
        fontWeight: 'bold'
    },
});

export default CartScreen;
