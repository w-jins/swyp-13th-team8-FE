import { useEffect, useRef, useState } from 'react';
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
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const percentage = refundData?.refundRate ?? 0;

  const mobileRadius = 120;
  const desktopRadius = 112;

  const mobileCircumference = 2 * Math.PI * mobileRadius;
  const desktopCircumference = 2 * Math.PI * desktopRadius;

  const mobileHalfFill = (mobileCircumference * (percentage / 100)) / 2;
  const mobileOffset = mobileCircumference - mobileHalfFill;

  const desktopHalfFill = (desktopCircumference * (percentage / 100)) / 2;
  const desktopOffset = desktopCircumference - desktopHalfFill;

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
    }

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
      {/* 💡 1차 방어: max-w-[100vw]로 브라우저 너비 절대 초과 금지 */}
      <div ref={topRef} className="pb-20 w-full max-w-[100vw] overflow-x-hidden box-border">
        <CContents title="환급금 계산기" className="w-full md:px-90 !px-0 md:!px-auto box-border">
          {/* 💡 상단 스텝바가 길어도 컨테이너를 찢지 못하도록 overflow-hidden 추가 */}
          <div className="w-full max-w-2xl mx-auto px-5 md:px-0 mb-8 md:mb-12 mt-5 box-border overflow-hidden">
            <CStepBar steps={steps} currentStep={currentStep} />
          </div>

          <div className="w-full max-w-3xl mx-auto text-center px-5 md:px-0 box-border">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-2 md:mb-4">
              <h2 className="text-xl md:text-[24px] font-bold md:mb-0">환급금 계산 결과</h2>
              <span className="bg-green-100 text-green-600 text-[10px] md:text-xs px-2 py-1 rounded font-bold">일부 보장 가능</span>
            </div>

            <div className="hidden md:block w-full bg-gray-50 text-gray-400 text-[11px] p-4 rounded-xl text-left mb-8 leading-relaxed">
              본 계산 결과는 입력하신 정보를 바탕으로 AI가 산출한 참고용 결과입니다.
              <br />
              실제 금액은 가입자 개인의 조건에 따라 차이가 발생하거나 지급이 제한될 수 있습니다. 정확한 금액은 보험사를 통해 확인하시기 바랍니다.
            </div>

            {/* =========================================
                📱 모바일 전용 뷰
            ========================================= */}
            <div className="w-full md:hidden flex flex-col mt-8">
              <div className="relative flex items-center justify-center w-[280px] h-[280px] mx-auto mb-10 shrink-0">
                <div className="absolute top-0 z-20 flex flex-col items-center -translate-y-4">
                  <div className="px-4 py-2 text-[12px] font-bold text-white bg-gray-scale-100 rounded-full shadow-md whitespace-nowrap">
                    환급 대상 금액 {percentage}%
                  </div>
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-gray-scale-100" />
                </div>

                <svg className="absolute inset-0 w-full h-full">
                  <circle cx="140" cy="140" r={mobileRadius} stroke="var(--color-primary-10)" strokeWidth="18" fill="transparent" />
                  <circle
                    cx="140"
                    cy="140"
                    r={mobileRadius}
                    stroke="var(--color-primary-50)"
                    strokeWidth="18"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={mobileCircumference}
                    strokeDashoffset={mobileOffset}
                    style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1.2s ease-out' }}
                    opacity={percentage > 0 ? 1 : 0}
                  />
                  <circle
                    cx="140"
                    cy="140"
                    r={mobileRadius}
                    stroke="var(--color-primary-50)"
                    strokeWidth="18"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={mobileCircumference}
                    strokeDashoffset={mobileOffset}
                    style={{ transform: 'scaleX(-1) rotate(90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1.2s ease-out' }}
                    opacity={percentage > 0 ? 1 : 0}
                  />
                </svg>

                <div className="z-10 flex flex-col items-center mt-2 text-center w-full px-4">
                  <p className="mb-1 font-medium text-[13px] text-gray-scale-50">예상 환급금</p>
                  <p className="text-[34px] font-bold tracking-tight text-primary-50 leading-none mb-2 break-words">
                    {(refundData?.refundAmount ?? 0).toLocaleString()}원
                  </p>
                  <p className="font-medium text-[12px] text-gray-scale-40 break-words">
                    총 진료비 {(refundData?.totalMedicalCost ?? 0).toLocaleString()}원
                  </p>
                </div>
              </div>

              {/* 💡 문제의 아코디언: 모든 텍스트 강제 줄바꿈(break-words) 적용 완료 */}
              <section className="w-full border border-gray-scale-10 rounded-2xl text-left mb-6 shadow-sm bg-white overflow-hidden box-border">
                <button
                  className="w-full flex justify-between items-center p-5 active:bg-gray-50 transition-colors box-border"
                  onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                >
                  <h3 className="font-bold text-[14px] text-gray-scale-80 shrink-0">계산 기준 요약</h3>
                  <span className={`shrink-0 text-gray-scale-40 transition-transform duration-300 ${isSummaryOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                {isSummaryOpen && (
                  <div className="w-full px-5 pb-5 box-border">
                    <div className="w-full pt-4 border-t border-gray-scale-5 box-border">
                      <p className="text-[11px] text-gray-scale-40 mb-3">적용 보험</p>

                      <div className="w-full flex items-start gap-3 mb-4 box-border">
                        <div className="w-11 h-11 bg-primary-50 rounded-full shrink-0 flex items-center justify-center text-[10px] text-white font-bold leading-tight px-1 text-center mt-1">
                          {refundData?.companyName}
                        </div>
                        <div className="flex-1 min-w-0">
                          {/* 💡 핵심: truncate 제거! 긴 보험 이름이 오면 자연스럽게 두 줄로 래핑됩니다. */}
                          <p className="text-[14px] font-bold leading-snug text-gray-scale-80 break-words">{refundData?.productName}</p>
                          <p className="text-[11px] text-gray-scale-40 mt-1 break-words">
                            {refundData?.companyName} · {refundData?.joinDate} 가입
                          </p>
                        </div>
                      </div>

                      <div className="w-full flex flex-wrap gap-1.5 mb-5 box-border">
                        {['개인실손', '4세대', '3대비급여', '갱신형'].map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] px-2 py-1 bg-gray-scale-10 text-gray-scale-50 rounded border border-gray-scale-20 break-keep"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="w-full space-y-2 mb-6 box-border">
                        <div className="w-full bg-primary-5/50 rounded-lg p-3 flex items-start gap-2 box-border">
                          <span className="text-[12px] shrink-0 mt-0.5">⚠️</span>
                          <p className="text-[11px] text-primary-40 leading-snug break-words">
                            비급여 특약 가입 시 비급여 치료 보장을 받을 수 있어요.
                          </p>
                        </div>
                        <div className="w-full bg-primary-5/50 rounded-lg p-3 flex items-start gap-2 box-border">
                          <span className="text-[12px] shrink-0 mt-0.5">⚠️</span>
                          <p className="text-[11px] text-primary-40 leading-snug break-words">치료별 연간 보장 횟수 제한에 주의해주세요.</p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full box-border">
                      <p className="text-[11px] text-gray-scale-40 mb-3">진료 정보</p>
                      <div className="w-full flex flex-wrap gap-1.5 mb-3">
                        {refundData?.treatmentInfos.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[11px] px-2.5 py-1 rounded border break-keep ${
                              tag === '비급여' ? 'bg-pink-50 border-pink-100 text-pink-500' : 'bg-primary-5 border-primary-10 text-primary-50'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="w-full bg-gray-scale-5 rounded-lg p-3 flex items-start gap-2 mt-4 box-border">
                        <span className="text-[12px] mt-0.5 text-gray-scale-40 shrink-0">✓</span>
                        <p className="text-[11px] text-gray-scale-50 leading-snug break-words">{refundData?.basis}</p>
                      </div>
                    </div>

                    <div className="w-full mt-5 pt-5 border-t border-gray-scale-10 box-border">
                      <div className="w-full mb-4">
                        <p className="text-[11px] text-gray-scale-40 mb-1">총 진료비</p>
                        <p className="font-bold text-[15px] text-gray-scale-80 break-words">{refundData?.totalMedicalCost.toLocaleString()} 원</p>
                      </div>
                      <div className="w-full">
                        <p className="text-[11px] text-gray-scale-40 mb-1">요양급여수가코드 (EDI)</p>
                        <p className="font-bold text-[15px] text-gray-scale-80 break-all">{refundData?.ediCode || '-'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <div className="w-full bg-gray-scale-5 text-gray-scale-40 text-[10px] p-4 rounded-xl text-left mb-10 leading-relaxed font-medium box-border break-words">
                본 계산 결과는 입력하신 정보를 바탕으로 AI가 산출한 참고용 결과입니다. 실제 금액은 가입자 개인의 조건에 따라 차이가 발생하거나 지급이
                제한될 수 있습니다. 정확한 금액은 보험사를 통해 확인하시기 바랍니다.
              </div>

              <div className="w-full text-left mb-10 box-border">
                <h4 className="text-primary-50 font-bold text-[15px] mb-6">어떻게 계산 되었나요?</h4>
                <div className="w-full space-y-4 border-b border-gray-scale-10 pb-6 mb-6 box-border">
                  <div className="w-full flex justify-between items-center text-[13px] box-border">
                    <span className="text-gray-scale-50 font-medium shrink-0">총 진료비</span>
                    <span className="font-bold text-[15px] text-gray-scale-90 break-words text-right ml-2">
                      {refundData?.totalMedicalCost.toLocaleString()}원
                    </span>
                  </div>
                  <div className="w-full flex justify-between items-center text-[13px] box-border">
                    <span className="text-gray-scale-50 flex items-center gap-1.5 font-medium shrink-0">
                      <span className="bg-gray-scale-40 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded shrink-0">－</span>{' '}
                      적용 공제 금액
                    </span>
                    <span className="font-bold text-[15px] text-gray-scale-90 break-words text-right ml-2">
                      <span className="text-gray-scale-40 text-[13px] font-medium mr-1">({refundData?.fixedDeductibleRate}%)</span>
                      {refundData?.fixedDeductibleAmount.toLocaleString()}원
                    </span>
                  </div>
                </div>

                <div className="w-full bg-primary-5/50 p-5 rounded-xl mb-6 flex justify-between items-start border border-primary-5 box-border">
                  <span className="text-gray-scale-50 text-[12px] font-medium shrink-0 mt-0.5">공제 기준</span>
                  <span className="flex-1 text-right text-primary-50 text-[12px] font-bold leading-snug break-words ml-2">
                    {refundData?.deductibleBasis}
                  </span>
                </div>

                <div className="w-full space-y-4 box-border">
                  <div className="w-full flex justify-between items-center box-border">
                    <span className="font-bold text-[14px] text-gray-scale-80 shrink-0">환급 대상 금액</span>
                    <span className="font-bold text-[22px] text-gray-scale-90 break-words text-right ml-2">
                      {refundData?.refundAmount.toLocaleString()}원
                    </span>
                  </div>
                  <div className="w-full flex justify-between items-center text-[13px] font-medium box-border">
                    <span className="text-gray-scale-50 shrink-0">자기부담금</span>
                    <span className="text-gray-scale-90 break-words text-right ml-2">
                      <span className="text-primary-40 font-bold mr-1">({refundData?.deductibleRate}%)</span>
                      {refundData?.deductibleAmount.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================
                💻 데스크탑 전용 뷰
            ========================================= */}
            <div className="hidden md:block w-full box-border">
              <section className="w-full border border-gray-100 rounded-2xl text-left mb-12 shadow-sm overflow-hidden bg-white box-border">
                <button
                  className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-colors box-border"
                  onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                >
                  <h3 className="font-bold text-gray-800">계산 기준 요약</h3>
                  <span className={`text-gray-400 transition-transform duration-300 ${isSummaryOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
                </button>
                {isSummaryOpen && (
                  <div className="w-full px-6 pb-6 box-border">
                    <div className="w-full grid grid-cols-2 gap-8 pt-6 border-t border-gray-50 box-border">
                      <div className="w-full box-border">
                        <p className="text-[11px] text-gray-400 mb-3">적용 보험</p>
                        <div className="w-full flex items-start gap-3 mb-4 box-border">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] text-white font-bold leading-tight px-1 text-center">
                            {refundData?.companyName}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold leading-tight text-gray-800 break-words">{refundData?.productName}</p>
                            <p className="text-[10px] text-gray-400 mt-1 break-words">
                              {refundData?.companyName} · {refundData?.joinDate} 가입
                            </p>
                          </div>
                        </div>
                        <div className="w-full flex flex-wrap gap-1 box-border">
                          {['개인실손', '4세대', '3대비급여', '갱신형'].map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-1 bg-gray-100 text-gray-500 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="w-full box-border">
                        <p className="text-[11px] text-gray-400 mb-3">진료 정보</p>
                        <div className="w-full flex flex-wrap gap-1 mb-3 box-border">
                          {refundData?.treatmentInfos.map((tag) => (
                            <span
                              key={tag}
                              className={`text-[10px] px-2 py-1 rounded font-medium break-keep ${tag === '비급여' ? 'bg-pink-50 text-pink-500' : 'bg-purple-50 text-purple-500'}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-[10px] text-gray-400 leading-tight break-words">ℹ️ {refundData?.basis}</p>
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-2 mt-6 pt-6 border-t border-gray-50 box-border">
                      <div className="w-full">
                        <p className="text-[11px] text-gray-400 mb-1">총 진료비</p>
                        <p className="font-bold text-gray-800 break-words">{refundData?.totalMedicalCost.toLocaleString()}</p>
                      </div>
                      <div className="w-full">
                        <p className="text-[11px] text-gray-400 mb-1">요양급여수가코드(EDI)</p>
                        <p className="font-bold text-gray-800 break-all">{refundData?.ediCode || '-'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <div className="w-full flex items-center justify-between gap-10 mb-16 px-4 box-border">
                <div className="relative flex items-center justify-center w-64 h-64 shrink-0">
                  <div className="absolute top-0 z-20 px-4 py-1.5 text-[12px] font-bold text-white bg-gray-800 rounded-full -translate-y-1/2 shadow-md whitespace-nowrap">
                    환급 대상 금액 {percentage}%
                  </div>
                  <svg className="absolute inset-0 w-full h-full">
                    <circle cx="128" cy="128" r={desktopRadius} stroke="#EFF6FF" strokeWidth="16" fill="transparent" />
                    <circle
                      cx="128"
                      cy="128"
                      r={desktopRadius}
                      stroke="#3B82F6"
                      strokeWidth="16"
                      fill="transparent"
                      strokeLinecap="round"
                      strokeDasharray={desktopCircumference}
                      strokeDashoffset={desktopOffset}
                      style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1.2s ease-out' }}
                      opacity={percentage > 0 ? 1 : 0}
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r={desktopRadius}
                      stroke="#3B82F6"
                      strokeWidth="16"
                      fill="transparent"
                      strokeLinecap="round"
                      strokeDasharray={desktopCircumference}
                      strokeDashoffset={desktopOffset}
                      style={{ transform: 'scaleX(-1) rotate(90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1.2s ease-out' }}
                      opacity={percentage > 0 ? 1 : 0}
                    />
                  </svg>
                  <div className="z-10 flex flex-col items-center mt-2 text-center w-full px-4">
                    <p className="mb-1 font-medium text-[13px] text-gray-500">예상 환급금</p>
                    <p className="text-[32px] font-bold tracking-tight text-blue-600 leading-none mb-2 break-words">
                      {(refundData?.refundAmount ?? 0).toLocaleString()}
                    </p>
                    <p className="font-medium text-[12px] text-gray-400 break-words">
                      총 진료비 {(refundData?.totalMedicalCost ?? 0).toLocaleString()}원
                    </p>
                  </div>
                </div>

                <div className="flex-1 text-left min-w-0">
                  <h4 className="text-blue-600 font-bold text-sm mb-5">어떻게 계산 되었나요?</h4>
                  <div className="w-full space-y-4 border-b border-gray-100 pb-5 mb-5 box-border">
                    <div className="w-full flex justify-between text-sm box-border">
                      <span className="text-gray-400 text-[11px] shrink-0">총 진료비</span>
                      <span className="font-bold text-gray-800 break-words ml-2 text-right">{refundData?.totalMedicalCost.toLocaleString()}원</span>
                    </div>
                    <div className="w-full flex justify-between text-sm box-border">
                      <span className="text-gray-400 flex items-center gap-1 font-medium shrink-0">
                        <span className="bg-gray-400 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded shrink-0">－</span>{' '}
                        적용 제외 금액
                      </span>
                      <span className="font-bold text-gray-800 break-words ml-2 text-right">
                        ({refundData?.fixedDeductibleRate}%) {refundData?.fixedDeductibleAmount.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-blue-50 p-4 rounded-xl mb-6 flex justify-between items-start box-border">
                    <span className="text-blue-600 text-[13px] font-bold shrink-0 mt-0.5">공제 기준</span>
                    <span className="flex-1 text-right text-blue-600 text-[12px] font-bold leading-tight break-words ml-2">
                      {refundData?.deductibleBasis}
                    </span>
                  </div>
                  <div className="w-full space-y-2 box-border">
                    <div className="w-full flex justify-between items-center box-border">
                      <span className="font-bold text-gray-800 shrink-0">환급 대상 금액</span>
                      <span className="font-bold text-gray-800 text-xl break-words ml-2 text-right">
                        {refundData?.refundAmount.toLocaleString()}원
                      </span>
                    </div>
                    <div className="w-full flex justify-between text-xs font-medium box-border">
                      <span className="text-gray-400 shrink-0">자기부담금</span>
                      <span className="text-blue-400 break-words ml-2 text-right">
                        ({refundData?.deductibleRate}%) {refundData?.deductibleAmount.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-3 mb-10 md:mb-15 box-border mt-10">
              <CButton
                variant="secondary"
                className="w-full md:flex-1 py-4 border border-gray-scale-20 text-gray-scale-60 font-bold bg-white"
                onClick={() => {
                  resetStore();
                  navigate('/calculator');
                }}
              >
                <span className="text-lg -mt-0.5 mr-1">↺</span> 다른 조건으로 계산하기
              </CButton>
              <CButton
                onClick={() => navigate('/mypage')}
                variant="primary"
                className="w-full md:flex-[1.5] py-4 bg-primary-40 text-primary-50 hover:bg-primary-50 font-bold"
              >
                <span className="text-lg -mt-0.5 mr-1">🔖</span> 계산 기록 저장하기
              </CButton>
            </div>
          </div>
        </CContents>
      </div>
    </>
  );
};

export default RefundResult;
