import { useNavigate } from 'react-router';
import CButton from '../../../components/common/CButton';
import CImg from '../../../components/common/CImg';
import { formatDate } from '../../../hooks/useFormatDate';
import type { HistoryResponse } from '../../../type/responseType';
import { history, historyHover } from '../../../assets';
import useCompanyImg from '../../../hooks/useCompanyImg';

interface AnalysisCardProps {
  item: HistoryResponse;
  onDelete: (id: number) => void;
  onFavorite: (id: number) => void;
}

const AnalysisCard = ({ item, onDelete, onFavorite }: AnalysisCardProps) => {
  const navigate = useNavigate();
  const insuranceCompany = useCompanyImg(item?.companyName);
  return (
    <>
      <div
        onClick={() => navigate(`/analysis/result/${item.analysisHistoryId}`)}
        key={item.analysisHistoryId}
        className="flex items-center gap-4 rounded-xl border border-gray-200 px-5 py-4 transition-colors hover:border-blue-300"
      >
        {/* 북마크 버튼 */}
        <CButton
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(item.analysisHistoryId);
          }}
          className="shrink-0 transition-transform active:scale-95"
        >
          {item.isFavorite ? <CImg src={historyHover} alt="즐겨찾기" /> : <CImg src={history} alt="즐겨찾기" />}
        </CButton>

        {/* 가입 일자 */}
        <span className="w-20 text-sm text-gray-400 shrink-0">{formatDate(item.createdAt)}</span>

        {/* 회사 로고 (원형) */}
        <CImg
          className="flex items-center justify-center w-10 h-10 text-xs font-bold text-white rounded-full shrink-0"
          src={insuranceCompany?.src}
          alt="보험사"
        />

        {/* 계약 유형 태그 (개인실손) */}
        <div className="shrink-0 rounded-md bg-blue-50 px-2.5 py-1 text-xs text-blue-500">{item.contractType}</div>

        {/* 보험명 & 파일명 */}
        <div className="flex flex-col flex-1 min-w-0 px-2">
          <p className="font-bold text-gray-900 truncate text-body-m-b">{item.productName}</p>
          {/* 💡 파일명이 API 응답에 없다면 아래 줄은 삭제하거나 임의 문자열로 대체하세요 */}
          {/* <p className="text-xs text-gray-400 truncate">ZPB292060_0_20260101_file1.pdf</p> */}
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
            onDelete(item.analysisHistoryId);
          }}
          className="p-1 ml-2 text-gray-300 transition-colors hover:text-gray-500 shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </CButton>
      </div>
    </>
  );
};

export default AnalysisCard;
