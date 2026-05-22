import { logo, sideMenu } from '../../assets/index.ts';
import CButton from '../common/CButton';
import CImg from '../common/CImg';
import { NavLink } from 'react-router';
import { useModalStore } from '../../store/useModalStore.ts';
import { useUserQuery } from '../../hooks/useUserQuery.ts';

const Header = () => {
  // 필요한 훅 불러옴
  const { data } = useUserQuery();

  // Zustand 액션 함수
  const openModal = useModalStore((state) => state.openModal);

  return (
    <header className="flex w-full h-17 shrink-0 items-center justify-center border-b p-4 border-gray-scale-20 bg-white md:justify-between">
      <button className="absolute left-4 mr-4 md:hidden cursor-pointer ">
        <CImg src={sideMenu} alt="메뉴" />
      </button>
      {/* 로고이미지 나올 시 src 에 기입 */}
      <NavLink key={'/home'} to={'/home'}>
        <CImg className="" src={logo} alt="로고이미지" />
      </NavLink>
      {/* 로그인 했을 시 나올 프로필 */}
      {data ? (
        <div className="hidden min-w-40 h-11 md:flex gap-3 items-center justify-center">
          <div className="w-24.5 h-8 flex gap-2 items-center">
            {/* 백엔드 API 연결 후 유저 이름, 프로필 사진 받으면 변경 */}
            <CImg src={data.profileImageUrl} alt="프로필" className="w-8 h-8 rounded-full" />
            {/* 유저 이름 */}
            <p className="text-gray-scale-50 text-body-s-r truncate">{data.name}</p>
            <span className="text-gray-scale-50 text-body-s-r">님</span>
          </div>
          <CButton
            onClick={() => openModal('LOGOUT')}
            className="py-1.5 px-2 text-[11px] md:rounded-sm border cursor-pointer border-gray-scale-20 text-gray-scale-50 "
            children="로그아웃"
          />
        </div>
      ) : (
        <CButton
          onClick={() => openModal('LOGIN')}
          className="hidden md:inline-flex px-4 py-3 md:rounded-2xl cursor-pointer"
          variant="primary"
          children="로그인/회원가입"
        />
      )}
    </header>
  );
};

export default Header;
