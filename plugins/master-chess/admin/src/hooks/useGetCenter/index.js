import { useEffect, useState } from "react";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";
import {
  CENTER_LIST,
  REDUCER_NAME,
  IS_LOADING,
} from "../../containers/Context/Attendances/constants";
import { useGlobalContext } from "strapi-helper-plugin";
import { useDispatch, useSelector } from "react-redux";

const fetchCenterList = async () => {
  try {
    const data = await request("/centers", {
      method: "GET",
    });
    return data;
  } catch (e) {
    console.log("Error in load product : ", e);
    strapi.notification.toggle({
      type: "warning",
      message: { id: getTrad("CenterList.error.onload") },
    });
    return null;
  }
};

const useGetCenter = () => {
  const dispatch = useDispatch();

  const centerList = useSelector((state) => state.get(REDUCER_NAME).centerList);

  // const getCenterList = async () => {
  //   dispatch({ type: IS_LOADING, isLoading: true });
  //   try {
  //     const center = await fetchCenterList();
  //     if (!center) {
  //       return;
  //     }
  //     const acenter = center.map((prod) => {
  //       return {
  //         value: `${prod.id}`,
  //         label: prod.name,
  //       };
  //     });
  //     dispatch({ type: CENTER_LIST, acenter });
  //     return acenter;
  //   } catch (err) {
  //     console.log(`err`, err);
  //   } finally {
  //     dispatch({ type: IS_LOADING, isLoading: false });
  //   }
  // };

  useEffect(() => {
    fetchCenterList()
      .then((center) => {
        if (!center) {
          return;
        }
        const acenter = center.map((prod) => {
          return {
            value: `${prod.id}`,
            label: prod.name,
          };
        });
        dispatch({ type: CENTER_LIST, acenter });
        return acenter;
      })
      .catch((err) => {
        console.log(`err`, err);
      });

    // finally {
    //   dispatch({ type: IS_LOADING, isLoading: false });
    // }
  }, []);

  return { centerList };
  //getCenterList
};

export default useGetCenter;
