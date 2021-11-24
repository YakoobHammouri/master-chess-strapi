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
  findAllStudentActivityCourse: async (ctx) => {
    const { cid } = ctx.params;

    if (!cid) {
      ctx.status = 400;
      return ctx.send({
        message: "Course id is required",
      });
    }

    const knex = strapi.connections.default;

    const result = await knex.raw(`
    SELECT A.id as activity_id  , D.id as StdId , D.name as stdName ,C.course , C.courseName , Z.activiteName ,I.total, Z.mark FROM
    students D
    JOIN student_activities A
    on
    A.student = D.id
    JOIN
    student_activities_components B  on
    A.id = B.student_activity_id
    JOIN
    components_comp_students_course_activities C
    on
    B.component_id = C.id
    JOIN components_comp_students_course_activities_components S
    on C.id  = S.components_comp_students_course_activity_id
    JOIN components_comp_students_activities_s Z
    on S.component_id  = Z.id
    JOIN activities_lists I
    on Z.activities_list = I.id   where course = ${cid} ORDER BY D.id ASC `);

    let lastID = 0;
    const data = [];

    let stdActivty = {
      student: {},
      activity: [],
    };
    result?.forEach((d, i) => {
      // Last Id != d.StdId then new student
      // reset Values to build new Student

      if (lastID !== 0 && lastID !== d.StdId) {
        data.push(stdActivty);
        lastID = 0;
        stdActivty = {
          student: {},
          activity: [],
        };
      }

      // id = 0 then is new Student ,
      // must build new std Activity with student data
      if (lastID === 0) {
        stdActivty.student = { stdId: d.StdId, stdName: d.stdName };
        stdActivty.activity.push({
          activity_id: d.activity_id,
          course: d.course,
          courseName: d.courseName,
          activiteName: d.activiteName,
          total: d.total,
          mark: d.mark,
        });
        lastID = d.StdId;
      }
      // last = d.StdId then is not new student ,
      // we need to add activty to current studetn ,
      // without add student data
      else if (lastID === d.StdId) {
        stdActivty.activity.push({
          activity_id: d.activity_id,
          course: d.course,
          courseName: d.courseName,
          activiteName: d.activiteName,
          total: d.total,
          mark: d.mark,
        });
        lastID = d.StdId;
      }

      // this is last one so , must add to data Array
      if (i + 1 === result?.length) {
        data.push(stdActivty);
      }
    });
    ctx.status = 200;
    return data ?? [];
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
