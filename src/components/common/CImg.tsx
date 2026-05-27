import { useState, type ImgHTMLAttributes } from 'react';

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

const CImg = ({ src, alt, className = '', ...props }: ImgProps) => {
  const [isError, setIsError] = useState(false);

  // 에러 핸들러를 설정해 저장해둔 이미지를 못 가져올때 사용
  const handleError = () => {
    setIsError(true);
  };
  const baseStyle = 'max-w-full object-cover';
  return <img className={`${baseStyle} ${className}`} src={isError ? '' : src} alt={alt} {...props} loading="lazy" onError={handleError} />;
};

export default CImg;
