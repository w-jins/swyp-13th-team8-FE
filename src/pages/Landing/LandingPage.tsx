import { useNavigate } from 'react-router';
import {
  heroBg,
  heroMockup,
  landingFunction_1,
  landingFunction_2,
  landingFunction_3,
  landingGuide,
  landingLine,
  landingLogoType,
  landingOutro,
  landingProblem_1,
  landingProblem_2,
  landingProblem_3,
  landingProfile,
  landingProfile_1,
  landingProfile_2,
  landingProfile_3,
  landingSolution,
} from '../../assets';
import CButton from '../../components/common/CButton';
import CImg from '../../components/common/CImg';
import Header from '../../components/layout/Header';

const PROBLEMITEMS = [
  { id: 1, label: '부모님이 가입해주셨던 보험, 내가 관리하자니 혜댁은 뭐가 뭔지 모르겠고', src: landingProblem_1 },
  { id: 2, label: '새로 가입하고 싶어도 나에게 필요한 보장을 모르겠고', src: landingProblem_2 },
  { id: 3, label: '제대로 알아보려 마음 먹어도 약관은 수백 장에 용어는 어렵기까지...', src: landingProblem_3 },
];

/* 랜딩 페이지 */
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex relative overflow-auto flex-col bg-gray-scale-">
      <Header />

      {/* 1. 메인 섹션 */}
      <section className="relative w-full max-w-7xl h-137 mx-auto mb-180 bg-linear-to-b from-[#D9D9D9] to-[#FFFFFF] rounded-t-[40px]">
        <div>
          <CImg src={heroBg} loading="eager" fetchPriority="high" alt="메인 히어로 배너" />
        </div>
        <div className="absolute flex flex-col gap-4 top-30 left-15">
          <p className="text-title-h1">
            복잡한 실손보험, <br />
            실손핏으로 핏하게 판단하세요
          </p>
          <p className="text-gray-scale-60">
            어려운 보험 약관 이해부터 환급금 계산까지, <br />
            실손핏과 함께 쉽고 빠르게 확인해보세요.
          </p>
          <CButton onClick={() => navigate('/home')} className="bg-primary-50 md:px-3 py-4 text-white">
            지금 시작하기
          </CButton>
        </div>
        {/* 오른쪽 아래 배너 */}
        <div className="absolute right-0 top-50 w-full max-w-210 h-138.75">
          <CImg className="w-full" src={heroMockup} alt="메인 히어로 서브 이미지" />
        </div>
      </section>

      <CImg className="left-1/2 top-250 absolute h-53.25" src={landingLine} alt="라인" />

      {/* 2. 문제 섹션  */}
      <section className="w-full pb-20">
        <div className="w-full max-w-7xl flex flex-col mx-auto items-center gap-20">
          <h2 className="text-title-h2 text-center">
            매달 무작정 내고 있는 실본보험료. <br />
            <span className="inline-block pt-1 text-primary-50">그런데, 받을 수 있는 보장은 정확히 알고 계신가요?</span>
          </h2>
          <div className="w-full flex justify-center gap-16">
            {PROBLEMITEMS.map((items) => (
              <div
                key={items.id}
                className="flex flex-col gap-6 bg-linear-to-b from-[#F8FAFF] to-[#EFF4FF] border border-[#BAD1FF] p-6 w-full max-w-75.5 rounded-2xl h-full max-h-87.5"
              >
                <p className="text-gray-scale-60">{items.label}</p>
                <div className="max-w-47 max-h-47 w-47 h-47 self-end">
                  <CImg className="w-full h-full md:object-contain" src={items.src} alt="사진" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 솔루션 설명 부분 */}
      <section className="w-full bg-linear-to-b from-[#FFFFFF] via-[#D8E3FF]  to-[#A7C0FF] h-256">
        <div className="w-full p-30 flex flex-col items-center justify-center gap-30">
          <p className="pt-10 inline-block max-w-163 w-full text-body-r-m text-gray-scale-60 text-center">
            정작 필요할 때 어떤 보장을 받을 수 있는지 몰라 막막함을 느끼고 청구를 망설이는 경우도 많습니다. <br />
            이러한 보험에 대해 이해 부족은 불완전한 가입과 과도한 보험 영업 피해로까지 이어질 수 있어요.
          </p>
          <div className="w-2/5">
            <CImg className="" src={landingSolution} alt="캐릭터 활용" />
          </div>
          <span>
            <p className="text-title-h1">
              실손핏은 복잡한 보험을 <span className="text-primary-50">읽는 것에서 끝나지 않도록 돕습니다.</span>
            </p>
            <p className="text-body-m-m text-center text-gray-scale-70 pt-5">
              약관을 쉽게 해석하고, 내 상황에서 어떤 보장을 받을 수 있는지 직접 판단할 수 있도록 도와드려요.
            </p>
          </span>
        </div>
      </section>
      {/* 4. 솔루션 요약 */}
      <section className="w-full bg-gray-scale-0 h-250 items-center py-50 px-30">
        <div className="flex flex-col items-center justify-center gap-50">
          <div>
            <p className="text-title-h1">
              실손핏의 보험 도우미, <span className="text-primary-50">피티를 소개합니다!</span>
            </p>
            <p className="pt-5 text-body-m-m text-gray-scale-40 text-center">필요한 정보만 쉽게 찾을 수 있도록 피티가 함께 도와드릴게요.</p>
          </div>

          <div className="relative w-full flex items-center justify-center">
            <CImg src={landingProfile} alt="대표이미지" />
            <CImg className="absolute right-60 -top-35" src={landingProfile_1} alt="대표이미지" />
            <CImg className="absolute left-20 -top-20" src={landingProfile_2} alt="대표이미지" />
            <CImg className="absolute right-25 -top-8" src={landingProfile_3} alt="대표이미지" />
          </div>
        </div>
      </section>

      <section className="relative w-full h-75 bg-linear-to-t from-[#70B7FE] to-[#1A65FF]">
        <CImg className="absolute -bottom-9.5 left-20" src={landingGuide} alt="이미지" />

        <div className="text-white absolute text-title-h1 right-50 top-35">
          피티와 함께 보는 <span className="inline-flex p-1 bg-white text-primary-50">실손핏 기능 가이드</span>
        </div>
      </section>
      {/* 5-1. 기능 설명 */}
      <section className="w-full bg-primary-10 pt-70">
        <div className="max-w-7xl w-full flex flex-col mx-auto gap-40 px-10">
          <div className="flex gap-10">
            <div className="">
              <CImg src={landingFunction_1} alt="설명1" />
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <p className="pb-6 text-primary-50 text-title-h4">내 보험 관리의 시작</p>
              <p className="text-title-h1">실손보험 정보 등록</p>
              <p className="inline-block w-110 text-gray-scale-50">
                가입된 실손보험 정보를 등록해 저장하고, <br />내 보험 구조와 보장 내용을 쉽게 꺼내볼 수 있어요.
              </p>
            </div>
          </div>
          <div className=" flex gap-30 justify-end">
            <div className="flex flex-col gap-3 justify-center">
              <p className="pb-6 text-primary-50 text-title-h4">복잡한 약관도 간단하게</p>
              <p className="text-title-h1">AI 약관 분석</p>
              <p className="inline-block text-gray-scale-50">
                내 보험 또는 보험 약관 PDF를 업로드하면 AI가 핵심 보장 내용과 중요한
                <br />
                조항을 분석해드려요. 읽기 힘든 수백 페이지의 약관에서 <br />
                당신에게 필요한 내용만 확인할 수 있습니다.
              </p>
            </div>
            <div className="">
              <CImg src={landingFunction_2} alt="설명2" />
            </div>
          </div>
        </div>
      </section>
      {/* 5-2. 실손핏 기능 가이드 */}
      <section className="w-full h-307 bg-primary-10 px-30 pt-40">
        <div className="max-w-7xl w-full flex flex-col mx-auto gap-20">
          <div className="w-full flex flex-col gap-6 pl-5">
            <p className="pb-6 text-primary-50 text-title-h4">간편하게 가늠해보는 보장 가이드</p>
            <p className="text-title-h1">예상 환급 시뮬레이션</p>
            <p className="inline-block text-gray-scale-50">
              저장한 보험의 약관을 기반으로, 병원비와 진료 정보를 입력하면 예상 환급 가능 여부와 환금액을 계산할 수 있어요.
              <br />더 신뢰감 있는 결과를 위해 게산 근거와 보장 비율 등 구체적인 내용을 시각화 하여 제공합니다.
            </p>
          </div>
          <div>
            <CImg className="md:object-contain" src={landingFunction_3} alt="소개" />
          </div>
        </div>
      </section>

      {/* 6. 결론 */}
      <section className="w-full py-40">
        <div className="h-full flex flex-col gap-30 items-center justify-center">
          <div className="flex w-full items-center justify-center gap-30">
            <CImg className="w-1/3" src={landingLogoType} alt="로고" />
            <div className="relative flex flex-col gap-15">
              <p className="text-title-h1">
                실손핏과 보험을 더 쉽게, <br />
                내게 핏하게 이해해보세요.
              </p>
              <CImg className="absolute -right-5 -top-10" src={landingOutro} alt="체크" />
              <CButton
                onClick={() => navigate('/home')}
                className="bg-primary-50 text-white md:rounded-xl px-24 py-4 cursor-pointer"
                children="실손핏 시작하기"
              />
            </div>
          </div>
          <p className="text-gray-scale-40">
            본 서비스에서 도출된 결과는 참고용이며, 실제 보험금 지급 여부 및 금액은 보험사 심사 기준 및 특약에 따라 달라질 수 있습니다.
          </p>
        </div>
      </section>

      {/* 7. 푸터 */}
      <section className="w-full px-10 py-20 bg-gray-scale-100">
        <div className="max-w-7xl w-full mx-auto flex flex-col gap-30">
          <div className="flex flex-row justify-between">
            <p className="text-gray-scale-50">이용약관 | 개인정보처리방침</p>
            <p className="text-gray-scale-50">ⓒ 2026 실손핏. All Rights Reserved.</p>
            <p className="text-gray-scale-50">스위프 SWYP 챌린지 웹 13기 8팀</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
