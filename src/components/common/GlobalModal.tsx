import JoinModal from '../../pages/login/JoinModal';
import WithdrawModal from '../../pages/My/components/profiles/WithdrawModal';
import { useModalStore } from '../../store/useModalStore';
import LoginModal from '../auth/LoginModal';
import LogoutModal from '../auth/LogoutModal';
import InsuranceModal from '../modal/InsuranceModal';
import LoadingModal from '../modal/LoadingModal';

const GlobalModal = () => {
  const { isOpen, modalType, closeModal } = useModalStore();

  if (!isOpen) return null;

  const renderModal = () => {
    /**
     * 모달이 필요한 곳의 타입을 적고 렌더링 하는 로직
     */
    switch (modalType) {
      case 'LOGIN':
        return <LoginModal onClose={closeModal} />;
      case 'JOIN':
        return <JoinModal onClose={closeModal} />;
      case 'INSURANCE':
        return <InsuranceModal onClose={closeModal} />;
      case 'WITHDRAW':
        return <WithdrawModal onClose={closeModal} />;
      case 'LOADING':
        return <LoadingModal onClose={closeModal} />;
      case 'LOGOUT':
        return <LogoutModal onClose={closeModal} />;
      default:
        return null;
    }
  };
  return <>{renderModal()}</>;
};

export default GlobalModal;
