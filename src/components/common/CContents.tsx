interface ContentsProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const CContents = ({ title, children, className = '' }: ContentsProps) => {
  return (
    <div className="w-full">
      {title && <h2 className="hidden md:block text-title-h3 mt-10 ">{title}</h2>}
      <div
        className={`bg-white rounded-xl border border-gray-scale-10 mt-5 w-full flex flex-col
         ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default CContents;
