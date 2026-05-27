import { useState } from 'react';
import { check, checkOn, right, terms } from '../../assets';
import CButton from '../../components/common/CButton';
import CImg from '../../components/common/CImg';
import { useModalStore } from '../../store/useModalStore';
import { termsAPI } from '../../api/authApi.ts';
import CBreadcrumb from '../../components/common/CBreadcrumb';

const TERMS = [
  { id: 1, label: '만 14세 이상입니다.', check: false, url: null },
  { id: 2, label: '실손핏 서비스 이용약관', check: false, url: 'https://www.notion.so/34f61e1109d08034b2b5d21a227baf4e?source=copy_link' },
  { id: 3, label: '개인 정보 수집 및 이용 동의', check: false, url: 'https://www.notion.so/34f61e1109d08034b2b5d21a227baf4e?source=copy_link' },
];
export interface TermsAgreeRequest {
  ageOver14: boolean;
  serviceTerms: boolean;
  privacyPolicy: boolean;
}
const Terms = () => {
  const [termsCheck, setTermsCheck] = useState<{ id: number; label: string; check: boolean; url: string | null }[]>(TERMS);
  const isAllChecked = termsCheck.every((item) => item.check);
  const openModal = useModalStore((state) => state.openModal);

  const clickHandler = () => {
    const nextAllCheck = !isAllChecked;
    setTermsCheck((prev) =>
      prev.map((term) => ({
        ...term,
        check: nextAllCheck,
      })),
    );
  };

  const termsClickHandler = (clickedId: number) => {
    setTermsCheck((prev) => prev.map((term) => (term.id === clickedId ? { ...term, check: !term.check } : term)));
  };

  const goExternalLink = (e: React.MouseEvent, url: string | null) => {
    e.stopPropagation(); // 중요: 화살표 클릭 시 체크박스가 토글되는 것을 막아줍니다!
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const termsOnClickHandler = async () => {
    const requestData: TermsAgreeRequest = {
      // id 값으로 해당 약관을 찾아 check 여부를 매핑합니다.
      ageOver14: termsCheck.find((t) => t.id === 1)?.check || false,
      serviceTerms: termsCheck.find((t) => t.id === 2)?.check || false,
      privacyPolicy: termsCheck.find((t) => t.id === 3)?.check || false,
    };
    const res = await termsAPI(requestData);

    if (res) openModal('JOIN');
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* 브레드스크럼*/}
      <div className="flex flex-row">
        <CBreadcrumb items={[{ label: '서비스 이용 약관 동의' }]} />
      </div>
      {/* 메인 */}
      <div className="flex flex-col gap-6">
        <p className="text-title-h2">서비스 이용 약관 동의</p>
        <div className="flex flex-col items-center justify-center md:px-15 lg:px-45 py-10 border border-gray-scale-20 rounded-[40px] bg-white">
          <div className="flex md:w-full md:justify-between sm:justify-center sm:flex-col md:flex-row">
            <p className="text-title-h2 inline-block md:self-end">
              원활한 실손핏 서비스 이용을 위해 <br />
              <span className="text-primary-50">약관 내용에 동의</span>가 필요해요.
            </p>
            <div>
              <CImg className="w-70 sm:py-5 md:py-0" src={terms} alt="로고 이미지" />
            </div>
          </div>
          <div className="flex flex-col items-center sm:gap-5 md:gap-15 w-full justify-end md:h-115.75">
            <div className="flex flex-col items-center gap-8 w-full">
              <CButton
                onClick={clickHandler}
                className="px-5 py-4 w-full gap-5 flex justify-start  rounded-2xl cursor-pointer border-b-gray-scale-20"
              >
                <CImg src={isAllChecked ? checkOn : check} alt="체크" />
                <p className="text-gray-scale-70 text-title-h4">전체 내용에 동의합니다.</p>
              </CButton>
              <span className="sm:hidden w-full border border-gray-scale-20"></span>
              <div className="flex flex-col gap-6 md:pl-10 sm:pl-3 w-full">
                {termsCheck.map((items) => (
                  <CButton
                    onClick={() => termsClickHandler(items.id)}
                    key={items.id}
                    className="w-full gap-5 flex flex-row justify-start md:p-0 cursor-pointer"
                  >
                    <CImg src={items.check ? checkOn : check} alt="체크" />
                    <p className=" text-gray-scale-70 text-body-l-m">{items.label}</p>
                    <span className="text-primary-30 text-body-l-r">(필수)</span>
                    {items.url ? <CImg onClick={(e) => goExternalLink(e, items.url)} className="ml-auto" src={right} alt="이동하기" /> : ''}
                  </CButton>
                ))}
              </div>
            </div>
            <CButton
              onClick={termsOnClickHandler}
              className={`md:w-full rounded-2xl sm:px-40 md:px-5 py-4 cursor-pointer ${isAllChecked ? 'bg-primary-50 text-white' : 'bg-gray-scale-40 text-gray-scale-0'}`}
              children="동의하고 시작하기"
              disabled={!isAllChecked}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
