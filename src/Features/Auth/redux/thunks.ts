import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginURL, verifyEmailURL } from "../../../Constants/api";
import {
  getRequest,
  postRequest,
  testConnection,
} from "../../../Utilities/ApiHelpers/ApiHelpers.index";
import { LoginModel } from "./types";



export const registerServer = createAsyncThunk("api", async (URI: string) => {
  const response: any = await testConnection(`${URI}/api`);
  return response.data;
});

export const postLogin = createAsyncThunk(
  "api/account/Login",
  async (loginPayload: LoginModel) => {
    const response = await postRequest(
      LoginURL,
      null,
      false,
      loginPayload,
      null
    );
    return response.data;
  }
);

export const verifyEmail = createAsyncThunk(
  "api/account/Logout",
  async (verify:string|null) => {
    console.log("Called")
    const response = await getRequest(`${verifyEmailURL}?verify=${verify}`);
    return response.data;
  }
);

export const logout = createAsyncThunk(
  "api/account/Logout",
  async (URI: string) => {
    const response = await getRequest(`${URI}`);
    return response.data;
  }
);
