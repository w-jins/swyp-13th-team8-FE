import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CImg from '../../../components/common/CImg';
import CButton from '../../../components/common/CButton';
import { useModalStore } from '../../../store/useModalStore';
import { analysisAI, sseConnectAPI } from '../../../api/analysisApi';
import { useAuthStore } from '../../../store/useAuthStore';
import { useAnalysisStore } from '../../../store/useAnalysisStore';
import { useNavigate } from 'react-router';
import { useCalcStore } from '../../../store/useCalcStore';
import { insadd, pdf, upload } from '../../../assets';

interface PdfUploaderProps {
  name: string;
}

const PdfUploader = ({ name }: PdfUploaderProps) => {
  const navigate = useNavigate();
  const openModal = useModalStore((state) => state.openModal);
  const { resetStore, insuranceInfo } = useCalcStore();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const setAnalysisData = useAnalysisStore((state) => state.setAnalysisData);
  const isLogin = !!useAuthStore((state) => state.accessToken);
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    // 홈 화면에서 다른 페이지로 넘어갈 때(언마운트 될 때) 딱 한 번 실행됩니다!
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
    noClick: true, // 💡 중요: 박스 전체 클릭 시 탐색기가 열리는 것을 막음
    noKeyboard: true,
  });
  const analysisStartHandler = () => {
    setIsLoading(true); // 로딩 화면 켜기

    sseConnectAPI(
      // 💡 1. SSE 파이프 연결이 성공했을 때 실행되는 함수
      async (id) => {
        try {
          // 파이프가 뚫렸으니 백엔드에 "분석 시작" 명령(POST) 전송
          await analysisAI(token, uploadedFile, id, insuranceInfo.id);
        } catch (e) {
          console.error('분석 요청 에러:', e);
          setIsLoading(false); // 에러 나면 로딩 끄기
          alert('분석 요청에 실패했습니다.');
        }
      },

      token, // 두 번째 파라미터: 토큰

      // 💡 2. [추가됨] 서버에서 SSE를 통해 이벤트가 날아올 때 실행할 함수
      (eventData) => {
        if (eventData.event === 'analysisComplete') {
          try {
            // 넘어온 문자열 데이터를 JSON 객체로 파싱
            const parsedData = JSON.parse(eventData.data);

            // 상태 업데이트 및 로딩 모달 끄기
            setAnalysisData(parsedData);
            setIsLoading(false);
            navigate('/analysis/result');
          } catch (e) {
            console.error('데이터 파싱 중 에러 발생:', e);
            setIsLoading(false);
          }
        }
      },
    );
  };
  return (
    <div
      {...getRootProps()}
      className={`flex flex-col h-78.75 rounded-3xl items-center justify-center gap-7 transition-colors duration-200 border
        ${
          isDragActive
            ? 'bg-primary-20 border-primary-50' // 드래그 중일 때 색상 진해짐
            : 'bg-primary-10 border-primary-20' // 평상시 색상
        }`}
    >
      <input {...getInputProps()} />
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          {/* 빙글빙글 도는 스피너 애니메이션 (Tailwind) */}
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-primary-20 border-t-primary-50"></div>

          {/* 로딩 텍스트 */}
          <div className="mt-5 flex flex-col items-center gap-2 text-center text-white">
            <p className="text-title-h3 font-bold">AI가 약관을 꼼꼼하게 분석하고 있어요</p>
            <p className="text-body-m-r text-gray-scale-30">잠시만 기다려주세요 (최대 1~2분 소요)</p>
          </div>
        </div>
      )}
      {/* 파일이 업로드되었을 때 보여줄 UI */}
      {uploadedFile ? (
        <div className="flex flex-col items-center gap-5">
          <CImg className="w-20 h-20" src={pdf} alt="PDF_아이콘" />
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-title-h3 text-gray-scale-80">{uploadedFile.name}</p>
            <p className="text-body-m-r text-gray-scale-50">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <div className="flex gap-3 mt-2">
            <CButton onClick={() => setUploadedFile(null)} className="px-5 py-3 rounded-2xl bg-gray-scale-20 text-gray-scale-70">
              삭제
            </CButton>
            <CButton onClick={analysisStartHandler} className="px-5 py-3 rounded-2xl bg-primary-50 text-white cursor-pointer">
              분석 시작하기
            </CButton>
          </div>
        </div>
      ) : insuranceInfo.id ? (
        <div className="flex flex-col items-center gap-5">
          <CImg className="w-20 h-20" src={insadd} alt="보험 아이콘" />
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-title-h4 text-gray-scale-60">{insuranceInfo.companyName}</p>
            <p className="text-title-h3 text-gray-scale-80">{insuranceInfo.productName}</p>
          </div>
          <div className="flex gap-3 mt-2">
            <CButton onClick={() => resetStore()} className="px-5 py-3 rounded-2xl bg-gray-scale-20 text-gray-scale-70">
              취소
            </CButton>
            <CButton onClick={analysisStartHandler} className="px-5 py-3 rounded-2xl bg-primary-50 text-white cursor-pointer">
              분석 시작하기
            </CButton>
          </div>
        </div>
      ) : (
        /* 파일 업로드 전 초기 UI (작성하신 코드 그대로 적용) */
        <>
          <div className="flex flex-col gap-5 items-center pointer-events-none">
            <CImg className="w-20 h-20" src={pdf} alt="PDF_아이콘" />
            <div className="flex flex-col items-center gap-1">
              <p className="text-title-h3 text-gray-scale-80">약관 파일을 업로드하세요.</p>
              <p className="text-body-m-r text-gray-scale-50">내 PC에서 첨부하거나 문서를 드래그하여 넣어주세요.</p>
            </div>
          </div>

          <div className="flex flex-row gap-3">
            {/* 💡 onClick={open}을 통해 이 버튼을 누를 때만 탐색기가 열림 */}
            <CButton onClick={open} className="flex items-center gap-2 px-5 py-4 bg-primary-0 rounded-2xl cursor-pointer">
              <CImg className="w-5 h-5" src={upload} alt="업로드" />
              <p className="text-gray-scale-60">컴퓨터에서 업로드</p>
            </CButton>

            <CButton
              disabled={!isLogin}
              onClick={() => openModal('INSURANCE')}
              className={`flex items-center gap-2 px-5 py-4 text-white rounded-2xl ${
                name ? 'bg-primary-50 cursor-pointer' : 'bg-gray-scale-40 cursor-not-allowed'
              }`}
            >
              <CImg className="w-5 h-5" src="" alt="불러오기" />
              <p>내 보험에서 불러오기</p>
            </CButton>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfUploader;
