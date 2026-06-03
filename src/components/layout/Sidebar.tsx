import { NavLink, useNavigate } from 'react-router';
import CButton from '../common/CButton';
import CImg from '../common/CImg';
import { analysis, analysisHover, calculate, calculateHover, home, homeHover, myPage, myPageHover, sidebar } from '../../assets/index.ts';
import { useCalcStore } from '../../store/useCalcStore.ts';

export const SideBarItems = [
  { label: '홈', path: '/home', src: home, hover: homeHover },
  { label: '약관 분석', path: '/analysis', src: analysis, hover: analysisHover },
  { label: '환급금 계산기', path: '/calculator', src: calculate, hover: calculateHover },
  { label: '마이페이지', path: '/mypage', src: myPage, hover: myPageHover },
];

const Sidebar = () => {
  const resetStore = useCalcStore((state) => state.resetStore);
  const navigate = useNavigate();
  return (
    <aside className="hidden border-r h-full border-gray-scale-20 bg-white md:flex md:w-20.25 xl:w-65 flex-col">
      <nav className="md:px-2 xl:px-4 py-6 flex flex-col gap-2">
        {SideBarItems.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {({ isActive }) => (
              <CButton
                onClick={() => resetStore()}
                className={`cursor-pointer w-full text-left xl:px-5 py-4 flex justify-start gap-2 xl:gap-3 flex-col xl:flex-row ${isActive ? 'text-blue-200 ' : 'text-gray-800'}`}
                variant={isActive ? 'tertiary' : undefined}
              >
                <CImg src={isActive ? item.hover : item.src} loading="eager" fetchPriority="high" alt={item.label} />
                <span className="inline-block text-body-s-m xl:text-body-m-m whitespace-nowrap">{item.label}</span>
              </CButton>
            )}
          </NavLink>
        ))}
      </nav>
      <div onClick={() => navigate('/guide')} className="mt-auto hidden xl:block md:px-2 xl:px-4 pb-6">
        <div className="relative  px-3 py-4 rounded-3xl bg-linear-to-b from-[#518AFF] to-[#CFDDFF]">
          <p className="text-white text-title-h4 pb-2">
            실손핏
            <br />
            완벽 가이드
          </p>
          <CButton className="bg-primary-80 text-white md:px-2 md:py-1" children="바로가기" />
          <CImg className="absolute bottom-3 right-2" loading="eager" fetchPriority="high" src={sidebar} alt="바로가기" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
