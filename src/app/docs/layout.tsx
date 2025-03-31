import Nav from "@/components/Nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full grid grid-cols-[160px_1fr]">
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
