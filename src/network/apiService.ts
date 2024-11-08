import { useState } from 'react';
import callApi from './apiRequest';
import { APIS_ENDPOINT } from './constant';

export const getRandomFood = async () => {
    try {
        const mealResponse = await callApi(`${APIS_ENDPOINT.BASE_URL}${APIS_ENDPOINT.RANDOM_FOOD}`, 'GET');
        
        if (!mealResponse || !mealResponse.meals || mealResponse.meals.length === 0) {
            throw new Error('No meal found in response');
        }

        const [randomMeal] = mealResponse.meals;
        // console.log('Random Meal:', randomMeal);

        return randomMeal;
    } catch (error) {
        console.error('Error fetching random meal:', error.message || error);
        throw error;
    }
};


export const getRandomFood1 = async () => {
    try {
        const mealResponse = await callApi(`${APIS_ENDPOINT.BASE_URL}${APIS_ENDPOINT.RANDOM_FOOD}`, 'GET');
        const randomMeal = mealResponse.meals[0];

        // console.log('Random Meal:', mealResponse);

        return randomMeal; // Return the random meal from the function
    } catch (error) {
        // Handle errors
        console.error('Error fetching random meal:', error);
        throw error; // Re-throw the error to handle it outside
    }
};

export const getFoodCategory = async () => {
    
    try {
        const catResponse = await callApi(`${APIS_ENDPOINT.BASE_URL}${APIS_ENDPOINT.LIST_CATEGORY}`, 'GET');
        const category = catResponse.meals;

        // console.log('Category:', catResponse);

        return category; // Return the random meal from the function
    } catch (error) {
        // Handle errors
        console.error('Error fetching random meal:', error);
        throw error; // Re-throw the error to handle it outside
    }
};

export const getFoodByQuery = async (query:string) => {
    console.log("coming","yessss")
    try {
        const queryFoodResponse = await callApi(`${APIS_ENDPOINT.BASE_URL}${APIS_ENDPOINT.FOOD_BY_NAME}${query}`, 'GET');
        // const queryFood = queryFoodResponse.meals;

        const queryFood = queryFoodResponse.meals.map((meal: any) => ({
            ...meal,
            price: Number((Math.random() * (20 - 5) + 5).toFixed(2)), // Random price between 5 and 20
          }));
          
        //   console.log(queryFood);

        console.log('Food By Name:', queryFood);

        return queryFood; // Return the random meal from the function
    } catch (error) {
        // Handle errors
        console.error('Error fetching random meal:', error);
        throw error; // Re-throw the error to handle it outside
    }
};

export const getFoodByIngredient = async (ingred:string) => {
    try {
        const ingredFoodResponse = await callApi(`${APIS_ENDPOINT.BASE_URL}${APIS_ENDPOINT.FOOD_BY_INGREDIENT}${ingred}`, 'GET');
        const ingredFood = ingredFoodResponse.meals;

        // console.log('Ingred Food:', ingredFoodResponse);

        return ingredFood; // Return the random meal from the function
    } catch (error) {
        // Handle errors
        console.error('Error fetching random meal:', error);
        throw error; // Re-throw the error to handle it outside
    }
};

export const getFoodByArea = async (area:string) => {
    try {
        const areaFoodResponse = await callApi(`${APIS_ENDPOINT.BASE_URL}${APIS_ENDPOINT.FOOD_BY_AREA}${area}`, 'GET');
        const areaFood = areaFoodResponse.meals;

        // console.log('Area Food:', areaFoodResponse);

        return areaFood; // Return the random meal from the function
    } catch (error) {
        // Handle errors
        console.error('Error fetching random meal:', error);
        throw error; // Re-throw the error to handle it outside
    }
};

export const getFoodArea = async () => {
    try {
        const areaResponse = await callApi(`${APIS_ENDPOINT.BASE_URL}${APIS_ENDPOINT.LIST_AREA}`, 'GET');
        const area = areaResponse.meals;

        // console.log('Area:', areaResponse);

        return area; // Return the random meal from the function
    } catch (error) {
        // Handle errors
        console.error('Error fetching random meal:', error);
        throw error; // Re-throw the error to handle it outside
    }
};

export const getFoodIngredient = async () => {
    try {
        const ingredientResponse = await callApi(`${APIS_ENDPOINT.BASE_URL}${APIS_ENDPOINT.LIST_INGREDIENTS}`, 'GET');
        const ingredient = ingredientResponse.meals;

        // console.log('Ingredient:', ingredientResponse);

        return ingredient; // Return the random meal from the function
    } catch (error) {
        // Handle errors
        console.error('Error fetching random meal:', error);
        throw error; // Re-throw the error to handle it outside
    }
};

export const getFoodDetail = async (mealId) => {
    try {
        const foodDetailResponse = await callApi(`${APIS_ENDPOINT.BASE_URL}${APIS_ENDPOINT.FOOD_DETAIL}${mealId}`, 'GET');
        const foodDetail = foodDetailResponse.meals[0];

        // console.log('Detail Food:', foodDetailResponse);

        return foodDetail; // Return the random meal from the function
    } catch (error) {
        // Handle errors
        console.error('Error fetching random meal:', error);
        throw error; // Re-throw the error to handle it outside
    }
};

export const getFoodByCategory = async (category) => {
    try {
        const catFoodResponse = await callApi(`${APIS_ENDPOINT.BASE_URL}${APIS_ENDPOINT.FOOD_BY_CATEGORY}${category}`, 'GET');
        const categoryFood = catFoodResponse.meals;

        // console.log('Food By Category:', catFoodResponse);

        return categoryFood; // Return the random meal from the function
    } catch (error) {
        // Handle errors
        console.error('Error fetching random meal:', error);
        throw error; // Re-throw the error to handle it outside
    }
};