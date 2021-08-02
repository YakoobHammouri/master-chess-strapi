import produce from "immer";
import set from "lodash/set";
import Moment from "moment";
import pluginId from "../pluginId";
import {
  IS_LOADING,
  CENTER_LIST,
  SELECT_CENTER_ID,
  SELECT_ATTENDANCE_DATE,
  SELECT_COURSE_ID,
  COURSE_LIST,
  STUDENT_COURSE_LIST,
  TAKE_ATTENDANCES,
  CLEAR_TAKE_ATTENDANCES,
} from "./constants";

export const initialState = {
  isLoading: false,
  clear_take_attendance: false,
  centerid: 0,
  courseid: 0,
  attendanceDate: Moment().format("DD/MM/YYYY"),
  centerList: [],
  courseList: [],
  studetnCourseList: [],
};

const chessReducer = produce((draftState = initialState, action) => {
  switch (action.type) {
    case IS_LOADING: {
      draftState.isLoading = action.isLoading;
      set(draftState);
      break;
    }

    case CLEAR_TAKE_ATTENDANCES: {
      draftState.clear_take_attendance = action.clear_take_attendance;
      if (action.clear_take_attendance === true) {
        draftState.centerid = 0;
        draftState.courseid = 0;
        draftState.courseList = [];
        draftState.attendanceDate = Moment().format("DD/MM/YYYY");
        draftState.studetnCourseList = [];
      }
      set(draftState);
      break;
    }

    case SELECT_CENTER_ID: {
      draftState.centerid = action.centerId;
      set(draftState);
      break;
    }

    case SELECT_COURSE_ID: {
      draftState.courseid = action.courseId;
      set(draftState);
      break;
    }

    case SELECT_ATTENDANCE_DATE: {
      draftState.attendanceDate = action.attendanceDate;
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

    case TAKE_ATTENDANCES: {
      draftState.studetnCourseList = action.std;
      set(draftState, "studetnCourseList", action.std);
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
