const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="m-0 md:m-8 space-y-10 flex flex-col overflow-x-hidden">
      {children}
    </section>
  );
};

export default SectionWrapper;
