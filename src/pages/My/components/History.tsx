import { useState } from 'react';

import MypageHistoryAnalysis from './histories/MypageHistoryAnalysis';
import MypageHistoryCalculator from './histories/MypageHistoryCalculator';

const History = () => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'calculator'>('analysis');

  const tabs = [
    { id: 'analysis', label: '약관분석' },
    { id: 'calculator', label: '환급금 계산기' },
  ] as const;

  return (
    <div>
      <div className=" flex gap-5 mt-13">
        <p className="text-title-h3">히스토리</p>

        <p className="text-gray-scale-50 text-body-s-r mt-2">최대 n개까지 기록되며, 초과할 경우 오래된 순부터 삭제됩니다.</p>
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

      <div>{activeTab === 'analysis' ? <MypageHistoryAnalysis /> : <MypageHistoryCalculator />}</div>
    </div>
  );
};

export default History;
