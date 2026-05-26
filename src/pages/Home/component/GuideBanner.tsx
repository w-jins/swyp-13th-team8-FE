import { bannerLanding } from '../../../assets';
import CImg from '../../../components/common/CImg';

/**
 * 왼쪽 아래 가이드 배너
 */
const GuideBanner = () => {
  return (
    <div className="max-w-98.75 h-full rounded-3xl">
      <CImg className="w-full h-full rounded-3xl" src={bannerLanding} alt="랜딩페이지 이동" />
    </div>
  );
};

export default GuideBanner;
