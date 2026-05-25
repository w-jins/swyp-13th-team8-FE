import { check, edit } from '../../assets/index';

interface StepBarProps {
  steps: string[];
  currentStep: number;
}

type StepStatus = '대기중' | '진행중' | '완료';

const getStepStatus = (index: number, currentStep: number): StepStatus => {
  if (index < currentStep) return '완료';
  if (index === currentStep) return '진행중';
  return '대기중';
};

const StepBar = ({ steps = [], currentStep }: StepBarProps) => {
  return (
    <div className="relative flex items-start justify-between w-full max-w-5xl mx-auto mt-10">
      {/* 배경 회색선 */}
      <div
        className="absolute h-[1px] bg-gray-scale-20 z-0"
        style={{
          top: '20px',
          left: `calc(100% / (2 * ${steps.length}))`,
          right: `calc(100% / (2 * ${steps.length}))`,
        }}
      />

      {/* 진행 파란선 */}
      <div
        className="absolute h-[1px] bg-primary-50 transition-all duration-500 z-0"
        style={{
          top: '20px',
          left: `calc(100% / (2 * ${steps.length}))`,
          width: currentStep === 0 ? '0%' : `calc(${(currentStep / (steps.length - 1)) * 100}% - 100% / ${steps.length})`,
        }}
      />

      {/* 스텝 */}
      {steps.map((step, index) => {
        const status = getStepStatus(index, currentStep);
        const isDone = status === '완료';
        const isActive = status === '진행중';
        const isWaiting = status === '대기중';

        return (
          <div key={index} className="relative z-10 flex flex-col items-center flex-1">
            {/* 원 */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                isWaiting ? 'bg-white border-gray-scale-20' : 'bg-primary-50 border-primary-50'
              }`}
            >
              {isDone && <img src={check} alt="완료" className="w-4 h-4" />}
              {isActive && <img src={edit} alt="진행중" className="w-4 h-4" />}
              {isWaiting && <span className="text-sm font-semibold text-gray-scale-40">{index + 1}</span>}
            </div>

            {/* 라벨 */}
            <span
              className={`mt-2 text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 ${
                isWaiting ? 'text-gray-scale-40' : 'text-primary-50'
              }`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepBar;
