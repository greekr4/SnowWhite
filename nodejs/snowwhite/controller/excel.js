const ExcelJS = require("exceljs");
const { getConnection, Connection } = require("../utils/dbUtils");
const { generateKey } = require("../utils/Utils");

// Excel 파일 경로

// Excel 파일 읽기

exports.paperExcelUpload = async (req, res) => {
  // const filePath = `C:\\Users\\Administrator\\Desktop\\TK\\문서\\test.xlsx`;
  try {
    const { filePath } = req.body;
    const workbook = new ExcelJS.Workbook();
    try {
      await workbook.xlsx.readFile(filePath);
    } catch (ee) {
      res.status(201).send("No excel Error");
    }

    // 첫 번째 시트 가져오기
    const worksheet = workbook.getWorksheet(1);

    const PAPER_SID = [];
    const PAPER_CATES = [];
    const PAPER_NMS = [];
    const PAPER_WEIGHTS = [];
    const PAPER_QTYS = [];
    const PAPER_AMTS = [];
    const PRIORITYS = [];
    const QRYS = [];

    // 각 행을 반복하며 데이터 읽기

    const index_qry = `
  select count(1) as CNT from TB_PAPER
  `;
    const key = generateKey();
    let index = parseInt((await getConnection(index_qry)).row[0].CNT) + 1;

    //   const priority_qry = `
    //   select
    //   case
    //     when MAX(PAPER_PRIORITY) is null then 0
    //     else MAX(PAPER_PRIORITY)
    //   end as MAX_PRIORITY
    // from
    //   TB_PAPER
    // where
    //   PAPER_CATE = '${CATE}'
    // `;
    // let priority =
    //   parseInt((await getConnection(priority_qry)).row[0].MAX_PRIORITY) + 1;
    let priority = 1;

    worksheet.eachRow(async (row, rowNumber) => {
      // 용지 이름
      if (rowNumber >= 3 && rowNumber % 2 !== 0) {
        let CATE = "";
        let NM = "";
        let WEIGHT = "";
        let QTY = [];

        CATE = row.getCell(1).value;
        NM = row.getCell(2).value;
        WEIGHT = row.getCell(3).value;

        row.eachCell((cell, colNumber) => {
          if (colNumber >= 5) {
            QTY.push(cell.value);
          }
        });

        console.log(index, priority);

        if (CATE != "" && NM != "" && WEIGHT != "" && QTY != "") {
          PAPER_SID.push(key + index);
          PAPER_CATES.push(CATE);
          PAPER_NMS.push(NM);
          PAPER_WEIGHTS.push(WEIGHT);
          PAPER_QTYS.push(QTY);
          PRIORITYS.push(priority);
          index++;
          priority++;
        }
      }

      if (rowNumber >= 3 && rowNumber % 2 === 0) {
        let AMT = [];
        row.eachCell((cell, colNumber) => {
          if (colNumber >= 5) {
            AMT.push(cell.value);
          }
        });
        PAPER_AMTS.push(AMT);
      }
    });

    const qry = `
INSERT INTO tb_paper
(
    PAPER_SID, 
    PAPER_CATE, 
    PAPER_NM, 
    PAPER_WEIGHT, 
    PAPER_QTY, 
    PAPER_AMT,
    PAPER_PRIORITY,
    PAPER_REGDATE
  )
VALUES
(
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    now()
)
`;

    for (let i = 0; i < PAPER_SID.length; i++) {
      const res_qry = await getConnection(qry, [
        PAPER_SID[i],
        PAPER_CATES[i],
        PAPER_NMS[i],
        PAPER_WEIGHTS[i],
        PAPER_QTYS[i].toString(),
        PAPER_AMTS[i].toString(),
        PRIORITYS[i],
      ]);

      if (res_qry.state === false) return res.status(201).send("DB Error.");
    }

    res.status(200).send("OK");
  } catch (e) {
    res.status(201).send("DB Error.");
    console.log(e);
  }
};
