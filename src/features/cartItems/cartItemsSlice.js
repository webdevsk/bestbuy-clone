import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

const cartItemsAdapter = createEntityAdapter()

const initialState = cartItemsAdapter.getInitialState()

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      cartItemsAdapter.addOne(state, {
        id: action.payload,
        count: 1
      })
    },
    removeFromCart: (state, action) => {
      cartItemsAdapter.removeOne(state, action.payload)
    },
    increaseCount: (state, action) => {
      if (state.entities[action.payload].count === 10) return state
      state.entities[action.payload].count += 1
    },
    decreaseCount: (state, action) => {
      if (state.entities[action.payload].count === 1) return state
      state.entities[action.payload].count -= 1
    },
    setCountByAmount: (state, action) => {
      if (action.payload > 10 || action.payload < 1) return state
      state.entities[action.payload].count = action.payload
    }
  }
})

export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemsById,
  selectEntities: selectCartItemEntities,
  selectIds: selectCartItemIds,
  selectTotal: selectCartItemsTotal
} = cartItemsAdapter.getSelectors(state => state.cartItems)

export const { addToCart, removeFromCart, increaseCount, decreaseCount, setCountByAmount } = cartItemsSlice.actions

export default cartItemsSlice.reducer