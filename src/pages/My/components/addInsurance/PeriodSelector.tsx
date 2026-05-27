import { useState } from 'react';
import { date } from '../../../../assets/index';
import useOutsideClick from '../../../../hooks/useOutsideClick';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1999 }, (_, i) => CURRENT_YEAR - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const VISIBLE = 5;

const YearPicker = ({ value, onChange }: { value: number | null; onChange: (y: number) => void }) => {
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const ref = useOutsideClick(() => setOpen(false));

  return (
    <div ref={ref} className="relative flex-1">
      <div
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between h-[56px] px-4 rounded-[10px] border cursor-pointer transition-colors ${open ? 'border-primary-50' : 'border-gray-scale-20'}`}
      >
        <span className={value ? 'text-body-m-r text-gray-scale-80' : 'text-body-m-r text-gray-scale-30'}>{value ? `${value}년` : '연도 선택'}</span>
        <img src={date} alt="" />
      </div>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-gray-scale-20 rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-scale-10">
            <button className="text-gray-scale-40 hover:text-primary-50 px-2 text-lg" onClick={() => setOffset((o) => Math.max(0, o - VISIBLE))}>
              ◀
            </button>
            <span className="text-body-s-m text-gray-scale-70">연도</span>
            <button
              className="text-gray-scale-40 hover:text-primary-50 px-2 text-lg"
              onClick={() => setOffset((o) => Math.min(YEARS.length - VISIBLE, o + VISIBLE))}
            >
              ▶
            </button>
          </div>
          {YEARS.slice(offset, offset + VISIBLE).map((y) => (
            <div
              key={y}
              onClick={() => {
                onChange(y);
                setOpen(false);
              }}
              className={`px-4 py-2.5 text-center text-body-s-r cursor-pointer transition-colors ${value === y ? 'bg-primary-5 text-primary-50 font-bold' : 'text-gray-scale-60 hover:bg-gray-scale-5'}`}
            >
              {y}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MonthPicker = ({ value, onChange }: { value: number | null; onChange: (m: number) => void }) => {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClick(() => setOpen(false));

  return (
    <div ref={ref} className="relative flex-1">
      <div
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between h-[56px] px-4 rounded-[10px] border cursor-pointer transition-colors ${open ? 'border-primary-50' : 'border-gray-scale-20'}`}
      >
        <span className={value ? 'text-body-m-r text-gray-scale-80' : 'text-body-m-r text-gray-scale-30'}>{value ? `${value}월` : '월 선택'}</span>
        <img src={date} alt="" />
      </div>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-gray-scale-20 rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="grid grid-cols-3 gap-1 p-3">
            {MONTHS.map((m) => (
              <div
                key={m}
                onClick={() => {
                  onChange(m);
                  setOpen(false);
                }}
                className={`py-2.5 text-center text-body-s-r rounded-lg cursor-pointer transition-colors ${value === m ? 'bg-primary-50 text-white font-bold' : 'text-gray-scale-60 hover:bg-gray-scale-5'}`}
              >
                {String(m).padStart(2, '0')}월
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface Props {
  year: number | null;
  month: number | null;
  onYearChange: (y: number) => void;
  onMonthChange: (m: number) => void;
}

const PeriodSelector = ({ year, month, onYearChange, onMonthChange }: Props) => (
  <div>
    <p className="text-body-l-m text-gray-scale-70 mb-3">
      보험 가입 시기 <span className="text-red-400">*</span>
    </p>
    <div className="flex gap-3 mt-5">
      <YearPicker value={year} onChange={onYearChange} />
      <MonthPicker value={month} onChange={onMonthChange} />
    </div>
    <p className="text-[12px] text-gray-scale-50 mt-5 flex items-center gap-1">✓ 가입한 시기에 따라 보험이 1~4세대로 구분돼요.</p>
  </div>
);

export default PeriodSelector;
