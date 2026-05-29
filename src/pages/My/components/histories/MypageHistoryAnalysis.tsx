import { useCallback, useEffect, useState } from 'react';
import type { AnalysisHistoryItem } from '../../../../type/historyTypes';
import { deleteAnalysisHistory, getAnalysisHistory, toggleSaveAnalysisHistory } from '../../../../api/mypageApi';
import { useAuthStore } from '../../../../store/useAuthStore';
import MyPageAnalysisCard from '../MyPageAnalysisCard';

const MypageHistoryAnalysis = () => {
  const isLogin = !!useAuthStore((state) => state.accessToken);
  const [items, setItems] = useState<AnalysisHistoryItem[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = useCallback(async () => {
    try {
      const data = await getAnalysisHistory(currentPage);
      const rawList = data?.content ?? data ?? [];
      setItems(rawList);
      if (data?.totalPages) setTotalPages(data.totalPages);
    } catch (e) {
      console.error('약관 분석 히스토리 조회 실패', e);
    }
  }, [currentPage]);

  const handleToggleSave = async (id: number) => {
    await toggleSaveAnalysisHistory(id);
    setItems((prev) => prev.map((item) => (item.analysisHistoryId === id ? { ...item, isFavorite: !item.isFavorite } : item)));
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      await deleteAnalysisHistory(id);
      setItems((prev) => prev.filter((item) => item.analysisHistoryId !== id));
    }
  };

  useEffect(() => {
    if (isLogin) {
      fetchHistory();
    }
  }, [currentPage, isLogin, fetchHistory]);

  // 페이지네이션 버튼 범위 계산 (최대 5개, 슬라이딩 윈도우)
  const getPaginationRange = () => {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(0, currentPage - half);
    let end = start + maxVisible;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(0, end - maxVisible);
    }
    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  return (
    <div className="flex flex-col w-full h-full pt-4">
      {/* ════════════════════════════════════════
          웹(md+): 기존 테이블 레이아웃
          ════════════════════════════════════════ */}
      <div className="hidden md:flex flex-col flex-1 p-6 bg-gray-scale-0 border border-gray-scale-20 shadow-main rounded-3xl min-h-[400px]">
        {/* 테이블 헤더 */}
        <div className="flex items-center px-5 pb-4 mb-4 border-b border-gray-scale-10">
          <div className="w-12 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">저장</div>
          <div className="w-24 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">분석일</div>
          <div className="w-20 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">보험사</div>
          <div className="w-24 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">가입 형태</div>
          <div className="flex-1 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">약관 이름</div>
          <div className="text-center text-body-m-m text-gray-scale-50 w-44">개요</div>

          {/* 정렬 드롭다운 */}
          <div className="flex justify-end w-32">
            <select className="px-3 py-1.5 text-body-m-r text-gray-scale-70 bg-gray-scale-0 border border-gray-scale-30 rounded-full outline-none focus:border-primary-50 cursor-pointer shadow-sm">
              <option value="date">분석일 순</option>
            </select>
          </div>
        </div>

        {/* 스크롤 가능한 리스트 */}
        <div className="flex flex-col gap-3 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex items-center justify-center flex-1 py-20 text-body-m-r text-gray-scale-50">분석 히스토리가 없습니다.</div>
          ) : (
            items.map((item) => <MyPageAnalysisCard key={item.analysisHistoryId} item={item} onDelete={handleDelete} onFavorite={handleToggleSave} />)
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════
          모바일(~md): 카드 레이아웃
          ════════════════════════════════════════ */}
      <div className="flex md:hidden flex-col flex-1 bg-gray-scale-0 border border-gray-scale-20 shadow-main rounded-3xl overflow-hidden min-h-[400px]">
        {/* 정렬 드롭다운 */}
        <div className="flex items-center justify-end px-4 py-3 border-b border-gray-scale-10">
          <select className="px-3 py-1.5 text-body-m-r text-gray-scale-70 bg-gray-scale-0 border border-gray-scale-30 rounded-full outline-none focus:border-primary-50 cursor-pointer shadow-sm">
            <option value="date">분석일 순</option>
          </select>
        </div>

        {/* 카드 리스트 */}
        <div className="flex flex-col overflow-y-auto divide-y divide-gray-scale-10">
          {items.length === 0 ? (
            <div className="flex items-center justify-center flex-1 py-20 text-body-m-r text-gray-scale-50">분석 히스토리가 없습니다.</div>
          ) : (
            items.map((item) => <MyPageAnalysisCard key={item.analysisHistoryId} item={item} onDelete={handleDelete} onFavorite={handleToggleSave} />)
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════
          공통 페이지네이션
          ════════════════════════════════════════ */}
      <div className="flex items-center justify-center gap-1 mt-6 mb-4">
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

        {/* 페이지 번호 */}
        <div className="flex items-center gap-1">
          {getPaginationRange().map((pageNum) => (
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
      </div>
    </div>
  );
};

export default MypageHistoryAnalysis;
