import CBreadcrumb from '../../components/common/CBreadcrumb';
import CButton from '../../components/common/CButton';
import PdfViewer from './component/PdfViewer';
import { useEffect, useRef, useState } from 'react';
import CLabel from '../../components/common/CLabel';
import { useAnalysisStore } from '../../store/useAnalysisStore'; // 💡 만들어둔 Zustand 스토어 임포트
import { useParams } from 'react-router';
import { getAnalysisHistory } from '../../api/analysisApi';

const CATEGORIES = ['전체', 'AI 핵심요약', '보장구조', '보장범위', '제한조건', '갱신·재가입', '청구방법', '해지·환급'];

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
        {/* 모바일 전용 타이틀 영역 */}
        <div className="md:hidden flex flex-col gap-2 order-1 ">
          <p className="text-title-h2 font-bold text-gray-scale-90">약관 분석 결과</p>
        </div>

        {/* 모바일 전용 업로드 파일 표시 박스*/}
        <div className="md:hidden flex flex-col gap-2 mb-2 order-3">
          <p className="text-title-h4 text-gray-scale-80">업로드 파일</p>
          <div className="flex items-center gap-2 border border-gray-scale-20 rounded-xl px-4 py-3 bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-scale-40"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <p className="text-body-s-r text-gray-scale-60 truncate">{originalFileName}</p>
          </div>
        </div>

        {/* 카테고리 버튼 */}
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

        <div className="bg-gray-scale-5 text-gray-scale-50 rounded-3xl order-2 md:order-2">
          <p className="px-6 py-5 text-body-m-r">
            본 분석 결과는 AI가 약관 내용을 기반으로 요약·해석한 정보입니다.
            <br />
            실제 보장 여부 및 조건은 가입자 개인의 조건에 따라 달라질 수 있으며, 일부 내용은 부정확하거나 누락될 수 있습니다. 자세한 내용은 약관
            원문을 확인해주세요.
          </p>
        </div>

        {/* 요약 카드 목록 */}
        <div className="flex flex-col gap-5 md:gap-15 order-5 md:order-3">
          {/* 1. AI 핵심요약 */}
          <div className="flex flex-col gap-7 border border-gray-scale-20 bg-gray-scale-0 rounded-2xl px-6 py-7">
            <div
              ref={(el) => {
                sectionRefs.current['AI 핵심요약'] = el;
              }}
              className="scroll-mt-12 flex gap-3 border-b border-gray-scale-30 pb-4"
            >
              <span className="border-4 border-primary-40 text-center"></span>
              <p className="text-primary-40 text-title-h4">AI 핵심요약</p>
              <div className="ml-auto rounded-full bg-primary-30 w-7 h-7 justify-self-end"></div>
            </div>
            <div className="flex flex-col gap-5 px-1">
              <div className="flex flex-col gap-5">
                {/* 💡 실제 상품명 및 태그 적용 */}
                <p className="text-title-h3">{productName}</p>
                <div className="flex gap-1.5 flex-wrap">
                  <CLabel className="sm:py-1 sm:px-2 flex text-[12px]" children={contractType} variant="contract" />
                  <CLabel className="sm:py-1 sm:px-2 flex text-[12px]" children={generation} variant="generation" />
                  <CLabel className="sm:py-1 sm:px-2 flex text-[12px]" children={coverageStructure} variant="coverage" />
                  <CLabel className="sm:py-1 sm:px-2 flex text-[12px]" children={cautionPoint} variant="caution" />
                </div>
              </div>
              {/* 💡 핵심 요약 리스트 렌더링 */}
              <ul className="flex flex-col gap-1 px-6 text-body-m-r text-gray-scale-70 list-disc">
                {content.coreSummary.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2. 보장 구조 */}
          <div className="flex flex-col gap-5 border border-gray-scale-20 bg-gray-scale-0 rounded-2xl px-6 py-7">
            <div
              ref={(el) => {
                sectionRefs.current['보장구조'] = el;
              }}
              className="scroll-mt-12 flex gap-3 border-b border-gray-scale-30 pb-4"
            >
              <span className="border-4 border-primary-40 text-center"></span>
              <p className="text-primary-40 text-title-h4">보장 구조</p>
            </div>
            <div className="flex flex-col gap-3 bg-gray-scale-5 rounded-2xl p-6">
              <div className="flex">
                <p className="text-title-h3">기본 보장</p>
                <div className="ml-auto rounded-full bg-primary-30 w-7 h-7 justify-self-end"></div>
              </div>
              <ul className="flex flex-col gap-1 px-6 text-body-m-r text-gray-scale-70 list-disc">
                {content.coverageDetails.basicCoverages.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 bg-gray-scale-5 rounded-2xl p-6">
              <div className="flex">
                <p className="text-title-h3">추가 보장</p>
                <div className="ml-auto rounded-full bg-primary-30 w-7 h-7 justify-self-end"></div>
              </div>
              <ul className="flex flex-col gap-1 px-6 text-body-m-r text-gray-scale-70 list-disc">
                {content.coverageDetails.specialCoverages.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 bg-gray-scale-5 rounded-2xl p-6">
              <div className="flex">
                <p className="text-title-h3">보장되지 않는 항목</p>
                <div className="ml-auto rounded-full bg-primary-30 w-7 h-7 justify-self-end"></div>
              </div>
              <ul className="flex flex-col gap-1 px-6 text-body-m-r text-gray-scale-70 list-disc">
                {content.coverageDetails.exclusions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. 보장 범위 */}
          <div className="flex flex-col gap-7 border border-gray-scale-20 bg-gray-scale-0 rounded-2xl px-6 py-7">
            <div
              ref={(el) => {
                sectionRefs.current['보장범위'] = el;
              }}
              className="scroll-mt-12 flex gap-3 border-b border-gray-scale-30 pb-4"
            >
              <span className="border-4 border-primary-40 text-center"></span>
              <p className="text-primary-40 text-title-h4">보장 범위</p>
              <div className="ml-auto rounded-full bg-primary-30 w-7 h-7 justify-self-end"></div>
            </div>
            <div className="flex flex-col gap-5 px-1">
              <ul className="flex flex-col gap-1 px-6 text-body-m-r text-gray-scale-70 list-disc">
                {content.coverageScope.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 💡 이하 CATEGORIES에 맞춰 누락되었던 섹션들 추가 (제한조건, 갱신재가입 등) */}

          {/* 4. 제한조건 */}
          <div className="flex flex-col gap-7 border border-gray-scale-20 bg-gray-scale-0 rounded-2xl px-6 py-7">
            <div
              ref={(el) => {
                sectionRefs.current['제한조건'] = el;
              }}
              className="scroll-mt-12 flex gap-3 border-b border-gray-scale-30 pb-4"
            >
              <span className="border-4 border-primary-40 text-center"></span>
              <p className="text-primary-40 text-title-h4">제한 조건</p>
              <div className="ml-auto rounded-full bg-primary-30 w-7 h-7 justify-self-end"></div>
            </div>
            <div className="flex flex-col gap-5 px-1">
              <ul className="flex flex-col gap-1 px-6 text-body-m-r text-gray-scale-70 list-disc">
                {content.limitations.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. 갱신·재가입 */}
          <div className="flex flex-col gap-7 border border-gray-scale-20 bg-gray-scale-0 rounded-2xl px-6 py-7">
            <div
              ref={(el) => {
                sectionRefs.current['갱신·재가입'] = el;
              }}
              className="scroll-mt-12 flex gap-3 border-b border-gray-scale-30 pb-4"
            >
              <span className="border-4 border-primary-40 text-center"></span>
              <p className="text-primary-40 text-title-h4">갱신·재가입</p>
              <div className="ml-auto rounded-full bg-primary-30 w-7 h-7 justify-self-end"></div>
            </div>
            <div className="flex flex-col gap-5 px-1">
              <ul className="flex flex-col gap-1 px-6 text-body-m-r text-gray-scale-70 list-disc">
                {content.renewalTerms.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 6. 청구방법 */}
          <div className="flex flex-col gap-7 border border-gray-scale-20 bg-gray-scale-0 rounded-2xl px-6 py-7">
            <div
              ref={(el) => {
                sectionRefs.current['청구방법'] = el;
              }}
              className="scroll-mt-12 flex gap-3 border-b border-gray-scale-30 pb-4"
            >
              <span className="border-4 border-primary-40 text-center"></span>
              <p className="text-primary-40 text-title-h4">청구 방법</p>
              <div className="ml-auto rounded-full bg-primary-30 w-7 h-7 justify-self-end"></div>
            </div>
            <div className="flex flex-col gap-5 px-1">
              <ul className="flex flex-col gap-1 px-6 text-body-m-r text-gray-scale-70 list-disc">
                {content.claimMethod.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 7. 해지·환급 */}
          <div className="flex flex-col gap-7 border border-gray-scale-20 bg-gray-scale-0 rounded-2xl px-6 py-7">
            <div
              ref={(el) => {
                sectionRefs.current['해지·환급'] = el;
              }}
              className="scroll-mt-12 flex gap-3 border-b border-gray-scale-30 pb-4"
            >
              <span className="border-4 border-primary-40 text-center"></span>
              <p className="text-primary-40 text-title-h4">해지·환급</p>
              <div className="ml-auto rounded-full bg-primary-30 w-7 h-7 justify-self-end"></div>
            </div>
            <div className="flex flex-col gap-5 px-1">
              <ul className="flex flex-col gap-1 px-6 text-body-m-r text-gray-scale-70 list-disc">
                {content.cancellationAndRefund.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
