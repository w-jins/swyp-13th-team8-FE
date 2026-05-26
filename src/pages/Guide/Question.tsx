import { useState } from 'react';
import CBreadcrumb from '../../components/common/CBreadcrumb';
import { faqData } from '../../constants/guide';

const Question = () => {
  const [activeTab, setActiveTab] = useState<'all'>('all');
  // 🟢 열려있는 아코디언의 ID를 관리 (기본값 1번 오픈)
  const [openId, setOpenId] = useState<number | null>(0);

  // 추후 텝이 많아지면 추가
  const tabs = [{ id: 'all', label: '전체' }] as const;

  return (
    <div className="w-full flex flex-col gap-5">
      {/* --- 기존 상단 영역 유지 --- */}
      <div>
        <CBreadcrumb items={[{ label: '실손핏가이드', path: '/guide' }, { label: '자주 묻는 질문' }]} />
      </div>
      <div>
        <p className="text-title-h3">자주 묻는 질문</p>
      </div>
      <div className="w-fit px-1 py-1 rounded-full bg-gray-scale-20 ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={` w-[130px] h-[35px]  rounded-full text-[13px] text-body-m-m transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-primary-50 mx-0.5 shadow-sm' // 선택 시: 흰 배경 + 파란 글씨
                : 'text-gray-scale-50 hover:text-gray-scale-60' // 미선택 시
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* --- 새로 추가된 FAQ 리스트 --- */}
      <div className="bg-white border border-gray-scale-10 rounded-2xl p-6 shadow-sm mt-4">
        <div className="flex flex-col">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div key={faq.id} className="border-b border-gray-scale-10 last:border-b-0">
                {/* 1. 질문 (Q) 영역 */}
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex justify-between items-center py-6 text-left outline-none group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-scale-40 font-bold text-[20px]">Q.</span>
                    <span
                      className={`font-bold text-[15px] transition-colors ${isOpen ? 'text-gray-scale-90' : 'text-gray-scale-70 group-hover:text-gray-scale-90'}`}
                    >
                      {faq.question}
                    </span>
                  </div>
                  {/* 화살표 아이콘 */}
                  <svg
                    className={`w-5 h-5 text-gray-scale-40 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 🟢 2. 답변 (A) 영역 - 스르륵 애니메이션 적용 */}
                {/* isOpen 조건부 렌더링을 없애고, grid-rows-[1fr]과 [0fr]로 높이를 조절합니다! */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  {/* 높이가 0이 될 때 안의 내용이 삐져나오지 않도록 overflow-hidden 적용 */}
                  <div className="overflow-hidden">
                    <div className="bg-gray-scale-5 rounded-2xl p-6 mb-6 flex gap-3">
                      <span className="text-primary-50 font-bold text-[20px]">A.</span>
                      <p className="text-gray-scale-70 text-[14px] leading-relaxed pt-[3px] font-medium">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Question;
