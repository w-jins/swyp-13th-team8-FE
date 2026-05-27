import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import CContents from '../../../components/common/CContents';
import CStepBar from '../../../components/common/CStepBar';
import CButton from '../../../components/common/CButton';
import { useCalcStore } from '../../../store/useCalcStore';
import { calculate, type calculateProps } from '../../../api/calculator';
import type { CalculatorResponse } from '../../../type/responseType';
import { useModalStore } from '../../../store/useModalStore';

const RefundResult = () => {
  const navigate = useNavigate();
  const steps = ['보험 불러오기', '진료 정보 입력', '계산 결과'];
  const currentStep = 2;
  const { calcForm, insuranceInfo, resetStore } = useCalcStore();
  const { openModal, closeModal } = useModalStore();
  const [request] = useState<calculateProps>({
    ...calcForm,
    insuranceId: insuranceInfo.id ? String(insuranceInfo.id) : null,
  });
  const [refundData, setRefundData] = useState<CalculatorResponse | null>(null);
  // 아코디언 상태 관리 (기본값: false - 접힘)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // 1. 컴포넌트 상단에 계산 로직 추가 (return 문 바로 위)
  const percentage = refundData?.refundRate ?? 0;
  const radius = 112; // 원의 반지름
  const circumference = 2 * Math.PI * radius; // 원의 둘레 길이 (~703.7)
  // 목표 퍼센트의 '절반'만큼만 각각 이동하도록 계산
  const halfFill = (circumference * (percentage / 100)) / 2;
  const offset = circumference - halfFill;

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      openModal('LOADING');
    }, 300);
    const fetchData = async () => {
      try {
        const res = await calculate(request);

        clearTimeout(loadingTimer);
        closeModal();

        setRefundData(res.data);
      } catch (e: any) {
        clearTimeout(loadingTimer);
        closeModal();
        if (e.status === 404) {
          alert('존재하지 않는 EDI 코드입니다!');
        } else if (e.status === 400) {
          alert('잘못된 입력입니다 !');
        }
        navigate(-1);
      } finally {
        closeModal();
      }
    };
    fetchData();
    return () => {
      clearTimeout(loadingTimer);
      closeModal();
    };
  }, []);
  return (
    <>
      <div className="pb-20">
        <CContents title="환급금 계산기">
          <div className="max-w-2xl mx-auto mb-12">
            <CStepBar steps={steps} currentStep={currentStep} />
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[24px] font-bold mb-4">환급금 계산이 완료되었습니다!</h2>
            <div className="w-16 h-16 bg-gray-200 mx-auto mb-10 rounded-lg flex items-center justify-center text-2xl">✨</div>

            <div className="flex items-center justify-start gap-2 mb-4">
              <span className="font-bold text-lg text-gray-800">환급금 계산 결과</span>
              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded font-bold">청구 권장 가능</span>
            </div>

            <div className="bg-gray-50 text-gray-400 text-[11px] p-4 rounded-xl text-left mb-8 leading-relaxed">
              본 계산 결과는 입력하신 정보를 바탕으로 AI가 산출한 참고용 결과입니다.
              <br />
              실제 금액은 가입자 개인의 조건에 따라 차이가 발생하거나 지급이 제한될 수 있습니다. 정확한 금액은 보험사를 통해 확인하시기 바랍니다.
            </div>

            {/* --- 계산 기준 요약 (아코디언 섹션) --- */}
            <section className="border border-gray-100 rounded-2xl text-left mb-12 shadow-sm overflow-hidden bg-white">
              {/* 클릭 가능한 헤더 */}
              <button
                className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsSummaryOpen(!isSummaryOpen)}
              >
                <h3 className="font-bold text-gray-800">계산 기준 요약</h3>
                {/* 이미지 image_6580a6.png의 화살표 구현 */}
                <span className={`text-gray-400 transition-transform duration-300 ${isSummaryOpen ? 'rotate-180' : 'rotate-0'}`}>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              {/* 펼쳐지는 내용: isSummaryOpen이 true일 때만 렌더링 */}
              {isSummaryOpen && (
                <div className="px-6 pb-6 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-8 pt-6 border-t border-gray-50">
                    {/* 적용 보험 */}
                    <div>
                      <p className="text-[11px] text-gray-400 mb-3">적용 보험</p>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] text-white font-bold leading-tight px-1 text-center">
                          {refundData?.companyName}
                        </div>
                        <div>
                          <p className="text-sm font-bold leading-tight text-gray-800">{refundData?.productName}</p>
                          <p className="text-[10px] text-gray-400 mt-1">
                            {refundData?.companyName} · {refundData?.joinDate} 가입
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {['개인실손', '4세대', '3대비급여', '갱신형'].map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-1 bg-gray-100 text-gray-500 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 진료 정보 */}
                    <div>
                      <p className="text-[11px] text-gray-400 mb-3">진료 정보</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {refundData?.treatmentInfos.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] px-2 py-1 rounded font-medium ${tag === '비급여' ? 'bg-pink-50 text-pink-500' : 'bg-purple-50 text-purple-500'}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-400 leading-tight">ℹ️ {refundData?.basis}</p>
                    </div>
                  </div>

                  {/* 하단 요약 금액 정보 */}
                  <div className="grid grid-cols-2 mt-6 pt-6 border-t border-gray-50">
                    <div>
                      <p className="text-[11px] text-gray-400 mb-1">총 진료비</p>
                      <p className="font-bold text-gray-800">{refundData?.totalMedicalCost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 mb-1">요양급여수가코드(EDI)</p>
                      <p className="font-bold text-gray-800">{refundData?.ediCode || '-'}</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* --- 메인 결과 (차트 및 상세 계산) --- */}
            <div className="flex items-center justify-between gap-10 mb-16 px-4">
              <div className="relative flex items-center justify-center w-64 h-64">
                {/* 🎯 상단 검은색 배지 (스크린샷처럼 원 테두리에 걸치게 -translate-y-1/2 적용) */}
                <div className="absolute top-0 z-20 px-4 py-1.5 text-body-s-m font-bold text-white bg-gray-scale-100 rounded-full -translate-y-1/2 shadow-md">
                  환급 대상 금액 {percentage}%
                </div>

                {/* ⚙️ SVG 애니메이션 영역 */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* 1) 옅은 파란색 배경 원 (전체) */}
                  <circle
                    cx="128"
                    cy="128"
                    r={radius}
                    stroke="var(--color-primary-5)" // 시스템 컬러 적용
                    strokeWidth="16"
                    fill="transparent"
                  />

                  {/* 2) 🔵 왼쪽으로 차오르는 원 (시작점: 6시) */}
                  <circle
                    cx="128"
                    cy="128"
                    r={radius}
                    stroke="var(--color-primary-50)"
                    strokeWidth="16"
                    fill="transparent"
                    strokeLinecap="round" // 끝을 둥글게 처리
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                      transform: 'rotate(90deg)', // 6시 방향에서 시작하도록 90도 회전
                      transformOrigin: '50% 50%',
                      transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)', // 부드러운 애니메이션
                    }}
                    // 0%일 때 동그란 점이 남는 것을 방지
                    opacity={percentage > 0 ? 1 : 0}
                  />

                  {/* 3) 🔵 오른쪽으로 차오르는 원 (시작점: 6시, 좌우 반전) */}
                  <circle
                    cx="128"
                    cy="128"
                    r={radius}
                    stroke="var(--color-primary-50)"
                    strokeWidth="16"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                      // 90도 회전 후 X축을 뒤집어서(scaleX) 반대 방향으로 그리게 만듦!
                      transform: 'scaleX(-1) rotate(90deg)',
                      transformOrigin: '50% 50%',
                      transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    opacity={percentage > 0 ? 1 : 0}
                  />
                </svg>

                {/* 텍스트 영역 (스크린샷 비율에 맞춰 텍스트 크기 조정) */}
                <div className="z-10 flex flex-col items-center mt-2 text-center">
                  <p className="mb-1 font-medium text-body-m-r text-gray-scale-50">예상 환급금</p>
                  {/* 금액 폰트는 엄청 크고 두껍게! */}
                  <p className="text-[32px] font-bold tracking-tight text-primary-50 leading-none mb-2">
                    {(refundData?.refundAmount ?? 0).toLocaleString()}
                  </p>
                  <p className="font-medium text-body-s-r text-gray-scale-40">총 진료비 {(refundData?.totalMedicalCost ?? 0).toLocaleString()}원</p>
                </div>
              </div>

              {/* 오른쪽: 계산 상세 로직 */}
              <div className="flex-1 text-left">
                <h4 className="text-blue-600 font-bold text-sm mb-5">어떻게 계산 되었나요?</h4>
                <div className="space-y-4 border-b border-gray-100 pb-5 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 text-[11px]">총 진료비</span>
                    <span className="font-bold text-gray-800">{refundData?.totalMedicalCost.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-1 font-medium">
                      <span className="bg-gray-400 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded">－</span> 적용 제외
                      금액
                    </span>
                    <span className="font-bold text-gray-800">
                      ({refundData?.fixedDeductibleRate}%) {refundData?.fixedDeductibleAmount.toLocaleString()}원
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl mb-6 flex justify-between items-center">
                  <span className="text-blue-600 text-[13px] font-bold">공제 기준</span>
                  <span className="text-right text-blue-600 text-[12px] font-bold leading-tight">{refundData?.deductibleBasis}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">환급 대상 금액</span>
                    <span className="font-bold text-gray-800 text-xl">{refundData?.refundAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-400">자기부담금</span>
                    <span className="text-blue-400">
                      ({refundData?.deductibleRate}%) {refundData?.deductibleAmount.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 액션 버튼 */}
            <div className="flex gap-3">
              <CButton
                variant="secondary"
                className="flex-1 py-4 border-gray-200 text-gray-600 font-bold"
                onClick={() => {
                  resetStore();
                  navigate('/calculator');
                }}
              >
                ↺ 다른 조건으로 계산하기
              </CButton>
              <CButton onClick={() => navigate('/mypage')} variant="primary" className="flex-[1.5] py-4 bg-primary-50 text-white font-bold">
                마이페이지로 이동
              </CButton>
            </div>
          </div>
        </CContents>
      </div>
    </>
  );
};

export default RefundResult;
