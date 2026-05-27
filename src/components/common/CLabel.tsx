import type { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: 'contract' | 'generation' | 'coverage' | 'caution' | 'unknown';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CLabel = ({ children, className = '', variant, size = 'sm', ...props }: LabelProps) => {
  const baseStyle = 'items-center justify-center rounded transition-colors border font-semibold';

  const variants = {
    contract: 'bg-primary-10 text-primary-40', // 계약 유형
    generation: 'bg-primary-20 text-primary-50', // 보험 세대
    coverage: 'bg-System-secondary text-primary-40', // 보장 구조
    caution: 'bg-red-scale-10 text-red-scale-30', // 주의 포인트
    unknown: 'bg-gray-scale-10 text-gray-scale-40', //세대확인 필요
  };

  const sizes = {
    sm: 'px-4  py-2 text-sm',
    md: 'px-6 py-2',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <span className={`${baseStyle} ${variant ? variants[variant] : ''} ${sizes[size]} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default CLabel;
