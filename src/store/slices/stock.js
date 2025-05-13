import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedStock: "",
  timeRange: "",
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    saveSelectedStock: (state, action) => {
      state.value = action.payload;
    },
    saveTimeRange: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = stockSlice.actions;

export default stockSlice.reducer;
