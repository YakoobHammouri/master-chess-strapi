"use strict";

const _ = require("lodash");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findStudentPayments: async (ctx) => {
    const { id } = ctx.params;
    if (!id) {
      ctx.status = 400;
      return ctx.send({
        message: "id is required",
      });
    }

    const stdTemp = await strapi
      .query("student-payment")
      .findOne({ student: id });

    ctx.statusCode = 200;
    return ctx.send({
      data: stdTemp,
    });
  },
  findStudentPaymentByCourse: async (ctx) => {
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

    const knex = strapi.connections.default;

    const result = await knex
      .select("*")
      .from("student_payments")
      .join(
        "student_payments_components",
        "student_payments.id",
        "=",
        "student_payments_components.student_payment_id"
      )
      .join(
        "components_comp_students_student_payments",
        "components_comp_students_student_payments.id",
        "=",
        "student_payments_components.component_id"
      )
      .where("student", stdid)
      .andWhere("course", cid);

    const temp = result?.map((row) => {
      return {
        student_payment_id: row.student_payment_id,
        payment_id: row.id,
        student: row.student,
        amount: row.amount,
        course: row.course,
        date: row.date,
        courseName: row.courseName,
        month: row.month,
      };
    });
    ctx.status = 200;
    return temp;
  },
  findPaymentForCourse: async (ctx) => {
    const { cid } = ctx.params;

    if (!cid) {
      ctx.status = 400;
      return ctx.send({
        message: "Course id is required",
      });
    }

    const knex = strapi.connections.default;
    const result = await knex
      .select("*")
      .from("student_payments")
      .join("students", "student_payments.student", "=", "students.id")
      .join(
        "student_payments_components",
        "student_payments.id",
        "=",
        "student_payments_components.student_payment_id"
      )
      .join(
        "components_comp_students_student_payments",
        "components_comp_students_student_payments.id",
        "=",
        "student_payments_components.component_id"
      )
      .where("course", cid)
      .orderBy("student_payments.student", "asc");

    const temp = result?.map((row) => {
      return {
        student_payment_id: row.student_payment_id,
        payment_id: row.id,
        studentId: row.student,
        student: row.name,
        amount: row.amount,
        course: row.course,
        date: row.date,
        courseName: row.courseName,
        month: row.month,
      };
    });
    ctx.status = 200;
    return temp;
  },
};
