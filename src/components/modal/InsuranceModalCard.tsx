import useCompanyImg from '../../hooks/useCompanyImg';
import type { Insurance } from '../../hooks/useInsurance';
import CImg from '../common/CImg';
import CLabel from '../common/CLabel';

interface InsuranceModalCardProps {
  item: Insurance; // 차후 정확한 타입(Insurance)으로 변경하세요
  isSelected: boolean;
  onSelect: (item: any) => void;
}

const InsuranceModalCard = ({ item, isSelected, onSelect }: InsuranceModalCardProps) => {
  const insuranceCompany = useCompanyImg(item.companyName);
  return (
    <div
      onClick={() => onSelect(item)}
      className={`flex cursor-pointer flex-col gap-4 rounded-2xl border p-5 transition-all duration-200 md:min-h-[160px]
              ${
                isSelected
                  ? 'border-primary-50 bg-primary-10/10' // 선택됨
                  : 'border-gray-scale-20 hover:border-gray-scale-30' // 기본 상태
              }`}
    >
      <div className="flex gap-3">
        <CImg className="w-8 h-8" src={insuranceCompany?.src} alt="보험사" />

        <div className="flex flex-col gap-1">
          <p className="text-body-m-b break-keep text-gray-scale-90 line-clamp-2">{item.productName}</p>
          <p className="text-caption-r text-gray-scale-50 text-body-s-r">
            {item.companyName} · {item.joinDate}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {item.generation && (
          <CLabel className="text-body-s-r flex sm:py-1 sm:px-2" variant="generation">
            {item.generation}세대
          </CLabel>
        )}

        {item.contractType && (
          <CLabel className="text-body-s-r flex sm:py-1 sm:px-2" variant="contract">
            {item.contractType}
          </CLabel>
        )}

        {item.coverageStructure && (
          <CLabel className="text-body-s-r flex sm:py-1 sm:px-2" variant="coverage">
            {item.coverageStructure}
          </CLabel>
        )}

        {item.cautionPoint && (
          <CLabel className="text-body-s-r flex sm:py-1 sm:px-2" variant="caution">
            {item.cautionPoint}
          </CLabel>
        )}
      </div>
    </div>
  );
};

export default InsuranceModalCard;
