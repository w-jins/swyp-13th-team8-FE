import { useNavigate } from 'react-router';
import { logoutAPI } from '../../api/authApi';
import { logout } from '../../assets';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserStore } from '../../store/useUserStore';
import CButton from '../common/CButton';
import CImg from '../common/CImg';
import CModal from '../common/CModal';
import { useQueryClient } from '@tanstack/react-query';
interface LogoutModalProps {
  onClose: () => void;
}
const LogoutModal = ({ onClose }: LogoutModalProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { refreshToken, clearToken } = useAuthStore();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const logoutClickHandler = async () => {
    const res = await logoutAPI(refreshToken);

    if (res.code === 200) {
      clearToken();
      setUserInfo({ userId: null, name: '', email: '', profileImageUrl: '' });

      queryClient.removeQueries({ queryKey: ['userInfo'] });
      alert('로그아웃 되었습니다!');

      onClose();
      navigate('/home');
    }
  };

  return (
    <CModal cancel={false} onClose={onClose} position="responsive">
      <div className="flex flex-col items-center transform transition-all gap-3">
        <div className="flex items-center justify-center mb-6">
          <CImg src={logout} alt="로딩" />
        </div>
        <p className="text-title-h2">로그아웃 하시겠습니까?</p>
        <div className="flex w-full gap-2">
          <CButton onClick={onClose} className="border border-gray-scale-30 w-1/2 px-5 py-4 ">
            취소
          </CButton>
          <CButton onClick={logoutClickHandler} className="w-1/2 px-5 py-4 bg-primary-50 text-primary-0">
            로그아웃
          </CButton>
        </div>
      </div>
    </CModal>
  );
};

export default LogoutModal;
