import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { refreshTokenAPI } from './authApi.ts';

const axiosConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

// 헤더에 토큰이 필요없는 api
export const publicApi = axios.create(axiosConfig);
// 토큰 필요한 api
const api = axios.create(axiosConfig);

let isRefreshing = false; // 현재 토큰 갱신 중인지 여부
let refreshSubscribers: ((token: string) => void)[] = []; // 갱신되는 동안 대기중인 요청들의 배열

// 대기 중인 요청들을 실행하는 함수
const onRefreshed = (accessToken: string) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
  refreshSubscribers = [];
};

// 대기열에 요청을 추가하는 함수
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 1. 이미 다른 요청이 토큰을 갱신 중이라면, 대기열(Promise)에 넣고 기다림
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }
      isRefreshing = true;

      try {
        const currentRefreshToken = useAuthStore.getState().refreshToken;

        const res = await refreshTokenAPI(currentRefreshToken);

        useAuthStore.getState().setRefreshToken(res.data.refreshToken);
        useAuthStore.getState().setAccessToken(res.data.accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;

        // 3. 갱신 성공 시, 대기 중이던 다른 요청들(Subscribers) 모두 재실행
        isRefreshing = false;
        onRefreshed(res.data.accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰마저 만료된 경우
        isRefreshing = false;
        refreshSubscribers = []; // 대기열 초기화

        useAuthStore.getState().clearToken();
        alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
        window.location.href = '/home'; // React Router의 navigate를 권장하지만 임시로 유지
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
