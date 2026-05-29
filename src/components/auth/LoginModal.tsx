import KakaoLogin from 'react-kakao-login';
import { kakao, welcome } from '../../assets';
import CButton from '../common/CButton';
import CImg from '../common/CImg';
import CModal from '../common/CModal';
import { loginAPI } from '../../api/authApi.ts';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const navigate = useNavigate();
  const kakaoClientId = '2eb191a7174666b88291d1e839e1d5fe';
  //const kakaoClientId = import.meta.env.VITE_KAKAO_JS_KEY;//

  const { setAccessToken, setRefreshToken, setIsNewUser } = useAuthStore();
  const kakaoOnSuccess = async (data: any) => {
    const kakaoToken = data?.response.access_token;

    try {
      const res = await loginAPI(kakaoToken);
      if (res.code === 200) {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        onClose();
        if (res.data.isNewUser) {
          setIsNewUser(true);
          navigate('/terms');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const kakaoOnFail = (error: any) => {
    console.log(error);
  };

  return (
    <CModal cancel={true} onClose={onClose}>
      <div className="flex flex-col gap-4 items-center">
        <div className="py-5">
          <CImg className="w-30 h-30" src={welcome} alt="로고이미지" />
        </div>
        <div className="flex flex-col gap-2.5 items-center">
          <p className="text-title-h2">실손핏에 오신 것을 환영합니다!</p>
          <p className="text-gray-scale-50 text-body-xl-r">어려웠던 보험 약관 실손핏과 함께 알아보아요.</p>
        </div>
        <div className="flex flex-col gap-2 w-full items-center pt-5">
          <KakaoLogin
            token={kakaoClientId}
            onSuccess={kakaoOnSuccess}
            onFail={kakaoOnFail}
            render={({ onClick }) => (
              <CButton onClick={onClick} className="bg-[#FFE400] w-full px-5 py-4 flex gap-2 items-center justify-center cursor-pointer">
                <CImg src={kakao} alt="카카오" />
                <span className="text-gray-scale-90">카카오 계정으로 시작하기</span>
              </CButton>
            )}
          />

          <p className="text-gray-scale-40 text-body-s-r">최소 로그인 시 회원가입 절차가 진행됩니다.</p>
        </div>
      </div>
    </CModal>
  );
};

export default LoginModal;
