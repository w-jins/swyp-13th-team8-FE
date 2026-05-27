import CImg from '../../../../components/common/CImg';
import CBreadcrumb from '../../../../components/common/CBreadcrumb';
import { right } from '../../../../assets/index';
import { useModalStore } from '../../../../store/useModalStore';

const Setting = () => {
  const openMoadl = useModalStore((state) => state.openModal);

  const serviceItems = [
    { id: 'terms', label: '이용약관', url: 'https://www.notion.so/34f61e1109d08034b2b5d21a227baf4e?source=copy_link' },
    { id: 'privacy', label: '개인정보 처리방침', url: 'https://www.notion.so/34f61e1109d08034b2b5d21a227baf4e?source=copy_link' },
  ];

  const userItems = [
    { id: 'account', label: '계정 설정' },
    { id: 'insurance', label: '내 보험 관리' },
    { id: 'logout', label: '로그아웃' },
    { id: 'withdraw', label: '회원 탈퇴' },
  ];

  const goExternalLink = (e: React.MouseEvent, url: string | null) => {
    e.stopPropagation(); // 중요: 화살표 클릭 시 체크박스가 토글되는 것을 막아줍니다!
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleClick = (id: string) => {
    if (id === 'logout') {
      openMoadl('LOGOUT');
    } else if (id === 'withdraw') {
      openMoadl('WITHDRAW');
    }
    // 필요한 항목별 로직 추가
  };

  return (
    <div>
      <CBreadcrumb items={[{ label: '마이페이지', path: '/mypage' }, { label: '설정' }]} />
      <div className="mt-13">
        <p className="text-title-h3">설정</p>
      </div>

      {/* 서비스 정보 */}
      <div className="mt-6">
        <p className="text-body-s-r text-gray-scale-50 mb-2">서비스 정보</p>
        <div className="rounded-xl bg-gray-scale-5 overflow-hidden">
          {serviceItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full flex items-center justify-between px-5 py-7 bg-primary-0 hover:bg-gray-scale-10 transition-colors ${
                index !== serviceItems.length - 1 ? 'border-b border-gray-scale-20' : ''
              }`}
            >
              <span className="text-body-m-r text-gray-scale-80">{item.label}</span>
              <CImg onClick={(e) => goExternalLink(e, item.url)} src={right} alt="arrow" className="w-4 h-4 opacity-40" />
            </button>
          ))}
        </div>
      </div>

      {/* 사용자 설정 */}
      <div className="mt-6">
        <p className="text-body-s-r text-gray-scale-50 mb-2">사용자 설정</p>
        <div className="rounded-xl bg-gray-scale-5 overflow-hidden">
          {userItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full flex items-center justify-between px-5 py-7 bg-primary-0 hover:bg-gray-scale-10 transition-colors ${
                index !== userItems.length - 1 ? 'border-b border-gray-scale-20' : ''
              }`}
            >
              <span className={`text-body-m-r ${item.id === 'withdraw' ? 'text-red-400' : 'text-gray-scale-80'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Setting;
