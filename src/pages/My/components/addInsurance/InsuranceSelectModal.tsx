import { useState, useEffect } from 'react';
import { close } from '../../../../assets';
import CLabel from '../../../../components/common/CLabel';
import api from '../../../../api/axios';
const COMPANY_MAP = {
  삼성화재: 'comp_001',
  현대해상: 'comp_002',
  DB손해보험: 'comp_003',
  KB손해보험: 'comp_004',
  메리츠화재: 'comp_005',
  기타: 'comp_006',
} as const;
export type CompanyName = keyof typeof COMPANY_MAP;
const TAG_VARIANT_MAP: Record<string, 'contract' | 'generation' | 'coverage' | 'caution' | 'unknown'> = {
  '5세대': 'generation',
  '4세대': 'generation',
  '3세대': 'generation',
  '2세대': 'generation',
  '1세대': 'generation',
  실손의료비: 'coverage',
  '3대비급여': 'coverage',
  갱신형: 'contract',
  비갱신형: 'contract',
};

interface InsuranceOption {
  id: number;
  productName: string;
  contractType: string;
  generation: number;
  coverageStructure: string;
  cautionPoint: string;
}

interface Props {
  company: CompanyName;
  year: number | null;
  month: number | null;
  selectedInsurance: number | null;
  same: boolean;
  setSame: (check: boolean) => void;
  onSelect: (id: number) => void;
  onConfirm: () => void;
  onClose: () => void;
  onNotFound: () => void;
}

const InsuranceSelectModal = ({ company, year, month, selectedInsurance, onSelect, onConfirm, onClose, onNotFound, same, setSame }: Props) => {
  const [options, setOptions] = useState<InsuranceOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const companyCode = COMPANY_MAP[company];
    const fetchData = async () => {
      if (!company || !year || !month) return;
      setIsLoading(true);
      setError(null);

      try {
        const joinDate = `${year}-${String(month).padStart(2, '0')}`;

        // 1. 세대 도출
        const genRes = await api.post('/insurance/generation', {
          companyId: companyCode,
          joinDate: joinDate,
        });

        const gen: number = genRes.data.data.generation;

        // 2. 상품 목록 조회
        const prodRes = await api.get('/insurance/products', {
          params: { companyName: company, generation: gen },
        });
        setOptions(prodRes.data.data.products);
      } catch (e) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [company, year, month]);

  // generation 숫자 → 태그 문자열
  const getGenerationTag = (gen: number) => `${gen}세대`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative bg-white rounded-4xl shadow-2xl w-full max-w-[540px] mx-4 p-10">
        <button onClick={onClose} className="absolute top-6 right-6 opacity-30 hover:opacity-100 transition-opacity">
          <img src={close} alt="close" className="w-5 h-5" />
        </button>

        <div className="text-center mt-4">
          <p className="text-title-h2 font-bold text-gray-scale-80 mb-2">다음 중 해당하는 보험을 선택해주세요.</p>
          <p className="text-[14px] text-gray-scale-40 mb-8 leading-relaxed">
            기입하신 정보를 바탕으로 검색한 결과입니다.
            <br />
            해당하는 보험이 없다면 보험증서를 확인해주세요.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-10 min-h-[220px] overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[220px] gap-3">
              <div className="w-8 h-8 border-[3px] border-primary-10 border-t-primary-50 rounded-full animate-spin" />
              <p className="text-sm text-gray-scale-30 font-medium">보험 목록을 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-[220px]">
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          ) : (
            options.map((ins) => {
              // Response 필드로 태그 구성
              const tags = [getGenerationTag(ins.generation), ins.coverageStructure, ins.contractType, ins.cautionPoint].filter(Boolean);

              return (
                <button
                  key={ins.id}
                  onClick={() => onSelect(ins.id)}
                  className={`w-full flex flex-col p-6 rounded-2xl border transition-all duration-200 text-left ${
                    selectedInsurance === ins.id
                      ? 'border-primary-50 bg-primary-5 ring-1 ring-primary-50'
                      : 'border-gray-scale-10 bg-white hover:border-gray-scale-20 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 w-full">
                    <div className="flex-1">
                      <p
                        className={`text-[16px] font-bold mb-3 leading-snug ${selectedInsurance === ins.id ? 'text-primary-50' : 'text-gray-scale-80'}`}
                      >
                        {ins.productName}
                      </p>
                      <div className="flex gap-1.5 flex-wrap">
                        {tags.map((tag) => (
                          <CLabel key={tag} variant={TAG_VARIANT_MAP[tag] ?? 'unknown'} size="sm">
                            {tag}
                          </CLabel>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 mt-1 flex items-center justify-center shrink-0 transition-all ${
                        selectedInsurance === ins.id ? 'border-primary-50 bg-primary-50' : 'border-gray-scale-10'
                      }`}
                    >
                      {selectedInsurance === ins.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
        {same ? (
          <>
            {alert('같은 보험은 등록이 안됩니다!')}
            {setSame(false)}
          </>
        ) : (
          <></>
        )}
        <div className="flex flex-col gap-4">
          <button
            onClick={onConfirm}
            disabled={!selectedInsurance || isLoading}
            className={`w-full py-4 rounded-2xl font-bold text-[16px] transition-all ${
              selectedInsurance && !isLoading
                ? 'bg-primary-50 text-white shadow-lg shadow-primary-50/20 active:scale-[0.98]'
                : 'bg-gray-scale-10 text-gray-scale-30 cursor-not-allowed'
            }`}
          >
            확인
          </button>
          <button
            onClick={onNotFound}
            className="w-full text-center text-[13px] text-gray-scale-40 underline underline-offset-4 decoration-gray-scale-10 hover:text-gray-scale-60 transition-colors"
          >
            해당하는 보험을 찾을 수 없어요
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceSelectModal;
