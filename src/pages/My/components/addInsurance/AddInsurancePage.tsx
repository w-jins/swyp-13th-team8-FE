import CBreadcrumb from '../../../../components/common/CBreadcrumb';
import CStepBar from '../../../../components/common/CStepBar';
import PeriodSelector from './PeriodSelector';
import InsuranceSelectModal from './InsuranceSelectModal';
import { useAddInsurance } from './hooks';
import CImg from '../../../../components/common/CImg';
import { signup } from '../../../../assets';

const STEPS = ['보험 정보 입력', '보험 선택', '등록 완료'];
const COMPANIES = ['현대해상', '삼성화재', 'DB손해보험', 'KB손해보험', '메리츠화재', '기타'] as const;

const AddInsurancePage = () => {
  const {
    currentStep,
    selectedCompany,
    sameInsuranceRegister,
    setSameInsuranceRegister,
    setSelectedCompany,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    selectedInsurance,
    setSelectedInsurance,
    showModal,
    handleStep0Next,
    handleModalConfirm,
    handleModalClose,
    navigate,
  } = useAddInsurance();

  return (
    <div>
      <CBreadcrumb items={[{ label: '마이페이지', path: '/mypage' }, { label: '내 보험 등록하기' }]} />
      <p className="text-title-h2 mt-10 mb-6">내 보험 등록하기</p>

      <div className="bg-white h-[880px] rounded-2xl border border-gray-scale-10 p-10">
        <CStepBar steps={STEPS} currentStep={currentStep} />

        {(currentStep === 0 || currentStep === 1) && (
          <div className="max-w-[800px] mx-auto mt-20 ">
            <p className="text-title-h2 text-center mb-10">등록할 보험의 정보를 입력해주세요.</p>

            {/* 가입 보험사 */}
            <div className="mb-8">
              <p className="text-body-l-m text-gray-scale-70 mb-3">
                가입 보험사 <span className="text-red-400">*</span>
              </p>
              <div className="flex gap-2 flex-wrap mt-5">
                {COMPANIES.map((company) => (
                  <button
                    key={company}
                    onClick={() => setSelectedCompany(company)}
                    className={`flex w-[120px] h-[50px] p-5 rounded-[13px] items-center justify-center text-body-s-m border transition-colors mb-10 ${
                      selectedCompany === company
                        ? 'bg-primary-10 text-primary-50 border-primary-50'
                        : 'bg-white text-gray-scale-60 border-gray-scale-20 hover:border-primary-30'
                    }`}
                  >
                    {company}
                  </button>
                ))}
              </div>
            </div>

            <PeriodSelector year={selectedYear} month={selectedMonth} onYearChange={setSelectedYear} onMonthChange={setSelectedMonth} />

            <button
              onClick={handleStep0Next}
              disabled={!selectedCompany}
              className={`w-full mt-30 py-5 rounded-xl font-bold text-body-m-m transition-colors ${selectedCompany ? 'bg-primary-50 text-white hover:bg-primary-60' : 'bg-gray-scale-20 text-gray-scale-40 cursor-not-allowed'}`}
            >
              확인
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-title-h2 font-bold text-primary-50 mb-3">내 보험 등록이 완료되었습니다!</p>
            <p className="text-body-m-r text-gray-scale-50 mb-10">등록한 보험 정보는 내 보험 목록에서 바로 확인할 수 있어요.</p>
            <CImg className="mb-10" src={signup} alt="축하" />
            <div className="flex gap-4 w-full max-w-[500px]">
              <button
                onClick={() => navigate('/home')}
                className="flex-1 py-3 rounded-xl border border-gray-scale-20 text-gray-scale-70 font-bold hover:bg-gray-scale-5 transition-colors"
              >
                홈 화면으로 돌아가기
              </button>
              <button
                onClick={() => navigate('/mypage/insurance')}
                className="flex-1 py-3 rounded-xl bg-primary-50 text-white font-bold hover:bg-primary-60 transition-colors"
              >
                내 보험 목록 바로가기
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && selectedCompany && (
        <InsuranceSelectModal
          company={selectedCompany}
          year={selectedYear}
          month={selectedMonth}
          same={sameInsuranceRegister}
          setSame={setSameInsuranceRegister}
          selectedInsurance={selectedInsurance}
          onSelect={setSelectedInsurance}
          onConfirm={handleModalConfirm}
          onClose={handleModalClose}
          onNotFound={handleModalClose}
        />
      )}
    </div>
  );
};

export default AddInsurancePage;
