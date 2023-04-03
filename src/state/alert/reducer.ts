import { createReducer } from "@reduxjs/toolkit";
import { addAlert, removeAlert } from "./actions";

export interface Alert {
  id: string;
  msg: string;
  type: string;
}

export const initialState: Alert[] = [];

export default createReducer<Alert[]>(initialState, (builder) =>
  builder
    .addCase(addAlert, (state, { payload }) => [...state, payload])
    .addCase(removeAlert, (state, { payload }) =>
      state.filter((alert) => alert.id !== payload)
    )
);
