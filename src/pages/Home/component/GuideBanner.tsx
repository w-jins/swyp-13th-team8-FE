import { bannerLanding } from '../../../assets';
import CImg from '../../../components/common/CImg';

/**
 * 왼쪽 아래 가이드 배너
 */
const GuideBanner = () => {
  return (
    <div className="flex flex-1 h-full rounded-3xl items-center justify-center md:overflow-hidden">
      <CImg className="w-full h-full rounded-3xl" src={bannerLanding} alt="랜딩페이지 이동" />
    </div>
  );
};

export default GuideBanner;
