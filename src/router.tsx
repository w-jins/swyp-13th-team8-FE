import { createBrowserRouter } from 'react-router';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home/HomePage';
import Calculator from './pages/Calculator/CalculatorPage';
import Analysis from './pages/Analysis/AnalysisPage';
import MyPage from './pages/My/MyPage';
import Terms from './pages/login/Terms';
import AnalysisResult from './pages/Analysis/AnalysisResult';
import Setting from './pages/My/components/profiles/Setting';
import AddInsurancePage from './pages/My/components/addInsurance/AddInsurancePage';
import InsurancePage from './pages/My/components/insurance/InsurancePage';
import MedicalInfo from './pages/Calculator/components/MedicalInfo';
import RefundResult from './pages/Calculator/components/RefundResult';
import SavePage from './pages/My/components/profiles/savedHistory/SavePage';
/*
  라우터 주소 체계 설정하는 파일
*/
const router = createBrowserRouter([
  {
    // 랜딩 페이지
    path: '/',
    element: <></>,
  },
  {
    // 로그인 페이지
    path: '/login',
    element: <></>,
  },
  {
    // 홈 페이지
    path: '/home',
    element: <AppLayout />,
    children: [
      // 홈 페이지 컴포넌트
      { index: true, element: <Home /> },
    ],
  },
  {
    // 약관 페이지
    path: '/terms',
    element: <AppLayout />,
    children: [
      // 약관 페이지
      { index: true, element: <Terms /> },
    ],
  },
  {
    // 환급금 계산기 페이지
    path: '/calculator',
    element: <AppLayout />,
    children: [
      // 환급금 계산기 페이지
      { index: true, element: <Calculator /> },
      { path: 'medical-info', element: <MedicalInfo /> },
      { path: 'refund-result', element: <RefundResult /> },
    ],
  },
  {
    // 약관 분석 페이지
    path: '/analysis',
    element: <AppLayout />,
    children: [
      // 약관 분석 페이지 컴포넌트
      { index: true, element: <Analysis /> },
      { path: 'result', element: <AnalysisResult /> },
      { path: 'result/:id', element: <AnalysisResult /> },
    ],
  },
  {
    // 마이페이지
    path: '/mypage',
    element: <AppLayout />,
    children: [
      // 마이페이지 컴포넌트
      { index: true, element: <MyPage /> },
      { path: 'setting', element: <Setting /> },
      { path: 'insurance', element: <InsurancePage /> },
      { path: 'insurance/add', element: <AddInsurancePage /> },
      { path: 'saved-history', element: <SavePage /> },
    ],
  },
]);

export default router;
