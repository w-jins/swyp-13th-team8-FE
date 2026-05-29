// 1. react-router v7에서 useNavigate 임포트
import { useNavigate } from 'react-router';
import CContents from '../../../components/common/CContents';
import CStepBar from '../../../components/common/CStepBar';
import CButton from '../../../components/common/CButton';
import CBreadcrumb from '../../../components/common/CBreadcrumb';
import { useCalcStore } from '../../../store/useCalcStore';
import { HOSPITAL_TYPE, PAY_TYPE, PURPOSE_TYPE, TREATMENT_CATEGORY, VISIT_TYPE } from '../../../constants/insurance';
import { useEffect } from 'react';
import { HospitalClinic, HospitalGeneral, HospitalHos } from '../../../assets';
import CImg from '../../../components/common/CImg';

const MedicalInfo = () => {
  // 2. 네비게이트 함수 선언
  const navigate = useNavigate();
  const steps = ['보험 불러오기', '진료 정보 입력', '계산 결과'];
  const { calcForm, setCalcForm, insuranceInfo } = useCalcStore();
  const currentStep = 1;

  useEffect(() => {
    if (!insuranceInfo || !insuranceInfo.id) {
      alert('선택된 보험 정보가 없습니다. 1단계부터 다시 진행해주세요!');
      navigate('/calculator'); // 1단계 첫 화면으로 강제 추방!
    }
  }, []);

  // 3. 계산하기 버튼 클릭 시 호출될 핸들러
  const handleCalculate = () => {
    const { ediCode, ...requiredFields } = calcForm;
    const isValid = Object.values(requiredFields).every((value) => {
      if (typeof value === 'number') {
        return value > 0 && !isNaN(value);
      }
      return value !== null && value !== '';
    });
    if (!isValid) {
      alert('모든 필수 항목을 입력해주세요!');
      return;
    }
    navigate('/calculator/refund-result');
  };

  const getSelectedClass = (current: string | null, target: string) => {
    return current === target
      ? 'border-primary-50 bg-primary-5 text-primary-50 font-bold'
      : 'border-gray-scale-10 text-gray-scale-40 hover:bg-gray-50';
  };

  const ICON_MAP: Record<string, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
    CLINIC: HospitalClinic,
    GENERAL_HOSPITAL: HospitalGeneral,
    TERTIARY_HOSPITAL: HospitalHos,
  };

  return (
    <div className="pb-20">
      <CBreadcrumb items={[{ label: '환급금 계산기' }]} />

      {/* 💡 모바일에서는 양옆 패딩을 없애 꽉 차게 만듭니다 (데스크탑은 유지) */}
      <CContents title="환급금 계산기" className="md:px-90 !px-0 md:!px-auto">
        <div className="px-5 md:px-0 mb-8 md:mb-15 mt-5">
          <CStepBar steps={steps} currentStep={currentStep} />
        </div>
        <div className="max-w-3xl mx-auto px-5 md:px-0">
          <h2 className="text-xl md:text-[22px] font-bold text-left md:text-center mb-8 md:mb-12">진료 정보를 입력해 주세요.</h2>

          <div className="space-y-10">
            {/* 병원 유형 */}
            <section>
              <label className="block text-sm font-bold mb-3">
                병원 유형 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {HOSPITAL_TYPE.map((type) => {
                  const IconComponent = ICON_MAP[type.value];
                  return (
                    <button
                      key={type.value}
                      onClick={() => setCalcForm({ hospitalType: type.value })}
                      // 💡 PC는 flex-row (가로), 모바일은 flex-col (세로)
                      className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-3 md:py-4 rounded-xl border text-[11px] md:text-[14px] transition-all ${getSelectedClass(
                        calcForm.hospitalType,
                        type.value,
                      )}`}
                    >
                      {IconComponent && <IconComponent className="w-6 h-6 md:w-5 md:h-5 shrink-0" />}
                      <span className="text-center md:text-left">
                        {/* 💡 모바일에서만 괄호 앞에서 줄바꿈 되도록 처리 */}
                        <span className="md:hidden whitespace-pre-line leading-tight">{type.label.replace(' (', '\n(')}</span>
                        {/* 💡 PC 원본 텍스트 유지 */}
                        <span className="hidden md:inline whitespace-nowrap">{type.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 진료 유형 & 목적 */}
            {/* 💡 PC는 2단 가로(grid-cols-2), 모바일은 1단 세로(grid-cols-1) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <section>
                <label className="block text-sm font-bold mb-3">
                  진료 유형 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {VISIT_TYPE.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setCalcForm({ visitType: t.value })}
                      className={`flex-1 py-3 border rounded-xl text-[13px] md:text-sm transition-all ${getSelectedClass(calcForm.visitType, t.value)}`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <label className="block text-sm font-bold mb-3">
                  진료 목적 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {PURPOSE_TYPE.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setCalcForm({ purposeType: t.value })}
                      className={`flex-1 py-3 border rounded-xl text-[13px] md:text-sm transition-all ${getSelectedClass(calcForm.purposeType, t.value)}`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* 진료 항목 아이콘 리스트 */}
            <section>
              <label className="block text-sm font-bold mb-5">
                진료 항목 <span className="text-red-500">*</span>
              </label>
              {/* 💡 PC 원본(flex justify-between), 모바일(grid-cols-4로 2줄 배치) */}
              <div className="grid grid-cols-4 gap-y-6 md:flex md:justify-between px-2 md:px-4">
                {TREATMENT_CATEGORY.map((item) => (
                  <div
                    key={item.value}
                    onClick={() => setCalcForm({ treatmentCategory: item.value })}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    <CImg
                      className="w-12 h-12 md:w-auto md:h-auto rounded-full transition-all flex items-center justify-center object-contain"
                      src={calcForm.treatmentCategory === item.value ? item.active : item.src}
                      alt="치료"
                    />
                    <span
                      className={`text-[11px] md:text-[12px] whitespace-nowrap ${
                        calcForm.treatmentCategory === item.value ? 'text-primary-50 font-bold' : 'text-gray-scale-40'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 총 진료비 & 급여 여부 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 md:items-end">
              <section>
                <label className="block text-sm font-bold mb-3">
                  총 진료비 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={calcForm.medicalCost === 0 ? '' : calcForm.medicalCost}
                    onChange={(e) => {
                      const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
                      setCalcForm({ medicalCost: onlyNumber ? parseInt(onlyNumber) : 0 });
                    }}
                    placeholder={window.innerWidth < 768 ? '숫자를 입력해주세요' : '120,000'}
                    className="w-full p-4 bg-white border border-gray-scale-10 rounded-xl outline-none focus:border-primary-50 text-[14px] md:text-base"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-scale-40">원</span>
                </div>
              </section>

              <section>
                <label className="block text-sm font-bold mb-3 md:mb-3">
                  급여 여부 <span className="text-red-500">*</span>
                </label>

                {/* 📱 1. 모바일 뷰: 시안의 블록 버튼 (PC에서는 숨김) */}
                <div className="flex md:hidden gap-2 h-[54px]">
                  {PAY_TYPE.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setCalcForm({ payType: type.value })}
                      className={`flex-1 flex flex-col justify-center items-center border rounded-xl transition-all ${getSelectedClass(
                        calcForm.payType,
                        type.value,
                      )}`}
                    >
                      {type.label === '급여' ? (
                        <>
                          <span className="text-[13px] leading-tight">급여</span>
                          <span className="text-[10px] leading-tight font-normal">(건강보험 적용)</span>
                        </>
                      ) : (
                        <span className="text-[13px]">{type.label}</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* 💻 2. 데스크탑 뷰: 유저님의 라디오 버튼 원본 완벽 복구 (모바일에서는 숨김) */}
                <div className="hidden md:flex gap-6 pb-4">
                  {PAY_TYPE.map((label) => (
                    <label key={label.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        checked={calcForm.payType === label.value}
                        onChange={() => setCalcForm({ payType: label.value })}
                        type="radio"
                        name="pay"
                        className="w-4 h-4 accent-primary-50"
                      />
                      <span className="text-sm text-gray-scale-60">{label.label === '급여' ? '급여 (건강보험 적용)' : label.label}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* EDI 코드 입력 영역 */}
            <div className="bg-primary-5/30 border border-primary-10 rounded-2xl p-5 md:p-6">
              <div className="flex items-center gap-2 mb-4 text-primary-50 text-[13px] md:text-sm font-bold">
                {/* 💡 모바일: 📌 핀 아이콘 (텍스트 컬러화), PC: 유저님 원본 유지 */}
                <span className="md:hidden text-lg -mt-0.5">📌</span>
                <span className="hidden md:inline">📌</span> 더 정확한 결과를 원한다면
              </div>
              <div className="bg-white border border-gray-scale-5 rounded-xl p-4 md:p-5">
                <p className="text-xs font-bold text-gray-scale-80 mb-2">요양급여수가코드 (EDI)</p>
                <input
                  value={calcForm.ediCode || ''}
                  onChange={(e) => setCalcForm({ ediCode: e.target.value })}
                  type="text"
                  placeholder={window.innerWidth < 768 ? '예) HE115(어깨 MRI)' : 'HE115 (어깨 MRI)'}
                  className="w-full p-3 border border-gray-scale-10 rounded-lg text-sm mb-3 focus:outline-none focus:border-primary-50"
                />

                {/* 📱 모바일: 시안의 파란색 체크박스 아이콘 UI */}
                <div className="flex md:hidden items-start gap-1.5 bg-gray-50/50 rounded-lg">
                  <div className="w-4 h-4 mt-0.5 rounded-full bg-primary-30 text-white flex items-center justify-center text-[10px] shrink-0">✓</div>
                  <p className="text-[11px] text-gray-scale-50 leading-snug">
                    진료비 세부 내역서에 있는 요양급여수가코드(EDI)를 입력하면 계산의 정확도를 올릴 수 있어요.
                  </p>
                </div>

                {/* 💻 데스크탑: 유저님의 ℹ️ 아이콘 원본 유지 */}
                <p className="hidden md:flex text-[11px] text-gray-scale-40 gap-1 items-start">
                  <span>ℹ️</span> 진료비 세부 내역서에 있는 요양급여수가코드(EDI)로 계산의 정확도를 높일 수 있어요.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16">
            <CButton
              variant="primary"
              size="lg"
              className={`w-full py-4 md:py-5 mb-10 md:mb-15 rounded-2xl font-bold transition-all duration-300 opacity-100 text-[15px] md:text-base`}
              onClick={handleCalculate}
            >
              계산하기
            </CButton>
          </div>
        </div>
      </CContents>
    </div>
  );
};

export default MedicalInfo;
