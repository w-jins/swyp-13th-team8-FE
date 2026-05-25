import { useEffect, useState } from 'react';
import CButton from '../common/CButton';
import CModal from '../common/CModal';
import { getInsuranceList } from '../../api/Insurance';
import type { InsurancesListResponse } from '../../type/responseType';
import { useCalcStore } from '../../store/useCalcStore';
import { useLocation, useNavigate } from 'react-router';
import CLabel from '../common/CLabel';

interface InsuranceModalProps {
  onClose: () => void;
}

const InsuranceModal = ({ onClose }: InsuranceModalProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [companyName, setcompanyName] = useState<string>('');
  const [productName, setproductName] = useState<string>('');
  const [myInsurance, setMyInsurance] = useState<InsurancesListResponse | null>(null);
  const setInsuranceInfo = useCalcStore((state) => state.setInsuranceInfo);
  const location = useLocation();

  const navigate = useNavigate();
  const handleSelectInsurance = (id: number, companyName: string, productName: string) => {
    // 토글 기능: 같은 카드를 다시 누르면 선택 해제
    setSelectedId((prev) => (prev === id ? null : id));
    setcompanyName(companyName);
    setproductName(productName);
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
    if (!selectedId) return;
    setInsuranceInfo({ id: selectedId, companyName: companyName, productName: productName });
    onClose();
    if (location.pathname === '/calculator') navigate('/calculator/medical-info');
  };
  return (
    <CModal cancel={true} onClose={onClose}>
      {/* 💡 2. CModal 안쪽 콘텐츠 영역 (가로 길이 고정) */}
      <div className="flex w-[600px] flex-col gap-6">
        {/* 타이틀: CModal의 X버튼 높이와 자연스럽게 맞추기 위해 음수 마진(-mt-8) 사용 */}
        <p className="text-title-h2 font-bold text-gray-scale-90">불러올 보험을 선택해주세요.</p>

        {/* 3. 보험 리스트 및 추가 영역 (Grid 레이아웃) */}
        <div className="mt-2 grid grid-cols-2 gap-4">
          {/* 카드 1: 내 보험 불러오기 */}
          {myInsurance?.insurances.map((items) => (
            <div
              key={items.userInsuranceId}
              onClick={() => handleSelectInsurance(items.userInsuranceId, items.companyName, items.productName)}
              className={`flex cursor-pointer flex-col gap-4 rounded-2xl border p-5 transition-all duration-200 min-h-[160px]
              ${
                selectedId === items.userInsuranceId
                  ? 'border-primary-50 bg-primary-10/10' // 선택됨
                  : 'border-gray-scale-20 hover:border-gray-scale-30' // 기본 상태
              }`}
            >
              <div className="flex gap-3">
                {/* 로고 영역 (차후 CImg를 이용해 실제 이미지로 변경) */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white"></div>
                <div className="flex flex-col gap-1">
                  <p className="text-body-m-b break-keep text-gray-scale-90 line-clamp-2">{items.productName}</p>
                  <p className="text-caption-r text-gray-scale-50 text-body-s-r">
                    {items.companyName} · {items.joinDate}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {items.generation && (
                  <CLabel className="text-body-s-r flex md:py-1 md:px-3" variant="generation">
                    {items.generation}세대
                  </CLabel>
                )}

                {items.contractType && (
                  <CLabel className="text-body-s-r flex md:py-1 md:px-3" variant="contract">
                    {items.contractType}
                  </CLabel>
                )}

                {items.coverageStructure && (
                  <CLabel className="text-body-s-r flex md:py-1 md:px-3" variant="coverage">
                    {items.coverageStructure}
                  </CLabel>
                )}

                {items.cautionPoint && (
                  <CLabel className="text-body-s-r flex md:py-1 md:px-3" variant="caution">
                    {items.cautionPoint}
                  </CLabel>
                )}
              </div>
            </div>
          ))}

          {/* 카드 2: 새 보험 등록하기 */}
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

        {/* 4. 하단 선택 완료 버튼 */}
        <CButton
          onClick={onSubmit}
          disabled={!selectedId}
          className={`mt-4 w-full rounded-xl py-4 text-center font-bold transition-colors
            ${selectedId ? 'cursor-pointer bg-primary-50 text-white hover:bg-primary-60' : 'cursor-not-allowed bg-gray-scale-30 text-gray-scale-50'}`}
        >
          선택하기
        </CButton>
      </div>
    </CModal>
  );
};

export default InsuranceModal;
