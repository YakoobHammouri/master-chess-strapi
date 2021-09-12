import attendancesReducer from "../containers/Context/Attendances/reducer";
import paymentReducer from "../containers/Context/Payment/reducer";
import studentActivitiesReducer from "../containers/Context/StudentActivities/reducer";
import pluginId from "../pluginId";

const reducers = {
  [`${pluginId}_attendances`]: attendancesReducer,
  [`${pluginId}_payment`]: paymentReducer,
  [`${pluginId}_StudentActivities`]: studentActivitiesReducer,
};

export default reducers;
