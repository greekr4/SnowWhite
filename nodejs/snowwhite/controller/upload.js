const { v1: uuidv1 } = require("uuid");
const fs = require("fs");

exports.upload = async (req, res) => {
  req.pipe(req.busboy);
  req.busboy.on("file", (fieldname, file, filename) => {
    console.log(`Uploading: ${filename}`);
    console.log(file);
    console.log(filename);

    // console.log(filename.filename.split(".")[1]);

    const file_name = uuidv1();
    const file_extension = `.${filename.filename.split(".")[1]}`;

    // 파일을 저장할 경로 설정
    const saveTo =
      "C:\\Users\\Administrator\\Desktop\\TK\\project\\react\\public\\upload\\" +
      file_name +
      file_extension;

    // 파일을 스트림으로 읽어서 저장
    file.pipe(fs.createWriteStream(saveTo));

    file.on("end", () => {
      console.log(`File ${filename} uploaded successfully`);
      res.send(`/upload/${file_name + file_extension}`);
    });
  });
};
