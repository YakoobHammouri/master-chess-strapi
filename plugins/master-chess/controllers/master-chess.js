"use strict";
const _ = require("lodash");
const Path = require("path");
var pdf = require("html-pdf");
const fs = require("fs");
const HTMLtoDOCX = require("html-to-docx");

const createFile = (
  { center, course, sdate, edate, headers, atted },
  isDocx,
  isPayment
) => {
  return new Promise(async (r, rej) => {
    try {
      console.log("Start pdfr isDocx : ", isDocx);
      const rootDir = process.cwd();

      const filepath2 = Path.resolve(
        `${rootDir}/public/print/AttendCourseTable.html`
      );

      // console.log(`filePath 1111111`, filePath);
      let theader = "";
      headers?.forEach((header, i) => {
        theader += `<th key={i}>
          <p style={{ textAlign: "center", verticalAlign: "middle" }}>
            ${header}
          </p>
        </th>`;
      });

      let atbody = "";
      if (isPayment) {
        atted?.forEach((row) => {
          atbody += `<tr> 
                <td style={{ verticalAlign: "middle" }}>
                 <p style={{ textAlign: "center" }}>${row.payment_id}</p>
               </td>
                <td style={{ verticalAlign: "middle" }}>
                 <p style={{ textAlign: "center" }}>${row.student}</p>
               </td>

               <td style={{ verticalAlign: "middle" }}>
                 <p style={{ textAlign: "center" }}>${row.courseName}</p>
               </td>

               <td style={{ verticalAlign: "middle" }}>
                 <p style={{ textAlign: "center" }}>${row.amount}</p>
               </td>

              
               <td style={{ verticalAlign: "middle" }}>
                 <p style={{ textAlign: "center" }}>${row.month}</p>
               </td>

               
               <td style={{ verticalAlign: "middle" }}>
                 <p style={{ textAlign: "center" }}>${row.date}</p>
               </td>

               </tr>`;
        });
      } else {
        atted?.forEach((row) => {
          let temp = "";

          row?.forEach((r) => {
            temp += `<td style={{ verticalAlign: "middle" }}>
                 <p style={{ textAlign: "center" }}>${r}</p>
               </td>`;
          });

          atbody += `<tr>${temp}</tr>`;
        });
      }

      const fileName = isDocx ? `${Date.now()}.docx` : `${Date.now()}.pdf`;

      const pdfpath = isDocx
        ? Path.resolve(`${rootDir}/public/docx/Attend/${fileName}`)
        : isPayment
        ? Path.resolve(`${rootDir}/public/PDF/Payment/${fileName}`)
        : Path.resolve(`${rootDir}/public/PDF/Attend/${fileName}`);

      var html = fs.readFileSync(filepath2, "utf8");

      const objcompiled = {
        logo: `${strapi.config.get("server.url")}/logo.png`,
        center: center ?? "---",
        course: course,
        sdate: sdate,
        edate: edate,
        theader,
        atbody,
      };

      const compiled = _.template(html);
      const hPrint = compiled(objcompiled);
      var options = { format: "A4" };

      if (isDocx) {
        const fileBuffer = await HTMLtoDOCX(hPrint, null, {
          table: { row: { cantSplit: true } },
          footer: true,
          pageNumber: true,
        });
        fs.writeFile(pdfpath, fileBuffer, (error) => {
          if (error) {
            console.log("Docx file creation failed", error);
            return rej(error);
          }
          return r({ path: pdfpath, fileName });
        });
      } else {
        pdf.create(hPrint, options).toFile(pdfpath, function (err, res) {
          if (err) {
            return rej(err);
          }
          return r({ path: pdfpath, fileName });
        });
      }
    } catch (err) {
      console.log(`Error in Create File `, err);
      rej(err);
    }
  });
};

module.exports = {
  index: async (ctx) => {
    ctx.send({
      message: "ok",
    });
  },
  attendToPDF: async (ctx) => {
    try {
      const data = await createFile(ctx.request.body, false);
      const src = fs.createReadStream(data.path);
      ctx.response.set("content-type", "application/pdf");

      ctx.response.set("Content-disposition", data.fileName);
      ctx.statusCode = 200;
      ctx.body = src;
    } catch (err) {
      console.log("error in attendToPDF  ", err);
      return null;
    }
  },
  paymentToPDF: async (ctx) => {
    try {
      const data = await createFile(ctx.request.body, false, true);
      const src = fs.createReadStream(data.path);
      ctx.response.set("content-type", "application/pdf");

      ctx.response.set("Content-disposition", data.fileName);
      ctx.statusCode = 200;
      ctx.body = src;
    } catch (err) {
      console.log("error in Payment ToPDF  ", err);
      return null;
    }
  },
  attendToWord: async (ctx) => {
    try {
      const data = await createFile(ctx.request.body, true);
      const src = fs.createReadStream(data.path);
      ctx.response.set(
        "content-type",
        "	application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );

      ctx.response.set("Content-disposition", data.fileName);
      ctx.statusCode = 200;
      ctx.body = src;
    } catch (err) {
      console.log("error in attendToPDF  ", err);
      return null;
    }
  },
};
