import { useNavigate } from 'react-router';
import { close } from '../../../assets';
import useInsurance from '../../../hooks/useInsurance';
import { useCalcStore } from '../../../store/useCalcStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const InsuranceListModal = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const { insurances, isLoading } = useInsurance();
  const { insuranceInfo, setInsuranceInfo } = useCalcStore();

  if (!isOpen) return null;

  const handleSelect = () => {
    if (insuranceInfo.id) {
      onClose();
      navigate('/calculator/medical-info');
    } else {
      alert('보험을 선택해주세요.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] w-[90%] max-w-[640px] p-10 relative shadow-xl">
        <button onClick={onClose} className="absolute top-8 right-8 hover:opacity-70 transition-opacity">
          <img src={close} alt="닫기" className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-scale-90 mb-8">원하는 보험을 선택해주세요.</h2>

        {isLoading ? (
          <div className="flex items-center justify-center h-[200px]">
            <div className="w-8 h-8 border-[3px] border-primary-10 border-t-primary-50 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insurances.map((ins) => (
              <div
                key={ins.userInsuranceId}
                onClick={() => setInsuranceInfo({ id: ins.userInsuranceId })}
                className={`group border rounded-2xl p-6 cursor-pointer transition-all ${
                  insuranceInfo.id === ins.userInsuranceId
                    ? 'border-primary-50 bg-primary-5/10 ring-1 ring-primary-50'
                    : 'border-gray-scale-20 hover:border-primary-50 hover:bg-primary-5/10'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    {ins.companyName}
                  </div>
                  {ins.contractType && (
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                        insuranceInfo.id === ins.userInsuranceId ? 'bg-primary-50 text-white' : 'bg-primary-10 text-primary-50'
                      }`}
                    >
                      {ins.contractType}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-scale-50 mb-1">{ins.companyName}</p>
                <p className="text-sm font-bold text-gray-scale-80 leading-tight h-10 line-clamp-2">{ins.productName}</p>
                <p className="text-[11px] text-gray-scale-40 mt-4">가입연월 {ins.joinDate}</p>
              </div>
            ))}

            <button
              onClick={() => {
                onClose();
                navigate('/mypage/insurance/add');
              }}
              className="border border-dashed border-gray-scale-30 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-gray-scale-5 transition-colors group cursor-pointer"
            >
              <div className="w-9 h-9 bg-primary-50 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                +
              </div>
              <span className="text-sm font-medium text-gray-scale-50">새 보험 등록하기</span>
            </button>
          </div>
        )}

        <button
          onClick={handleSelect}
          className={`w-full py-5 rounded-2xl mt-10 font-bold text-lg transition-colors cursor-pointer ${
            insuranceInfo.id ? 'bg-primary-50 text-white' : 'bg-gray-scale-30 text-white pointer-events-none opacity-50'
          }`}
        >
          선택하기
        </button>
      </div>
    </div>
  );
};

export default InsuranceListModal;
