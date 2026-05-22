import CImg from './CImg';
import { modalCancel } from '../../assets';

interface ModlaProps {
  cancel?: boolean;
  label?: string;
  onClose?: () => void;
  children: React.ReactNode;
}

const CModal = ({ cancel = false, onClose, label, children }: ModlaProps) => {
  const baseStyle =
    'justify-center p-10 rounded-[40px] shadow-modal max-w-182.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white';

  return (
    <div className="fixed inset-0 bg-gray-scale-100/25 z-999">
      <div className={`${baseStyle}`}>
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
