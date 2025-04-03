"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContentsWrapper from "./ui/ContentsWrapper";
import NavItem from "./ui/NavItem";

const Header = () => {
  const pathname = usePathname();
  const navItems = [
    { href: "/docs/getting-started", path: "/docs", label: "Docs" },
    { href: "/showcase", path: "/showcase", label: "Showcase" },
    {
      href: "https://64e76a83b3d3ea4be01ccaf9-swoulcilce.chromatic.com/?path=/docs/user-interaction-multi-touch--docs",
      path: "/__to-external-link",
      label: "Example",
      target: "_blank",
    },
  ];

  return (
    <header className="h-full border-b">
      <ContentsWrapper className="flex items-center justify-between h-full">
        <Link href="/">
          <h1 className="font-bold">👐 Multi Touch</h1>
        </Link>
        <nav>
          <ul className="flex justify-between gap-2 sm:gap-4 text-xs">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                active={pathname.includes(item.path)}
                target={item.target}
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
