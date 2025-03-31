import Link from "next/link";
import ContentsWrapper from "./ui/ContentsWrapper";

const Header = () => {
  return (
    <header className="h-full border-b">
      <ContentsWrapper className="flex items-center justify-between h-full">
        <Link href="/">
          <h1 className="font-bold">👐 Multi Touch</h1>
        </Link>
        <nav>
          <ul className="flex justify-between gap-2 text-xs">
            <li>Docs</li>
            <li className="px-2">Showcase</li>
          </ul>
        </nav>
      </ContentsWrapper>
    </header>
  );
};

export default Header;
