import produce from "immer";
import set from "lodash/set";
import * as actions from "./constants";

export const initialState = {
  funSavePament: null,
  clear_Payment: false,
  savePamentLoading: false,
};

const paymentReducer = produce((draftState = initialState, action) => {
  switch (action.type) {
    case actions.CLEAR_PAYMENT: {
      draftState.clear_Payment = action.clear_Payment;
      if (action.clear_Payment === true) {
        draftState.funSavePament = null;
      }
      set(draftState);
      break;
    }
    case actions.SAVE_PAYMENT: {
      draftState.funSavePament = action.savePament;
      set(draftState, "funSavePament", action.savePament);
      break;
    }
    case actions.SAVE_PAYMENT_LOADING: {
      draftState.savePamentLoading = action.saveLoading;
      set(draftState, "savePamentLoading", action.saveLoading);
      break;
    }

    default:
      return draftState;
  }

  return draftState;
});

export default paymentReducer;
