import type { ApiResponse } from '../type/apiType';
import type { InsuranceDetailResponse, InsurancesListResponse } from '../type/responseType';
import api from './axios.ts';

interface GenerationRequestProps {
  companyId: string;
  joinDate: string;
}

export const getInsuranceList = async () => {
  const res = await api.get<ApiResponse<InsurancesListResponse>>('/insurance/list');
  return res.data;
};

// 세대 도출 API
export const determineGeneration = async ({ companyId, joinDate }: GenerationRequestProps) => {
  const data = await api.post<ApiResponse>('/insurance/generation', { companyId: companyId, joinDate: joinDate });
  console.log(data);
};

// 보험 상세보기 API
export const getInsuranceDetail = async (id: number) => {
  const data = await api.get<ApiResponse<InsuranceDetailResponse>>(`/insurance/${id}`);
  return data.data;
};

export const deleteInsurance = async (id: number) => {
  const data = await api.delete(`/insurance/${id}`);
  return data.data;
};
