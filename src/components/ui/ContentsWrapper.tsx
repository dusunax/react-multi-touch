interface ContentsWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ContentsWrapper = ({ children, className="" }: ContentsWrapperProps) => {
  return <div className={`px-6 h-full ${className}`}>{children}</div>;
};

export default ContentsWrapper;