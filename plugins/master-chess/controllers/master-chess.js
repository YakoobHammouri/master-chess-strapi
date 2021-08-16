"use strict";
const Path = require("path");
const PDFDocument = require("pdfkit");
const fs = require("fs");

var pdf = require("html-pdf");
module.exports = {
  index: async (ctx) => {
    ctx.send({
      message: "ok",
    });
  },
  ToPDF: async (ctx) => {
    console.log("Start pdfr");
    const rootDir = process.cwd();
    const filepath = Path.resolve(`${rootDir}/public/uploads/test.html`);
    console.log("file path 1111111111 ", filepath);
    const pdfpath = Path.resolve(`${rootDir}/public/uploads/output.pdf`);
    var html = fs.readFileSync(filepath, "utf8");

    console.log("html 1111 : ", html);

    var options = { format: "Letter" };

    pdf.create(html, options).toFile(pdfpath, function (err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });

    // // Create a document

    // const doc = new PDFDocument();
    //
    // // Pipe its output somewhere, like to a file or HTTP response
    // // See below for browser usage
    // const filepath = Path.resolve(`${rootDir}/public/uploads/output.pdf`);
    // console.log(`file paths`, filepath);
    // console.log(`start pdfr `);
    // doc.pipe(fs.createWriteStream(filepath));

    // doc.fontSize(25).text(``);

    // const path = Path.resolve(`${rootDir}/public/uploads/logo.png`);
    // doc.image(path, {
    //   fit: [250, 300],
    //   align: "center",
    //   valign: "center",
    // });

    // // // Add some text with annotations
    // doc
    //   .addPage()
    //   .fillColor("blue")
    //   .text("Here is a link!", 100, 100)
    //   .underline(100, 100, 160, 27, { color: "#0000FF" })
    //   .link(100, 100, 160, 27, "http://google.com/");

    // // Finalize PDF file
    // doc.end();

    console.log(`ENd Pdf`);
    ctx.send({
      message: "ok",
    });
  },
};
