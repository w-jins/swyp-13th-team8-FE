import { mainAnalysis, mainGuide } from '@/assets';
import InfoCard from './InfoCard';

/**
 * 오른쪽 Info 카드 박스
 *
 */

// InfoCard에 들어가는 데이터배열
const cardList = [
  {
    id: 1,
    src: mainAnalysis,
    alt: '약관분석',
    title: '약관분석',
    path: '/analysis',
  },
  {
    id: 2,
    src: mainGuide,
    alt: '보험가이드',
    title: '실손보험 가이드',
    path: '/guide',
  },
];
const InfoSection = () => {
  return (
    <div className="flex flex-col gap-5 md:flex-1 h-full">
      {cardList.map((item) => (
        <InfoCard key={item.id} src={item.src} alt={item.alt} title={item.title} path={item.path} />
      ))}
    </div>
  );
};

export default InfoSection;
