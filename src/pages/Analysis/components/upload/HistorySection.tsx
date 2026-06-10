import { useNavigate } from 'react-router';
import { historyEmpty, right } from '@/assets';
import { CButton, CImg } from '@/components/common/index';
import HistoryAnalysis from './HistoryAnalysis';

interface HistorySectionProp {
  isActive: boolean;
  userName: string;
}

const HistorySection = ({ isActive, userName }: HistorySectionProp) => {
  const navigate = useNavigate();
  const allViewClickHandler = () => {
    navigate('/mypage');
  };
  return (
    <div className={`h-full md:h-auto md:block ${isActive ? 'block' : 'hidden'}`}>
      <div className="flex flex-col h-full md:h-auto gap-6">
        <div className={`md:flex justify-between hidden`}>
          <p className="text-title-h3">
            분석 히스토리
            <span className="ml-5 text-body-s-r text-gray-scale-50">최대 5개까지 기록되며, 초과될 경우 오래된 순부터 삭제됩니다.</span>
          </p>
          <CButton onClick={allViewClickHandler} className="flex items-center text-body-s-r text-gray-scale-50 cursor-pointer">
            <p>전체 보기</p>
            <CImg className="w-4 h-4" src={right} alt="화살표" />
          </CButton>
        </div>
        <div className="md:bg-primary-0 md:border md:border-gray-scale-30 h-full md:h-78.75 md:rounded-3xl">
          {userName !== '' ? (
            <HistoryAnalysis />
          ) : (
            <div className="flex flex-col h-full items-center justify-center gap-3">
              <CImg className="w-20 h-20" src={historyEmpty} alt="로고" />
              <p className="text-gray-scale-40 text-body-m-m">로그인 후 분석 내역을 확인하세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
