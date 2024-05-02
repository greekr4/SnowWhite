const ExcelJS = require("exceljs");
const { getConnection, Connection } = require("../utils/dbUtils");

// Excel 파일 경로
const filePath = `C:\\Users\\Administrator\\Desktop\\TK\\문서\\test.xlsx`;

// Excel 파일 읽기
async function readExcel() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  // 첫 번째 시트 가져오기
  const worksheet = workbook.getWorksheet(1);

  const PAPER_SID = [];
  const PAPER_NMS = [];
  const PAPER_WEIGHTS = [];
  const PAPER_QTYS = [];
  const PAPER_AMTS = [];
  const PRIORITYS = [];
  const QRYS = [];
  let index = 1;

  // 각 행을 반복하며 데이터 읽기
  worksheet.eachRow((row, rowNumber) => {
    // 용지 이름
    if (rowNumber >= 3 && rowNumber % 2 !== 0) {
      let NM = "";
      let WEIGHT = "";
      let QTY = [];

      NM = row.getCell(1).value;
      WEIGHT = row.getCell(2).value;

      row.eachCell((cell, colNumber) => {
        if (colNumber >= 4) {
          QTY.push(cell.value);
        }
      });

      console.log("용지이름", row.getCell(1).value);
      console.log("평량", row.getCell(2).value);
      console.log("수량", QTY);
      PAPER_SID.push(NM + WEIGHT + "g");
      PAPER_NMS.push(NM);
      PAPER_WEIGHTS.push(WEIGHT);
      PAPER_QTYS.push(QTY);
      PRIORITYS.push(index);
      index++;
    }

    if (rowNumber >= 3 && rowNumber % 2 === 0) {
      let AMT = [];
      row.eachCell((cell, colNumber) => {
        if (colNumber >= 4) {
          AMT.push(cell.value);
        }
      });
      console.log(rowNumber);
      console.log("가격", AMT);
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
    PAPER_PRIORITY
  )
VALUES
(
    ?,
    '명함',
    ?,
    ?,
    ?,
    ?,
    ?
)
`;

  for (let i = 0; i < PAPER_SID.length; i++) {
    getConnection(qry, [
      PAPER_SID[i],
      PAPER_NMS[i],
      PAPER_WEIGHTS[i],
      PAPER_QTYS[i].toString(),
      PAPER_AMTS[i].toString(),
      PRIORITYS[i],
    ]);
  }
}

// 함수 호출
readExcel().catch((error) => console.error(error));
