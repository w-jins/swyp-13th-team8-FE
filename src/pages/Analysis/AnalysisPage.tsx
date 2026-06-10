import { useEffect, useState } from 'react';
import CBreadcrumb from '@/components/common/CBreadcrumb';
import { useUserStore } from '@/store/useUserStore';
import { useCalcStore } from '@/store/useCalcStore';
import { UploadSection, HistorySection, AnalysisTabs } from './components/index';

const Analysis = () => {
  const userInfo = useUserStore((state) => state.userInfo.name);
  const resetStore = useCalcStore((state) => state.resetStore);
  const [activeTab, setActiveTab] = useState<'upload' | 'history'>('upload');
  // 업로드된 파일을 저장할 상태
  useEffect(() => {
    resetStore(); // 전역 상태 초기화!
  }, [resetStore]);

  return (
    <div className="w-full h-full flex flex-col md:gap-10 justify-between py-5 md:py-0">
      {/* 브레드스크럼 */}
      <CBreadcrumb items={[{ label: '약관 분석', path: '/analysis' }]} />
      <AnalysisTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="w-full sm:h-full flex flex-col gap-10">
        {/* 약관 불러오기 */}
        <UploadSection isActive={activeTab === 'upload'} userName={userInfo} />
        {/* 분석 히스토리 */}
        <HistorySection isActive={activeTab === 'history'} userName={userInfo} />
      </div>
    </div>
  );
};

export default Analysis;
