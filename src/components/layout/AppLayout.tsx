import { Outlet, useLocation } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import GlobalModal from '../common/GlobalModal';
import MobileSidebar from './MobileSidebar';
import { useMobileStore } from '../../store/useMobileStore';

const AppLayout = () => {
  const location = useLocation();
  const noPaddingPath = '/analysis/result';
  const isNoPadding = location.pathname.startsWith(noPaddingPath);
  const { isOpen, setOpenState } = useMobileStore();
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-scale-5">
      {/* 1. 조립된 헤더 컴포넌트 */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* 2. 조립된 사이드바 컴포넌트 */}
        <Sidebar />
        <MobileSidebar isOpen={isOpen} onClose={setOpenState} />
        {/* 3. 메인 콘텐츠 영역 */}
        <main className={`flex-1 overflow-y-auto ${isNoPadding ? 'p-0' : 'px-4 md:px-10 xl:px-15 2xl:px-40'} `}>
          <div className={`mx-auto w-full h-full ${isNoPadding ? '' : 'max-w-335'} md:py-10`}>
            <Outlet />
          </div>
        </main>
      </div>
      {/* 모달 렌더하는 공용 컴포넌트 */}
      <GlobalModal />
    </div>
  );
};

export default AppLayout;
