import { useMemo } from 'react';
import { COMPANIES } from '../constants/company';

// 보험사 이름에 따른 이미지 할당 훅
const useCompanyImg = (companyName: string | undefined) => {
  const insuranceCompany = useMemo(() => {
    if (!companyName) return undefined;

    // 안전하게 값 찾기
    return COMPANIES.find((item) => item.value === companyName);
  }, [companyName]);

  return insuranceCompany;
};

export default useCompanyImg;
