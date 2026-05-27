import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  fileUrl: string | File; // 서버에서 받아온 URL이나 아까 드래그앤드롭으로 올린 File 객체
}

const PdfViewer = ({ fileUrl }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // PDF 파일을 성공적으로 불러왔을 때 실행되는 함수 (전체 페이지 수를 세팅)
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1); // 새 파일을 열면 1페이지로 초기화
  };

  const goToPrevPage = () => {
    // 1페이지보다 작아지지 않도록 Math.max 사용
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    // 최대 페이지(numPages)를 넘지 않도록 Math.min 사용
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-200 items-center  justify-center relative">
      {/* 1. PDF 렌더링 영역 */}
      <div className="shadow-lg border border-gray-300">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="rounded-xl p-20 text-gray-500">약관을 불러오는 중입니다...</div>}
        >
          <Page
            width={550}
            pageNumber={pageNumber}
            renderTextLayer={false} // 텍스트 복사 기능 (필요 없으면 false로 성능 최적화)
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      <div className="absolute bottom-10 flex items-center justify-between px-6 py-3 bg-white rounded-full shadow-md w-60">
        <button onClick={goToPrevPage} className="text-gray-500 hover:text-black text-xl font-bold px-2">
          -
        </button>
        <button onClick={goToNextPage} className="text-gray-500 hover:text-black text-xl font-bold px-2">
          +
        </button>
        <div className="text-gray-700 text-sm font-medium">
          {pageNumber} / {numPages}
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
