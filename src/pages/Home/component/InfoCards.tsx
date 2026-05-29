import { useNavigate } from 'react-router';
import CImg from '../../../components/common/CImg';
import { mainAnalysis, mainGuide } from '../../../assets';

/**
 * 오른쪽 Info 카드 박스
 *
 */
const InfoCards = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 md:flex-1 h-full">
      <div
        onClick={() => navigate('/analysis')}
        className="relative w-full h-1/2 rounded-tr-[60px] rounded-bl-[60px] rounded-3xl bg-[#E4EDFF] bg-linear-to-b from-[#CDDFFF] to-[#EBF3FF] text-primary-50 p-8 cursor-pointer shadow-[inset_0_0_20px_rgba(99,156,255,0.4)]"
      >
        <p className="relative text-title-h4">약관분석</p>
        <CImg className="absolute bottom-0 right-5 w-40" src={mainAnalysis} alt="약관분석 이동" />
      </div>
      <div
        onClick={() => navigate('/guide')}
        className="relative w-full h-1/2 rounded-tr-[60px] rounded-bl-[60px] rounded-3xl bg-[#E4EDFF] bg-linear-to-b from-[#CDDFFF] to-[#EBF3FF] text-primary-50 p-8 cursor-pointer shadow-[inset_0_0_20px_rgba(99,156,255,0.4)]"
      >
        <p className="relative text-title-h4">실손보험 가이드</p>
        <CImg className="absolute bottom-0 right-5 w-40" src={mainGuide} alt="보험가이드 이동" />
      </div>
    </div>
  );
};

export default InfoCards;
