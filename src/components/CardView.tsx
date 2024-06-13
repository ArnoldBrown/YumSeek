// src/components/CardView.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';

interface CardViewProps {
    food: any;
    onClick: any;
}


const CardView: React.FC<CardViewProps> = ({ food, onClick }) => {

    
    return (
        <TouchableOpacity  style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: food?.strMealThumb }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.categoryText}>{food?.strCategory}</Text>
                <Text style={styles.title}>{food?.strMeal}</Text>
                <Text style={styles.place}>{food?.strArea}</Text>
            </View>
            <TouchableOpacity onPress={() => onClick()} style={styles.arrowContainer}>
                <Icon name="chevron-right" size={35} color={COLORS.primary} />
            </TouchableOpacity>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: COLORS.cardBg,
        borderRadius: 10,
        overflow: 'hidden',
        width: '95%',
        height: 120,
        alignSelf: 'center',
        marginTop: 10,
        position: 'relative',
    },
    imageContainer: {
        width: '30%',
    },
    image: {
        width: '100%',
        height: 150, // Adjust height as needed
        resizeMode: 'cover'
    },
    textContainer: {
        width: '70%',
        padding: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    place: {
        fontSize: 13,
        marginBottom: 5,
        fontStyle:'italic'
    },
    categoryText: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight:'700'
    },
    arrowContainer: {
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: [{ translateY: -12 }], // Adjust translateY to vertically center the arrow
    },
});


export default CardView;
