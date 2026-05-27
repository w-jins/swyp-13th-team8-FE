import { create } from 'zustand';
// 1. 가장 안쪽의 '보장 상세' 타입
export interface CoverageDetails {
  basicCoverages: string[];
  specialCoverages: string[];
  exclusions: string[];
}

// 2. aiSummary 안의 '메타데이터' 타입
export interface AiSummaryMetadata {
  companyName: string;
  productName: string;
  contractType: string;
  generation: string;
  coverageStructure: string;
  cautionPoint: string;
}

// 3. aiSummary 안의 '본문(content)' 타입
export interface AiSummaryContent {
  coreSummary: string[];
  coverageDetails: CoverageDetails;
  coverageScope: string[];
  limitations: string[];
  renewalTerms: string[];
  claimMethod: string[];
  cancellationAndRefund: string[];
}

// 4. aiSummary 전체 타입
export interface AiSummary {
  metadata: AiSummaryMetadata;
  content: AiSummaryContent;
}

// 5. 백엔드에서 내려주는 최상위 응답 객체 타입
export interface AnalysisResponse {
  analysisHistoryId: number;
  originalFileName: string;
  pdfFileUrl: string;
  companyName: string;
  productName: string;
  contractType: string;
  generation: string;
  coverageStructure: string;
  cautionPoint: string;
  aiSummary: AiSummary;
}
interface AnalysisStore {
  // 상태 (State)
  analysisData: AnalysisResponse | null;

  // 액션 (Actions)
  setAnalysisData: (data: AnalysisResponse) => void;
  clearAnalysisData: () => void; // 모달을 닫거나 뒤로 갈 때 데이터를 비워주는 센스!
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  analysisData: null,

  // 백엔드에서 데이터를 받아오면 이 함수를 호출해서 저장합니다.
  setAnalysisData: (data) => set({ analysisData: data }),

  // 필요할 때 데이터를 초기화하는 함수
  clearAnalysisData: () => set({ analysisData: null }),
}));
