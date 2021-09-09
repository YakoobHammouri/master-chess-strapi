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
  BorderStyle,
} = require("docx");
const buildParagraph = (text, bold, alignment, heading) =>
  new Paragraph({
    bidirectional: true,
    heading: heading ?? HeadingLevel.HEADING_4,
    alignment: alignment ?? AlignmentType.CENTER,
    children: [
      new TextRun({
        text: text,
        bold: bold,
        rightToLeft: true,
      }),
    ],
  });

const noneBorderTable = {
  top: {
    style: BorderStyle.NONE,
  },
  bottom: {
    style: BorderStyle.NONE,
  },
  left: {
    style: BorderStyle.NONE,
  },
  right: {
    style: BorderStyle.NONE,
  },
  insideHorizontal: { style: BorderStyle.NONE },
  insideVertical: { style: BorderStyle.NONE },
};

const rowHight = { height: 150, rule: HeightRule.EXACT };

const headerTable = (objcompiled) =>
  new Table({
    visuallyRightToLeft: true,
    alignment: AlignmentType.START,
    layout: TableLayoutType.AUTOFIT,
    borders: noneBorderTable,
    width: {
      size: 90,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        height: { height: 1500, rule: HeightRule.EXACT },
        children: [
          new TableCell({
            children: [buildParagraph("المركز : ", true, AlignmentType.START)],
          }),
          new TableCell({
            children: [
              buildParagraph(
                objcompiled.center,
                false,
                AlignmentType.START,
                HeadingLevel.HEADING_5
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        height: { height: 950, rule: HeightRule.EXACT },
        children: [
          new TableCell({
            children: [buildParagraph("الدورة : ", true, AlignmentType.START)],
          }),
          new TableCell({
            children: [
              buildParagraph(
                objcompiled.course,
                false,
                AlignmentType.START,
                HeadingLevel.HEADING_5
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        height: rowHight,
        children: [
          new TableCell({
            children: [
              buildParagraph("تاريخ البداية : ", true, AlignmentType.START),
            ],
          }),
          new TableCell({
            children: [
              buildParagraph(
                objcompiled.sdate,
                false,
                AlignmentType.START,
                HeadingLevel.HEADING_5
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        height: rowHight,
        children: [
          new TableCell({
            children: [
              buildParagraph("تاريخ النهاية : ", true, AlignmentType.START),
            ],
          }),
          new TableCell({
            children: [
              buildParagraph(
                objcompiled.edate,
                false,
                AlignmentType.START,
                HeadingLevel.HEADING_5
              ),
            ],
          }),
        ],
      }),
    ],
  });

module.exports = (objcompiled) =>
  new Table({
    borders: noneBorderTable,
    visuallyRightToLeft: true,
    alignment: AlignmentType.START,
    layout: TableLayoutType.AUTOFIT,

    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            children: [headerTable(objcompiled)],
          }),
          new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: fs.readFileSync(`public/logo.png`),
                    transformation: {
                      width: 100,
                      height: 100,
                    },
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
