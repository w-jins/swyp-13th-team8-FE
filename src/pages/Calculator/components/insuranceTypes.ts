// ─────────────────────────────────────────────────────────────────────────────
// 공통 타입 — 이 파일을 단일 소스로 사용하세요.
// (예: import type { Insurance, CalculateRequest, CalculateResponse } from '@/type/insuranceTypes')
// ─────────────────────────────────────────────────────────────────────────────

/** GET /insurance/list 응답 내 개별 보험 객체 */
export interface Insurance {
  userInsuranceId: number; // 보험 등록 건의 고유 번호
  companyName: string; // 보험사명          예: "삼성화재"
  productName: string; // 상품명            예: "무배당 삼성화재 다이렉트 실손의료비보험(2601.6)"
  generation: number; // 보험 세대          예: 4
  joinDate: string; // 가입 연월 YYYY-MM  예: "2025-04"
  contractType?: string; // 계약 유형 라벨     예: "개인실손"   — Nullable
  coverageStructure?: string; // 보장 구조 라벨     예: "3대비급여"  — Nullable
  cautionPoint?: string; // 주의 포인트 라벨   예: "재가입형"   — Nullable
}

/** POST /calculator Request body */
export interface CalculateRequest {
  insuranceId: string; // 계산할 보험 ID (string)
  mediaCost: number; // 의료비 금액 (원, 양수)
  selfPaymentNumber: number; // 자기부담금 횟수 (양의 정수)
}

/** POST /calculator Response body */
export interface CalculateResponse {
  isCovered: boolean; // 보장 여부
  refundAmount: number; // 환급 예상액 (원)
  selfPayAmount: number; // 자기부담금 총액 (원)
  basis: string; // 계산 근거 요약
  disclaimer?: string; // 면책 안내 — Nullable
}
