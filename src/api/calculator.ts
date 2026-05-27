import type { PurposeTypeValue, TreatmentCategoryValue, VisitTypeValue } from '../constants/insurance';
import type { ApiResponse } from '../type/apiType';
import type { CalculatorResponse } from '../type/responseType';
import api from './axios';

export interface calculateProps {
  insuranceId: string | null;
  medicalCost: number;
  visitType: VisitTypeValue | null;
  treatmentCategory: TreatmentCategoryValue | null;
  purposeType: PurposeTypeValue | null;
  ediCode?: string;
}

export const calculate = async (request: calculateProps) => {
  const data = await api.post<ApiResponse<CalculatorResponse>>('/calculations', request);
  return data.data;
};
