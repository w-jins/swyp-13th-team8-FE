import { right } from '../../../../assets';
import CImg from '../../../../components/common/CImg';
import CLabel from '../../../../components/common/CLabel';
import useCompanyImg from '../../../../hooks/useCompanyImg';
import type { Insurance } from '../../../Calculator/components/insuranceTypes';

interface InsuranceCardProps {
  ins: Insurance;
  isDeleting: boolean;
  onDelete: (e: React.MouseEvent, id: number) => void;
  onSelect: (ins: Insurance) => void;
}

const InsuranceCard = ({ ins, isDeleting, onDelete, onSelect }: InsuranceCardProps) => {
  const insuranceCompany = useCompanyImg(ins?.companyName);

  return (
    <div className="px-4">
      <div className="bg-white rounded-2xl border border-gray-scale-10 p-5 shadow-sm hover:shadow-md transition-shadow">
        {/* 레이블 + 삭제/이동 버튼 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-1.5 flex-wrap">
            <CLabel variant="generation" size="sm">
              {ins.generation}세대
            </CLabel>
            {ins.contractType && (
              <CLabel variant="contract" size="sm">
                {ins.contractType}
              </CLabel>
            )}
            {ins.coverageStructure && (
              <CLabel variant="coverage" size="sm">
                {ins.coverageStructure}
              </CLabel>
            )}
            {ins.cautionPoint && (
              <CLabel variant="caution" size="sm">
                {ins.cautionPoint}
              </CLabel>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-2">
            <button
              className="cursor-pointer text-gray-scale-30 hover:text-red-400 transition-colors disabled:opacity-40 text-[13px]"
              onClick={(e) => onDelete(e, ins.userInsuranceId)}
              disabled={isDeleting}
            >
              {isDeleting ? <div className="w-4 h-4 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" /> : <span>삭제</span>}
            </button>
            <button className="cursor-pointer" onClick={() => onSelect(ins)}>
              <CImg src={right} alt="상세보기" className="w-6 h-6 opacity-30" />
            </button>
          </div>
        </div>

        {/* 보험사 로고 + 상품명/보험사명 */}
        <div className="flex items-center gap-3">
          <CImg className="w-10 h-10 shrink-0" src={insuranceCompany?.src} alt="보험사" />
          <div className="min-w-0">
            <p className="text-[15px] font-bold text-gray-scale-80 leading-snug truncate">{ins.productName}</p>
            <p className="text-[12px] text-gray-scale-50 mt-1 truncate">
              {ins.companyName} · {ins.joinDate} 가입
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCard;
