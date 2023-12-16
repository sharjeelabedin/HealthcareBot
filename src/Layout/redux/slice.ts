import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILayout } from "./types";


const initialState : ILayout = {
  heading: "Resource Catalog",
  activeKey: "Resource Catalog",
  subNavData : []
};

export const layout = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setSubNav: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        subNavData: action.payload.navData,
        heading: action.payload.heading,
        activeKey: action.payload.activeKey
      };
    },
    setHeading: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        heading: action.payload,
      };
    },
    
  },
  extraReducers(builder) {
   
  },
});
export const { setSubNav, setHeading } = layout.actions
export default layout.reducer;
