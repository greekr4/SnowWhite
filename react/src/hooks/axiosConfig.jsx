import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 요청 설정을 처리할 수 있습니다.
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
  (error) => {
    // 전역적으로 401 오류를 처리합니다.
    if (error.response.status === 419) {
      // 로그인 페이지로 리다이렉트하거나 로그인 모달을 표시하거나 필요한 대로 처리할 수 있습니다.
      console.log("인증되지 않았습니다. 로그인 페이지로 이동 중...");
    }

    // 응답 오류를 처리할 수 있습니다.
    return Promise.reject(error);
  }
);
