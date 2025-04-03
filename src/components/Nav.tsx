"use client";
import { usePathname } from "next/navigation";
import NavItem from "./ui/NavItem";

const Nav = () => {
  const pathname = usePathname();
  const navItems = [
    { href: "/docs/getting-started", label: "Getting started" },
    { href: "/docs/components", label: "Components" },
    { href: "/docs/gesture", label: "Gesture" },
    { href: "/docs/customs", label: "Customs" },
  ];

  return (
    <nav className="border-b border-dashed sm:border-b-0 sm:border-r mb-6">
      <ul className="py-6 sm:py-10 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            active={pathname === item.href}
          >
            {item.label}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
