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
      <CContents title="환급금 계산기" className="!bg-transparent !border-none">
        {isLogin ? (
          <div className="h-90 bg-primary-10 rounded-2xl mx-5 -mt-2 flex items-center justify-center text-center border border-primary-30">
            <div className="flex flex-col items-center gap-1">
              <CImg className="pb-2" src={calculatorSelect} alt="사진" />
              <p className="text-title-h3 leading-relaxed mb-2 tracking-tight">계산에 적용할 보험을 선택해주세요.</p>
              <p className="text-gray-scale-50 text-body-m-m mb-2">선택한 보험의 약관을 기준으로 환급금을 계산 할 수 있어요.</p>
              <CButton onClick={() => openModal('INSURANCE')} className="w-[200px] h-12 mt-4 text-sm !rounded-xl flex" variant="primary">
                내 보험에서 불러오기
              </CButton>
            </div>
          </div>
        ) : (
          <div className="h-90 bg-primary-10 rounded-2xl mx-5 -mt-2 flex items-center justify-center text-center border border-primary-30">
            <div className="flex flex-col items-center">
              <p className="text-title-h3 leading-relaxed mb-2 tracking-tight">로그인하여 환급금 계산을 해보세요!</p>
              <p className="text-gray-scale-50 text-body-m-m mb-2">선택한 보험의 약관을 기준으로 환급금을 계산 할 수 있어요.</p>
              <CButton onClick={() => openModal('LOGIN')} className="w-[200px] h-12 mt-4 text-sm !rounded-xl flex" variant="primary">
                로그인하기
              </CButton>
            </div>
          </div>
        )}

        <div className="mt-25">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-title-h2 text-gray-scale-80">분석 히스토리</span>
              <span className="text-[12px] text-gray-scale-40">최대 n개까지 기록되며, 초과될 경우 오래된 순부터 삭제됩니다.</span>
            </div>
            <button onClick={() => navigate('/mypage')} className="text-[13px] text-gray-scale-50 flex items-center gap-1 hover:text-primary-50">
              전체보기 {'>'}
            </button>
          </div>

          <div className="bg-primary-0  rounded-3xl p-7 mx-5 mt-10 max-h-[400px] overflow-y-auto flex flex-col gap-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-[200px]">
                <div className="w-8 h-8 border-[3px] border-primary-10 border-t-primary-50 rounded-full animate-spin" />
              </div>
            ) : items.length === 0 ? ( // 배열 이름은 실제 상태 이름에 맞게 수정하세요!
              <div className="flex items-center justify-center flex-1 py-20 text-body-m-r text-gray-scale-50">계산 히스토리가 없습니다.</div>
            ) : (
              items.map((item) => (
                // 개별 아이템 카드
                <div
                  // 상세 페이지 이동 로직 연결 필요
                  key={item.calculationHistoryId}
                  className="flex items-center px-5 py-4 transition-colors border border-gray-scale-20 cursor-pointer rounded-xl hover:border-primary-30"
                >
                  {/* 북마크 버튼 */}
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

                  {/* 계산일 */}
                  <div className="w-24 text-center text-body-m-r text-gray-scale-50 shrink-0">{formatDate(item.calculatedDate)}</div>

                  {/* 계산 항목 태그 (4세대, 3대비급여 등) */}
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

                  {/* 요양급여수가코드 (EDI) */}
                  <div className="w-36 text-center text-body-m-m text-gray-scale-90 shrink-0">{item.ediCode === '' ? '-' : item.ediCode}</div>

                  {/* 대상 보험 (보험명 & 회사명) */}
                  <div className="flex flex-col flex-1 min-w-0 pl-6 pr-4">
                    <p className="text-body-l-sb text-gray-scale-90 truncate group-hover:underline">{item.productName ?? '-'}</p>
                    <p className="mt-1 text-body-s-m text-gray-scale-50 truncate">
                      {item.companyName} {item.joinDate ? `· ${item.joinDate} 가입` : ''}
                    </p>
                  </div>

                  {/* 예상 환급금 & 총 진료비 */}
                  <div className="flex flex-col items-center justify-center w-44 shrink-0">
                    <p className="text-title-h4 text-primary-50">{item.refundAmount?.toLocaleString()}원</p>
                    <p className="mt-0.5 text-body-s-m text-gray-scale-50">/ 총 진료비 {item.medicalCost?.toLocaleString()}원</p>
                  </div>

                  {/* 삭제 버튼 (X 아이콘) */}
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
