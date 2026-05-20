import { db, hd, kb, meritz, samsung } from '../assets';

export const COMPANIES = [
  { value: '현대해상', src: hd },
  { value: '삼성화재', src: samsung },
  { value: 'DB손해보험', src: db },
  { value: 'KB손해보험', src: kb },
  { value: '메리츠화재', src: meritz },
  { value: '기타', src: '' },
] as const;

export type CompanyTypeValue = (typeof COMPANIES)[number];
