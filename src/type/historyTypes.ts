export type HistoryTab = 'analysis' | 'calculator';

export interface HistoryLabel {
  text: string;
  variant: 'contract' | 'generation' | 'coverage' | 'caution' | 'unknown' | 'danger';
}

export interface AnalysisHistoryItem {
  analysisHistoryId: number;
  companyName: string;
  productName: string;
  contractType: string;
  generation: string;
  coverageStructure: string;
  cautionPoint: string;
  isFavorite: boolean;
  createdAt: string;
}

export interface CalculatorHistoryItem {
  calculationHistoryId: string;
  isSaved: boolean;
  calculatedDate: string;
  ediCode?: string;
  medicalCost: number;
  refundAmount: number;
  basis: string[];
  insuranceId: string;
  productName?: string;
  companyName?: string;
  generation?: string;
  joinDate?: string;
}

export interface HistoryResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
}
