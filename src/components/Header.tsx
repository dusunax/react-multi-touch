"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContentsWrapper from "./ui/ContentsWrapper";
import NavItem from "./ui/NavItem";

const Header = () => {
  const pathname = usePathname();
  const navItems = [
    { href: "/docs/how-to-use", path: "/docs", label: "Docs" },
    { href: "/showcase", path: "/showcase", label: "Showcase" },
  ];

  return (
    <header className="h-full border-b">
      <ContentsWrapper className="flex items-center justify-between h-full">
        <Link href="/">
          <h1 className="font-bold">👐 Multi Touch</h1>
        </Link>
        <nav>
          <ul className="flex justify-between gap-2 text-xs">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.path}
                active={pathname.includes(item.path)}
              >
                {item.label}
              </NavItem>
            ))}
          </ul>
        </nav>
      </ContentsWrapper>
    </header>
  );
};

export default Header;
