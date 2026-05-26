import { useId, type InputHTMLAttributes } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CRadio = ({ className = '', label, id, ...props }: RadioProps) => {
  const generatedId = useId();
  const radioId = id || generatedId;
  return (
    <div className="inline-flex items-center gap-2">
      <input id={radioId} type="radio" className="w-4 h-4 cursor-pointer accent-primary-50" {...props} />
      <label htmlFor={radioId} className="cursor-pointer mr-4 text-gray-scale-60">
        {label}
      </label>
    </div>
  );
};

export default CRadio;
