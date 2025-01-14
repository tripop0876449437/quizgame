import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './slices/exampleSlice'; // ตรวจสอบ path

const store = configureStore({
  reducer: {
    example: exampleReducer, // ตรวจสอบชื่อ slice ตรงกับใน `exampleSlice.js`
  },
});

export default store;
