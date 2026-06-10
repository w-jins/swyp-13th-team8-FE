interface AnalysisResultMobileProps {
  fileName: string;
}
const AnalysisResultMobileTop = ({ fileName }: AnalysisResultMobileProps) => {
  return (
    <div>
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
          <p className="text-body-s-r text-gray-scale-60 truncate">{fileName}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultMobileTop;
