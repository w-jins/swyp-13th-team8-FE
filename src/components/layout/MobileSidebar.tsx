import { NavLink, useLocation, useNavigate } from 'react-router';
import CButton from '../common/CButton';
import CImg from '../common/CImg';
import { useCalcStore } from '../../store/useCalcStore.ts';
import { SideBarItems } from './Sidebar';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { useUserStore } from '../../store/useUserStore.ts';
import { mypageHistory, mypageLogout, mypageSetting, mypageUser, sidebar } from '../../assets/index.ts';
import { useEffect } from 'react';
import { useModalStore } from '../../store/useModalStore.ts';

// 💡 퀵메뉴 아이콘들은 실제 가지고 계신 파일명으로 변경해 주세요!
// import { iconUser, iconHistory, iconSettings, defaultProfile } from '../../assets/index.ts';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: (state: boolean) => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const resetStore = useCalcStore((state) => state.resetStore);
  const isLogin = !!useAuthStore((state) => state.accessToken);
  const userInfo = useUserStore((state) => state.userInfo);
  const { openModal } = useModalStore();

  useEffect(() => {
    if (isOpen) {
      onClose(false);
    }
  }, [pathname]);

  return (
    <>
      {/* 배경 딤(Dim) 처리 */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity" onClick={() => onClose(false)} />}

      {/* 모바일 드로어(Drawer) 본체 */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* 1. 상단 프로필 영역 */}
          <div className="flex items-center gap-4 px-6 pt-10 pb-6">
            {/* 프로필 이미지 (로그인 안 된 경우 기본 이미지 렌더링하도록 처리 필요) */}
            <CImg
              className="w-14 h-14 rounded-full object-cover bg-gray-100"
              src={isLogin && userInfo.profileImageUrl ? userInfo.profileImageUrl : '기본프로필경로'}
              alt="유저사진"
            />
            <div className="flex flex-col gap-1">
              {isLogin ? (
                <>
                  <p className="text-title-h3 text-gray-scale-90">{userInfo.name} 님</p>
                  <p className="text-body-s-r text-gray-scale-50">{userInfo.email}</p>
                </>
              ) : (
                <>
                  <p className="text-title-h3 text-gray-scale-90 flex items-center gap-1 cursor-pointer hover:underline">
                    반가워요!
                    <br /> 로그인 해주세요
                    <span className="text-gray-scale-50 font-normal"></span>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* 2. 퀵 메뉴 영역 (유저정보 / 히스토리 / 설정) */}
          <div className="flex flex-row items-center justify-between px-1 py-2 border-b border-gray-scale-20">
            {/* 유저 정보 */}
            <CButton className="flex flex-col items-center gap-2 flex-1 cursor-pointer" onClick={() => navigate('/mypage')}>
              <CImg src={mypageUser} alt="유저 정보" className="w-6 h-6" />
              <span className="text-body-s-m text-gray-scale-70">유저 정보</span>
            </CButton>

            {/* 세로 구분선 */}
            <div className="w-[1px] h-10 bg-gray-scale-20" />

            {/* 저장된 히스토리 */}
            <CButton className="flex flex-col items-center gap-2 flex-1 cursor-pointer" onClick={() => navigate('/mypage/saved-history')}>
              <CImg src={mypageHistory} alt="히스토리" className="w-6 h-6" />
              <span className="text-body-s-m text-gray-scale-70 text-nowrap">저장된 히스토리</span>
            </CButton>

            {/* 세로 구분선 */}
            <div className="w-[1px] h-10 bg-gray-scale-20" />

            {/* 설정 */}
            <CButton className="flex flex-col items-center gap-2 flex-1 cursor-pointer" onClick={() => navigate('/mypage/setting')}>
              <CImg src={mypageSetting} alt="설정" className="w-6 h-6" />
              <span className="text-body-s-m text-gray-scale-70">설정</span>
            </CButton>
          </div>

          {/* 3. 공통 네비게이션 메뉴 렌더링 */}
          {/* 모바일에서는 가로폭이 좁으므로 무조건 row(가로) 방향으로 정렬되도록 flex-row 고정 */}
          <nav className="px-4 py-6 flex flex-col flex-1 gap-2">
            {SideBarItems.map((item) => (
              <NavLink key={item.path} to={item.path}>
                {({ isActive }) => (
                  <CButton
                    onClick={() => resetStore()}
                    // px, py 패딩 조정 및 라운드(rounded-xl) 추가하여 버튼 느낌 강화
                    className={`cursor-pointer w-full text-left px-5 py-4 rounded-xl flex items-center justify-start gap-4 transition-colors ${
                      isActive ? 'text-primary-50 bg-primary-10 font-bold' : 'text-gray-scale-60'
                    }`}
                    variant={isActive ? 'tertiary' : undefined}
                  >
                    <CImg src={isActive ? item.hover : item.src} alt={item.label} className="w-6 h-6" />
                    <span className="inline-block text-body-m-m">{item.label}</span>
                  </CButton>
                )}
              </NavLink>
            ))}
          </nav>

          {/* 4. 하단 배너 영역 */}
          <div className="px-6 pb-8 mt-auto flex flex-col gap-3">
            {/* 하단 배너 */}
            <div onClick={() => navigate('/guide')} className="mt-auto md:px-2 xl:px-4">
              <div className="relative px-3 py-4 rounded-3xl bg-linear-to-b from-[#518AFF] to-[#CFDDFF]">
                <p className="text-white text-title-h4 pb-2">
                  실손핏
                  <br />
                  완벽 가이드
                </p>
                <CButton className="bg-primary-80 text-white md:px-2 md:py-1" children="바로가기" />
                <CImg className="absolute bottom-3 right-2" src={sidebar} alt="바로가기" />
              </div>
            </div>

            {/* 로그인 / 로그아웃 버튼 */}
            <CButton
              onClick={() => {
                if (isLogin) {
                  openModal('LOGOUT');
                } else {
                  openModal('LOGIN');
                }
                onClose(false); // 버튼 누르면 사이드바 닫기
              }}
              // w-fit을 줘서 내용물 크기만큼만 영역을 차지하게 합니다.
              className="flex items-center gap-2 cursor-pointer text-gray-scale-40 hover:text-gray-scale-60 w-fit transition-colors"
            >
              <CImg src={isLogin ? mypageLogout : ''} alt="로그인/로그아웃" />
              <span className="text-body-m-r">{isLogin ? '로그아웃' : '로그인 / 회원가입'}</span>
            </CButton>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
