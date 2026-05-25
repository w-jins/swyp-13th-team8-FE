import { useNavigate } from 'react-router';

/**
 * 오른쪽 Info 카드 박스
 *
 */
const InfoCards = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 max-w-96.25 h-full">
      <div
        onClick={() => navigate('/mypage/insurance')}
        className="w-78.75 h-50 rounded-tr-[100px] rounded-bl-[100px] rounded-3xl bg-gray-scale-30 p-8 cursor-pointer"
      >
        <p className="text-title-h4">내 보험 바로가기</p>
      </div>
      <div
        onClick={() => navigate('/mypage/saved-history')}
        className="w-78.75 h-50 rounded-tr-[100px] rounded-bl-[100px] rounded-3xl bg-gray-scale-30 p-8 cursor-pointer"
      >
        <p className="text-title-h4">저장된 히스토리</p>
      </div>
    </div>
  );
};

export default InfoCards;
