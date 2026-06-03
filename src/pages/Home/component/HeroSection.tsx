import { main } from '../../../assets';
import CImg from '../../../components/common/CImg';

/**
 * 메인 페이지 가장 큰 배너
 *
 */
const HeroSection = () => {
  return (
    <div className="relative md:flex-[2.5] h-109 md:overflow-hidden bg-primary-50 rounded-3xl">
      <div className="absolute z-1 w-full h-auto md:h-full bg-linear-to-b from-[#ffffff] to-[#000000] opacity-15 rounded-3xl" />
      <div className="absolute bottom-5 left-5 md:bottom-10 md:left-10 text-title-h2 md:text-title-h1 drop-shadow-lg text-gray-scale-0 z-2">
        내가 낸 병원비,
        <br />
        얼마나 돌려받을 수 있을까?
      </div>
      <CImg className="absolute inset-0 w-full h-full rounded-3xl sm:object-right" src={main} fetchPriority="high" alt="메인 베너" />
    </div>
  );
};

export default HeroSection;
