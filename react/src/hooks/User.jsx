import axios from "axios";
import { Cookies } from "react-cookie";
import { QueryClient, useQuery, useQueryClient } from "react-query";

const getUserData = async (token) => {
  const response = await axios.post("/api/userinfo");
  return response.data;
};

const useUserinfoQuery = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const queryClient = new QueryClient();

  const {
    data: userInfo,
    isError,
    refetch,
  } = useQuery("userinfo", () => getUserData(token), {
    refetchOnWindowFocus: false,
    enabled: !!token,
    retry: 0,
    onError: async (error) => {},
  });

  // return useQuery("userinfo", () => getUserData(token), {
  //   refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
  //   enabled: !!token, // token이 존재할 때만 해당 쿼리를 실행
  //   retry: 0,
  //   onError: (error) => {
  //     if (error.response.status === 419) {
  //       console.log("토큰재발급");
  //       const accessToken = cookies.get("token");
  //       const refreshToken = cookies.get("refreshToken");
  //       const headers = {
  //         "Content-Type": "application/json",
  //         Authorization: accessToken,
  //         refresh: refreshToken,
  //       };
  //       axios
  //         .post(
  //           "/api/refresh",
  //           {},
  //           {
  //             headers: headers,
  //           }
  //         )
  //         .then((res) => {
  //           cookies.set("token", res.data.data.accessToken);
  //           cookies.set("refreshToken", res.data.data.refreshToken);
  //           // 데이터를 업데이트합니다.
  //           // refetch();
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   },
  // });
};

export default useUserinfoQuery;
