import { useNavigate } from 'react-router';
import { home } from '../../assets';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const CBreadcrumb: React.FC<BreadcrumbProps> = ({ items = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-1 mt-4">
      <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate('/home')}>
        <img src={home} alt="홈" className="w-4 h-4" />
        <span className="text-gray-scale-60 text-body-s-r underline">홈</span>
      </div>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <span className="text-gray-scale-40 text-body-s-r">{'>'}</span>
          <span
            className={`text-gray-scale-60 text-body-s-r underline ${item.path ? 'cursor-pointer' : ''}`}
            onClick={() => item.path && navigate(item.path)}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CBreadcrumb;
