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
  findStudentActivityCourse: async (ctx) => {
    const { stdid, cid } = ctx.params;

    if (!stdid) {
      ctx.status = 400;
      return ctx.send({
        message: "Student id is required",
      });
    }

    if (!cid) {
      ctx.status = 400;
      return ctx.send({
        message: "Course id is required",
      });
    }

    const stdTemp = await strapi
      .query("student-activities")
      .findOne({ student: stdid });

    const _activities = stdTemp?.activities.find((i) => i?.course?.id == cid);

    console.log(`_couser`, _activities);
    const temp = _activities?.courseActivites?.map((a) => {
      return {
        activityId: _activities.id,
        id: a.id,
        mark: a.mark,
        activiteName: a.activiteName,
        activities_list_id: a.activities_list.id,
        activities_list_total: a.activities_list.total,
      };
    });

    ctx.status = 200;
    return temp ?? [];
  },
  updateCourseActivity: async (ctx) => {
    try {
      const { id } = ctx.params;
      if (!id) {
        ctx.status = 400;
        return ctx.send({
          message: "Activity id is required",
        });
      }

      const { activityId, mark, activities_list, activiteName } =
        ctx.request.body;

      if (id != activityId) {
        ctx.status = 400;
        return ctx.send({
          message: "Wrong Activity id  ",
        });
      }

      const knex = strapi.connections.default;

      // const temp = await knex
      //   .select("*")
      //   .from("components_comp_students_activities_s")
      //   .where("id", activityId);

      const temp = await knex
        .update({
          mark,
          activities_list,
          activiteName,
        })
        .from("components_comp_students_activities_s")
        .where("id", "=", activityId);

      // console.log(`temp`, temp);

      ctx.status = 200;
      return ctx.send({
        data: temp === 1 ? true : false,
      });
    } catch (err) {
      console.log(`err`, err);
      ctx.status = 500;
    }
  },
};
