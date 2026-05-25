/**
 * 홈 기준 계산기 데이터
 * value 는 수정대상
 */

export const VISIT_TYPE = [
  { label: '외래', value: 'OUTPATIENT' },
  { label: '입원', value: 'INPATIENT' },
  { label: '약재', value: 'MEDICATION' },
] as const;

export const PURPOSE_TYPE = [
  { label: '치료 목적', value: 'TREATMENT' },
  { label: '단순 검사', value: 'EXAMINATION' },
  { label: '잘 모름', value: 'UNKNOWN' },
] as const;

export const PAY_TYPE = [
  { label: '급여', value: 'PAY' },
  { label: '비급여', value: 'NON_PAY' },
  { label: '잘 모름', value: 'UNKNOWN' },
];

export const HOSPITAL_TYPE = [
  { label: '의원', value: 'CLINIC' },
  { label: '종합병원', value: 'GENERAL_HOSPITAL' },
  { label: '상급종합병원', value: 'TERTIARY_HOSPITAL' },
  { label: '병원 유형 모름', value: 'UNKNOWN' },
];

export const TREATMENT_CATEGORY = [
  { label: 'MRI', value: 'MRI' },
  { label: 'CT', value: 'CT' },
  { label: '주사', value: 'INJECTION' },
  { label: '체외충격파', value: 'SHOCKWAVE_THERAPY' },
  { label: '도수치료', value: 'CHIROPRACTIC' },
  { label: '물리치료', value: 'PHYSICAL_THERAPY' },
  { label: '일반진료', value: 'GENERAL' },
] as const;

// 사용할 타입들 추출 (export 필수)
export type VisitTypeValue = (typeof VISIT_TYPE)[number]['value'];
export type PurposeTypeValue = (typeof PURPOSE_TYPE)[number]['value'];
export type TreatmentCategoryValue = (typeof TREATMENT_CATEGORY)[number]['value'];
export type HospitalTypeValue = (typeof HOSPITAL_TYPE)[number]['value'];
export type PayTypeValue = (typeof PAY_TYPE)[number]['value'];
