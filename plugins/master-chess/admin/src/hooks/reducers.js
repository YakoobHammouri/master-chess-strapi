import attendancesReducer from "../containers/Context/Attendances/reducer";
import paymentReducer from "../containers/Context/Payment/reducer";
import pluginId from "../utils";

const reducers = {
  [`${pluginId}_attendances`]: attendancesReducer,
  [`${pluginId}_payment`]: paymentReducer,
};

export default reducers;
