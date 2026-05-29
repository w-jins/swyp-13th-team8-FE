import CBreadcrumb from '../../components/common/CBreadcrumb';
import Profile from './components/Profile';
import InsuranceList from './components/InsuranceList';
import History from './components/History';

const MyPage = () => {
  return (
    <div>
      <CBreadcrumb items={[{ label: '마이페이지' }]} />
      <div className="flex flex-col md:flex-row gap-7 mt-10">
        <Profile />
        <InsuranceList />
      </div>
      <History />
    </div>
  );
};

export default MyPage;
