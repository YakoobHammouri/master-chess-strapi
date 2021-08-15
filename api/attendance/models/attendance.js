"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

let isLoack = false;
let needUpdate = false;
module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      try {
        result?.studentAttendance?.forEach((std) => {
          if (!std.studentName) {
            console.log("std 111 :  ", std);
            std.studentName = std.student.name;
            isLoack = true;
            needUpdate = true;
          }
        });

        if (needUpdate) {
          await strapi.query("attendance").update({ id: result.id }, result);
          isLoack = false;
        }
      } catch (err) {
        console.log("error in atteddfdf 12124", err);
      }
    },
    async afterUpdate(result, params, data) {
      try {
        // locl code to update
        if (isLoack === false) {
          console.log(" isLoack 1111111111 : ", isLoack);
          result?.studentAttendance?.forEach((std) => {
            if (!std.studentName) {
              isLoack = true;
              needUpdate = true;
              std.studentName = std.student.name;
            }
          });

          if (needUpdate) {
            await strapi.query("attendance").update({ id: result.id }, result);
            isLoack = false;
            needUpdate = false;
          }
        }
      } catch (err) {
        console.log("error in atteddfdf 12124", err);
      }
    },
  },
};
