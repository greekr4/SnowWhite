import React, { useState } from "react";

export const TestPage = () => {
  const [mainImg, setMainImg] = useState("");
  const [file, setFile] = useState(null);

  const setPreviewImg = (event) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      setMainImg(event.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  const handleFileChange = (event) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      setMainImg(event.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);

    setFile(event.target.files[0]);
    setMainImg(URL.createObjectURL(event.target.files[0]));
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // 서버로 파일 업로드
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("파일 업로드 성공!");
      } else {
        console.error("파일 업로드 실패!");
      }
    } catch (error) {
      console.error("파일 업로드 중 에러 발생:", error);
    }
  };

  return (
    <>
      <input
        type="file"
        id="image"
        accept="image/*"
        style={{ border: "solid 1px lightgray", borderRadius: "5px" }}
        onChange={handleFileChange}
      />

      {/* 이미지 미리보기 */}
      <img alt="메인사진" src={mainImg} style={{ maxWidth: "100px" }}></img>
      <button onClick={handleUpload}>업로드</button>
    </>
  );
};
