import { useNavigate } from 'react-router';
import { useScrollSpy } from '../../hooks/useScrollspy';
import GuideLayout from './GuideLayout';

const FeatureGuidePage = () => {
  const sectionIds = [
    { id: 'section-1', label: '핵심 기능 소개' },
    { id: 'section-2', label: '실손핏, 이렇게 진행돼요' },
  ];
  const activeId = useScrollSpy(sectionIds); // 훅 사용!
  const navigate = useNavigate();

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
        {/* 1. 메인 타이틀 영역 */}
        <div className="border-b border-gray-scale-10 pb-8 mb-12">
          <h1 className="text-[28px] font-bold text-gray-scale-90 mb-3">기능 한눈에 보기</h1>
          <p className="text-gray-scale-50 text-[15px]">실손핏 사용 가이드 신규 이용자라면? 실손핏의 주요 기능과 사용법을 한눈에 알아보세요.</p>
        </div>

        <div className="flex flex-col gap-16">
          {/* --- 섹션 1 --- */}
          <section>
            {/* 🟢 목차 이동을 위한 id와 헤더 가림 방지(scroll-mt-24) 적용 */}
            <h2 className="text-[20px] font-bold text-gray-scale-90 mb-6 scroll-mt-24">
              매달 실손보험료를 내고 있지만, 정작 보험 청구는 망설여진 적 있나요?
            </h2>
            <ul className="list-disc pl-5 text-gray-scale-70 space-y-3 mb-8 text-[15px] leading-relaxed">
              <li>가입한 보험 이름은 알아도, 정작 내가 받을 수 있는 혜택은 모를 때</li>
              <li>MRI, 도수치료 등의 비급여 치료 전 "이거 환급이 될까?" 불안한 마음으로 검색해 볼 때</li>
              <li>수백 페이지의 약관을 펼쳤다가 어려운 보험 용어와 복잡함에 포기할 때</li>
            </ul>
            <p className="text-gray-scale-70 text-[15px]">복잡한 실손보험, 이제는 실손핏으로 환급 가능 여부와 예상 금액을 간단히 확인해보세요.</p>
          </section>

          {/* --- 섹션 2 --- */}
          <section>
            <h2 id="section-1" className="text-[20px] font-bold text-gray-scale-90 mb-8 scroll-mt-24">
              핵심 기능 소개
            </h2>
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-[17px] font-bold text-gray-scale-90 mb-3 flex items-center gap-2">
                  <span>📃</span> 맞춤형 약관 분석
                </h3>
                <p className="text-gray-scale-70 text-[15px] leading-relaxed">
                  보험 약관 PDF를 업로드하거나 회원가입 시 저장한 보험을 불러오면 약관의 핵심 내용을 요약해요.
                  <br />
                  읽기 힘든 수백 페이지의 PDF 약관에서 당신에게 필요한 정보만 추출합니다.
                </p>
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-gray-scale-90 mb-3 flex items-center gap-2">
                  <span>💵</span> 예상 환급금 시뮬레이션
                </h3>
                <p className="text-gray-scale-70 text-[15px] leading-relaxed">
                  병원비와 진료 정보를 입력하면 실제 보험 약관 로직을 바탕으로 환급 가능성을 진단합니다.
                  <br />
                  환급 가능 여부와 예상 환급 금액을 산출합니다.
                </p>
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-gray-scale-90 mb-3 flex items-center gap-2">
                  <span>📋</span> 투명한 계산 근거 제공
                </h3>
                <p className="text-gray-scale-70 text-[15px] leading-relaxed">
                  결과값에 대한 신뢰를 위해 산출 근거를 함께 제시합니다.
                  <br />
                  공제 금액, 보장 비율 등 결과가 도출된 구체적인 사유를 시각화합니다.
                </p>
              </div>
            </div>
          </section>

          {/* --- 섹션 3 --- */}
          <section>
            <h2 id="section-2" className="text-[20px] font-bold text-gray-scale-90 mb-6 scroll-mt-24">
              실손핏, 이렇게 진행돼요
            </h2>
            <div className="bg-gray-scale-5 rounded-[24px] p-8 md:p-10 flex flex-col gap-10">
              <div>
                <h3 className="font-bold text-[16px] text-gray-scale-90 mb-1">STEP 1. 내 실손보험 등록</h3>
                <p className="font-bold text-[15px] text-gray-scale-90 mb-3">내 보험 진단의 시작</p>
                <ul className="list-disc pl-5 text-gray-scale-70 space-y-2 text-[14px]">
                  <li>보유 중인 실손보험의 보험사 및 가입 시기(세대별 실손 구분)를 선택합니다.</li>
                  <li>빅5 손보사(삼성화재·DB손해보험·메리츠화재·현대해상·KB손해보험) 이외의 보험사의 경우 해당 세대의 표준약관 기반으로 분석해요.</li>
                  <li>Tip: 세대 별 보장 비율이 다르므로 정확한 가입 시기를 입력해주세요.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[16px] text-gray-scale-90 mb-1">STEP 2. 진료 정보 입력</h3>
                <p className="font-bold text-[15px] text-gray-scale-90 mb-3">필수 정보 입력</p>
                <ul className="list-disc pl-5 text-gray-scale-70 space-y-2 text-[14px]">
                  <li>항목 선택: 외래 또는 입원 여부 선택</li>
                  <li>비용 입력: 실제 발생한 병원비 입력</li>
                  <li>정밀 진단(선택): 요양급여수가코드(EDI) 입력 시 더욱 정밀한 분석이 가능합니다.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[16px] text-gray-scale-90 mb-1">STEP 3. 분석 보고서 확인</h3>
                <p className="font-bold text-[15px] text-gray-scale-90 mb-3">간편하게 가늠해보는 보장 가이드</p>
                <ul className="list-disc pl-5 text-gray-scale-70 space-y-2 text-[14px]">
                  <li>최종 결과: 환급 가능 여부 및 예상 환급 금액 산출</li>
                  <li>브리핑 및 시각화: 시각화한 계산 근거 및 사유를 확인할 수 있어요.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* --- 하단 연결 배너 --- */}
          <div
            onClick={() => navigate('/guide/dictionary')} // 기초 사전 페이지로 이동
            className="border border-gray-scale-10 rounded-2xl p-6 flex items-center justify-between cursor-pointer hover:bg-gray-scale-5 transition-colors mt-4"
          >
            <div className="flex items-center gap-5">
              <div className="w-[60px] h-[60px] bg-primary-50 rounded-xl flex-shrink-0"></div>
              <div>
                <p className="text-[18px] font-bold text-gray-scale-90 mb-1">실손보험 기초 사전</p>
                <p className="text-[13px] text-gray-scale-50 break-keep">이해하기 어려운 부분이 있다면? 보험 기초 사전을 확인해보세요.</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-scale-40 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </GuideLayout>
  );
};

export default FeatureGuidePage;
