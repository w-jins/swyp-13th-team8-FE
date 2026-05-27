import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../api/axios';

export const useAddInsurance = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedInsurance, setSelectedInsurance] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [companyId, setCompanyId] = useState<string>('');
  const [generation, setGeneration] = useState<number | null>(null);

  // 회사 이름 → companyId 매핑 (백엔드와 협의 필요)
  const COMPANY_ID_MAP: Record<string, string> = {
    현대해상: '1',
    삼성화재: '2',
    DB손해보험: '3',
    KB손해보험: '4',
    메리츠화재: '5',
    기타: '6',
  };

  const handleStep0Next = async () => {
    if (!selectedCompany || !selectedYear || !selectedMonth) return;

    try {
      const joinDate = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}`;
      const id = COMPANY_ID_MAP[selectedCompany] ?? '1';
      setCompanyId(id);

      const res = await api.post('/insurance/generation', {
        companyId: id,
        joinDate,
      });

      if (res.data.code === 200) {
        setGeneration(res.data.data.generation);
        setCurrentStep(1);
        setShowModal(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleModalConfirm = async () => {
    if (!selectedInsurance) return;

    try {
      const res = await api.post('/insurance/register', {
        productId: selectedInsurance,
        companyId,
        generation,
      });

      if (res.data.code === 200) {
        setShowModal(false);
        setCurrentStep(2);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentStep(0);
  };

  return {
    currentStep,
    selectedCompany,
    setSelectedCompany,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    selectedInsurance,
    setSelectedInsurance,
    showModal,
    companyId,
    generation,
    handleStep0Next,
    handleModalConfirm,
    handleModalClose,
    navigate,
  };
};
