export const APIS_ENDPOINT = {
    BASE_URL: 'https://www.themealdb.com/',
    RANDOM_FOOD: 'api/json/v1/1/random.php',
    CATEGORY_FOOD: 'api/json/v1/1/list.php?c=list',

    FOOD_DETAIL: 'api/json/v1/1/lookup.php?i=',

    FOOD_BY_CATEGORY: 'api/json/v1/1/filter.php?c=',
    FOOD_BY_INGREDIENT: 'api/json/v1/1/filter.php?i=',
    FOOD_BY_AREA: 'api/json/v1/1/filter.php?a=',

    FOOD_BY_NAME: 'api/json/v1/1/search.php?s=',

    LIST_CATEGORY: 'api/json/v1/1/list.php?c=list',
    LIST_AREA: 'api/json/v1/1/list.php?a=list',
    LIST_INGREDIENTS: 'api/json/v1/1/list.php?i=list',

    IMG_INGREDIENT: 'images/ingredients/',
    IMG_CATEGORY: 'images/category/'
    
  } as const;
  
  export type ApiEndpoint = typeof APIS_ENDPOINT[keyof typeof APIS_ENDPOINT];