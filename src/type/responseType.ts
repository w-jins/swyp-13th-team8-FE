export interface LoginResponse {
  accessToken: string;
  isNewUser: boolean;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfoResponse {
  userId: number;
  name: string;
  email: string;
  profileImageUrl: string;
}

export interface HistoryResponse {
  analysisHistoryId: number;
  companyName: string;
  productName: string;
  contractType: string;
  generation: string;
  coverageStructure: string;
  cautionPoint: string;
  isFavorite: boolean;
  createdAt: Date;
}
export interface InsurancesResponse {
  userInsuranceId: number;
  companyName: string;
  productName: string;
  generation: number;
  joinDate: string;
}

export interface InsuranceDetailResponse {
  userInsuranceId: number;
  companyName: string;
  productName: string;
  generation: number;
  joinDate: string;
  contractType: string;
  coverageStructure: string;
  cautionPoint: string;
  coreSummary: string[] | null;
}

export interface InsurancesListResponse {
  insurances: DeatilResponse[];
}

export interface DeatilResponse {
  userInsuranceId: number;
  companyName: string;
  productName: string;
  generation: number;
  joinDate: string;
  contractType: string;
  coverageStructure: string;
  cautionPoint: string;
}

export interface CalculatorResponse {
  isCovered: string;
  refundAmount: number;
  deductibleAmount: number;
  basis: string;
  deductibleBasis: string;
  disclaimer: string;
  treatmentInfos: string[];
  totalMedicalCost: number;
  productName: string;
  companyName: string;
  insuranceInfos: string[];
  joinDate: string;
  deductibleRate: number;
  refundRate: number;
  ediCode?: string;
  fixedDeductibleAmount: number;
  fixedDeductibleRate: number;
}
