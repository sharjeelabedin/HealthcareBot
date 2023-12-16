import { createSlice, PayloadAction } from "@reduxjs/toolkit";


import {FullLoaderStateType} from "./types";

const initialState : FullLoaderStateType = {
  loading: false
};

export const fullPageLoader = createSlice({
  name: "fullPageLoader",
  initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
  extraReducers(builder) {
    
  },
});
export const {setLoadingState} = fullPageLoader.actions;
export default fullPageLoader.reducer;
