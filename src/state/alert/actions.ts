import { createAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch } from "../../store";

export const addAlert = createAction<{
  msg: string;
  type: string;
  id: string;
}>("alert/add");

export const removeAlert = createAction<string>("alert/remove");

export const setAlert =
  (msg: string, type: string, timeout = 5000) =>
  (dispatch: AppDispatch) => {
    const id = uuidv4();

    dispatch(addAlert({ msg, type, id }));
    setTimeout(() => dispatch(removeAlert(id)), timeout);
  };
