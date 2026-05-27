import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import CButton from '../../../components/common/CButton';
import CInput from '../../../components/common/CInput';
import CRadio from '../../../components/common/CRadio';
import { PURPOSE_TYPE, TREATMENT_CATEGORY, VISIT_TYPE } from '../../../constants/insurance.ts';
import { useUserStore } from '../../../store/useUserStore';
import { useModalStore } from '../../../store/useModalStore';
import { useNavigate } from 'react-router';
import { useCalcStore } from '../../../store/useCalcStore';
import { useAuthStore } from '../../../store/useAuthStore';

/**
 * 계산기
 *
 */
const CalculatorForm = () => {
  const insuranceInfo = useCalcStore((state) => state.insuranceInfo);
  const openModal = useModalStore((state) => state.openModal);
  const userInfo = useUserStore((state) => state.userInfo);
  const navigate = useNavigate();
  const { calcForm, setCalcForm } = useCalcStore();

  const isLogin = !!useAuthStore((state) => state.accessToken);
  const goCalculator = () => {
    if (isNaN(Number(calcForm.medicalCost))) {
      alert('진료비는 수만 들어올 수 있습니다.');
    } else if (insuranceInfo.id && calcForm.medicalCost && calcForm.purposeType && calcForm.visitType) {
      navigate('/calculator/medical-info');
    } else {
      alert('필수 항목을 채워주세요');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, '');

    setCalcForm({ medicalCost: parseInt(onlyNumber) });
  };
  return (
    <div className="flex flex-col flex-[2.5] h-full justify-center rounded-3xl px-10 py-5 bg-gray-scale-0 relative">
      <span className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-47.25 border border-gray-scale-10"></span>{' '}
      <div className="flex flex-col md:flex-row gap-4 md:gap-23 mb-10">
        <div className="flex flex-col md:w-1/2 md:h-69.75 gap-4 md:gap-8">
          <div>
            <p className="mb-3">
              보험 선택하기 <span className="text-red-600">*</span>
            </p>
            {insuranceInfo.id === null ? (
              <CButton
                disabled={!isLogin}
                onClick={() => openModal('INSURANCE')}
                className={`w-full h-10.75 rounded-[10px] bg-primary-10  ${
                  !isLogin
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' // 비로그인 시 회색 처리
                    : 'bg-blue-100  cursor-pointer text-primary-50'
                }`}
                children="내 보험에서 불러오기"
              />
            ) : (
              <div className="w-full h-10.75 px-1 gap-1 rounded-[10px] bg-primary-5 flex flex-row items-center">
                <div className="w-7 h-7 bg-primary-40 rounded-full"></div>
                <p className="text-gray-scale-60 text-body-s-r flex-1">{insuranceInfo.productName}</p>
              </div>
            )}
          </div>
          <div>
            <p className="mb-3">
              진료 유형 <span className="text-red-600">*</span>
            </p>
            {VISIT_TYPE.map((items) => (
              <CRadio
                disabled={!isLogin}
                key={items.value}
                label={items.label}
                name="medical_type"
                value={items.value}
                onClick={() => setCalcForm({ visitType: items.value })}
              />
            ))}
          </div>
          <div>
            <p className="mb-3">
              진료 항목 <span className="text-red-600">*</span>
            </p>
            <div className="mx-auto h-13 w-full">
              <Listbox disabled={!isLogin} value={calcForm.treatmentCategory} onChange={(value) => setCalcForm({ treatmentCategory: value })}>
                <ListboxButton className="w-full border rounded-[10px] border-gray-scale-30 text-left px-5 py-3 block cursor-pointer text-black focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25">
                  {calcForm.treatmentCategory
                    ? // 선택된 값이 있으면 배열을 뒤져서 한글 label을 찾아 보여줍니다.
                      TREATMENT_CATEGORY.find((item) => item.value === calcForm.treatmentCategory)?.label
                    : '선택'}
                </ListboxButton>
                <ListboxOptions
                  anchor="bottom"
                  transition
                  className="w-(--button-width) border rounded-[10px] border-gray-scale-50 bg-white p-1 focus:outline-none transition duration-200 ease-in-out data-leave:data-closed:opacity-0 "
                >
                  {TREATMENT_CATEGORY.map((items) => (
                    <ListboxOption
                      key={items.value}
                      value={items.value}
                      className="text-black flex cursor-default items-center gap-2 rounded-[10px] px-3 py-1.5 select-none data-focus:bg-gray-scale-20"
                    >
                      {items.label}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:w-1/2 md:h-69.75 gap-4 md:gap-8">
          <div>
            <p className="mb-3">
              총 진료비 <span className="text-red-600">*</span>
            </p>
            <CInput disabled={!isLogin} onChange={handleChange} className="h-11" placeholder="예) 1,000,000 원" />
          </div>
          <div>
            <p className="mb-3">
              진료 목적 <span className="text-red-600">*</span>
            </p>
            {PURPOSE_TYPE.map((items) => (
              <CRadio
                disabled={!isLogin}
                key={items.value}
                label={items.label}
                name="medical_purpose"
                value={items.value}
                onClick={() => setCalcForm({ purposeType: items.value })}
              />
            ))}
          </div>
          <div>
            <p className="mb-3">요양급여수가코드 (EDI)</p>
            <CInput
              disabled={!isLogin}
              onChange={(e) => setCalcForm({ ediCode: e.target.value })}
              className="h-11"
              placeholder="예) HE115 (어깨 MRI)"
            />
          </div>
        </div>
      </div>
      {userInfo.name !== '' ? (
        <CButton onClick={goCalculator} className="w-full h-12.75 rounded-[10px] bg-primary-50 text-white" children="환급금 계산하기" />
      ) : (
        <CButton
          onClick={() => openModal('LOGIN')}
          className="w-full h-12.75 rounded-[10px] bg-primary-50 text-gray-scale-0"
          children="로그인하고 환급금 계산하기"
        />
      )}
    </div>
  );
};

export default CalculatorForm;
