import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./slice/students"

const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
});

export default store;
