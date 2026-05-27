import { useState } from 'react';

import CBreadcrumb from '../../../../../components/common/CBreadcrumb';

import SaveHistoryAnalysis from './SaveHistoryAnalysis';
import SaveHistoryCalculator from './SaveHistoryCalculator';

const SavePage = () => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'calculator'>('analysis');

  const tabs = [
    { id: 'analysis', label: '약관분석' },
    { id: 'calculator', label: '환급금 계산기' },
  ] as const;

  return (
    <div className="h-full">
      <div className=" flex flex-col gap-10">
        <CBreadcrumb items={[{ label: '마이페이지', path: '/mypage' }, { label: '저장된 히스토리' }]} />
        <p className="text-title-h3">저장된 히스토리</p>
      </div>

      <div className=" w-fit px-1 py-1 mt-7 rounded-full bg-gray-scale-20 ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={` w-[130px] h-[35px]  rounded-full text-[13px] text-body-m-m transition-all duration-200 bg-gray-scale-20 ${
              activeTab === tab.id
                ? 'bg-white text-primary-50 mx-0.5 ' // 선택 시: 흰 배경 + 파란 글씨
                : ' text-gray-scale-50' // 미선택 시: 배경 없음 + 회색 글씨
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex h-full">{activeTab === 'analysis' ? <SaveHistoryAnalysis /> : <SaveHistoryCalculator />}</div>
    </div>
  );
};

export default SavePage;
