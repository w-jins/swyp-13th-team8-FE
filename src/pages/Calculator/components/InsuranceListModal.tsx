import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className={`fixed inset-0 z-[100] flex ${isMobile ? 'items-end' : 'items-center'} justify-center bg-black/50 backdrop-blur-sm`}>
      <div
        className={`bg-white ${isMobile ? 'rounded-t-[32px]' : 'rounded-[32px]'} w-full lg:w-[90%] lg:max-w-[640px] p-8 lg:p-10 relative shadow-xl max-h-[90vh] overflow-y-auto`}
      >
        {/* 모바일 핸들 바 */}
        {isMobile && <div className="w-10 h-1 bg-gray-scale-20 rounded-full mx-auto mb-6" />}

        <button onClick={onClose} className="absolute top-8 right-8 hover:opacity-70 transition-opacity">
          <img src={close} alt="닫기" className="w-6 h-6" />
        </button>

        <h2 className="text-[18px] lg:text-2xl font-bold text-gray-scale-90 mb-3 lg:mb-8">
          {isMobile ? '불러올 보험을 선택해주세요.' : '다음 중 해당하는 보험을 선택해주세요.'}
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center h-[200px]">
            <div className="w-8 h-8 border-[3px] border-primary-10 border-t-primary-50 rounded-full animate-spin" />
          </div>
        ) : (
          <div className={isMobile ? 'flex flex-col gap-3' : 'grid grid-cols-2 gap-4'}>
            {insurances.map((ins) => (
              <div
                key={ins.userInsuranceId}
                onClick={() => setInsuranceInfo({ id: ins.userInsuranceId })}
                className={`border rounded-2xl p-4 cursor-pointer transition-all ${
                  insuranceInfo.id === ins.userInsuranceId
                    ? 'border-primary-50 bg-primary-5/10 ring-1 ring-primary-50'
                    : 'border-gray-scale-20 hover:border-primary-50 hover:bg-primary-5/10'
                }`}
              >
                {isMobile ? (
                  /* 모바일 레이아웃 */
                  <div>
                    {/* 상단: 로고 + 회사명 / 가입연월 */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        {ins.companyName}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-[13px] font-semibold text-gray-scale-80">{ins.companyName}</p>
                        <p className="text-[11px] text-gray-scale-40">가입연월 {ins.joinDate}</p>
                      </div>
                    </div>

                    {/* 상품명 */}
                    <p className="text-[14px] font-bold text-gray-scale-90 leading-snug mb-3">{ins.productName}</p>

                    {/* 태그들 */}
                    <div className="flex gap-1.5 flex-wrap">
                      {ins.generation && (
                        <span className="px-2 py-0.5 text-[11px] bg-primary-20 text-primary-50 rounded-md">{ins.generation}세대</span>
                      )}
                      {ins.contractType && (
                        <span className="px-2 py-0.5 text-[11px] bg-primary-10 text-primary-40 rounded-md">{ins.contractType}</span>
                      )}
                      {ins.coverageStructure && (
                        <span className="px-2 py-0.5 text-[11px] bg-System-secondary text-primary-40 rounded-md">{ins.coverageStructure}</span>
                      )}
                      {ins.cautionPoint && (
                        <span className="px-2 py-0.5 text-[11px] bg-red-scale-10 text-red-scale-30 rounded-md">{ins.cautionPoint}</span>
                      )}
                    </div>
                  </div>
                ) : (
                  /* 웹 레이아웃 - 기존 유지 */
                  <div>
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
                )}
              </div>
            ))}

            {!isMobile && (
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
            )}
          </div>
        )}

        <button
          onClick={handleSelect}
          className={`w-full py-4 rounded-2xl mt-6 font-bold text-lg transition-colors cursor-pointer ${
            insuranceInfo.id ? 'bg-primary-50 text-white' : 'bg-gray-scale-30 text-white pointer-events-none opacity-50'
          }`}
        >
          {isMobile ? '선택하기' : '확인하기'}
        </button>
      </div>
    </div>
  );
};

export default InsuranceListModal;
