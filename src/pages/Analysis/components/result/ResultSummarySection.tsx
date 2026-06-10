import type { RefObject } from 'react';
import { CLabel } from '@/components/common/index';
import type { AiSummaryContent } from '@/store/useAnalysisStore';
interface ResultSummarySectionProps {
  ref: RefObject<{ [key: string]: HTMLDivElement | null | undefined }>;
  productName: string;
  contractType: string;
  generation: string;
  coverageStructure: string;
  cautionPoint: string;
  content: AiSummaryContent;
}
const ResultSummarySection = ({
  ref,
  productName,
  cautionPoint,
  content,
  contractType,
  coverageStructure,
  generation,
}: ResultSummarySectionProps) => {
  return (
    <div className="flex flex-col gap-5 md:gap-15 order-5 md:order-3">
      {/* 1. AI 핵심요약 */}
      <div className="flex flex-col gap-7 border border-gray-scale-20 bg-gray-scale-0 rounded-2xl px-6 py-7">
        <div
          ref={(el) => {
            ref.current['AI 핵심요약'] = el;
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
            ref.current['보장구조'] = el;
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
            ref.current['보장범위'] = el;
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
            ref.current['제한조건'] = el;
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
            ref.current['갱신·재가입'] = el;
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
            ref.current['청구방법'] = el;
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
            ref.current['해지·환급'] = el;
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
  );
};

export default ResultSummarySection;
