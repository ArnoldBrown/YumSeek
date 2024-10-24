import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface CartItem {
  idMeal: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  count: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  count: 0,
  totalAmount: 0,
};

const calculateTotalAmount = (items: CartItem[]) => {
  return items.reduce((total, item) => {
    const itemPrice = item.price|| 10; // Ensure item price defaults to 0 if invalid
    const itemQuantity = item.quantity || 0; // Ensure item quantity defaults to 0 if invalid
    console.log("itemPrice", itemPrice);
    console.log("itemQuantity", itemQuantity);
    return total + itemPrice * itemQuantity; // Calculate total
  }, 0); // Start with a total of 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.count += 1;

      state.totalAmount = calculateTotalAmount(state.items);
      console.log("Cart items:", state.items); // Debugging log
      console.log("Total amount:", state.totalAmount);
    },
    updateCartItemQuantity: (state, action) => {
      const { idMeal, quantity } = action.payload;
      const existingItem = state.items.find(item => item.idMeal === idMeal);
      if (existingItem) {
        existingItem.quantity = quantity;
        state.totalAmount = calculateTotalAmount(state.items); // Update total
      }
    },
    increaseQuantity: (state, action) => {
      const idMeal = action.payload;
      const item = state.items.find(item => item.idMeal === idMeal);
      if (item) {
        item.quantity += 1;
        state.totalAmount = calculateTotalAmount(state.items); // Update total
      }
    },
    decreaseQuantity: (state, action) => {
      const idMeal = action.payload;
      const item = state.items.find(item => item.idMeal === idMeal);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.idMeal !== idMeal);
        }
        state.totalAmount = calculateTotalAmount(state.items); // Update total
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.count = 0;
      state.totalAmount = 0; // Reset total amount
    },
  },
});

export const { addToCart, updateCartItemQuantity, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
