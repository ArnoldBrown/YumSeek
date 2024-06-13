export interface Meal {
    idMeal: string;
    strMeal: string;
    // Add more properties as needed
  }
  
  export interface MealResponse {
    meals: Meal[];
  }