const Code = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="inline text-sm -mt-[1px] bg-gray-100 p-1 rounded-md">
      {children}
    </span>
  );
};

export default Code;
