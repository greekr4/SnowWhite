const { v1: uuidv1 } = require("uuid");
const fs = require("fs");
const os = require("os");
const path = require("path");

exports.upload = async (req, res) => {
  const { type, userid } = req.body;
  const file = req.file;

  const fileExtension = `.${file.originalname.split(".").pop()}`;
  const fileName = `${uuidv1()}${fileExtension}`;

  let directoryPath = "";

  if (os.type().indexOf("Windows") != -1) {
    directoryPath = `C:\\Users\\Administrator\\Desktop\\TK\\project\\react\\public\\upload\\file\\`;
  } else {
    directoryPath = `/home/snowwhite/upload/file/`;
  }

  const saveTo = `${directoryPath}${fileName}`;
  fs.stat(directoryPath, (err, stats) => {
    if (err) {
      if (err.code === "ENOENT") {
        //폴더 생성
        fs.mkdir(directoryPath, { recursive: true }, (err) => {
          if (err) {
            console.error("디렉토리를 생성하는 중 에러가 발생했습니다.", err);
            return;
          }
          console.log("디렉토리가 성공적으로 생성되었습니다.");
          fs.renameSync(file.path, saveTo);
          console.log("파일 생성 완료", saveTo);
        });
      } else {
        console.error("디렉토리 정보를 확인하는 중 에러가 발생했습니다.", err);
      }
    }
    if (stats.isDirectory()) {
      console.log("디렉토리가 존재합니다.");
      fs.renameSync(file.path, saveTo);
      console.log("파일 생성 완료", saveTo);
    } else {
      console.log("파일이 존재합니다.");
    }
  });

  // 파일을 저장할 경로 설정
  // 파일 이동

  console.log(`File ${fileName} uploaded successfully`);
  res.send(`/upload/file/${fileName}`);

  console.log(type, file);
};

exports.upload_design = async (req, res) => {
  const { type, userid } = req.body;
  const file = req.file;

  const fileExtension = `.${file.originalname.split(".").pop()}`;
  const fileName = `${uuidv1()}${fileExtension}`;

  let directoryPath = "";

  if (os.type().indexOf("Windows") != -1) {
    directoryPath = `C:\\Users\\Administrator\\Desktop\\TK\\project\\react\\public\\upload\\design\\${userid}\\`;
  } else {
    directoryPath = `/home/snowwhite/upload/design/${userid}/`;
  }

  const saveTo = `${directoryPath}${fileName}`;
  fs.stat(directoryPath, (err, stats) => {
    if (err) {
      if (err.code === "ENOENT") {
        //폴더 생성
        fs.mkdir(directoryPath, { recursive: true }, (err) => {
          if (err) {
            console.error("디렉토리를 생성하는 중 에러가 발생했습니다.", err);
            return;
          }
          console.log("디렉토리가 성공적으로 생성되었습니다.");
          fs.renameSync(file.path, saveTo);
          console.log("파일 생성 완료", saveTo);
        });
      } else {
        console.error("디렉토리 정보를 확인하는 중 에러가 발생했습니다.", err);
      }
    }
    if (stats.isDirectory()) {
      console.log("디렉토리가 존재합니다.");
      fs.renameSync(file.path, saveTo);
      console.log("파일 생성 완료", saveTo);
    } else {
      console.log("파일이 존재합니다.");
    }
  });

  // 파일을 저장할 경로 설정
  // 파일 이동

  console.log(`File ${fileName} uploaded successfully`);
  res.send(`/upload/design/${userid}/${fileName}`);

  console.log(type, file);
};

exports.upload_global = async (req, res) => {
  const { type, userid, dir, fulldir } = req.body;
  const file = req.file;

  const fileExtension = `.${file.originalname.split(".").pop()}`;
  const fileName = `${uuidv1()}${fileExtension}`;

  let directoryPath = "";

  if (os.type().indexOf("Windows") != -1) {
    directoryPath = `C:\\Users\\Administrator\\Desktop\\TK\\project\\react\\public\\upload\\${dir}\\${userid}\\`;
  } else {
    directoryPath = `/home/snowwhite/upload/${dir}/${userid}/`;
  }

  const saveTo = `${directoryPath}${fileName}`;
  fs.stat(directoryPath, (err, stats) => {
    if (err) {
      if (err.code === "ENOENT") {
        //폴더 생성
        fs.mkdir(directoryPath, { recursive: true }, (err) => {
          if (err) {
            console.error("디렉토리를 생성하는 중 에러가 발생했습니다.", err);
            return;
          }
          console.log("디렉토리가 성공적으로 생성되었습니다.");
          fs.renameSync(file.path, saveTo);
          console.log("파일 생성 완료", saveTo);
        });
      } else {
        console.error("디렉토리 정보를 확인하는 중 에러가 발생했습니다.", err);
      }
    }
    if (stats.isDirectory()) {
      console.log("디렉토리가 존재합니다.");
      fs.renameSync(file.path, saveTo);
      console.log("파일 생성 완료", saveTo);
    } else {
      console.log("파일이 존재합니다.");
    }
  });

  // 파일을 저장할 경로 설정
  // 파일 이동

  console.log(`File ${fileName} uploaded successfully`);

  if (fulldir) {
    res.send(`${saveTo}`);
  } else {
    res.send(`/upload/${dir}/${userid}/${fileName}`);
  }

  console.log(type, file);
};
