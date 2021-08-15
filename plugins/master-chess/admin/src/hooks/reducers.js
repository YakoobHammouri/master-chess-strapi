import produce from "immer";
import set from "lodash/set";
import moment from "moment";
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
  UPDATE_ATTENDANCES,
  CLEAR_TAKE_ATTENDANCES,
  ATTENDANCE_LEST,
  STUDENT_ATTENDANCE_LEST,
  SELECT_ATTENDANCE_ID,
  ATTENDANCES_TYPE,
  STUDENT_LiST,
  SELECT_STUDENT_By_ID,
  STUDENT_ATTENDANCES_LIST,
  SELECT_COURSE_META,
} from "./constants";

export const initialState = {
  isLoading: false,
  clear_take_attendance: false,
  attendanceType: "",
  centerid: 0,
  courseid: 0,
  selectedAttendanceId: 0,
  attendanceDate: new moment(),
  centerList: [],
  courseList: [],
  studetnCourseList: [],
  updateAttendance: [],
  studentAttndanceLest: [],
  attendanceList: [],
  studentList: [],
  SelectStudentById: {},
  studentAttendanceList: [],
  selectCourseMeta: null,
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
        draftState.attendanceType = "";
        draftState.selectedAttendanceId = 0;
        draftState.courseList = [];
        draftState.attendanceDate = new moment();
        draftState.studetnCourseList = [];
        draftState.updateAttendance = [];
        draftState.studentAttndanceLest = [];
        draftState.studentList = [];
        draftState.studentAttendanceList = [];
        draftState.selectCourseMeta = null;
      }
      set(draftState);
      break;
    }

    case SELECT_CENTER_ID: {
      draftState.centerid = action.centerId;
      set(draftState);
      break;
    }

    case ATTENDANCES_TYPE: {
      draftState.attendanceType = action.attype;
      set(draftState);
      break;
    }

    case SELECT_COURSE_ID: {
      draftState.courseid = action.courseId;
      set(draftState);
      break;
    }

    case SELECT_COURSE_META: {
      draftState.selectCourseMeta = action.meta;
      set(draftState);
      break;
    }

    case SELECT_ATTENDANCE_ID: {
      draftState.selectedAttendanceId = action.attendId;
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

    case STUDENT_LiST: {
      draftState.studentList = action.stdList;
      set(draftState, "studentList", action.stdList);
      break;
    }

    case STUDENT_ATTENDANCES_LIST: {
      draftState.studentAttendanceList = action.stdAttends;
      set(draftState, "studentAttendanceList", action.stdAttends);
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

    case ATTENDANCE_LEST: {
      draftState.attendanceList = action.attendlist;
      set(draftState, "attendanceList", action.attendlist);
      break;
    }

    case UPDATE_ATTENDANCES:
    case STUDENT_ATTENDANCE_LEST: {
      draftState.studentAttndanceLest = action.stdAttend;
      set(draftState, "studentAttndanceLest", action.stdAttend);
      break;
    }

    case SELECT_STUDENT_By_ID: {
      draftState.SelectStudentById = action.std;
      set(draftState, "SelectStudentById", action.std);
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
