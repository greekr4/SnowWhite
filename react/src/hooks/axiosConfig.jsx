import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

axios.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 요청 설정을 처리할 수 있습니다.
    const copyConfig = { ...config };
    if (!config.headers) return config;
    const accessToken = cookies.get("token");

    if (accessToken && config.headers) {
      // access token을 header에 담아 요청
      copyConfig.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    // 요청 오류를 처리할 수 있습니다.
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // 응답 데이터를 처리할 수 있습니다.
    return response;
  },
  async (error) => {
    // 전역적으로 401 오류를 처리합니다.
    if (error.response.status === 419) {
      console.log("리프레시 토큰 요청");

      const accessToken = cookies.get("token");
      const refreshToken = cookies.get("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: accessToken,
        refresh: refreshToken,
      };

      try {
        const res = await axios.post("/api/refresh", {}, { headers: headers });
        if (res.status === 200) {
          cookies.set("token", res.data.data.accessToken);
          cookies.set("refreshToken", res.data.data.refreshToken);
          console.log("리프레시 토큰발급완료");
          window.location.replace("/");
        }
      } catch (error) {
        console.log(error);
        alert("토큰이 만료되었습니다.");
      }
    }

    // 응답 오류를 처리할 수 있습니다.
    return Promise.reject(error);
  }
);
