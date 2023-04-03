import { createAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { AppDispatch } from "../../store";
import { setAlert } from "state/alert/actions";

export const profileUpdateSuccess = createAction<{}>('user/profile/update');
export const profileUpdateError = createAction<void>('user/profile/update/error')

export const updateProfile = (data: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.post("user/update", data);
    dispatch(profileUpdateSuccess(res.data));
  } catch (error: any) {
    const errors = error.response.data.errors;
    dispatch(profileUpdateError());
  }
}