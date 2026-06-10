import { CBreadcrumb } from '@/components/common/index';
import { useEffect, useRef, useState } from 'react';
import { useAnalysisStore } from '@/store/useAnalysisStore'; // 💡 만들어둔 Zustand 스토어 임포트
import { useParams } from 'react-router';
import { getAnalysisHistory } from '@/api/analysisApi';
import { PdfViewer, AnalysisResultMobileTop, AnalysisResultCategories, ResultSummarySection } from './components/index';

const AnalysisResult = () => {
  // 💡 1. Zustand에서 분석 결과 데이터 가져오기
  const { analysisData, setAnalysisData } = useAnalysisStore();

  const { id } = useParams();
  const [activeCategory, setActiveCategory] = useState('전체');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null | undefined }>({});

  const scrollToSection = (category: string) => {
    setActiveCategory(category);

    if (category === '전체') {
      sectionRefs.current['AI 핵심요약']?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const targetElement = sectionRefs.current[category];
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await getAnalysisHistory(parseInt(id));
          setAnalysisData(res.data);
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    }
  }, []);

  // 💡 2. 데이터가 없을 경우의 예외 처리 (새로고침 등 방어 로직)
  if (!analysisData) {
    return (
      <div className="flex w-full h-full items-center justify-center bg-gray-scale-5">
        <p className="text-gray-scale-50 text-title-h3">분석 데이터를 불러오는 중이거나 데이터가 없습니다.</p>
      </div>
    );
  }

  // 💡 3. 데이터 구조 분해 할당 (코드를 깔끔하게 쓰기 위함)
  const {
    originalFileName,
    pdfFileUrl,
    productName,
    contractType,
    generation,
    coverageStructure,
    cautionPoint,
    aiSummary: { content },
  } = analysisData;

  return (
    <div className="flex flex-col md:flex-row w-full h-full md:overflow-hidden bg-gray-scale-5">
      <div className="hidden md:flex flex-col w-[55%] xl:w-3/5 h-full">
        {/* 상단 타이틀 영역 */}
        <div className="flex flex-col gap-4 px-10 pb-8">
          <CBreadcrumb
            items={[
              { label: '약관 분석', path: '/analysis' },
              { label: '약관 분석 결과', path: '/analysis/result' },
            ]}
          />
          <p className="text-title-h3 text-gray-scale-90">약관 분석 결과</p>
        </div>
        <div className="flex flex-col flex-1 border-t border-gray-scale-30">
          <div className="bg-primary-0 px-10 py-4 border-b border-gray-scale-30">
            {/* 💡 실제 파일명 적용 */}
            <p className="text-gray-scale-60 font-medium">{originalFileName}</p>
          </div>
          <div className="flex-1 bg-gray-scale-20 relative">
            <div className="absolute inset-0 overflow-hidden">
              {/* 💡 실제 PDF URL 적용 */}
              <PdfViewer fileUrl={pdfFileUrl} />
            </div>
          </div>
        </div>
      </div>

      {/* PDF 요약 (우측 패널) */}
      <div className="flex flex-col w-full md:w-[45%] xl:w-2/5 h-full bg-primary-0 md:rounded-tl-[40px] md:shadow-PDF md:border-l border-gray-scale-20 z-10 overflow-y-auto p-6 gap-7">
        <AnalysisResultMobileTop fileName={originalFileName} />

        {/* 카테고리 버튼 */}
        <AnalysisResultCategories scrollToSection={scrollToSection} activeCategory={activeCategory} />

        <div className="bg-gray-scale-5 text-gray-scale-50 rounded-3xl order-2 md:order-2">
          <p className="px-6 py-5 text-body-m-r">
            본 분석 결과는 AI가 약관 내용을 기반으로 요약·해석한 정보입니다.
            <br />
            실제 보장 여부 및 조건은 가입자 개인의 조건에 따라 달라질 수 있으며, 일부 내용은 부정확하거나 누락될 수 있습니다. 자세한 내용은 약관
            원문을 확인해주세요.
          </p>
        </div>

        <ResultSummarySection
          ref={sectionRefs}
          productName={productName}
          cautionPoint={cautionPoint}
          content={content}
          contractType={contractType}
          coverageStructure={coverageStructure}
          generation={generation}
        />
      </div>
    </div>
  );
};

export default AnalysisResult;
