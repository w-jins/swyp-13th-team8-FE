import { useEffect, useState } from 'react';
import { deleteHistory, getHistories, toggleFavorite } from '../../../api/analysisApi';
import type { HistoryResponse } from '../../../type/responseType';
import CButton from '../../../components/common/CButton';
import CImg from '../../../components/common/CImg';
import { history, historyHover } from '../../../assets/index';
import { useNavigate } from 'react-router';
import { formatDate } from '../../../hooks/useFormatDate';

const HistoryAnalysis = () => {
  const [historyAnalysis, setHistoryAnalysis] = useState<HistoryResponse[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const res = await getHistories();
        setHistoryAnalysis(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchHistories();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      // 서버에 삭제 요청
      await deleteHistory(id);
      // 화면(상태)에서 즉시 해당 아이템 제거
      setHistoryAnalysis((prev) => prev.filter((item) => item.analysisHistoryId !== id));
    } catch (e) {
      console.error('삭제 실패:', e);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };
  const handleFavorite = async (id: number) => {
    try {
      // 화면(상태)에서 북마크 아이콘 색상을 먼저 즉시 변경
      setHistoryAnalysis((prev) => prev.map((item) => (item.analysisHistoryId === id ? { ...item, isFavorite: !item.isFavorite } : item)));
      // 서버에 토글 요청
      await toggleFavorite(id);
    } catch (e) {
      console.error('즐겨찾기 토글 실패:', e);
      // 실패하면 다시 원래 상태로 롤백하는 로직을 추가할 수도 있습니다.
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-5">
      {/* 리스트 컨테이너 (스크롤 영역) */}
      <div className="flex flex-1 flex-col gap-3 rounded-[24px] bg-white p-6 shadow-sm border border-gray-100 min-h-[400px] max-h-[600px] overflow-y-auto">
        {' '}
        {historyAnalysis.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-gray-400">분석 히스토리가 없습니다.</div>
        ) : (
          historyAnalysis.map((item) => (
            // 개별 아이템 카드
            <div
              onClick={() => navigate(`/analysis/result/${item.analysisHistoryId}`)}
              key={item.analysisHistoryId}
              className="flex items-center gap-4 rounded-xl border border-gray-200 px-5 py-4 transition-colors hover:border-blue-300"
            >
              {/* 북마크 버튼 */}
              <CButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(item.analysisHistoryId);
                }}
                className="shrink-0 transition-transform active:scale-95"
              >
                {item.isFavorite ? <CImg src={historyHover} alt="즐겨찾기" /> : <CImg src={history} alt="즐겨찾기" />}
              </CButton>

              {/* 가입 일자 */}
              <span className="w-20 text-sm text-gray-400 shrink-0">{formatDate(item.createdAt)}</span>

              {/* 회사 로고 (원형) */}
              <div className="flex items-center justify-center w-10 h-10 text-xs font-bold text-white bg-blue-600 rounded-full shrink-0">
                {item.companyName}
              </div>

              {/* 계약 유형 태그 (개인실손) */}
              <div className="shrink-0 rounded-md bg-blue-50 px-2.5 py-1 text-xs text-blue-500">{item.contractType}</div>

              {/* 보험명 & 파일명 */}
              <div className="flex flex-col flex-1 min-w-0 px-2">
                <p className="font-bold text-gray-900 truncate text-body-m-b">{item.productName}</p>
                {/* 💡 파일명이 API 응답에 없다면 아래 줄은 삭제하거나 임의 문자열로 대체하세요 */}
                <p className="text-xs text-gray-400 truncate">ZPB292060_0_20260101_file1.pdf</p>
              </div>

              {/* 우측 태그 그룹 (세대, 급여구조, 주의사항 등) */}
              {/* 이전에 만드신 CLabel 컴포넌트를 사용하시면 더 좋습니다! */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-md">{item.generation}</span>
                <span className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-md">{item.coverageStructure}</span>
                {item.cautionPoint && (
                  <span className="px-2 py-1 text-xs text-red-500 bg-red-50 border border-red-200 rounded-md">{item.cautionPoint}</span>
                )}
              </div>

              {/* 삭제 버튼 (X 아이콘) */}
              <CButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.analysisHistoryId);
                }}
                className="p-1 ml-2 text-gray-300 transition-colors hover:text-gray-500 shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </CButton>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryAnalysis;
