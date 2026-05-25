import { useState } from 'react';
import { useNavigate } from 'react-router';
import CLabel from '../../../components/common/CLabel';
import CImg from '../../../components/common/CImg';
import { right, plus } from '../../../assets/';
import useInsurance, { type Insurance } from '../../../hooks/useInsurance';
import InsuranceDetailModal from './insurance/InsuranceDetailModal';
import { useAuthStore } from '../../../store/useAuthStore';

const InsuranceList = () => {
  const navigate = useNavigate();
  const { insurances } = useInsurance();
  const firstInsurance = insurances[0];
  const isLogin = !!useAuthStore((state) => state.accessToken);
  const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null);

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-7">
        <p className="text-title-h3 font-bold text-gray-scale-90">내 보험 목록</p>
        <button className="flex items-center gap-1 group" onClick={() => navigate('/mypage/insurance')}>
          <span className="text-body-m-r text-gray-scale-50 cursor-pointer">전체보기</span>
          <CImg src={right} alt="전체보기" className="w-4 h-4 opacity-40" />
        </button>
      </div>

      <div className="flex w-full gap-5">
        {firstInsurance && (
          <div className="w-[450px] h-[250px] bg-primary-0 rounded-[24px] border border-gray-scale-0 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="w-[55px] h-[55px] bg-gray-scale-30 rounded-full border border-gray-scale-10 overflow-hidden"></div>
              <button className="p-2 -m-2 rounded-full transition-colors cursor-pointer" onClick={() => setSelectedInsurance(firstInsurance)}>
                <CImg src={right} alt="상세보기" className="w-8 h-8 opacity-30" />
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-title-h3 leading-tight">{firstInsurance.productName}</h3>
              <p className="py-3 mb-2 text-body-m-r text-gray-scale-50">
                {firstInsurance.companyName} · {firstInsurance.joinDate}
              </p>
              <CLabel variant="generation" size="sm">
                {firstInsurance.generation}세대
              </CLabel>
            </div>
          </div>
        )}

        <button
          disabled={!isLogin}
          onClick={() => navigate('/mypage/insurance/add')}
          className="flex-1 flex flex-col items-center justify-center bg-gray-scale-10 p-4 rounded-[24px] border-1 border-dashed border-gray-scale-20 hover:bg-gray-scale-10 transition-all group"
        >
          <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary-20 rounded-full opacity-40 group-hover:scale-125 transition-transform duration-300"></div>
            <div className="relative z-10 w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shadow-lg group-active:scale-90 transition-transform">
              <img src={plus} alt="추가" className="w-5 h-5" />
            </div>
          </div>
          <span className="text-gray-scale-50 text-title-h3">내 보험 등록하기</span>
        </button>
      </div>

      {selectedInsurance && <InsuranceDetailModal insurance={selectedInsurance} onClose={() => setSelectedInsurance(null)} />}
    </div>
  );
};

export default InsuranceList;
