import { useEffect, useState } from 'react';
import CButton from '../common/CButton';
import CModal from '../common/CModal';
import { getInsuranceList } from '../../api/Insurance';
import type { InsurancesListResponse } from '../../type/responseType';
import { useCalcStore } from '../../store/useCalcStore';
import { useLocation, useNavigate } from 'react-router';
import InsuranceModalCard from './InsuranceModalCard';
import type { Insurance } from '../../hooks/useInsurance';

interface InsuranceModalProps {
  onClose: () => void;
}

const InsuranceModal = ({ onClose }: InsuranceModalProps) => {
  // 보험에 필요한 값을 하나의 state로 관리
  const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null);
  const [myInsurance, setMyInsurance] = useState<InsurancesListResponse | null>(null);
  const setInsuranceInfo = useCalcStore((state) => state.setInsuranceInfo);
  const location = useLocation();

  const navigate = useNavigate();
  const handleSelectInsurance = (item: Insurance) => {
    // 토글 기능: 같은 카드를 다시 누르면 선택 해제
    setSelectedInsurance((prev) => (prev?.userInsuranceId === item.userInsuranceId ? null : item));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getInsuranceList();
        setMyInsurance(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const onSubmit = () => {
    if (!selectedInsurance) return;
    setInsuranceInfo({
      id: selectedInsurance.userInsuranceId,
      companyName: selectedInsurance.companyName,
      productName: selectedInsurance.productName,
    });
    onClose();
    if (location.pathname === '/calculator') navigate('/calculator/medical-info');
  };
  return (
    <CModal cancel={true} onClose={onClose} position="responsive">
      <div className="flex md:w-[600px] max-h-[80vh] flex-col gap-6">
        <p className="text-title-h2 font-bold text-gray-scale-90">불러올 보험을 선택해주세요.</p>

        <div className="mt-2 grid sm:grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto no-scrollbar flex-1">
          {myInsurance?.insurances.map((items) => (
            <InsuranceModalCard
              key={items.userInsuranceId}
              item={items}
              isSelected={selectedInsurance?.userInsuranceId === items.userInsuranceId}
              onSelect={handleSelectInsurance}
            />
          ))}

          <div
            className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl bg-gray-scale-10 transition-colors hover:bg-gray-scale-20"
            onClick={() => {
              navigate('/mypage/insurance/add');
              onClose();
            }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-white shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <p className="text-body-m-r text-gray-scale-60">새 보험 등록하기</p>
          </div>
        </div>

        <CButton
          onClick={onSubmit}
          disabled={!selectedInsurance}
          className={`mt-4 w-full rounded-xl py-4 text-center font-bold transition-colors
            ${selectedInsurance ? 'cursor-pointer bg-primary-50 text-white hover:bg-primary-60' : 'cursor-not-allowed bg-gray-scale-30 text-gray-scale-50'}`}
        >
          선택하기
        </CButton>
      </div>
    </CModal>
  );
};

export default InsuranceModal;
