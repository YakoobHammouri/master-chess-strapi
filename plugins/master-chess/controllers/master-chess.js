"use strict";
const _ = require("lodash");
const Path = require("path");
var pdf = require("html-pdf-node");
const fs = require("fs");
const {
  AlignmentType,
  Document,
  Footer,
  Packer,
  Paragraph,
  HeadingLevel,
  PageOrientation,
} = require("docx");

const { headerTabled, attendTable } = require("./doc");

function ensureDirectoryExistence(filePath) {
  var _dirname = Path.dirname(filePath);
  if (fs.existsSync(_dirname)) {
    return true;
  }
  ensureDirectoryExistence(_dirname);
  fs.mkdirSync(_dirname);
}

const createPdfFile = (
  { center, course, sdate, edate, headers, atted },
  isPayment
) => {
  return new Promise(async (r, rej) => {
    try {
      const rootDir = process.cwd();

      const filepath2 = Path.resolve(
        `${rootDir}/public/print/AttendCourseTable.html`
      );

      let theader = "";
      headers?.forEach((header, i) => {
        theader += `<th >
          <p  style="text-align: center; vertical-align: middle; font-family: Arial;">
            ${header}
          </p>
        </th>`;
      });

      let atbody = "";
      if (isPayment) {
        atted?.forEach((row) => {
          atbody += `<tr> 
                <td style="vertical-align: middle;">
                 <p style="text-align: center; font-family: Arial;">${row.payment_id}</p>
               </td>
                <td style="vertical-align: middle;">
                 <p style="text-align: center; font-family: Arial;">${row.student}</p>
               </td>

               <td style="vertical-align: middle;">
                 <p style="text-align: center; font-family: Arial;">${row.courseName}</p>
               </td>

               <td style="vertical-align: middle;">
                 <p style="text-align: center; font-family: Arial;">${row.amount}</p>
               </td>

              
               <td style="vertical-align: middle;">
                 <p style="text-align: center; font-family: Arial;">${row.month}</p>
               </td>

               
               <td style="vertical-align: middle;">
                 <p style="text-align: center; font-family: Arial;">${row.date}</p>
               </td>

               </tr>`;
        });
      } else {
        atted?.forEach((row) => {
          let temp = "";

          // row?.forEach((r) => {
          //   temp += `<td style="vertical-align: middle;">
          //        <p style="text-align: center; font-family: Arial;">${r}</p>
          //      </td>`;
          // });

          row?.forEach((r) => {
            temp += `<td style="vertical-align: middle; text-align: center; font-family: Arial;">
                 ${r}
               </td>`;
          });

          atbody += `<tr>${temp}</tr>`;
        });
      }

      const fileName = `${Date.now()}.pdf`;

      const pdfpath = isPayment
        ? Path.resolve(`${rootDir}/public/PDF/Payment/${fileName}`)
        : Path.resolve(`${rootDir}/public/PDF/Attend/${fileName}`);

      console.log(`pdfpath`, pdfpath);
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

      let file = { content: hPrint };
      pdf
        .generatePdf(file, options)
        .then(async (pdfBuffer) => {
          console.log("PDF Buffer:-", pdfBuffer);
          await fs.writeFileSync(pdfpath, pdfBuffer);
          return r({ path: pdfpath, fileName });
        })
        .catch((err) => {
          console.log(`err in generate Pdf  1111`, err);
          rej(err);
        });
    } catch (err) {
      console.log(`Error in Create File `, err);
      rej(err);
    }
  });
};

const createDocxFile = (
  { center, course, sdate, edate, headers, atted },
  isPayment
) => {
  return new Promise(async (r, rej) => {
    try {
      const rootDir = process.cwd();

      const fileName = `${Date.now()}.docx`;

      const xmlStyle = Path.resolve(
        `${rootDir}/public/print/AttendTableStyle.xml`
      );

      const styles = fs.readFileSync(xmlStyle, "utf-8");

      const pdfpath = isPayment
        ? Path.resolve(`${rootDir}/public/PDF/Payment/${fileName}`)
        : Path.resolve(`${rootDir}/public/PDF/Attend/${fileName}`);

      // const pdfpath = Path.resolve(`${rootDir}/public/docx/Attend/${fileName}`);

      const objcompiled = {
        center: center ?? "---",
        course: course,
        sdate: sdate,
        edate: edate,
      };

      const doc = new Document({
        styles: {
          default: {
            heading3: {
              run: {
                font: "Calibri",
                size: 26,
                bold: true,
              },
              paragraph: {
                spacing: { line: 276 },
              },
            },
            heading4: {
              run: {
                font: "Calibri",
                size: 30,
                bold: true,
              },
              paragraph: {
                alignment: AlignmentType.JUSTIFIED,
              },
            },
            heading5: {
              run: {
                font: "Calibri",
                size: 26,
                bold: true,
              },
              paragraph: {
                alignment: AlignmentType.JUSTIFIED,
              },
            },
          },
        },
        externalStyles: styles,
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 500,
                  right: 500,
                  bottom: 500,
                  left: 500,
                },
                size: {
                  orientation:
                    headers.length > 9
                      ? PageOrientation.LANDSCAPE
                      : PageOrientation.PORTRAIT,
                },
              },
            },
            footers: {
              default: new Footer({
                children: [
                  new Paragraph({
                    text: "1",
                    style: "normalPara",
                    alignment: AlignmentType.LEFT,
                  }),
                ],
              }),
            },
            children: [
              headerTabled(objcompiled),
              new Paragraph({
                text: "",
                heading: HeadingLevel.HEADING_1,
                thematicBreak: true,
                spacing: {
                  after: 600,
                },
              }),
              attendTable(headers, atted, isPayment),
            ],
          },
        ],
      });

      Packer.toBuffer(doc).then(async (buffer) => {
        await fs.writeFileSync(pdfpath, buffer);
        return r({ path: pdfpath, fileName });
      });
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
      const data = await createPdfFile(ctx.request.body);
      console.log(`data`, data);
      const src = fs.createReadStream(data.path);
      ctx.response.set("content-type", "application/pdf");

      console.log(`src`, src);
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
      const data = await createPdfFile(ctx.request.body, true);
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
      const data = await createDocxFile(ctx.request.body, false);
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

  paymentToWord: async (ctx) => {
    try {
      console.log(`start payment doc`);
      const data = await createDocxFile(ctx.request.body, true);
      const src = fs.createReadStream(data.path);
      ctx.response.set(
        "content-type",
        "	application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      ctx.response.set("Content-disposition", data.fileName);
      ctx.statusCode = 200;
      ctx.body = src;
    } catch (err) {
      console.log("error in payment doc  ", err);
      return null;
    }
  },
};
