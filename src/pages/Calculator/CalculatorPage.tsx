import CBreadcrumb from '../../components/common/CBreadcrumb';
import InsuranceInfo from './components/InsuranceInfo';

const Calculator = () => {
  return (
    <div>
      <CBreadcrumb items={[{ label: '환급금 계산기' }]} />
      <InsuranceInfo />
    </div>
  );
};

export default Calculator;
