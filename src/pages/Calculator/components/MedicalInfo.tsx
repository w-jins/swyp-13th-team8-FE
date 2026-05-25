// 1. react-router v7에서 useNavigate 임포트
import { useNavigate } from 'react-router';
import CContents from '../../../components/common/CContents';
import CStepBar from '../../../components/common/CStepBar';
import CButton from '../../../components/common/CButton';
import CBreadcrumb from '../../../components/common/CBreadcrumb';
import { useCalcStore } from '../../../store/useCalcStore';
import { HOSPITAL_TYPE, PAY_TYPE, PURPOSE_TYPE, TREATMENT_CATEGORY, VISIT_TYPE } from '../../../constants/insurance';
import { useEffect } from 'react';

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
    // 1. calcForm에서 ediCode만 빼고, 나머지를 requiredFields라는 객체로 묶습니다.
    const { ediCode, ...requiredFields } = calcForm;

    // 2. requiredFields의 모든 값(Object.values)이 null이 아닌지 검사합니다.
    const isValid = Object.values(requiredFields).every((value) => {
      if (typeof value === 'number') {
        // 숫자인 경우 (medicalCost): 0보다 크고 NaN이 아니어야 통과!
        return value > 0 && !isNaN(value);
      }
      // 그 외의 경우 (visitType 등): null이나 빈 문자열이 아니어야 통과!
      return value !== null && value !== '';
    });
    if (!isValid) {
      alert('모든 필수 항목을 입력해주세요!');
      return;
    }
    // 결과 페이지 이동
    navigate('/calculator/refund-result');
  };

  const getSelectedClass = (current: string | null, target: string) => {
    return current === target
      ? 'border-primary-50 bg-primary-5 text-primary-50 font-bold'
      : 'border-gray-scale-10 text-gray-scale-40 hover:bg-gray-50';
  };

  return (
    <div className="pb-20">
      <CBreadcrumb items={[{ label: '환급금 계산기' }]} />

      <CContents title="환급금 계산기">
        <div className="max-w-2xl mx-auto mb-16">
          <CStepBar steps={steps} currentStep={currentStep} />
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-[22px] font-bold text-center mb-12">진료 정보를 입력해 주세요.</h2>

          <div className="space-y-10">
            {/* 병원 유형 */}
            <section>
              <label className="block text-sm font-bold mb-3">
                병원 유형 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-3">
                {HOSPITAL_TYPE.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setCalcForm({ hospitalType: type.value })}
                    className={`py-4 rounded-xl border text-[14px] transition-all ${getSelectedClass(calcForm.hospitalType, type.value)}`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </section>

            {/* 진료 유형 & 목적 */}
            <div className="grid grid-cols-2 gap-10">
              <section>
                <label className="block text-sm font-bold mb-3">
                  진료 유형 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {VISIT_TYPE.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setCalcForm({ visitType: t.value })}
                      className={`flex-1 py-3 border rounded-xl text-sm transition-all ${getSelectedClass(calcForm.visitType, t.value)}`}
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
                      className={`flex-1 py-3 border rounded-xl text-sm transition-all ${getSelectedClass(calcForm.purposeType, t.value)}`}
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
              <div className="flex justify-between px-4">
                {TREATMENT_CATEGORY.map((item) => (
                  <div
                    key={item.value}
                    onClick={() => setCalcForm({ treatmentCategory: item.value })}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    <div
                      className={`w-14 h-14 rounded-full border transition-all flex items-center justify-center ${
                        calcForm.treatmentCategory === item.value
                          ? 'bg-primary-5 border-primary-50'
                          : 'bg-gray-scale-10 border-gray-scale-20 group-hover:border-primary-50'
                      }`}
                    />
                    <span className={`text-[12px] ${calcForm.treatmentCategory === item.value ? 'text-primary-50 font-bold' : 'text-gray-scale-40'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 총 진료비 & 급여 여부 */}
            <div className="grid grid-cols-2 gap-10 items-end">
              <section>
                <label className="block text-sm font-bold mb-3">
                  총 진료비 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={calcForm.medicalCost === 0 ? '' : calcForm.medicalCost}
                    onChange={(e) => {
                      // 🟢 숫자만 입력되도록 처리하고, 다 지웠을 때는 0으로 저장
                      const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
                      setCalcForm({ medicalCost: onlyNumber ? parseInt(onlyNumber) : 0 });
                    }}
                    placeholder="120,000"
                    className="w-full p-4 bg-white border border-gray-scale-10 rounded-xl outline-none focus:border-primary-50"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-scale-40">원</span>
                </div>
              </section>
              <section className="pb-4 flex gap-6">
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
              </section>
            </div>

            {/* EDI 코드 입력 영역 */}
            <div className="bg-primary-5/30 border border-primary-10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4 text-primary-50 text-sm font-bold">📌 더 정확한 결과를 원한다면</div>
              <div className="bg-white border border-gray-scale-5 rounded-xl p-5">
                <p className="text-xs font-bold text-gray-scale-80 mb-2">요양급여수가코드 (EDI)</p>
                <input
                  value={calcForm.ediCode || ''}
                  onChange={(e) => setCalcForm({ ediCode: e.target.value })}
                  type="text"
                  placeholder="HE115 (어깨 MRI)"
                  className="w-full p-3 border border-gray-scale-10 rounded-lg text-sm mb-3"
                />
                <p className="text-[11px] text-gray-scale-40 flex gap-1 items-start">
                  <span>ℹ️</span> 진료비 세부 내역서에 있는 요양급여수가코드(EDI)로 계산의 정확도를 높일 수 있어요.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <CButton
              variant="primary"
              size="lg"
              className={`w-full py-5 rounded-2xl font-bold transition-all duration-300 opacity-100`}
              // 4. 클릭 이벤트 연결
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
