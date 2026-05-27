import type { TermsAgreeRequest } from '../pages/login/Terms';
import type { ApiResponse } from '../type/apiType';
import type { LoginResponse, RefreshTokenResponse, UserInfoResponse } from '../type/responseType';
import api, { publicApi } from './axios';

// 로그인 API
export const loginAPI = async (accessToken: string) => {
  const data = await publicApi.post<ApiResponse<LoginResponse>>('/auth/login', { kakaoToken: accessToken });
  return data.data;
};
// 유저 정보 API
export const userInfoAPI = async () => {
  const data = await api.get<ApiResponse<UserInfoResponse>>('/user/me');
  return data.data;
};
// 유저 정보 업데이트 API
export const updateUserInfoAPI = async (name: string) => {
  const data = await api.patch<ApiResponse>('/user/me', { name: name });
  return data.data;
};
// 리프레쉬 재발급 토큰
export const refreshTokenAPI = async (refreshToken: string | null) => {
  const data = await publicApi.post<ApiResponse<RefreshTokenResponse>>('/auth/reissue', { refreshToken: refreshToken });
  return data.data;
};
// 약관 조회 API
export const termsAPI = async (requestData: TermsAgreeRequest) => {
  const data = await api.post<ApiResponse>('/auth/terms', requestData);
  return data.data;
};

// 로그아웃 API
export const logoutAPI = async (refreshToken: string | null) => {
  const data = await api.post<ApiResponse>('/auth/logout', { refreshToken: refreshToken });
  return data.data;
};
// 회원 탈퇴 API
export const withdrawAPI = async () => {
  const data = await api.delete<ApiResponse>('/auth/withdraw');
  return data.data;
};
