import axios from "axios";
import { useQuery } from "react-query";

const getUserData = async (token) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,

    // 다른 필요한 헤더들도 추가할 수 있습니다.
  };
  const response = await axios.post(
    "http://localhost:3030/userinfo",
    {},
    {
      headers: headers,
    }
  );
  return response.data;
};

const useUserinfoQuery = (token) => {
  return useQuery("userinfo", () => getUserData(token), {
    // refetchOnWindowFocus: true, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    enabled: !!token, // token이 존재할 때만 해당 쿼리를 실행
    // force: true, // 강제로 쿼리 다시 실행
    // refetchOnMount: false, // 자동으로 처음 마운트 시에 쿼리 다시 실행하지 않음
  });
};

export default useUserinfoQuery;
