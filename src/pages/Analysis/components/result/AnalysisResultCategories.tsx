import { CButton } from '@/components/common/index';
import { CATEGORIES } from '@/constants/analysis';

interface AnalysisResultCategoriesProps {
  scrollToSection: (key: string) => void;
  activeCategory: string;
}
const AnalysisResultCategories = ({ scrollToSection, activeCategory }: AnalysisResultCategoriesProps) => {
  return (
    <div className="shrink-0 flex flex-nowrap md:flex-wrap gap-2 pb-1 -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto no-scrollbar order-4 md:order-1">
      {CATEGORIES.map((category) => (
        <CButton
          key={category}
          onClick={() => scrollToSection(category)}
          // 💡 index === 0 이 아니라 선택된 activeCategory와 비교하도록 수정
          className={`shrink-0 px-4 py-2 rounded-full text-body-m-m transition-colors cursor-pointer ${
            activeCategory === category ? 'bg-primary-50 text-white' : 'bg-gray-scale-10 text-gray-scale-50 hover:bg-gray-scale-20'
          }`}
        >
          {category}
        </CButton>
      ))}
    </div>
  );
};

export default AnalysisResultCategories;
