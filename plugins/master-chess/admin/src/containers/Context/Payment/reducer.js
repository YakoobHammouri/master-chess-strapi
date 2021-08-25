import produce from "immer";
import * as actions from "./constants";

export const initialState = {};

const paymentReducer = produce((draftState = initialState, action) => {
  switch (action.type) {
    default:
      return draftState;
  }

  return draftState;
});

export default paymentReducer;
