import { useEffect } from 'react';
import { useCalcStore } from '../../store/useCalcStore.ts';
import CalculatorForm from './component/CalculatorForm.tsx';
import GuideBanner from './component/GuideBanner.tsx';
import HeroSection from './component/HeroSection.tsx';
import InfoCards from './component/InfoCards.tsx';

/**
 * 메인 페이지 레이아웃 및 배치 컴포넌트
 *
 */
const Home = () => {
  const resetStore = useCalcStore((state) => state.resetStore);
  useEffect(() => {
    resetStore(); // 전역 상태 초기화!
  }, [resetStore]);
  return (
    <div className="flex flex-1 max-w-335 h-full flex-col gap-5 py-5 md:py-0">
      {/* 상단 섹션 */}
      <div className="flex flex-col md:flex-row w-full gap-5">
        <HeroSection />
        <InfoCards />
      </div>
      {/* 하단 섹션 */}
      <div className="flex flex-col md:flex-row w-full gap-5 flex-1">
        <GuideBanner />
        <CalculatorForm />
      </div>
    </div>
  );
};

export default Home;
