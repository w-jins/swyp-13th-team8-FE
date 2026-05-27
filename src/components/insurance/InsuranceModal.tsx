import CModal from '../common/CModal';
interface InsuranceModalProps {
  onClose: () => void;
}
const InsuranceModal = ({ onClose }: InsuranceModalProps) => {
  return (
    <CModal cancel={true} label="불러올 보험을 선택해주세요." onClose={onClose}>
      <div className="w-full">
        <div className="flex flex-wrap ">
          <div className="p-6"></div>
        </div>
      </div>
    </CModal>
  );
};

export default InsuranceModal;
