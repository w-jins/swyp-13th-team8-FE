interface AnalysisTabsProps {
  activeTab: 'upload' | 'history';
  setActiveTab: (tab: 'upload' | 'history') => void;
}

const AnalysisTabs = ({ activeTab, setActiveTab }: AnalysisTabsProps) => {
  return (
    <div className="flex bg-gray-scale-10 p-1 rounded-full md:hidden w-full max-w-[320px] mx-auto mb-2">
      <button
        onClick={() => setActiveTab('upload')}
        className={`flex-1 py-2.5 text-body-s-b rounded-full transition-all duration-200 ${
          activeTab === 'upload' ? 'bg-white text-primary-50 shadow-xs' : 'text-gray-scale-50'
        }`}
      >
        약관 분석
      </button>
      <button
        onClick={() => setActiveTab('history')}
        className={`flex-1 py-2.5 text-body-s-b rounded-full transition-all duration-200 ${
          activeTab === 'history' ? 'bg-white text-primary-50 shadow-xs' : 'text-gray-scale-50'
        }`}
      >
        분석 히스토리
      </button>
    </div>
  );
};

export default AnalysisTabs;
