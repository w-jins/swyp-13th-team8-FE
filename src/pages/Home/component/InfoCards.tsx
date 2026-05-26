import { useNavigate } from 'react-router';
import CImg from '../../../components/common/CImg';
import { bannerAnalysis, bannerGuide } from '../../../assets';

/**
 * 오른쪽 Info 카드 박스
 *
 */
const InfoCards = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 max-w-96.25 h-full">
      <div
        onClick={() => navigate('/analysis')}
        className="relative w-78.75 h-1/2 rounded-tr-[60px] rounded-bl-[60px] rounded-3xl bg-primary-10 text-primary-50 p-8 cursor-pointer"
      >
        <p className="relative text-title-h4">약관분석</p>
        <CImg className="absolute bottom-5 right-5 w-45" src={bannerAnalysis} alt="약관분석 이동" />
      </div>
      <div
        onClick={() => navigate('/guide')}
        className="relative w-78.75 h-1/2 rounded-tr-[60px] rounded-bl-[60px] rounded-3xl bg-primary-10 text-primary-50 p-8 cursor-pointer"
      >
        <p className="relative text-title-h4">실손보험 가이드</p>
        <CImg className="absolute bottom-5 right-5 w-45" src={bannerGuide} alt="보험가이드 이동" />
      </div>
    </div>
  );
};

export default InfoCards;
