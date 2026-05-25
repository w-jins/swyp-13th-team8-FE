import { useState } from 'react';
import { useNavigate } from 'react-router';
import { profile, setting, history } from '../../../assets/index';
import CImg from '../../../components/common/CImg';
import UserInfoModal from './profiles/UseInfoModal';
import { useUserStore } from '../../../store/useUserStore';
import { useAuthStore } from '../../../store/useAuthStore';

const Profile = () => {
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.userInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLogin = !!useAuthStore((state) => state.accessToken);

  const menuItems = [
    { id: 'user', src: profile, label: '유저 정보', alt: '유저 정보' },
    { id: 'history', src: history, label: '저장된 히스토리', alt: '저장된 히스토리' },
    { id: 'setting', src: setting, label: '설정', alt: '계정 설정' },
  ];

  const handleMenuClick = (id: string) => {
    if (id === 'user') {
      setIsModalOpen(true);
    } else if (id === 'history') {
      navigate('/mypage/saved-history');
    } else if (id === 'setting') {
      navigate('/mypage/setting');
    }
  };

  return (
    <div className="relative">
      {userInfo.name === '' ? (
        <div className="flex flex-col gap-4">
          <h2 className="mb-2 text-xl font-bold text-gray-900">로그인하여 환급금 계산을 해보세요!</h2>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="w-[90px] h-[90px] bg-gray-scale-10 rounded-full overflow-hidden border border-gray-scale-5">
            <CImg className="w-full h-full bg-gray-200" src={userInfo.profileImageUrl} alt="프로필" />
          </div>
          <div className="ml-4">
            <div className="text-title-h2 font-bold text-gray-scale-90">{userInfo.name} 님</div>
            <div className="text-gray-scale-30 text-body-l-r mt-1">{userInfo.email}</div>
          </div>
        </div>
      )}

      <div className="w-[420px] h-[100px] mt-7 rounded-2xl bg-gray-scale-10 flex items-center justify-center">
        <div className="flex w-full items-center">
          {menuItems.map((item, index) => (
            <div key={item.id} className="flex flex-1 items-center">
              <button
                disabled={!isLogin}
                onClick={() => handleMenuClick(item.id)}
                className="flex flex-col items-center gap-2 cursor-pointer group flex-1 px-8 focus:outline-none"
              >
                <div className="p-1 group-hover:scale-110 transition-transform">
                  <CImg src={item.src} alt={item.alt} className="w-7 h-7 opacity-60 group-hover:opacity-100" />
                </div>
                <span className="text-[14px] font-bold text-gray-scale-60 group-hover:text-gray-scale-90 tracking-tighter whitespace-nowrap">
                  {item.label}
                </span>
              </button>
              {index !== menuItems.length - 1 && <div className="w-[1px] h-8 bg-gray-scale-40 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between w-[420px] h-[72px] mt-5 px-7 rounded-2xl bg-primary-5 border border-primary-20 cursor-pointer hover:bg-primary-10 transition-colors">
        <span className="text-primary-50 font-bold text-[15px]">가이드 바로가기 (수정예정)</span>
        <span className="text-primary-30">〉</span>
      </div>

      {isModalOpen && <UserInfoModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Profile;
