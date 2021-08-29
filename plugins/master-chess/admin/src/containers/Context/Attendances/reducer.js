import produce from "immer";
import set from "lodash/set";
import moment from "moment";
import * as actions from "./constants";

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

const attendancesReducer = produce((draftState = initialState, action) => {
  switch (action.type) {
    case actions.IS_LOADING: {
      draftState.isLoading = action.isLoading;
      set(draftState);
      break;
    }

    case actions.CLEAR_TAKE_ATTENDANCES: {
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

    case actions.SELECT_CENTER_ID: {
      draftState.centerid = action.centerId;
      set(draftState);
      break;
    }

    case actions.ATTENDANCES_TYPE: {
      draftState.attendanceType = action.attype;
      set(draftState);
      break;
    }

    case actions.SELECT_COURSE_ID: {
      draftState.courseid = action.courseId;
      set(draftState);
      break;
    }

    case actions.SELECT_COURSE_META: {
      draftState.selectCourseMeta = action.meta;
      set(draftState);
      break;
    }

    case actions.SELECT_ATTENDANCE_ID: {
      draftState.selectedAttendanceId = action.attendId;
      set(draftState);
      break;
    }

    case actions.SELECT_ATTENDANCE_DATE: {
      draftState.attendanceDate = action.attendanceDate;
      set(draftState);
      break;
    }

    case actions.CENTER_LIST: {
      draftState.centerList = action.acenter;
      set(draftState, "centerList", action.acenter);
      break;
    }

    case actions.COURSE_LIST: {
      draftState.courseList = action.acourse;
      set(draftState, "courseList", action.acourse);
      break;
    }

    case actions.STUDENT_LiST: {
      draftState.studentList = action.stdList;
      set(draftState, "studentList", action.stdList);
      break;
    }

    case actions.STUDENT_ATTENDANCES_LIST: {
      draftState.studentAttendanceList = action.stdAttends;
      set(draftState, "studentAttendanceList", action.stdAttends);
      break;
    }
    case actions.STUDENT_COURSE_LIST: {
      draftState.studetnCourseList = action.studCourse;
      set(draftState, "studetnCourseList", action.studCourse);
      break;
    }

    case actions.TAKE_ATTENDANCES: {
      draftState.studetnCourseList = action.std;
      set(draftState, "studetnCourseList", action.std);
      break;
    }

    case actions.ATTENDANCE_LEST: {
      draftState.attendanceList = action.attendlist;
      set(draftState, "attendanceList", action.attendlist);
      break;
    }

    case actions.UPDATE_ATTENDANCES:
    case actions.STUDENT_ATTENDANCE_LEST: {
      draftState.studentAttndanceLest = action.stdAttend;
      set(draftState, "studentAttndanceLest", action.stdAttend);
      break;
    }

    case actions.SELECT_STUDENT_By_ID: {
      draftState.SelectStudentById = action.std;
      set(draftState, "SelectStudentById", action.std);
      break;
    }

    default:
      return draftState;
  }

  return draftState;
});

export default attendancesReducer;
