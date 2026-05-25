import { useCallback, useEffect, useState } from 'react';
import type { AnalysisHistoryItem } from '../../../../type/historyTypes';
import { history, historyHover } from '../../../../assets';
import CImg from '../../../../components/common/CImg';
import CButton from '../../../../components/common/CButton';
import { deleteAnalysisHistory, getAnalysisHistory, toggleSaveAnalysisHistory } from '../../../../api/mypageApi';
import { useAuthStore } from '../../../../store/useAuthStore';
import { useNavigate } from 'react-router';
import { formatDate } from '../../../../hooks/useFormatDate';

const MypageHistoryAnalysis = () => {
  const isLogin = !!useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();
  const [items, setItems] = useState<AnalysisHistoryItem[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = useCallback(async () => {
    try {
      const data = await getAnalysisHistory(currentPage);
      const rawList = data?.content ?? data ?? [];
      setItems(rawList);
      if (data?.tatalPages) setTotalPages(data.totalPages);
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

  return (
    <div className="flex flex-col w-full h-full pt-4">
      {/* 1. 리스트 컨테이너 (시스템 배경색, 그림자, 테두리 적용) */}
      <div className="flex flex-col flex-1 p-6 bg-gray-scale-0 border border-gray-scale-20 shadow-main rounded-3xl min-h-[400px]">
        {/* 2. 테이블 헤더 */}
        <div className="flex items-center px-5 pb-4 mb-4 border-b border-gray-scale-10">
          <div className="w-12 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">저장</div>
          <div className="w-24 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">분석일</div>
          <div className="w-20 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">보험사</div>
          <div className="w-24 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">가입 형태</div>
          <div className="flex-1 text-center text-body-m-m text-gray-scale-50 border-r border-gray-scale-20">약관 이름</div>
          <div className="text-center text-body-m-m text-gray-scale-50 w-44">개요</div>

          {/* 우측 상단 정렬 드롭다운 */}
          <div className="flex justify-end w-32">
            <select className="px-3 py-1.5 text-body-m-r text-gray-scale-70 bg-gray-scale-0 border border-gray-scale-30 rounded-full outline-none focus:border-primary-50 cursor-pointer shadow-sm">
              <option value="date">분석일 순</option>
              {/* 추후 개발 */}
              {/* <option value="name">이름 순</option> */}
            </select>
          </div>
        </div>

        {/* 3. 스크롤 가능한 리스트 영역 */}
        <div className="flex flex-col gap-3 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex items-center justify-center flex-1 py-20 text-body-m-r text-gray-scale-50">분석 히스토리가 없습니다.</div>
          ) : (
            items.map((item) => (
              // 개별 아이템 카드
              <div
                onClick={() => navigate(`/analysis/result/${item.analysisHistoryId}`)}
                key={item.analysisHistoryId}
                className="flex items-center px-5 py-4 transition-colors border border-gray-scale-20 cursor-pointer rounded-xl hover:border-primary-30"
              >
                {/* 북마크 버튼 */}
                <div className="flex justify-center w-12 shrink-0">
                  <CButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleSave(item.analysisHistoryId);
                    }}
                    className="transition-transform active:scale-95"
                  >
                    {item.isFavorite ? <CImg src={historyHover} alt="즐겨찾기" /> : <CImg src={history} alt="즐겨찾기" />}
                  </CButton>
                </div>

                {/* 가입 일자 */}
                <div className="w-24 text-center text-body-m-r text-gray-scale-50 shrink-0">{formatDate(item.createdAt)}</div>

                {/* 회사 로고 (원형) */}
                <div className="flex justify-center w-20 shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 text-body-s-sb font-bold text-gray-scale-0 bg-primary-50 rounded-full">
                    {item.companyName}
                  </div>
                </div>

                {/* 계약 유형 태그 */}
                <div className="flex justify-center w-24 shrink-0">
                  <div className="rounded-md bg-primary-5 px-2.5 py-1 text-body-s-m text-primary-50 whitespace-nowrap">{item.contractType}</div>
                </div>

                {/* 보험명 & 파일명 */}
                <div className="flex flex-col flex-1 min-w-0 px-6">
                  <p className="text-body-l-sb text-gray-scale-90 truncate group-hover:underline">{item.productName}</p>
                  {/* 추후 데이터 변경 */}
                  {/* <p className="mt-0.5 text-body-s-r text-gray-scale-50 truncate">ZPB292060_0_20260101_file1.pdf</p> */}
                </div>

                {/* 우측 태그 그룹 (개요) */}
                <div className="flex flex-wrap justify-center gap-1.5 w-44 shrink-0">
                  <span className="px-2 py-1 text-body-s-r text-primary-50 bg-primary-5 border border-primary-10 rounded-md whitespace-nowrap">
                    {item.generation}
                  </span>
                  <span className="px-2 py-1 text-body-s-r text-primary-50 bg-primary-5 border border-primary-10 rounded-md whitespace-nowrap">
                    {item.coverageStructure}
                  </span>
                  {item.cautionPoint && (
                    <span className="px-2 py-1 text-body-s-r text-red-scale-40 bg-red-scale-10 border border-red-scale-20 rounded-md whitespace-nowrap">
                      {item.cautionPoint}
                    </span>
                  )}
                </div>

                {/* 삭제 버튼 (X 아이콘) */}
                <div className="flex justify-end w-32 shrink-0">
                  <CButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.analysisHistoryId);
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
      </div>
    </div>
  );
};

export default MypageHistoryAnalysis;
