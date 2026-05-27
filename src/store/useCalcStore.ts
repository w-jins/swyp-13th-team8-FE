import { create } from 'zustand';
import type { HospitalTypeValue, PayTypeValue, PurposeTypeValue, TreatmentCategoryValue, VisitTypeValue } from '../constants/insurance';

// 1. 상태 타입 정의 (깔끔하게 2개의 객체로 분리)
interface CalcStore {
  // 상태 (State)
  insuranceInfo: {
    id: number | null;
    companyName: string;
    productName: string;
  };
  calcForm: {
    // 진료비
    medicalCost: number;
    // 진료 유형
    visitType: VisitTypeValue | null;
    // 진료항목
    treatmentCategory: TreatmentCategoryValue | null;
    // 진료목적
    purposeType: PurposeTypeValue | null;
    // EDI 코드
    ediCode: string;
    //병원 유형
    hospitalType: HospitalTypeValue | null;
    // 급여 여부
    payType: PayTypeValue | null;
  };

  // 액션 (Actions)
  setInsuranceInfo: (info: Partial<CalcStore['insuranceInfo']>) => void;
  setCalcForm: (form: Partial<CalcStore['calcForm']>) => void;
  resetStore: () => void; // 💡 이전 질문에서 말씀하신 '홈 화면 벗어날 때 초기화'를 위한 함수!
}

// 2. 초기값 분리 (reset 할 때 재사용하기 위함)
const initialInsuranceInfo = { id: null, companyName: '', productName: '' };
const initialCalcForm = {
  medicalCost: 0,
  visitType: null,
  treatmentCategory: null,
  purposeType: null,
  ediCode: '',
  hospitalType: null,
  payType: null,
};

// 3. 스토어 생성
export const useCalcStore = create<CalcStore>((set) => ({
  insuranceInfo: initialInsuranceInfo,
  calcForm: initialCalcForm,

  // 기존 상태를 복사(...state)하고, 들어온 값만 덮어씌우는 방식 (가장 권장됨)
  setInsuranceInfo: (info) => set((state) => ({ insuranceInfo: { ...state.insuranceInfo, ...info } })),

  setCalcForm: (form) => set((state) => ({ calcForm: { ...state.calcForm, ...form } })),

  // 한 방에 모든 데이터 초기화!
  resetStore: () => set({ insuranceInfo: initialInsuranceInfo, calcForm: initialCalcForm }),
}));
