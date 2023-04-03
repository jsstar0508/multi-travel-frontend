import { createAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { AppDispatch } from "../../store";
import { setAlert } from "state/alert/actions";

export const authSuccess = createAction<{}>("auth/success");
export const authError = createAction<void>("auth/error");
export const loginSuccess = createAction<{}>("auth/login/success");
export const loginError = createAction<void>("auth/login/error");
export const registerSuccess = createAction<{ token: string }>(
  "auth/register/success"
);
export const registerError = createAction<void>("auth/register/error");
export const logOut = createAction<void>("auth/logout");

export const loadUser = () => async (dispatch: AppDispatch) => {
  try {
    const res = await api.get("/auth");
    dispatch(authSuccess(res.data));
  } catch (error) {
    dispatch(authError());
  }
};

export const register = (data: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.post("/user", data);
    dispatch(registerSuccess(res.data));
    loadUser()(dispatch);
  } catch (error: any) {
    const errors = error.response.data.errors;
    dispatch(registerError());
  }
};

export const login = (data: any) => async (dispatch: AppDispatch) => {
  try {
      const res = await api.post("/auth", data);
      dispatch(loginSuccess(res.data));
      loadUser()(dispatch);
    } catch (error: any) {
      const errors = error.response.data.errors;
      dispatch(loginError());
    }
  };

