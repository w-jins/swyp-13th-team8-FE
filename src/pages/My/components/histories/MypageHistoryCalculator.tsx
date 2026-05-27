import { useCallback, useEffect, useState } from 'react';
import CButton from '../../../../components/common/CButton';
import CImg from '../../../../components/common/CImg';
import { history, historyHover } from '../../../../assets';
import { useAuthStore } from '../../../../store/useAuthStore';
import { deleteCalculatorHistory, getCalculatorHistory, toggleFavoriteCalculatorHistory } from '../../../../api/mypageApi';
import type { CalculatorHistoryItem } from '../../../../type/historyTypes';
import { formatDate } from '../../../../hooks/useFormatDate';

const MypageHistoryCalculator = () => {
  const isLogin = !!useAuthStore((state) => state.accessToken);
  const [items, setItems] = useState<CalculatorHistoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = useCallback(async () => {
    try {
      const data = await getCalculatorHistory(currentPage);
      const rawList = data?.calculations ?? data ?? [];
      setItems(rawList);
      if (data?.pageInfo?.totalPages) setTotalPages(data.pageInfo.totalPages);
    } catch (error) {
      console.error('히스토리 조회 실패:', error);
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

  return (
    <div className="flex flex-col w-full h-full pt-4">
      {/* 1. 리스트 컨테이너 */}
      <div className="flex flex-col flex-1 p-6 bg-gray-scale-0 border border-gray-scale-20 shadow-main rounded-3xl min-h-[400px]">
        {/* 2. 테이블 헤더 (계산기 버전에 맞는 헤더 구성) */}
        <div className="flex items-center px-5 pb-4 mb-4 border-b border-gray-scale-10">
          <div className="w-12 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">저장</div>
          <div className="w-24 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">계산일</div>
          <div className="w-40 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">계산 항목</div>
          <div className="w-36 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">요양급여수가코드</div>
          <div className="flex-1 pl-6 text-left text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">대상 보험</div>
          <div className="text-center text-body-m-m text-gray-scale-50 w-44">예상 환급금</div>

          {/* 우측 상단 정렬 드롭다운 */}
          <div className="flex justify-end w-24">
            <select className="px-3 py-1.5 text-body-m-r text-gray-scale-70 bg-gray-scale-0 border border-gray-scale-30 rounded-full outline-none focus:border-primary-50 cursor-pointer shadow-sm">
              <option value="date">분석일 순</option>
              {/* 추후 개발 */}
              {/* <option value="amount">환급금 순</option> */}
            </select>
          </div>
        </div>

        {/* 3. 스크롤 가능한 리스트 영역 */}
        <div className="flex flex-col gap-3 overflow-y-auto">
          {items.length === 0 ? ( // 배열 이름은 실제 상태 이름에 맞게 수정하세요!
            <div className="flex items-center justify-center flex-1 py-20 text-body-m-r text-gray-scale-50">계산 히스토리가 없습니다.</div>
          ) : (
            items.map((item) => (
              // 개별 아이템 카드
              <div
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </CButton>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* 페이지네이션 컴포넌트 위치 (이전 턴의 페이지네이션 코드 삽입) */}
      {/* 4. 하단 페이지네이션 영역 추가! */}
      <div className="flex items-center justify-center gap-2 mt-6 mb-4">
        {/* 이전 버튼 */}
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

        {/* 페이지 번호 (예시로 5개 렌더링, 실제로는 totalPages를 활용해 동적으로 구성) */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-body-m-m transition-colors ${
                currentPage === pageNum
                  ? 'bg-primary-50 text-gray-scale-0 font-bold' // 활성화 (파란 배경, 흰 글씨)
                  : 'text-gray-scale-50 hover:bg-gray-scale-5 hover:text-gray-scale-70' // 비활성화
              }`}
            >
              {pageNum + 1}
            </button>
          ))}
        </div>

        {/* 다음 버튼 */}
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
      </div>{' '}
    </div>
  );
};

export default MypageHistoryCalculator;
