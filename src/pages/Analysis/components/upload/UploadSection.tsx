import PdfUploader from './PdfUploader';

interface UploadSectionProps {
  isActive: boolean;
  userName: string;
}

const UploadSection = ({ isActive, userName }: UploadSectionProps) => {
  return (
    <div className={`flex h-full md:h-auto flex-col gap-4 md:gap-6 ${isActive ? 'block' : 'hidden'}`}>
      <p className="text-title-h3 hidden md:block">약관 불러오기</p>
      <PdfUploader name={userName} />
    </div>
  );
};

export default UploadSection;
