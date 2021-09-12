import { useEffect, useState } from "react";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";

const fetchActivitieList = async () => {
  try {
    const data = await request("/activities-lists", {
      method: "GET",
    });
    return data;
  } catch (e) {
    console.log("Error in load activities list : ", e);
    strapi.notification.toggle({
      type: "warning",
      message: { id: getTrad("CenterList.error.onload") },
    });
    return null;
  }
};

const useActivitiesLists = () => {
  const [activitiesLists, setActivitiesLists] = useState([]);

  useEffect(() => {
    fetchActivitieList()
      .then((list) => {
        if (!list) {
          return;
        }

        const temp = list.map((prod) => {
          return {
            value: `${prod.id}`,
            label: prod.name,
            meta: {
              total: prod.total,
              activities_type: {
                id: prod.activities_type.id,
                name: prod.activities_type.name,
                total: prod.activities_type.total,
              },
            },
          };
        });

        setActivitiesLists(temp);
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  }, []);

  return { activitiesLists };
};

export default useActivitiesLists;
