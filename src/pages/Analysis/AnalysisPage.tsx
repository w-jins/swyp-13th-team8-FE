import { useNavigate } from 'react-router';
import { right } from '../../assets';
import CBreadcrumb from '../../components/common/CBreadcrumb';
import CButton from '../../components/common/CButton';
import CImg from '../../components/common/CImg';
import PdfUploader from './component/PdfUploader';
import { useUserStore } from '../../store/useUserStore';
import HistoryAnalysis from './component/HistoryAnalysis';
import { useEffect } from 'react';
import { useCalcStore } from '../../store/useCalcStore';

const Analysis = () => {
  const userInfo = useUserStore((state) => state.userInfo.name);
  const resetStore = useCalcStore((state) => state.resetStore);
  const navigate = useNavigate();
  // 업로드된 파일을 저장할 상태
  useEffect(() => {
    resetStore(); // 전역 상태 초기화!
  }, [resetStore]);
  const allViewClickHandler = () => {
    navigate('/mypage');
  };
  return (
    <div className="w-full flex flex-col gap-10 justify-between">
      {/* 브레드스크럼 */}
      <div>
        <CBreadcrumb items={[{ label: '약관 분석', path: '/analysis' }]} />
      </div>

      <div className="w-full flex flex-col gap-20">
        <div>
          {/* 약관 불러오기 */}
          <div className="flex flex-col gap-6">
            <p className="text-title-h3">약관 불러오기</p>
            <PdfUploader name={userInfo} />
          </div>
        </div>
        {/* 분석 히스토리 */}
        <div>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <p className="text-title-h3">
                분석 히스토리
                <span className="ml-5 text-body-s-r text-gray-scale-50">최대 n개까지 기록되며, 초과될 경우 오래된 순부터 삭제됩니다.</span>
              </p>
              <CButton onClick={allViewClickHandler} className="flex items-center text-body-s-r text-gray-scale-50 cursor-pointer">
                <p>전체 보기</p>
                <CImg className="w-4 h-4" src={right} alt="화살표" />
              </CButton>
            </div>
            <div className="bg-primary-0 border border-gray-scale-30 h-78.75 rounded-3xl">
              {userInfo !== '' ? (
                <HistoryAnalysis />
              ) : (
                <div className="flex flex-col h-full items-center justify-center">
                  <CImg className="w-15 h-15" src="" alt="로고" />
                  <p className="text-gray-scale-40 text-body-m-m">로그인 후 분석 내역을 확인하세요.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
