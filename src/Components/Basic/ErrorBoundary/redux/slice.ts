import { createSlice, PayloadAction } from "@reduxjs/toolkit";


import {ErrorBoundaryType} from "./types";

const initialState : ErrorBoundaryType = {
  message: null,
  description : '',
  placement : "topLeft",
  type : 'error'
};

export const ErrorBoundary = createSlice({
  name: "errorBoundary",
  initialState,
  reducers: {
    setErrorState: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        message: action.payload.message,
        description : action.payload.description,
        placement : action.payload.placement,
        type : action.payload.type
      };
    },
    clearErrorState: (state) => {
      return {
        ...state,
        message: null,
        description : "",
        placement : "topLeft",
        type : "error"
      };
    },
  },
  extraReducers(builder) {
    
  },
});
export const {setErrorState, clearErrorState} = ErrorBoundary.actions;
export default ErrorBoundary.reducer;
