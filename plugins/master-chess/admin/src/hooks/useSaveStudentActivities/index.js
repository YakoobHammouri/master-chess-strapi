import { getTrad } from "../../utils";
import { endPoint, useCRUD } from "..";
import { useDispatch } from "react-redux";
import {
  SAVE_ACTIVITIE_LOADING,
  CLEAR_ACTIVITIE,
  UPDATE_EDIT_ACTIVITIE_Table,
  Clear_GET_ROW_ACTIVITIE,
} from "../../containers/Context/StudentActivities/constants";
const _onSaveHandler = async (
  add,
  get,
  edit,
  dispatch,
  activiteObj,
  stdId,
  course
) => {
  const ok = confirm("Are you sure to save the Activity?");

  if (ok) {
    try {
      dispatch({
        type: SAVE_ACTIVITIE_LOADING,
        saveLoading: true,
      });

      const { data } = await get(
        `${endPoint.StudentActivities}/student/${stdId}`
      );

      // the Student not Have the student activity
      // add Student activity
      if (data === null) {
        const obj = {
          student: stdId,
          activities: [activiteObj],
        };

        await add(endPoint.StudentActivities, obj);

        dispatch({
          type: SAVE_ACTIVITIE_LOADING,
          saveLoading: false,
        });

        strapi.notification.toggle({
          type: "success",
          message: { id: getTrad("takeActivities.success") },
        });
      } else {
        const _courseIndex = data?.activities?.findIndex(
          (i) => i.course?.id == course.value
        );

        // The studnet have activity for this course
        // it is must update
        if (_courseIndex !== -1) {
          data?.activities?.forEach((_course, i) => {
            if (i === _courseIndex) {
              _course.courseActivites = [
                ..._course.courseActivites,
                ...activiteObj.courseActivites,
              ];
              return;
            }
          });
        } else {
          // add new Course Activites
          data?.activities?.push(activiteObj);
          console.log(`data`, data);
        }

        await edit(`${endPoint.StudentActivities}/${data?.id}`, data);
        dispatch({
          type: SAVE_ACTIVITIE_LOADING,
          saveLoading: false,
        });
        strapi.notification.toggle({
          type: "success",
          message: { id: getTrad("takeActivities.success") },
        });
      }
    } catch (err) {
      console.log("Error in temp Std Payment  : ", err);
      strapi.notification.toggle({
        type: "warning",
        message: { id: getTrad("activities.get.student.activities.error") },
      });

      dispatch({
        type: SAVE_ACTIVITIE_LOADING,
        saveLoading: false,
      });
    }
  }
};

const _onEditHandler = async (
  get,
  edit,
  dispatch,
  activity,
  stdId,
  course,
  activityId
) => {
  const ok = confirm("Are you sure to update the Payment?");

  if (ok) {
    try {
      dispatch({
        type: SAVE_ACTIVITIE_LOADING,
        saveLoading: true,
      });

      //strapi.notification.toggle({
      //   type: "warning",
      //   message: { id: getTrad("payment.student.no.have.record") },
      // });

      const obj = {
        activityId,
        mark: activity.mark?.value,
        activities_list: activity.selectActivitie?.value,
        activiteName: activity.selectActivitie?.label,
      };

      console.log(`obj 11111`, obj);

      await edit(
        `${endPoint.StudentActivities}/update-course-activity/${activityId}`,
        obj
      );

      dispatch({
        type: SAVE_ACTIVITIE_LOADING,
        saveLoading: false,
      });

      dispatch({
        type: UPDATE_EDIT_ACTIVITIE_Table,
        updateTable: true,
      });

      strapi.notification.toggle({
        type: "success",
        message: { id: getTrad("takePayment.success") },
      });
    } catch (err) {
      console.log("Error in temp Std Payment  : ", err);
      strapi.notification.toggle({
        type: "warning",
        message: { id: getTrad("payment.get.student.payment.error") },
      });
      dispatch({
        type: SAVE_ACTIVITIE_LOADING,
        saveLoading: false,
      });
    }
  }
};

function useSaveStudentActivities() {
  const { add, get, edit } = useCRUD();
  const dispatch = useDispatch();
  const onSaveHandler = async (obj, stdId, course) => {
    return new Promise(async (r, rej) => {
      try {
        const result = await _onSaveHandler(
          add,
          get,
          edit,
          dispatch,
          obj,
          stdId,
          course
        );

        dispatch({ type: CLEAR_ACTIVITIE, clear_StudentActivities: true });

        r(result);
      } catch (err) {
        console.log(`err use Save New Payment`, err);
        rej(err);
      }
    });
  };

  const onEditHandler = async (activity, activityId, stdId, course) => {
    return new Promise(async (r, rej) => {
      try {
        const result = await _onEditHandler(
          get,
          edit,
          dispatch,
          activity,
          stdId,
          course,
          activityId
        );

        dispatch({ type: Clear_GET_ROW_ACTIVITIE });

        r(result);
      } catch (err) {
        console.log(`err use Save New Payment`, err);
        rej(err);
      }
    });
  };

  return { onSaveHandler, onEditHandler };
}

export default useSaveStudentActivities;
