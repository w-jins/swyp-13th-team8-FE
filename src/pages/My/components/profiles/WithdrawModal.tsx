import { useQueryClient } from '@tanstack/react-query';
import { withdrawAPI } from '../../../../api/authApi';
import CButton from '../../../../components/common/CButton';
import CModal from '../../../../components/common/CModal';
import { useUserStore } from '../../../../store/useUserStore';
import { useAuthStore } from '../../../../store/useAuthStore';
import { useNavigate } from 'react-router';
interface WithdrawModalProps {
  onClose: () => void;
}

const WithdrawModal = ({ onClose }: WithdrawModalProps) => {
  const navigate = useNavigate();
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const queryClient = useQueryClient();
  const { clearToken } = useAuthStore();

  const withdrawHandler = async () => {
    const res = await withdrawAPI();
    try {
      if (res.code === 200) {
        clearToken();
        setUserInfo({ userId: null, name: '', email: '', profileImageUrl: '' });

        queryClient.removeQueries({ queryKey: ['userInfo'] });
        alert('회원탈퇴 되었습니다');
        onClose();
        navigate('/home');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <CModal cancel={false} onClose={onClose}>
      <div className="flex flex-col items-center w-[400px] p-10 transform transition-all">
        {/* 상단 아이콘 (우는 표정이나 경고 아이콘 등을 넣으면 좋습니다) */}
        <div className="flex items-center justify-center w-20 h-20 mb-6 bg-gray-100 rounded-full">
          <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* 텍스트 영역 */}
        <h3 className="mb-3 text-2xl font-bold text-gray-900">정말 탈퇴하시겠습니까?</h3>
        <p className="mb-8 text-center text-gray-500 text-body-m-r leading-relaxed">
          회원탈퇴를 할 경우 계정은 즉시 비활성화되며, 30일 동안 로그인하지 않을 경우 모든 정보가 삭제된다.
        </p>

        {/* 버튼 영역 */}
        <div className="flex w-full gap-3">
          {/* 기존에 만드신 CButton 컴포넌트로 교체하셔도 됩니다! */}
          <CButton onClick={onClose} className="flex-1 py-4 font-semibold text-gray-600 transition-colors bg-gray-100 rounded-2xl hover:bg-gray-200">
            취소
          </CButton>
          <CButton
            onClick={withdrawHandler}
            className="flex-1 py-4 font-semibold text-white transition-colors bg-red-500 rounded-2xl hover:bg-red-600"
          >
            탈퇴하기
          </CButton>
        </div>
      </div>
    </CModal>
  );
};

export default WithdrawModal;
