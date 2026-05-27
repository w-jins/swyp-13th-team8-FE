import { useNavigate } from 'react-router';
import { historyEmpty, right } from '../../assets';
import CBreadcrumb from '../../components/common/CBreadcrumb';
import CButton from '../../components/common/CButton';
import CImg from '../../components/common/CImg';
import PdfUploader from './component/PdfUploader';
import { useUserStore } from '../../store/useUserStore';
import HistoryAnalysis from './component/HistoryAnalysis';
import { useEffect, useState } from 'react';
import { useCalcStore } from '../../store/useCalcStore';

const Analysis = () => {
  const userInfo = useUserStore((state) => state.userInfo.name);
  const resetStore = useCalcStore((state) => state.resetStore);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upload' | 'history'>('upload');
  // 업로드된 파일을 저장할 상태
  useEffect(() => {
    resetStore(); // 전역 상태 초기화!
  }, [resetStore]);
  const allViewClickHandler = () => {
    navigate('/mypage');
  };
  return (
    <div className="w-full h-full flex flex-col md:gap-10 justify-between py-5 md:py-0">
      {/* 브레드스크럼 */}
      <div>
        <CBreadcrumb items={[{ label: '약관 분석', path: '/analysis' }]} />
      </div>

      <div className="flex bg-gray-scale-10 p-1 rounded-full md:hidden w-full max-w-[320px] mx-auto mb-2">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-2.5 text-body-s-b rounded-full transition-all duration-200 ${
            activeTab === 'upload' ? 'bg-white text-primary-50 shadow-xs' : 'text-gray-scale-50'
          }`}
        >
          약관 분석
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2.5 text-body-s-b rounded-full transition-all duration-200 ${
            activeTab === 'history' ? 'bg-white text-primary-50 shadow-xs' : 'text-gray-scale-50'
          }`}
        >
          분석 히스토리
        </button>
      </div>

      <div className="w-full sm:h-full flex flex-col gap-10">
        {/* 약관 불러오기 */}
        <div className={`flex h-full md:h-auto flex-col gap-4 md:gap-6 ${activeTab === 'upload' ? 'block' : 'hidden'}`}>
          <p className="text-title-h3 hidden md:block">약관 불러오기</p>
          <PdfUploader name={userInfo} />
        </div>

        {/* 분석 히스토리 */}
        <div className={`h-full md:h-auto md:block ${activeTab === 'history' ? 'block' : 'hidden'}`}>
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
              {userInfo !== '' ? (
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
      </div>
    </div>
  );
};

export default Analysis;
