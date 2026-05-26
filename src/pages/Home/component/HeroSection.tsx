import { bannerTop } from '../../../assets';
import CImg from '../../../components/common/CImg';

/**
 * 메인 페이지 가장 큰 배너
 *
 */
const HeroSection = () => {
  return (
    <div className="relative max-w-233.75 w-full h-109 overflow-hidden">
      <div className="absolute z-1 w-full h-full bg-linear-to-b from-[#ffffff] to-[#000000] opacity-15 rounded-3xl" />
      <div className="absolute bottom-10 left-10 text-title-h1 text-gray-scale-0 z-2">
        내가 낸 병원비,
        <br />
        얼마나 돌려받을 수 있을까?
      </div>
      <CImg className="absolute inset-0 w-full h-full rounded-3xl" src={bannerTop} alt="메인 베너" />
    </div>
  );
};

export default HeroSection;
