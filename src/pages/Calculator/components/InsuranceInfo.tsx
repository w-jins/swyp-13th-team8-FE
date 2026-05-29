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
  }, []);

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
      <CContents title="환급금 계산기" className="!bg-transparent !border-none !p-0">
        {/* 보험 선택 카드 */}
        {isLogin ? (
          <div className="bg-primary-10 rounded-2xl flex items-center justify-center text-center border border-primary-20 py-16 px-6">
            <div className="flex flex-col items-center gap-1">
              <CImg className="pb-2" src={calculatorSelect} alt="사진" />
              <p className="text-title-h3 leading-relaxed mb-2 tracking-tight">계산에 적용할 보험을 선택해주세요.</p>
              <p className="text-gray-scale-50 text-body-m-m mb-2">
                선택한 보험의 약관을 기준으로
                <br className="sm:hidden" /> 환급금을 계산 할 수 있어요.
              </p>
              {/* 웹 전용 버튼 */}
              <CButton onClick={() => openModal('INSURANCE')} className="hidden sm:flex w-[200px] h-12 mt-4 text-sm !rounded-xl" variant="primary">
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
              {/* 웹 전용 버튼 */}
              <CButton onClick={() => openModal('LOGIN')} className="hidden sm:flex w-[200px] h-12 mt-4 text-sm !rounded-xl" variant="primary">
                로그인하기
              </CButton>
            </div>
          </div>
        )}

        {/* 모바일 전용 버튼 - 카드 바로 아래 */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 p-5 z-10">
          <CButton
            onClick={() => (isLogin ? openModal('INSURANCE') : openModal('LOGIN'))}
            className="w-full h-14 text-sm !rounded-xl flex"
            variant="primary"
          >
            {isLogin ? '내 보험에서 불러오기' : '로그인하기'}
          </CButton>
        </div>

        {/* 계산 히스토리 - 웹에서만 표시 */}
        <div className="hidden sm:block mt-25">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-title-h3 text-gray-scale-80">계산 히스토리</span>
              <span className="text-[12px] text-gray-scale-40 mt-2">최대 n개까지 기록되며, 초과될 경우 오래된 순부터 삭제됩니다.</span>
            </div>
            <button onClick={() => navigate('/mypage')} className="text-[13px] text-gray-scale-50 flex items-center mx-5 hover:text-primary-50">
              전체보기 {'>'}
            </button>
          </div>

          <div className="bg-primary-0 rounded-3xl p-7 mx-5 mt-10 max-h-[400px] overflow-y-auto flex flex-col gap-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-[200px]">
                <div className="w-8 h-8 border-[3px] border-primary-10 border-t-primary-50 rounded-full animate-spin" />
              </div>
            ) : items.length === 0 ? (
              <div className="flex items-center justify-center flex-1 py-20 text-body-m-r text-gray-scale-50">계산 히스토리가 없습니다.</div>
            ) : (
              items.map((item) => (
                <div
                  key={item.calculationHistoryId}
                  className="flex items-center px-5 py-4 transition-colors border border-gray-scale-20 cursor-pointer rounded-xl hover:border-primary-30"
                >
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
              ))
            )}
          </div>
        </div>
      </CContents>
    </div>
  );
};

export default InsuranceInfo;
