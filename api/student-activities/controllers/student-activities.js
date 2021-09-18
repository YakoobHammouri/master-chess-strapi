"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findStudentActivities: async (ctx) => {
    const { id } = ctx.params;
    if (!id) {
      ctx.status = 400;
      return ctx.send({
        message: "id is required",
      });
    }

    const stdTemp = await strapi
      .query("student-activities")
      .findOne({ student: id });

    ctx.statusCode = 200;
    return ctx.send({
      data: stdTemp,
    });
  },
};
