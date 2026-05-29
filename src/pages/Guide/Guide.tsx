import CBreadcrumb from '../../components/common/CBreadcrumb';
import { useNavigate } from 'react-router';
import { dictionaryItems } from '../../constants/guide';
import CImg from '../../components/common/CImg';
import { guideAbility, guideBanner, guideFAQ, guideIconAbility, guideIconBannerArrow, guideResult } from '../../assets';

const Guide = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden pb-10">
      {/* 1. Breadcrumb (경로) */}
      <div className="mx-auto p-2">
        <CBreadcrumb items={[{ label: '실손핏가이드', path: '/mypage/guide' }]} />
      </div>

      <div className=" mx-auto flex flex-col gap-8">
        {/* 2. 상단 히어로 배너 */}
        <section className="bg-[#3F7DFA] rounded-3xl md:rounded-tl-full md:rounded-bl-full  text-white shadow-sm">
          <div className="relative p-12 lg:p-16">
            <CImg className="hidden md:block absolute bottom-0 right-5" src={guideBanner} alt="메인 배너" />
            <p className="text-title-h1 font-bold mb-6 tracking-tight">실손핏, 핏하게 이해해보세요.</p>
            <p className="text-blue-50 text-base text-body-sm-r leading-relaxed font-medium">
              보험 기초 이해부터 기능 사용법까지,
              <br />
              실손핏을 제대로 사용하는 방법을 알려드려요.
            </p>
          </div>
        </section>

        {/* 3. 메인 하단 그리드 레이아웃 (좌측 콘텐츠 2 / 우측 사이드바 1) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 좌측 메인 영역 */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* 기능 한눈에 보기 카드 */}
            <div
              onClick={() => navigate('/guide/feature')}
              className="flex flex-col relative justify-center cursor-pointer transition-transform hover:-translate-y-1"
            >
              <CImg className="w-full block object-top-left" src={guideIconAbility} alt="배경이미지" />
              <CImg className="hidden md:block absolute bottom-7 right-5" src={guideAbility} alt="기능카드" />

              <div className="absolute inset-0 flex flex-col justify-center pl-7 z-10">
                <p className="text-title-h4 md:text-title-h3 pb-2">기능 한눈에 보기</p>
                <p className="text-gray-scale-80 text-body-s-r md:text-body-m-r">
                  신규 이용자라면?
                  <br />
                  실손핏의 주요 기능과 사용법을 한눈에 알아보세요.
                </p>
              </div>
            </div>

            {/* 하단 서브 카드 2개 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative bg-white border border-gray-100 rounded-[32px] px-8 py-10 h-[260px] flex flex-col shadow-sm cursor-pointer transition-transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-gray-900 mb-4">내 결과 이해하기</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  도출된 분석, 계산 결과를
                  <br />더 똑똑하게 읽어볼까요?
                </p>
                <CImg className="absolute left-5 bottom-5" src={guideIconBannerArrow} alt="결과 이해하기" />
                <CImg className="absolute right-7 bottom-10" src={guideResult} alt="결과 이해하기" />
              </div>
              <div
                onClick={() => navigate('/guide/question')}
                className="relative bg-white border border-gray-100 rounded-[32px] px-8 py-10 h-[260px] flex flex-col shadow-sm cursor-pointer transition-transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">자주 묻는 질문</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  이용 중 자주 묻는 질문과
                  <br />
                  답변을 모아봤어요.
                </p>
                <CImg className="absolute right-7 bottom-10" src={guideFAQ} alt="결과 이해하기" />
                <CImg className="absolute left-5 bottom-5" src={guideIconBannerArrow} alt="결과 이해하기" />
              </div>
            </div>
          </div>

          {/* 우측 사이드바 영역 (실손보험 기초 사전) */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm flex flex-col">
            <h3 className="text-[22px] font-bold text-gray-900 mb-6">실손보험 기초 사전</h3>

            <div className="flex-1 flex flex-col">
              {dictionaryItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => navigate(item.src)}
                  className={`flex items-center justify-between py-5 cursor-pointer group ${
                    index !== dictionaryItems.length - 1 ? 'border-b border-gray-100' : 'mb-4'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* 이미지 자리 표시자 */}
                    <div className={`w-[52px] h-[52px] rounded-full ${item.bgColor} `}>
                      <CImg className="rounded-full" src={item.imgSrc} alt="사진" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-semibold text-[#5284FA]">{item.category}</span>
                      <span className="text-base font-bold text-gray-800">{item.title}</span>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-300 group-hover:text-[#5284FA] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
            {/* 추후 필요하면 생성 */}
            {/* <button className="w-full bg-[#EBF1FF] text-[#5284FA] font-bold py-4 rounded-2xl mt-auto transition-colors hover:bg-[#dbe6fe]">
              보험 사전 더보기
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
