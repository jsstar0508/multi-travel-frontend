import { createReducer } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";

export interface Booking {
  experienceGetData: any | null;
  stayGetData: any | null;
  carGetData: any | null;
}

const searchSuccess = createAction<{}>("booking/experience/success");
export const searchError = createAction<void>("booking/experience/error");

export const initialState: Booking = {
  experienceGetData : [],
  stayGetData : "",
  carGetData : "",
};

export default createReducer<Booking>(initialState, (builder) =>
  builder
    .addCase(searchSuccess, (state, { payload }) => {
      return {
        ...state,
        experienceGetData: payload,
      };
    })
    .addCase(searchError, (state) => state)
    .addDefaultCase((state) => state)
);
