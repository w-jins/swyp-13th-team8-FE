import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CImg, CButton } from '@/components/common/index';
import { useModalStore } from '@/store/useModalStore';
import { analysisAI, sseConnectAPI } from '@/api/analysisApi';
import { useAuthStore } from '@/store/useAuthStore';
import { useAnalysisStore } from '@/store/useAnalysisStore';
import { useNavigate } from 'react-router';
import { useCalcStore } from '@/store/useCalcStore';
import { insadd, insurance, pdf, upload } from '@/assets';

interface PdfUploaderProps {
  name: string;
}

const PdfUploader = ({ name }: PdfUploaderProps) => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore();
  const { resetStore, insuranceInfo } = useCalcStore();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const setAnalysisData = useAnalysisStore((state) => state.setAnalysisData);
  const isLogin = !!useAuthStore((state) => state.accessToken);
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    return () => {
      resetStore(); // 전역 상태 초기화!
    };
  }, [resetStore]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
  });

  const analysisStartHandler = () => {
    openModal('LOADING');

    sseConnectAPI(
      async (id) => {
        try {
          await analysisAI(token, uploadedFile, id, insuranceInfo.id);
        } catch (e) {
          console.error('분석 요청 에러:', e);
          closeModal();
          alert('분석 요청에 실패했습니다.');
        }
      },
      token,
      (eventData) => {
        if (eventData.event === 'analysisComplete') {
          try {
            const parsedData = JSON.parse(eventData.data);
            setAnalysisData(parsedData);
            closeModal();
            navigate('/analysis/result');
          } catch (e) {
            console.error('데이터 파싱 중 에러 발생:', e);
            closeModal();
          }
        }
      },
    );
  };

  return (
    <div
      {...getRootProps()}
      // 💡 모바일에서는 h-auto와 py-10, 가로 패딩 px-6을 주어 내부 요소들이 세로로 배치되어도 터지지 않게 만듭니다.
      className={`flex flex-col pt-40 h-full md:py-0 md:h-78.75 md:rounded-3xl items-center sm:justify-between md:justify-center gap-6 md:gap-7 transition-colors duration-200 md:border
        ${isDragActive ? 'bg-primary-20 border-primary-50' : 'md:bg-primary-10 md:border-primary-20'}`}
    >
      <input {...getInputProps()} />

      {/* 1. 파일이 업로드되었을 때 보여줄 UI */}
      {uploadedFile ? (
        <div className="flex flex-col items-center gap-5 w-full">
          <CImg className="w-24 h-24 md:w-20 md:h-20" src={pdf} alt="PDF_아이콘" />
          <div className="flex flex-col items-center gap-1 text-center px-4">
            <p className="text-body-l-sb md:text-title-h3 text-gray-scale-80 truncate max-w-xs md:max-w-none">{uploadedFile.name}</p>
            <p className="text-body-s-r md:text-body-m-r text-gray-scale-50">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          {/* 모바일에서는 버튼들이 가로로 균등하게 너비를 나눠 가집니다 (flex-1) */}
          <div className="flex gap-3 mt-2 w-full md:w-auto px-4 md:px-0 justify-center">
            <CButton onClick={() => setUploadedFile(null)} className="flex-1 md:flex-none px-6 py-4 rounded-2xl bg-gray-scale-20 text-gray-scale-70">
              <p className="text-body-m-b">삭제</p>
            </CButton>
            <CButton onClick={analysisStartHandler} className="flex-1 md:flex-none px-6 py-4 rounded-2xl bg-primary-50 text-white cursor-pointer">
              <p className="text-body-m-b">분석 시작하기</p>
            </CButton>
          </div>
        </div>
      ) : insuranceInfo.id ? (
        /* 2. 내 보험 불러오기로 보험이 선택되었을 때의 UI */
        <div className="flex flex-col items-center gap-5 w-full">
          <CImg className="w-24 h-24 md:w-20 md:h-20" src={insadd} alt="보험 아이콘" />
          <div className="flex flex-col items-center gap-1 text-center px-4">
            <p className="text-body-m-r md:text-title-h4 text-gray-scale-60">{insuranceInfo.companyName}</p>
            <p className="text-body-l-sb md:text-title-h3 text-gray-scale-80">{insuranceInfo.productName}</p>
          </div>
          <div className="flex gap-3 mt-2 w-full md:w-auto px-4 md:px-0 justify-center">
            <CButton onClick={() => resetStore()} className="flex-1 md:flex-none px-6 py-4 rounded-2xl bg-gray-scale-20 text-gray-scale-70">
              <p className="text-body-m-b">취소</p>
            </CButton>
            <CButton onClick={analysisStartHandler} className="flex-1 md:flex-none px-6 py-4 rounded-2xl bg-primary-50 text-white cursor-pointer">
              <p className="text-body-m-b">분석 시작하기</p>
            </CButton>
          </div>
        </div>
      ) : (
        /* 3. 파일 업로드 전 초기 대기 UI */
        <>
          <div className="flex flex-col gap-4 md:gap-5 items-center pointer-events-none px-4 text-center">
            <CImg className="w-24 h-24 md:w-20 md:h-20" src={pdf} alt="PDF_아이콘" />
            <div className="flex flex-col items-center gap-1">
              <p className="text-title-h3 text-gray-scale-80">약관 파일을 업로드하세요.</p>
              <p className="text-body-s-r md:text-body-m-r text-gray-scale-50">내 PC에서 첨부하거나 문서를 드래그하여 넣어주세요.</p>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-3 w-full sm:px-0 md:px-0 md:w-auto">
            {/* 컴퓨터/기기에서 업로드 버튼 */}
            <CButton
              onClick={open}
              className="flex items-center justify-center gap-2 px-5 py-4 bg-primary-0 rounded-2xl cursor-pointer w-full md:w-auto border border-gray-scale-20 md:border-none"
            >
              <CImg className="w-5 h-5" src={upload} alt="업로드" />
              <p className="text-gray-scale-60 text-body-m-b md:text-body-m-m">
                {/* 💡 데스크탑일 땐 "컴퓨터에서", 모바일일 땐 "기기에서" 문구가 부드럽게 분기 처리됩니다. */}
                <span className="hidden md:inline">컴퓨터에서 업로드</span>
                <span className="inline md:hidden">기기에서 업로드하기</span>
              </p>
            </CButton>

            {/* 내 보험에서 불러오기 버튼 */}
            <CButton
              disabled={!isLogin}
              onClick={() => openModal('INSURANCE')}
              className={`flex items-center justify-center gap-2 px-5 py-4 text-white rounded-2xl w-full md:w-auto ${
                name ? 'bg-primary-50 cursor-pointer' : 'bg-gray-scale-40 cursor-not-allowed'
              }`}
            >
              <CImg className="w-5 h-5" src={insurance} alt="불러오기" />
              <p className="text-body-m-b">내 보험에서 불러오기</p>
            </CButton>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfUploader;
