const fs = require("fs");

const {
  AlignmentType,
  convertInchesToTwip,
  Document,
  Footer,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TabStopPosition,
  UnderlineType,
  TableLayoutType,
  WidthType,
  TextRun,
  HeightRule,
  VerticalAlign,
} = require("docx");
const buildParagraph = (text, bold, alignment, heading) =>
  new Paragraph({
    bidirectional: true,
    heading: heading ?? HeadingLevel.HEADING_4,
    alignment: alignment ?? AlignmentType.CENTER,
    height: 10000,
    children: [
      new TextRun({
        text: text,
        bold: bold,
        rightToLeft: true,
      }),
    ],
  });

const rowHight = { rule: HeightRule.EXACT, value: "1.12" };

const buildRow = (attrows, isPayment) => {
  const rows = [];

  console.log(`attrows`, attrows);
  if (isPayment) {
    /*
    
     {
    student_payment_id: 17,
    payment_id: 28,
    studentId: 7,
    student: 'فرح النتشة',
    amount: 120,
    course: 4,
    date: '2021-08-29',
    courseName: 'المستوى التقدم',
    month: 2
  },
    

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

               </tr>`

    */

    attrows?.forEach((row) => {
      rows.push(
        new TableRow({
          height: { rule: HeightRule.EXACT, value: "0.9" },
          children: [
            //row.payment_id
            new TableCell({
              children: [
                buildParagraph(
                  row.payment_id,
                  false,
                  AlignmentType.CENTER,
                  HeadingLevel.HEADING_5
                ),
              ],
            }),
            //row.student
            new TableCell({
              children: [
                buildParagraph(
                  row.student,
                  false,
                  AlignmentType.CENTER,
                  HeadingLevel.HEADING_5
                ),
              ],
            }),

            //row.courseName
            new TableCell({
              children: [
                buildParagraph(
                  row.courseName,
                  false,
                  AlignmentType.CENTER,
                  HeadingLevel.HEADING_5
                ),
              ],
            }),
            //row.amount
            new TableCell({
              children: [
                buildParagraph(
                  row.amount,
                  false,
                  AlignmentType.CENTER,
                  HeadingLevel.HEADING_5
                ),
              ],
            }),

            //row.month
            new TableCell({
              children: [
                buildParagraph(
                  row.month,
                  false,
                  AlignmentType.CENTER,
                  HeadingLevel.HEADING_5
                ),
              ],
            }),

            //row.date
            new TableCell({
              children: [
                buildParagraph(
                  row.date,
                  false,
                  AlignmentType.CENTER,
                  HeadingLevel.HEADING_5
                ),
              ],
            }),
          ],
        })
      );
    });
  } else {
    attrows?.forEach((row) => {
      rows.push(
        new TableRow({
          height: { rule: HeightRule.EXACT, value: "0.9" },

          children: row?.map((r) => {
            return new TableCell({
              children: [
                buildParagraph(
                  r,
                  false,
                  AlignmentType.CENTER,
                  HeadingLevel.HEADING_5
                ),
              ],
            });
          }),
        })
      );
    });
  }

  return rows;
};

const attendTable = (header, arows, isPayment) => {
  return new Table({
    visuallyRightToLeft: true,
    alignment: AlignmentType.START,
    layout: TableLayoutType.AUTOFIT,
    // borders: noneBorderTable,
    style: "GridTable6Colorful",
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      // header Row
      new TableRow({
        height: { rule: HeightRule.EXACT, value: "0.9" },
        children: header?.map(
          (h) =>
            new TableCell({
              verticalAlign: VerticalAlign.CENTER,
              children: [
                buildParagraph(
                  h,
                  false,
                  AlignmentType.CENTER,
                  HeadingLevel.HEADING_5
                ),
              ],
            })
        ),
      }),

      ...buildRow(arows, isPayment),
    ],
  });
};
module.exports = (header, rows, isPayment) =>
  attendTable(header, rows, isPayment);
