import { useState } from 'react';
import CBreadcrumb from '../../../../components/common/CBreadcrumb';
import useInsurance, { type Insurance } from '../../../../hooks/useInsurance';
import InsuranceDetailModal from './InsuranceDetailModal';
import api from '../../../../api/axios';
import { useNavigate } from 'react-router';
import InsuranceCard from './InsuranceCard';
import CImg from '../../../../components/common/CImg';
import { mypagePlusBtn } from '../../../../assets';

const InsurancePage = () => {
  const navigate = useNavigate();
  const { insurances, setInsurances } = useInsurance();
  const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!confirm('보험을 삭제하시겠습니까?')) return;

    setDeletingId(id);
    try {
      const res = await api.delete(`/insurance/${id}`);
      if (res.data.success) {
        setInsurances((prev) => prev.filter((ins) => ins.userInsuranceId !== id));
      }
    } catch (e) {
      console.error('보험 삭제 실패', e);
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div>
      <CBreadcrumb items={[{ label: '마이페이지', path: '/mypage' }, { label: '내 보험 목록' }]} />
      <p className="text-title-h2 mt-10 mb-5">내 보험 목록</p>

      {insurances.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-40 gap-3">
          <div className="w-16 h-16 bg-gray-scale-10 rounded-xl" />
          <p className="text-body-m-r text-gray-scale-40">등록된 보험이 없습니다. 플러스 버튼을 눌러 등록을 시작해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {insurances.map((ins) => (
            <InsuranceCard
              key={ins.userInsuranceId}
              ins={ins}
              isDeleting={deletingId === ins.userInsuranceId}
              onDelete={handleDelete}
              onSelect={setSelectedInsurance}
            />
          ))}
        </div>
      )}

      <CImg
        onClick={() => navigate('/mypage/insurance/add')}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full text-2xl flex items-center justify-center transition-colors"
        src={mypagePlusBtn}
        alt="플러스"
      />

      {selectedInsurance && <InsuranceDetailModal insurance={selectedInsurance} onClose={() => setSelectedInsurance(null)} />}
    </div>
  );
};

export default InsurancePage;
