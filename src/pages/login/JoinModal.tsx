import { useNavigate } from 'react-router';
import CButton from '../../components/common/CButton';
import CImg from '../../components/common/CImg';
import CModal from '../../components/common/CModal';
import { useAuthStore } from '../../store/useAuthStore';
import { signup } from '../../assets';

interface LoginModalProps {
  onClose: () => void;
}
const JoinModal = ({ onClose }: LoginModalProps) => {
  const navigate = useNavigate();
  const { setIsNewUser } = useAuthStore();

  return (
    <CModal cancel={false} onClose={onClose} position="responsive">
      <div className="flex flex-col gap-4 items-center">
        <div className="py-5">
          <CImg className="w-30 h-30" src={signup} alt="로고이미지" />
        </div>
        <div className="flex flex-col gap-2.5 items-center">
          <p className="text-title-h2">회원가입이 완료되었습니다!</p>
          <p className="text-gray-scale-50 text-body-xl-r">바로 내 보험을 등록하시겠습니까?</p>
        </div>
        <div className="flex flex-row gap-2 w-full items-center pt-5">
          <CButton
            onClick={() => {
              navigate('/home');
              setIsNewUser(false);
              onClose();
            }}
            className="w-1/2 border border-gray-scale-30 bg-gray-scale-0 px-5 py-4 items-center justify-center cursor-pointer"
          >
            <span className="text-gray-scale-60">홈으로 돌아가기</span>
          </CButton>
          {/* 마이페이지 등록하기로 이동 */}
          <CButton
            onClick={() => {
              navigate('/mypage/insurance/add');
              setIsNewUser(false);
              onClose();
            }}
            className="bg-primary-50 w-1/2 px-5 py-4 items-center justify-center cursor-pointer"
          >
            <span className="text-gray-scale-0">등록하기</span>
          </CButton>
        </div>
      </div>
    </CModal>
  );
};

export default JoinModal;
