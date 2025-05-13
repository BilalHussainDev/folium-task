import { configureStore } from '@reduxjs/toolkit'
import { stockSlice } from './slices/stock'

export const store = configureStore({
  reducer: {
    stock: stockSlice.reducer,
  },
})
