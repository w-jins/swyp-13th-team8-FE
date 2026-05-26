import { useScrollSpy } from '../../hooks/useScrollspy';
import GuideLayout from './GuideLayout';

const EdiGuidePage = () => {
  const sectionIds = [{ id: 'section-1', label: '보험금 청구 시 꼭 필요한 ‘EDI 코드’란?' }];
  const activeId = useScrollSpy(sectionIds); // 훅 사용!
  return (
    <GuideLayout
      breadcrumbItems={[{ path: '/guide', label: '실손핏 가이드' }, { label: '기능 한눈에 보기' }]}
      sidebarContent={
        <ul className="space-y-4 text-sm">
          {sectionIds.map((item) => (
            <li
              key={item.id}
              className={`transition-colors ${
                activeId === item.id
                  ? 'text-primary-50 font-bold' // 화면에 보일 때 (파란색 + 굵게)
                  : 'text-gray-scale-50' // 안 보일 때 (회색)
              }`}
            >
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ul>
      }
    >
      <div className="w-full flex flex-col">
        {/* 2. 메인 타이틀 영역 */}
        <div className="flex border-b border-gray-scale-10 pb-8 mb-12 gap-3 items-center">
          <span className="inline-block rounded-full bg-primary-10 border-primary-20 text-primary-40 px-2 py-1 text-body-s-r">보험 용어</span>
          <p className="text-title-h2">EDI 코드 알아보기</p>
        </div>
        <div className="flex flex-col gap-16">
          {/* --- 섹션 1 --- */}
          <section>
            {/* 🟢 목차 이동을 위한 id와 헤더 가림 방지(scroll-mt-24) 적용 */}
            <h2 id="section-1" className="text-[20px] font-bold text-gray-scale-90 mb-6 scroll-mt-24">
              보험금 청구 시 꼭 필요한 ‘EDI 코드’란?
            </h2>
            <p className="text-gray-scale-70 text-[15px] pb-6">
              EDI 코드란, 건강보험심사평가원(HIRA)에서 제공하는 의료보험(요양급여비용) 청구 시 사용되는 표준 코드로, 진료 행위·약제·재료·질병 정보를
              코드로 구분해 보험 보장 여부 판단에 사용됩니다. 보험금 청구시 필수 구비 서류인 진료비 세부산정내역서에서 확인할 수 있어요.
            </p>
            <p className="text-gray-scale-70 text-[15px]">
              EDI 코드가 누락되면 보험사에서는 진료 행위를 인식할 수 없기 때문에 ‘서류 보완 요청’이나 ‘심사 보류’가 발생할 수 있어요. 일반 영수증은
              코드가 빠져있는 경우가 많으므로, 반드시 보험 청구용으로 별도 요청이 필요해요.
            </p>
          </section>
        </div>
      </div>
    </GuideLayout>
  );
};

export default EdiGuidePage;
