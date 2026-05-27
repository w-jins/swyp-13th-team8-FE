import { useLocation } from 'react-router';
import { loading } from '../../assets';
import CImg from '../common/CImg';
import CModal from '../common/CModal';

interface LoadingModalProps {
  onClose: () => void;
}

const LoadingModal = ({ onClose }: LoadingModalProps) => {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <CModal cancel={false} onClose={onClose} position="resCenter">
      <div className="flex flex-col items-center transform transition-all">
        <div className="flex items-center justify-center mb-6">
          <CImg src={loading} alt="로딩" />
        </div>

        <h3 className="mb-3 text-2xl font-bold text-gray-900 text-center">
          {pathName === '/analysis' ? `약관을 분석하고 있어요.` : ''}
          <br />
          잠시만 기다려주세요.
        </h3>
      </div>
    </CModal>
  );
};

export default LoadingModal;
