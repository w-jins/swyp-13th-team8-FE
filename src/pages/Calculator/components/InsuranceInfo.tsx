import { useState, useEffect } from 'react';
import CButton from '../../../components/common/CButton';
import CContents from '../../../components/common/CContents';
import type { CalculatorHistoryItem } from '../../../type/historyTypes';
import { getCalculatorHistory, toggleFavoriteCalculatorHistory, deleteCalculatorHistory } from '../../../api/mypageApi';
import { useNavigate } from 'react-router';
import CImg from '../../../components/common/CImg';
import { calculatorSelect, history, historyHover } from '../../../assets';
import { useAuthStore } from '../../../store/useAuthStore';
import { useModalStore } from '../../../store/useModalStore';
import { formatDate } from '../../../hooks/useFormatDate';

const InsuranceInfo = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CalculatorHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isLogin = !!useAuthStore((state) => state.accessToken);
  const openModal = useModalStore((state) => state.openModal);

  const [activeTab, setActiveTab] = useState<'insurance' | 'history'>('insurance');

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const res = await getCalculatorHistory(0, 5);
        setItems(res.calculations ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    if (isLogin) fetchHistory();
  }, [isLogin]);

  const handleToggleSave = async (calculationHistoryId: string) => {
    try {
      await toggleFavoriteCalculatorHistory(calculationHistoryId);
      setItems((prev) => prev.map((item) => (item.calculationHistoryId === calculationHistoryId ? { ...item, isSaved: !item.isSaved } : item)));
    } catch (e) {
      console.error('즐겨찾기 토글 실패', e);
    }
  };

  const handleDelete = async (calculationHistoryId: string) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    try {
      await deleteCalculatorHistory(calculationHistoryId);
      setItems((prev) => prev.filter((item) => item.calculationHistoryId !== calculationHistoryId));
    } catch (e) {
      console.error('히스토리 삭제 실패', e);
    }
  };

  return (
    <div>
      {/* 모바일 상단 탭 버튼 */}
      <div className="py-10 md:py-0">
        <div className="flex bg-gray-scale-10 rounded-full md:hidden w-full max-w-[320px] mx-auto mb-2">
          <button
            onClick={() => setActiveTab('insurance')}
            className={`flex-1 py-2.5 text-body-s-b rounded-full transition-all duration-200 ${
              activeTab === 'insurance' ? 'bg-white text-primary-50 shadow-xs' : 'text-gray-scale-50'
            }`}
          >
            환급금 계산
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2.5 text-body-s-b rounded-full transition-all duration-200 ${
              activeTab === 'history' ? 'bg-white text-primary-50 shadow-xs' : 'text-gray-scale-50'
            }`}
          >
            계산 히스토리
          </button>
        </div>
      </div>

      <CContents title="환급금 계산기" className="!bg-transparent !border-none !p-0">
        {/* =========================================
            1. 환급금 계산 영역
        ========================================= */}
        <div className={activeTab === 'insurance' ? 'block' : 'hidden md:block'}>
          {isLogin ? (
            <div className="md:bg-primary-10 rounded-2xl flex items-center justify-center text-center md:border md:border-primary-20 py-16 px-6">
              <div className="flex flex-col items-center gap-1">
                <CImg className="pb-2" src={calculatorSelect} alt="사진" />
                <p className="text-title-h3 leading-relaxed mb-2 tracking-tight">계산에 적용할 보험을 선택해주세요.</p>
                <p className="text-gray-scale-50 text-body-m-m mb-2">
                  선택한 보험의 약관을 기준으로
                  <br className="md:hidden" /> 환급금을 계산 할 수 있어요.
                </p>
                <CButton onClick={() => openModal('INSURANCE')} className="hidden md:flex w-[200px] h-12 mt-4 text-sm !rounded-xl" variant="primary">
                  내 보험에서 불러오기
                </CButton>
              </div>
            </div>
          ) : (
            <div className="sm:bg-primary-10 sm:rounded-2xl flex items-center justify-center text-center sm:border sm:border-primary-20 py-16 px-6">
              <div className="flex flex-col items-center">
                <p className="text-title-h3 leading-relaxed mb-2 tracking-tight">로그인하여 환급금 계산을 해보세요!</p>
                <p className="text-gray-scale-50 text-body-m-m mb-2">
                  선택한 보험의 약관을 기준으로
                  <br className="sm:hidden " /> 환급금을 계산 할 수 있어요.
                </p>
                <CButton onClick={() => openModal('LOGIN')} className="hidden sm:flex w-[200px] h-12 mt-4 text-sm !rounded-xl" variant="primary">
                  로그인하기
                </CButton>
              </div>
            </div>
          )}

          {/* 모바일 전용 고정 버튼 */}
          <div className="fixed md:hidden bottom-0 left-0 right-0 p-5 z-10">
            <CButton
              onClick={() => (isLogin ? openModal('INSURANCE') : openModal('LOGIN'))}
              className="w-full h-14 text-sm !rounded-xl flex shadow-[0_-10px_20px_rgba(255,255,255,0.9)]"
              variant="primary"
            >
              {isLogin ? '내 보험에서 불러오기' : '로그인하기'}
            </CButton>
          </div>
        </div>

        {/* =========================================
            2. 계산 히스토리 영역
        ========================================= */}
        <div className={`md:mt-25 ${activeTab === 'history' ? 'block' : 'hidden md:block'}`}>
          <div className="hidden md:flex items-center justify-between mb-4">
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
              <span className="text-title-h3 text-gray-scale-80">계산 히스토리</span>
              <span className="text-[12px] text-gray-scale-40 md:mt-2">최대 n개까지 기록되며, 초과될 경우 오래된 순부터 삭제됩니다.</span>
            </div>
            <button onClick={() => navigate('/mypage')} className="text-[13px] text-gray-scale-50 flex items-center hover:text-primary-50">
              전체보기 {'>'}
            </button>
          </div>

          <div className="md:mt-10 flex flex-col gap-4 md:gap-2 overflow-y-auto overflow-x-auto md:max-h-[500px] no-scrollbar md:px-5 md:bg-primary-0 md:rounded-3xl md:p-7 md:mx-5">
            {isLoading ? (
              <div className="flex items-center justify-center h-[200px]">
                <div className="w-8 h-8 border-[3px] border-primary-10 border-t-primary-50 rounded-full animate-spin" />
              </div>
            ) : items.length === 0 ? (
              <div className="flex items-center justify-center flex-1 py-20 text-body-m-r text-gray-scale-50">계산 히스토리가 없습니다.</div>
            ) : (
              items.map((item) => (
                <div key={item.calculationHistoryId} className="w-full">
                  {/* 📱 [모바일 뷰] 카드 형태 (md 화면 이상에서 숨김) */}
                  <div className="md:hidden bg-white border border-gray-scale-20 rounded-2xl p-5 shadow-sm flex flex-col cursor-pointer transition-colors hover:border-primary-30">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-body-s-m text-gray-scale-40">{formatDate(item.calculatedDate)} 분석</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.calculationHistoryId);
                        }}
                        className="text-gray-scale-30 transition-colors hover:text-gray-scale-50 p-1 -mr-1 -mt-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="shrink-0 mt-1">
                        <CButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSave(item.calculationHistoryId);
                          }}
                          className="transition-transform active:scale-95"
                        >
                          {item.isSaved ? <CImg src={historyHover} alt="즐겨찾기" /> : <CImg src={history} alt="즐겨찾기" />}
                        </CButton>
                      </div>

                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap mb-2">
                          <span className="text-[22px] font-bold text-primary-50">{item.refundAmount?.toLocaleString()}원</span>
                          <span className="text-body-s-r text-gray-scale-40">/ 총 진료비 {item.medicalCost?.toLocaleString()}원</span>
                        </div>

                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-body-s-m text-gray-scale-40">요양급여수가코드</span>
                          <span className="text-body-s-m text-gray-scale-80">{item.ediCode === '' ? '-' : item.ediCode}</span>
                        </div>

                        <div className="text-body-s-r text-gray-scale-80 truncate">{item.productName ?? '-'}</div>
                      </div>
                    </div>
                  </div>
                  {/* --- 모바일 뷰 끝 --- */}

                  {/* 💻 [데스크탑 뷰] 가로 리스트 형태 (모바일에서 숨김) */}
                  <div className="hidden md:flex items-center min-w-[800px] px-5 py-4 transition-colors border border-gray-scale-20 cursor-pointer rounded-xl hover:border-primary-30 bg-white">
                    <div className="flex justify-center w-12 shrink-0">
                      <CButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSave(item.calculationHistoryId);
                        }}
                        className="transition-transform active:scale-95"
                      >
                        {item.isSaved ? <CImg src={historyHover} alt="즐겨찾기" /> : <CImg src={history} alt="즐겨찾기" />}
                      </CButton>
                    </div>
                    <div className="w-24 text-center text-body-m-r text-gray-scale-50 shrink-0">{formatDate(item.calculatedDate)}</div>
                    <div className="flex flex-wrap justify-center gap-1 w-40 shrink-0 px-2">
                      {item.basis?.map((b, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-body-s-r text-primary-50 bg-primary-5 border border-primary-10 rounded-md whitespace-nowrap"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                    <div className="w-36 text-center text-body-m-m text-gray-scale-90 shrink-0">{item.ediCode === '' ? '-' : item.ediCode}</div>
                    <div className="flex flex-col flex-1 min-w-0 pl-6 pr-4">
                      <p className="text-body-l-sb text-gray-scale-90 truncate">{item.productName ?? '-'}</p>
                      <p className="mt-1 text-body-s-m text-gray-scale-50 truncate">
                        {item.companyName} {item.joinDate ? `· ${item.joinDate} 가입` : ''}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-44 shrink-0">
                      <p className="text-title-h4 text-primary-50">{item.refundAmount?.toLocaleString()}원</p>
                      <p className="mt-0.5 text-body-s-m text-gray-scale-50">/ 총 진료비 {item.medicalCost?.toLocaleString()}원</p>
                    </div>
                    <div className="flex justify-end w-24 shrink-0">
                      <CButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.calculationHistoryId);
                        }}
                        className="p-2 text-gray-scale-40 transition-colors hover:text-gray-scale-60"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </CButton>
                    </div>
                  </div>
                  {/* --- 데스크탑 뷰 끝 --- */}
                </div>
              ))
            )}
          </div>
        </div>
      </CContents>
    </div>
  );
};

export default InsuranceInfo;
