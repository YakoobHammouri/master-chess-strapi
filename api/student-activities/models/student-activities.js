"use strict";
const Boom = require("boom");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

let isLoack = false;
let needUpdate = false;
module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      /*
      if std Temp is null, meaning the student does not have Activities  Record  so the Activities Student  can creating , otherwise throw Error
     */

      if (!data.student) {
        throw Boom.badRequest(
          "Please Select The Student for Activities Record"
        );
      }

      if (data.activities.length < 1) {
        throw Boom.badRequest("Please Add The Activities");
      }

      data.activities?.forEach((item) => {
        if (!item?.course) {
          throw Boom.badRequest("Please Select The Course for Activity");
        }

        if (item?.courseActivites?.length < 1) {
          throw Boom.badRequest("Please Add The Course Activites");
        }
      });

      const stdTemp = await strapi
        .query("student-activities")
        .findOne({ student: data.student });

      console.log(`stdTemp`, stdTemp);

      //stdTemp not Null
      if (stdTemp) {
        throw Boom.badRequest("The Student Has Activities Record");
      }
    },
    async afterCreate(result, data) {
      try {
        // console.log(`result`, result);
        result?.activities?.forEach((item) => {
          // console.log(`pay 11`, item);
          if (!item.courseName) {
            item.courseName = item?.course?.name;
            isLoack = true;
            needUpdate = true;
          }

          item?.courseActivites?.forEach((acti) => {
            if (!acti.activiteName) {
              acti.activiteName = acti?.activities_list?.name;
              isLoack = true;
              needUpdate = true;
            }
          });
        });

        if (needUpdate) {
          await strapi
            .query("student-activities")
            .update({ id: result.id }, result);
          isLoack = false;
        }
      } catch (err) {
        console.log("error in student activities after Create", err);
      }
    },
    async afterUpdate(result, params, data) {
      try {
        // locl code to update
        if (isLoack === false) {
          result?.activities?.forEach((item) => {
            // console.log(`pay 11`, item);
            if (!item.courseName) {
              item.courseName = item?.course?.name;
              isLoack = true;
              needUpdate = true;
            }

            item?.courseActivites?.forEach((acti) => {
              if (!acti.activiteName) {
                acti.activiteName = acti?.activities_list?.name;
                isLoack = true;
                needUpdate = true;
              }
            });
          });
          if (needUpdate) {
            await strapi
              .query("student-activities")
              .update({ id: result.id }, result);
            isLoack = false;
            needUpdate = false;
          }
        }
      } catch (err) {
        console.log("error in student payment after Update", err);
      }
    },
  },
};
