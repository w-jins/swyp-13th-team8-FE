import { useCallback, useEffect, useState } from 'react';
import CButton from '../../../../../components/common/CButton';
import CImg from '../../../../../components/common/CImg';
import { history, historyHover } from '../../../../../assets';
import { useAuthStore } from '../../../../../store/useAuthStore';
import { deleteCalculatorHistory, getFavoriteCalculatorHistory, toggleFavoriteCalculatorHistory } from '../../../../../api/mypageApi';
import type { CalculatorHistoryItem } from '../../../../../type/historyTypes';
import { formatDate } from '../../../../../hooks/useFormatDate';

const SaveHistoryCalculator = () => {
  const isLogin = !!useAuthStore((state) => state.accessToken);
  const [items, setItems] = useState<CalculatorHistoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = useCallback(async () => {
    try {
      const data = await getFavoriteCalculatorHistory(currentPage);
      const rawList = data?.calculations ?? data ?? [];
      setItems(rawList);
      if (data?.pageInfo?.totalPages) setTotalPages(data.pageInfo.totalPages);
    } catch (e) {
      console.error('저장된 환급금 계산 히스토리 조회 실패', e);
    } finally {
    }
  }, [currentPage]);
  useEffect(() => {
    if (isLogin) {
      fetchHistory();
    }
  }, [currentPage, setItems]);

  const handleToggleSave = async (id: string) => {
    try {
      await toggleFavoriteCalculatorHistory(id);
      setItems((prev) => prev.map((item) => (item.calculationHistoryId === id ? { ...item, isSaved: !item.isSaved } : item)));
    } catch (error) {
      console.error('저장 토글 실패:', error);
      setItems((prev) => prev.map((item) => (item.calculationHistoryId === id ? { ...item, isSaved: !item.isSaved } : item)));
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('삭제하시겠습니까?')) return;

    try {
      await deleteCalculatorHistory(id);
      setItems((prev) => prev.filter((item) => item.calculationHistoryId !== id));
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };
  /* ── 공통 페이지네이션 ── */
  const Pagination = () => (
    <div className="flex items-center justify-center gap-2 mt-6 mb-4">
      <button
        disabled={currentPage === 0}
        onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
        className="flex items-center gap-1 px-2 py-1 transition-colors text-body-m-r text-gray-scale-50 hover:text-gray-scale-70 disabled:text-gray-scale-30 disabled:cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        이전
      </button>
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-body-m-m transition-colors ${
              currentPage === pageNum
                ? 'bg-primary-50 text-gray-scale-0 font-bold'
                : 'text-gray-scale-50 hover:bg-gray-scale-5 hover:text-gray-scale-70'
            }`}
          >
            {pageNum + 1}
          </button>
        ))}
      </div>
      <button
        disabled={currentPage === totalPages - 1 || totalPages === 0}
        onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
        className="flex items-center gap-1 px-2 py-1 transition-colors text-body-m-r text-gray-scale-50 hover:text-gray-scale-70 disabled:text-gray-scale-30 disabled:cursor-not-allowed"
      >
        다음
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );

  const emptyState = <div className="flex items-center justify-center flex-1 py-20 text-body-m-r text-gray-scale-50">계산 히스토리가 없습니다.</div>;

  return (
    <div className="flex flex-col w-full h-full pt-4">
      {/* ── 모바일 카드 뷰 (sm 미만) ── */}
      <div className="flex flex-col gap-3 md:hidden px-4">
        {items.length === 0
          ? emptyState
          : items.map((item) => (
              <div key={item.calculationHistoryId} className="bg-white border border-gray-scale-20 rounded-2xl p-4 shadow-sm">
                {/* 상단: 날짜 + 삭제 */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] text-gray-scale-40">{formatDate(item.calculatedDate)} 분석</span>
                  <CButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.calculationHistoryId);
                    }}
                    className="text-gray-scale-30 hover:text-gray-scale-60 transition-colors p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </CButton>
                </div>

                {/* 환급금 + 총 진료비 */}
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="text-[20px] font-bold text-primary-50">{item.refundAmount?.toLocaleString()}원</p>
                  <p className="text-[11px] text-gray-scale-40">/ 총 진료비 {item.medicalCost?.toLocaleString()}원</p>
                </div>

                {/* EDI 코드 */}
                {item.ediCode && <p className="text-[12px] text-gray-scale-50 mb-1">요양급여수가코드 {item.ediCode}</p>}

                {/* 보험상품명 */}
                <p className="text-[13px] font-medium text-gray-scale-80 truncate mb-3">
                  {item.productName ?? '-'}
                  {item.companyName ? ` (${item.companyName})` : ''}
                </p>

                {/* 하단: 북마크 + 태그 */}
                <div className="flex items-center gap-2 flex-wrap">
                  <CButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleSave(item.calculationHistoryId);
                    }}
                    className="transition-transform active:scale-95 shrink-0"
                  >
                    <CImg src={item.isSaved ? historyHover : history} alt="즐겨찾기" className="w-5 h-5" />
                  </CButton>
                  {item.basis?.map((b, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[11px] text-primary-50 bg-primary-5 border border-primary-10 rounded-md whitespace-nowrap"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            ))}
      </div>

      {/* ── 데스크탑 테이블 뷰 (sm 이상) ── */}
      <div className="hidden md:flex flex-col flex-1 p-6 bg-gray-scale-0 border border-gray-scale-20 shadow-main rounded-3xl min-h-[400px]">
        {/* 테이블 헤더 */}
        <div className="flex items-center px-5 pb-4 mb-4 border-b border-gray-scale-10">
          <div className="w-12 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">저장</div>
          <div className="w-24 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">계산일</div>
          <div className="w-40 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">계산 항목</div>
          <div className="w-36 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">요양급여수가코드</div>
          <div className="flex-1 pl-55 text-left text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">대상 보험</div>
          <div className="text-center pr-5 text-body-m-m text-gray-scale-50 w-44">예상 환급금</div>
          <div className="flex justify-end w-24">
            <select className="px-3 py-1.5 text-body-m-r text-gray-scale-70 bg-gray-scale-0 border border-gray-scale-30 rounded-full outline-none focus:border-primary-50 cursor-pointer shadow-sm">
              <option value="date">분석일 순</option>
            </select>
          </div>
        </div>

        {/* 리스트 */}
        <div className="flex flex-col gap-3 overflow-y-auto">
          {items.length === 0
            ? emptyState
            : items.map((item) => (
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
                      <CImg src={item.isSaved ? historyHover : history} alt="즐겨찾기" />
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
              ))}
        </div>
      </div>
      <div className="hidden sm:block">
        <Pagination />
      </div>
    </div>
  );
};

export default SaveHistoryCalculator;
