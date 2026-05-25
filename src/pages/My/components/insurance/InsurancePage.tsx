import { useState } from 'react';
import CImg from '../../../../components/common/CImg';
import CLabel from '../../../../components/common/CLabel';
import CBreadcrumb from '../../../../components/common/CBreadcrumb';
import useInsurance, { type Insurance } from '../../../../hooks/useInsurance';
import InsuranceDetailModal from './InsuranceDetailModal';
import { right } from '../../../../assets';
import api from '../../../../api/axios';
import { useNavigate } from 'react-router';

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
        <div className="grid grid-cols-2 gap-4">
          {insurances.map((ins) => (
            <div
              key={ins.userInsuranceId}
              className="bg-primary-0 rounded-3xl border border-gray-scale-10 p-10 min-h-[250px] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex gap-3 flex-wrap">
                  <CLabel variant="generation" size="sm">
                    {ins.generation}세대
                  </CLabel>
                </div>
                <div className="flex items-center gap-2">
                  {/* 삭제 버튼 */}
                  <button
                    className="cursor-pointer shrink-0 text-gray-scale-30 hover:text-red-400 transition-colors disabled:opacity-40"
                    onClick={(e) => handleDelete(e, ins.userInsuranceId)}
                    disabled={deletingId === ins.userInsuranceId}
                  >
                    {deletingId === ins.userInsuranceId ? (
                      <div className="w-5 h-5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                    ) : (
                      <span className="text-xl">🗑</span>
                    )}
                  </button>
                  {/* 상세보기 버튼 */}
                  <button className="cursor-pointer shrink-0" onClick={() => setSelectedInsurance(ins)}>
                    <CImg src={right} alt="상세보기" className="w-10 h-10 opacity-30" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-[90px] h-[90px] bg-blue-500 rounded-full flex items-center justify-center shrink-0 mr-2">
                  <span className="text-white text-[10px] font-bold">{ins.companyName}</span>
                </div>
                <div>
                  <p className="text-title-h1 text-gray-scale-80 leading-snug">{ins.productName}</p>
                  <p className="text-body-xl-r text-gray-scale-40 mt-5">
                    {ins.companyName} · {ins.joinDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/mypage/insurance/add')}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-primary-50 text-white text-2xl flex items-center justify-center shadow-lg hover:bg-primary-60 transition-colors"
      >
        +
      </button>

      {selectedInsurance && <InsuranceDetailModal insurance={selectedInsurance} onClose={() => setSelectedInsurance(null)} />}
    </div>
  );
};

export default InsurancePage;
