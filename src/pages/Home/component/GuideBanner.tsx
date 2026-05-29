import { useNavigate } from 'react-router';
import { mainArrow, mainFAQ, mainLanding } from '../../../assets';
import CImg from '../../../components/common/CImg';

/**
 * 왼쪽 아래 가이드 배너
 */
const GuideBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 flex-1 h-full">
      {/* 1. 자주묻는 질문 카드 */}
      <div
        onClick={() => navigate('/guide/question')}
        className="relative px-7 py-10 md:py-5 w-full flex-1 bg-gray-scale-0 text-primary-70 rounded-3xl overflow-hidden shadow-[inset_0_0_10px_rgba(199,207,240,1)]"
      >
        <div className="relative z-10">
          <p className="font-bold">자주묻는 질문</p>
        </div>
        <CImg className="absolute bottom-0 right-5 h-auto md:object-contain" src={mainFAQ} alt="FAQ" />
      </div>

      {/* 2. 피티 가이드 카드 */}
      <div
        onClick={() => navigate('/')}
        className="hidden md:flex relative min-h-[280px] px-7 py-8 w-full flex-2 rounded-3xl bg-linear-to-b from-[#CDDFFF] to-[#EBF3FF] overflow-hidden shadow-[inset_0_0_14px_rgba(99,156,255,0.4)]"
      >
        <div className="relative z-10">
          <p>
            <span className="text-primary-40 font-semibold">실손핏이 더 궁금하다면?</span> <br />
            <span className="text-title-h2 font-bold leading-snug">피티와 함께 알아보세요!</span>
          </p>
        </div>
        <CImg className="absolute bottom-0 right-0 w-4/5" src={mainLanding} alt="랜딩페이지 이동" />
        <CImg className="absolute bottom-10 left-7" src={mainArrow} alt="화살표" />
      </div>
    </div>
  );
};

export default GuideBanner;
