import { useNavigate } from 'react-router';
import { CButton, CImg } from '@/components/common/index';
import { formatDate } from '@/hooks/useFormatDate';
import type { HistoryResponse } from '@/type/responseType';
import { history, historyHover } from '@/assets';
import useCompanyImg from '@/hooks/useCompanyImg';

interface AnalysisCardProps {
  item: HistoryResponse;
  onDelete: (id: number) => void;
  onFavorite: (id: number) => void;
}

const AnalysisCard = ({ item, onDelete, onFavorite }: AnalysisCardProps) => {
  const navigate = useNavigate();
  const insuranceCompany = useCompanyImg(item?.companyName);

  return (
    <div
      onClick={() => navigate(`/analysis/result/${item.analysisHistoryId}`)}
      className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 rounded-xl border border-gray-200 p-4 md:px-5 md:py-4 transition-colors hover:border-blue-300 cursor-pointer bg-white"
    >
      {/* 💡 모바일 상단 영역 (날짜 & 삭제 버튼) / 데스크탑에선 삭제됨(순서 바뀜) */}
      <div className="flex justify-between items-center w-full md:hidden">
        <span className="text-body-s-m text-gray-500">{formatDate(item.createdAt)} 분석</span>
        <CButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.analysisHistoryId);
          }}
          className="text-gray-300 transition-colors hover:text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </CButton>
      </div>

      {/* 💡 북마크 & 데스크탑용 날짜/로고/태그 (모바일에선 북마크와 타이틀만 같은 줄) */}
      <div className="flex items-start md:items-center gap-3 md:gap-4 w-full md:w-auto flex-1">
        {/* 북마크 버튼 (데스크탑, 모바일 공통) */}
        <CButton
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(item.analysisHistoryId);
          }}
          className="shrink-0 transition-transform active:scale-95"
        >
          {item.isFavorite ? (
            <CImg src={historyHover} alt="즐겨찾기" className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <CImg src={history} alt="즐겨찾기" className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </CButton>

        {/* 데스크탑 전용: 날짜, 회사로고, 개인실손 태그 (모바일에서는 숨김) */}
        <span className="hidden md:block w-20 text-sm text-gray-400 shrink-0">{formatDate(item.createdAt)}</span>
        <CImg
          className="hidden md:flex items-center justify-center w-10 h-10 text-xs font-bold text-white rounded-full shrink-0"
          src={insuranceCompany?.src}
          alt="보험사"
        />
        <div className="hidden md:block shrink-0 rounded-md bg-blue-50 px-2.5 py-1 text-xs text-blue-500">{item.contractType}</div>

        {/* 💡 타이틀 영역 (모바일에선 북마크 바로 옆, 데스크탑에선 가로 배치 중 하나) */}
        <div className="flex flex-col flex-1 min-w-0">
          <p className="font-bold text-gray-900 line-clamp-2 md:truncate text-body-m-b md:text-body-l-b leading-tight">{item.productName}</p>
          {/* 파일명 (모바일 시안에 있음)
          <p className="text-body-s-r text-gray-400 truncate mt-1">ZPB292060_0_20260101_file1.pdf</p> */}
        </div>
      </div>

      {/* 💡 하단 태그 그룹 & 데스크탑용 삭제 버튼 */}
      <div className="flex justify-between items-center w-full md:w-auto mt-2 md:mt-0">
        {/* 태그 리스트 (모바일: 하단 가로 나열 / 데스크탑: 우측 가로 나열) */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0 ">
          {/* 모바일 전용 개인실손 태그 (데스크탑에선 위쪽에서 그림) */}
          <span className="md:hidden px-2 py-1 text-[11px] md:text-xs font-medium text-blue-500 bg-blue-50 border border-blue-100 rounded">
            {item.contractType}
          </span>
          <span className="px-2 py-1 text-[11px] md:text-xs font-medium text-blue-600 bg-blue-100 rounded">{item.generation}</span>
          <span className="px-2 py-1 text-[11px] md:text-xs font-medium text-blue-600 bg-blue-100 rounded">{item.coverageStructure}</span>
          {item.cautionPoint && (
            <span className="px-2 py-1 text-[11px] md:text-xs font-medium text-red-500 bg-red-50 border border-red-200 rounded">
              {item.cautionPoint}
            </span>
          )}
        </div>

        {/* 데스크탑 전용 삭제 버튼 (X 아이콘) */}
        <CButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.analysisHistoryId);
          }}
          className="hidden md:block p-1 ml-2 text-gray-300 transition-colors hover:text-gray-500 shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </CButton>
      </div>
    </div>
  );
};

export default AnalysisCard;
