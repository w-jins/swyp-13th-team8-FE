import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import api from '../../../../api/axios';
import type { Insurance } from '../../../../hooks/useInsurance.ts';

interface InsuranceDetail {
  userInsuranceId: number;
  companyName: string;
  productName: string;
  generation: number;
  joinDate: string;
  contractType?: string;
  coverageStructure?: string;
  cautionPoint?: string;
  coreSummary?: string[];
}

interface Props {
  insurance: Insurance;
  onClose: () => void;
}

const InsuranceDetailModal = ({ insurance, onClose }: Props) => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState<InsuranceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/insurance/${insurance.userInsuranceId}`);
        setDetail(res.data.data);
      } catch (e) {
        console.error('보험 상세 조회 실패', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [insurance.userInsuranceId]);

  const toggleKey = (key: string) => {
    setOpenKeys((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-[24px] w-[850px] max-h-[80vh] flex flex-col relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-scale-40 hover:text-gray-scale-80 text-xl z-10">
          ✕
        </button>

        <div className="overflow-y-auto px-8 pt-8 pb-4 flex-1">
          <p className="text-title-h3 font-bold text-center mb-6">보험 상세</p>

          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="w-8 h-8 border-[3px] border-primary-10 border-t-primary-50 rounded-full animate-spin" />
            </div>
          ) : detail ? (
            <>
              <div className="flex gap-1 mb-4 flex-wrap">
                {detail.contractType && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-scale-5 text-gray-scale-50 border border-gray-scale-20">
                    {detail.contractType}
                  </span>
                )}
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-5 text-primary-50 border border-primary-20">
                  {detail.generation}세대
                </span>
                {detail.coverageStructure && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-scale-5 text-gray-scale-50 border border-gray-scale-20">
                    {detail.coverageStructure}
                  </span>
                )}
                {detail.cautionPoint && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-50 text-red-400 border border-red-100">{detail.cautionPoint}</span>
                )}
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-[55px] h-[55px] bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[11px] font-bold">{detail.companyName}</span>
                </div>
                <div>
                  <p className="text-title-h3 font-bold">{detail.productName}</p>
                  <p className="text-body-s-r text-gray-scale-40 mt-1">
                    {detail.companyName} · {detail.joinDate}
                  </p>
                </div>
              </div>

              <div className="bg-gray-scale-5 rounded-xl p-4 mb-6 text-body-s-r text-gray-scale-50 leading-relaxed">
                본 분석 결과는 AI가 약관 내용을 기반으로 요약·해석한 정보입니다.
                <br />
                실제 보장 여부 및 조건은 가입한 계약의 조건과 다를 수 있으며, 상세 내용은 보험증서를 확인해주세요.
              </div>

              {detail.coreSummary && detail.coreSummary.length > 0 && (
                <div className="mb-4">
                  <p className="text-body-m-m font-bold text-gray-scale-80 mb-3">AI 핵심요약</p>
                  <div className="w-full rounded-xl border border-gray-scale-10 overflow-hidden">
                    <button
                      onClick={() => toggleKey('coreSummary')}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-scale-5 hover:bg-gray-scale-10 transition-colors"
                    >
                      <span className="text-body-m-m text-gray-scale-70">AI 핵심요약</span>
                      <span className="text-gray-scale-40">{openKeys.includes('coreSummary') ? '∧' : '∨'}</span>
                    </button>
                    {openKeys.includes('coreSummary') && (
                      <div className="px-4 py-3 text-body-s-r text-gray-scale-60 space-y-1">
                        {detail.coreSummary.map((item, i) => (
                          <p key={i}>• {item}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-scale-40">보험 정보를 불러올 수 없습니다.</div>
          )}
        </div>

        <div className="px-8 py-4 border-t border-gray-scale-5">
          <button
            onClick={() => {
              onClose();
              navigate('/calculator/medical-info');
            }}
            className="w-full py-3 rounded-xl bg-primary-5 text-primary-50 font-bold text-body-m-m hover:bg-primary-10 transition-colors"
          >
            이 보험으로 환급금 계산하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetailModal;
