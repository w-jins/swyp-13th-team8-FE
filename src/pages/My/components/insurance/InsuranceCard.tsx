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
    <div className="bg-primary-0 rounded-3xl border border-gray-scale-10 p-10 min-h-[250px] shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-10">
        <div className="flex gap-3 flex-wrap">
          <CLabel variant="generation" size="sm">
            {ins.generation}세대
          </CLabel>
        </div>
        <div className="flex items-center gap-5">
          {/* 삭제 버튼 */}
          <button
            className="cursor-pointer shrink-0 text-gray-scale-30 hover:text-red-400 transition-colors disabled:opacity-40"
            onClick={(e) => onDelete(e, ins.userInsuranceId)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="w-5 h-5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
            ) : (
              <span className="text-xl">삭제</span>
            )}
          </button>

          {/* 상세보기 버튼 */}
          <button className="cursor-pointer shrink-0" onClick={() => onSelect(ins)}>
            <CImg src={right} alt="상세보기" className="w-10 h-10 opacity-30" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-7">
        <CImg className="w-14 h-14" src={insuranceCompany?.src} alt="보험사" />
        <div className="">
          <p className="text-title-h2 text-gray-scale-80 leading-snug">{ins.productName}</p>
          <p className="text-body-l-r text-gray-scale-50 mt-5">
            {ins.companyName} · {ins.joinDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCard;
