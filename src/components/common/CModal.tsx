import CImg from './CImg';
import { modalCancel } from '../../assets';

interface ModlaProps {
  cancel?: boolean;
  label?: string;
  onClose?: () => void;
  children: React.ReactNode;
  position?: 'center' | 'resCenter' | 'responsive';
}

const CModal = ({ cancel = false, onClose, label, children, position = 'center' }: ModlaProps) => {
  // const baseStyle =
  //   'justify-center p-10 rounded-[40px] shadow-modal max-w-182.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white';
  const baseStyle = 'bg-white shadow-modal absolute p-10 transition-all';
  let positionStyle = '';
  if (position === 'center') {
    positionStyle = 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[40px] max-w-182.5';
  } else if (position === 'resCenter') {
    positionStyle = 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[40px] max-w-182.5 w-4/5';
  } else if (position === 'responsive') {
    // 💡 핵심: 기본(모바일)은 바닥 고정, md(768px 이상)부터는 중앙 고정!
    positionStyle = `
      bottom-0 left-0 rounded-t-[40px] pb-12 w-full animate-slide-up md:h-auto md:animate-none
      md:bottom-auto md:top-1/2 md:w-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[40px] md:max-w-182.5 md:pb-10
    `;
  }
  return (
    <div className="fixed inset-0 bg-gray-scale-100/25 z-999">
      <div className={`${baseStyle} ${positionStyle}`}>
        {cancel ? (
          <div className="flex justify-between w-full ">
            <p className="text-title-h3">{label}</p>
            <CImg className="cursor-pointer" src={modalCancel} alt="취소" onClick={onClose} />
          </div>
        ) : (
          ''
        )}

        {children}
      </div>
    </div>
  );
};

export default CModal;
