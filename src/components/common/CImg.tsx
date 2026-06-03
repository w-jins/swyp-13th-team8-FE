import { useState, type ImgHTMLAttributes } from 'react';

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}
/**
 *  loading 기본값을 eager로 설정 -> 스크롤을 내리는 페이지는 landing 페이지 밖에 존재하지 않기에 eager 로 설정
 *  fetchPriority 기본값을 low 로 설정하여 기본적으로 img의 우선순위를 뒤로 미뤄두기위함
 */
const CImg = ({ src, alt, className = '', loading = 'eager', fetchPriority = 'low', ...props }: ImgProps) => {
  const [isError, setIsError] = useState(false);

  // 에러 핸들러를 설정해 저장해둔 이미지를 못 가져올때 사용
  const handleError = () => {
    setIsError(true);
  };
  const baseStyle = 'max-w-full object-cover';
  return (
    <img
      className={`${baseStyle} ${className}`}
      src={isError ? '' : src}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={handleError}
      {...props}
    />
  );
};

export default CImg;
