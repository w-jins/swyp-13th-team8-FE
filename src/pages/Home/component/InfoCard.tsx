import { useNavigate } from 'react-router';
import { CImg } from '@/components/common/index';

interface InFoCardProps {
  src: string;
  alt: string;
  title: string;
  path: string;
}

const InfoCard = ({ src, alt, title, path }: InFoCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path)}
      className="relative w-full h-1/2 rounded-tr-[60px] rounded-bl-[60px] rounded-3xl bg-[#E4EDFF] bg-linear-to-b from-[#CDDFFF] to-[#EBF3FF] text-primary-50 p-8 cursor-pointer shadow-[inset_0_0_20px_rgba(99,156,255,0.4)]"
    >
      <p className="relative text-title-h4">{title}</p>
      <CImg className="absolute bottom-0 right-5 w-40" src={src} alt={alt} />
    </div>
  );
};

export default InfoCard;
