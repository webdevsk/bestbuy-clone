import { createSlice } from "@reduxjs/toolkit";

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push({
        id: action.payload.id,
        count: 1
      });
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.findIndex(item => item.id == action.payload);
      state.splice(itemIndex, 1);
    },
    increaseCount: (state, action) => {
      const cartItem = state.find(item => item.id === action.payload);
      if (cartItem.count === 10) return state;

      cartItem.count += 1;
    },
    decreaseCount: (state, action) => {
      const cartItem = state.find(item => item.id === action.payload);
      if (cartItem.count === 0) return state;
      cartItem.count -= 1;
    },
    setCountByAmount: (state, action) => {
      const cartItem = state.find(item => item.id === action.payload.id);
      cartItem.count = action.payload.value;
    }
  }
});

export const { addToCart, removeFromCart, increaseCount, decreaseCount, setCountByAmount } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;