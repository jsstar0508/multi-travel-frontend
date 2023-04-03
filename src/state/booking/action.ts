import { createAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { AppDispatch } from "../../store";
import { setAlert } from "state/alert/actions";

export const searchSuccess = createAction<{}>("booking/experience/success");
export const searchError = createAction<void>("booking/experience/error");

export const searchExperienceData = (data: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.post("booking/experienceSearch", data);
    dispatch(searchSuccess(res.data));
  } catch (error: any) {
    const errors = error.response.data.errors;
    dispatch(searchError());
  }
}