import produce from "immer";
import set from "lodash/set";
import pluginId from "../pluginId";
import {
  IS_LOADING,
  CENTER_LIST,
  SELECT_CENTER_ID,
  COURSE_LIST,
  STUDENT_COURSE_LIST,
} from "./constants";

export const initialState = {
  isLoading: false,
  centerid: 0,
  centerList: [
    {
      value: "",
      label: "CourseList.load.defualt",
    },
  ],
  courseList: [
    // {
    //   value: "",
    //   label: "CourseList.load.defualt",
    // },
  ],
  studetnCourseList: [],
};

const chessReducer = produce((draftState = initialState, action) => {
  switch (action.type) {
    case IS_LOADING: {
      draftState.isLoading = action.isLoading;
      set(draftState);
      break;
    }

    case SELECT_CENTER_ID: {
      draftState.centerid = action.centerId;
      set(draftState);
      break;
    }

    case CENTER_LIST: {
      draftState.centerList = action.acenter;
      set(draftState, "centerList", action.acenter);
      break;
    }

    case COURSE_LIST: {
      draftState.courseList = action.acourse;
      set(draftState, "courseList", action.acourse);
      break;
    }

    case STUDENT_COURSE_LIST: {
      draftState.studetnCourseList = action.studCourse;
      set(draftState, "studetnCourseList", action.studCourse);
      break;
    }

    default:
      return draftState;
  }

  return draftState;
});

const reducers = {
  [`${pluginId}`]: chessReducer,
};

export default reducers;
