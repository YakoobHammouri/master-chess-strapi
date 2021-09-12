import produce from "immer";
import set from "lodash/set";
import * as actions from "./constants";

export const initialState = {
  funSaveStudentActivities: null,
  clear_StudentActivities: false,
  saveStudentActivitiesLoading: false,
};

const StudentActivitiesReducer = produce(
  (draftState = initialState, action) => {
    switch (action.type) {
      case actions.CLEAR_ACTIVITIE: {
        draftState.clear_StudentActivities = action.clear_StudentActivities;
        if (action.clear_StudentActivities === true) {
          draftState.funSaveStudentActivities = null;
          draftState.saveStudentActivitiesLoading = false;
        }
        set(draftState);
        break;
      }
      case actions.SAVE_ACTIVITIE: {
        draftState.funSaveStudentActivities = action.funSaveActivitie;
        set(draftState, "funSaveStudentActivities", action.funSaveActivitie);
        break;
      }

      case actions.SAVE_ACTIVITIE_LOADING: {
        draftState.saveStudentActivitiesLoading = action.saveLoading;
        set(draftState, "saveStudentActivitiesLoading", action.saveLoading);
        break;
      }

      default:
        return draftState;
    }

    return draftState;
  }
);

export default StudentActivitiesReducer;
