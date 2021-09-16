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
      if std Temp is null, meaning the student does not have payment Record  so the payment Student  can creating , otherwise throw Error
     */

      console.log(`data 1111`, data);

      if (!data.student) {
        throw Boom.badRequest("Please Select The Student for Payment Record");
      }

      if (data.Payments.length < 1) {
        throw Boom.badRequest("Please Add The Payment");
      }

      const stdTemp = await strapi
        .query("student-payment")
        .findOne({ student: data.student });

      //stdTemp not Null
      if (stdTemp) {
        throw Boom.badRequest("The Student Has Payment Record");
      }
    },

    async afterCreate(result, data) {
      try {
        result?.Payments?.forEach((pay) => {
          if (!pay.courseName) {
            pay.courseName = pay?.course?.name;
            isLoack = true;
            needUpdate = true;
          }
        });

        if (needUpdate) {
          await strapi
            .query("student-payment")
            .update({ id: result.id }, result);
          isLoack = false;
        }
      } catch (err) {
        console.log("error in student payment after Create", err);
      }
    },
    async afterUpdate(result, params, data) {
      try {
        // locl code to update
        if (isLoack === false) {
          result?.Payments?.forEach((pay) => {
            if (!pay.courseName) {
              isLoack = true;
              needUpdate = true;
              pay.courseName = pay?.course?.name;
            }
          });

          if (needUpdate) {
            await strapi
              .query("student-payment")
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
