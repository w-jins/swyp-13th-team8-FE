import React from 'react';
import CBreadcrumb from '../../components/common/CBreadcrumb';

interface GuideLayoutProps {
  breadcrumbItems: { label: string; path?: string }[];
  sidebarContent: React.ReactNode; // 우측 사이드바에 들어갈 내용
  children: React.ReactNode; // 좌측 메인 카드에 들어갈 내용 (핵심!)
}

const GuideLayout = ({ breadcrumbItems, sidebarContent, children }: GuideLayoutProps) => {
  return (
    <div className="w-full flex flex-col gap-5">
      {/* 1. 공통 상단 경로 */}
      <div>
        <CBreadcrumb items={breadcrumbItems} />
      </div>

      <div className="flex items-start gap-8">
        {/* 2. 좌측 메인 콘텐츠 영역 (흰색 카드) */}
        <main className="flex-1 bg-white rounded-[32px] p-10 shadow-sm border border-gray-scale-10">
          <div className="w-full h-[180px] bg-primary-50 rounded-2xl mb-10"></div>

          {/* 🟢 여기가 마법의 공간! 페이지마다 다르게 전달한 내용이 이 자리에 쏙 들어옵니다. */}
          <div className="flex flex-col gap-8">{children}</div>
        </main>

        {/* 3. 우측 사이드바 영역 (스크롤 따라다니게 sticky 적용) */}
        <aside className="w-[280px] flex-shrink-0 sticky top-24">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-scale-10">{sidebarContent}</div>
        </aside>
      </div>
    </div>
  );
};

export default GuideLayout;
