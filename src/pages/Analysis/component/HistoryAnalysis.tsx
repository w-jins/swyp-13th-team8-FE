import { useEffect, useState } from 'react';
import { deleteHistory, getHistories, toggleFavorite } from '../../../api/analysisApi';
import type { HistoryResponse } from '../../../type/responseType';
import AnalysisCard from './AnalysisCard';

const HistoryAnalysis = () => {
  const [historyAnalysis, setHistoryAnalysis] = useState<HistoryResponse[]>([]);
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
          historyAnalysis.map((item) => <AnalysisCard key={item.analysisHistoryId} item={item} onDelete={handleDelete} onFavorite={handleFavorite} />)
        )}
      </div>
    </div>
  );
};

export default HistoryAnalysis;
