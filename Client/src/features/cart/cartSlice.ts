import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../model/ICart";

interface CartState {
  cart: Cart | null;
}

const initialState: CartState = {
  cart: null,
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
