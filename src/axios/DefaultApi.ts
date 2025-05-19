import axios from 'axios';

// 공통 axios 인스턴스 생성
export const axiosDefault = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// 에러 처리 함수
export const handleError = (error: any, message = "요청 처리에 실패했습니다.") => {
    console.error('API Error:', error);
    if (error.response) {
        // 서버가 응답을 반환한 경우
        console.log(`${message} (${error.response.status}: ${error.response.data.message || error.response.statusText})`);
    } else if (error.request) {
        // 요청이 전송되었으나 응답을 받지 못한 경우
        console.log(`${message} (서버에 연결할 수 없습니다.)`);
    } else {
        // 요청 설정 중에 오류가 발생한 경우
        console.log(message);
    }
    // throw error;
};
