import { useNavigate } from 'react-router';
import type { AnalysisHistoryItem } from '../../../type/historyTypes';
import CButton from '../../../components/common/CButton';
import CImg from '../../../components/common/CImg';
import { history, historyHover } from '../../../assets';
import { formatDate } from '../../../hooks/useFormatDate';
import useCompanyImg from '../../../hooks/useCompanyImg';
interface MyPageAnalysisProps {
  item: AnalysisHistoryItem;
  onDelete: (id: number) => void;
  onFavorite: (id: number) => void;
}

// 추후 AnalysisCard 와 병합 예정
const MyPageAnalysisCard = ({ item, onDelete, onFavorite }: MyPageAnalysisProps) => {
  const navigate = useNavigate();
  const insuranceCompany = useCompanyImg(item?.companyName);
  return (
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
            onFavorite(item.analysisHistoryId);
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
        <CImg
          className="flex items-center justify-center w-10 h-10 text-body-s-sb font-bold text-gray-scale-0  rounded-full"
          src={insuranceCompany?.src}
          alt="보험사"
        />
      </div>

      {/* 계약 유형 태그 */}
      <div className="flex justify-center w-24 shrink-0">
        <div className="rounded-md bg-primary-5 px-2.5 py-1 text-body-s-m text-primary-50 whitespace-nowrap">{item.contractType}</div>
      </div>

      {/* 보험명 & 파일명 */}
      <div className="flex flex-col flex-1 min-w-0 px-6">
        <p className="text-body-l-sb text-gray-scale-90 truncate group-hover:underline">{item.productName}</p>
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
            onDelete(item.analysisHistoryId);
          }}
          className="p-2 text-gray-scale-40 transition-colors hover:text-gray-scale-60"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </CButton>
      </div>
    </div>
  );
};

export default MyPageAnalysisCard;
