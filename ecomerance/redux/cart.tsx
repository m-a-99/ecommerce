import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface cartreftype {
  value: {
    [key: string]: {
      count: number;
      product: {
        _id: string;
        name: string;
        desc: string;
        sku: string;
        img: string;
        rate: number;
        sale: number;
        product_category_id: string;
        price: number;
        __v: number;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
}
const initialState: cartreftype = {
  value: {},
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
    appendCart: (state, action) => {
      if (state.value[action.payload._id]) {
        state.value[action.payload._id].count++;
      } else {
        state.value[action.payload._id] = { count: 1, product: action.payload };
      }
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    deleteFromCart: (state, action) => {
      if (state.value[action.payload._id].count > 1) {
        state.value[action.payload._id].count--;
      } else {
        delete state.value[action.payload._id];
      }
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
  },
});
export const { setCart, appendCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
