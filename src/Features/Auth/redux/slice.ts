import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postLogin, registerServer } from "./thunks";

import { AuthenticationStateType, AuthStateEnum } from "./types";

const initialState: AuthenticationStateType = {
  authState: AuthStateEnum.LOGIN,
  loginState: 0,
  summary : "",
  transcript : ""
};

export const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        authState: action.payload,
      };
    },
    setLoginState: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loginState: action.payload,
      };
    },
    setSummaryState: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        summary: action.payload,
      };
    },
    setTranscriptState: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        transcript: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(registerServer.fulfilled, (state, action) => {
      state.authState = AuthStateEnum.LOGIN;
      state.loginState = 1;
    });
    builder.addCase(registerServer.rejected, (state, action) => {});
    builder.addCase(postLogin.fulfilled, (state, action) => {
      localStorage.setItem("access_token", action.payload.access_token);
      localStorage.setItem("user_name", action.payload.userName);
      localStorage.setItem("user_roles", action.payload.roles)
    });
    builder.addCase(postLogin.rejected, (state, action) => {});
  },
});
export const { setAuthState, setLoginState, setTranscriptState, setSummaryState } =
  authentication.actions;
export default authentication.reducer;
