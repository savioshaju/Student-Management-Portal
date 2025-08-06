import { createSlice } from "@reduxjs/toolkit";

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    allData: [],       // all students
    data: [],          // filtered list
    current: null,     // currently selected student
    loading: false,    // loading state for all students
    error: null,       // error for all students
    currentLoading: false, // loading state for current student
    currentError: null,    // error for current student
  },
  reducers: {
    // All students
    setAllStudents(state, action) {
      state.allData = action.payload;
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setStudents(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Current student
    setCurrentStudent(state, action) {
      state.current = action.payload;
      state.currentLoading = false;
      state.currentError = null;
    },
    setCurrentLoading(state) {
      state.currentLoading = true;
      state.currentError = null;
    },
    setCurrentError(state, action) {
      state.currentLoading = false;
      state.currentError = action.payload;
    },
  },
});

export const {
  setAllStudents,
  setStudents,
  setLoading,
  setError,
  setCurrentStudent,
  setCurrentLoading,
  setCurrentError,
} = studentsSlice.actions;

export default studentsSlice.reducer;
