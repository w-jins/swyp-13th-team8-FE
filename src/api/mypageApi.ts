import api from './axios';

// 약관 분석 히스토리 조회 GET /history/analysis
export const getAnalysisHistory = async (page: number = 1) => {
  const response = await api.get('/history/analysis', { params: { page } });
  return response.data.data;
};

// 환급금 계산 히스토리 조회 GET /calculations
export const getCalculatorHistory = async (page: number = 1, size: number = 5) => {
  const response = await api.get('/calculations', { params: { page, size } });
  return response.data.data;
};

// 약관 분석 히스토리 즐겨찾기 토글 PATCH /history/analysis/:id
export const toggleSaveAnalysisHistory = async (id: number) => {
  const response = await api.patch(`/history/analysis/${id}`);
  return response.data;
};

// 약관 분석 히스토리 삭제 DELETE /history/analysis/:id
export const deleteAnalysisHistory = async (id: number) => {
  const response = await api.delete(`/history/analysis/${id}`);
  return response.data;
};

// 저장된 약관 분석 히스토리 조회 GET /history/analysis/favorite
export const getFavoriteAnalysisHistory = async () => {
  const response = await api.get('/history/analysis/favorite');
  return response.data.data;
};

// 저장된 환급금 계산 히스토리 조회 GET /calculations/save
export const getFavoriteCalculatorHistory = async (page: number = 0, size: number = 5) => {
  const response = await api.get('/calculations/favorites', { params: { page, size } });
  return response.data.data;
};

// 환급금 계산 히스토리 저장 토글 PATCH /calculations/:calculationHistoryId/save
export const toggleFavoriteCalculatorHistory = async (calculationHistoryId: string) => {
  const response = await api.patch(`/calculations/${calculationHistoryId}/favorite`);
  return response.data;
};

// 환급금 계산 히스토리 삭제 DELETE /calculations/:calculationHistoryId
export const deleteCalculatorHistory = async (calculationHistoryId: string) => {
  const response = await api.delete(`/calculations/${calculationHistoryId}`);
  return response.data;
};
