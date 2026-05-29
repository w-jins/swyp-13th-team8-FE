import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import LandingPage from './LandingPage';

// 모바일 인지 아닌지를 판별하여 바로 홈 화면으로 갈지 or 랜딩페이지를 보여줄지 판별하는 컴포넌트
const EntryRoute = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return <Navigate to="/home" replace />;
  }
  return <LandingPage />;
};

export default EntryRoute;
