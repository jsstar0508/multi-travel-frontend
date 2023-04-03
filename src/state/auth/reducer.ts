import { createReducer } from "@reduxjs/toolkit";

import {
  authSuccess,
  authError,
  loginSuccess,
  loginError,
  registerSuccess,
  registerError,
  logOut,
} from "./action";

import { 
  profileUpdateSuccess,
  profileUpdateError 
} from "state/profile/action";

export interface Auth {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: any | null;
}

export const initialState: Auth = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: "",
};

export default createReducer<Auth>(initialState, (builder) =>
  builder
    .addCase(authSuccess, (state, { payload }) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    })
    .addCase(authError, (state) => {
      return { ...state };
    })
    .addCase(loginSuccess, (state, { payload }) => {
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    })
    .addCase(loginError, (state) => {
      return { ...state };
    })
    .addCase(registerSuccess, (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    })
    .addCase(registerError, (state) => state)
    .addCase(logOut, (state) => {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    })
    .addCase(profileUpdateSuccess, (state, { payload }) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    })
    .addCase(profileUpdateError, (state) => state)
    .addDefaultCase((state) => state)
);


