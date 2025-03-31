"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const navItems = [
    { href: "/how-to-use", label: "How to use" },
    { href: "/components", label: "Components" },
    { href: "/gesture", label: "Gesture" },
    { href: "/customs", label: "Customs" },
  ];

  return (
    <nav className="border-r">
      <ul className="py-10 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavItem key={item.href} href={item.href}>
            {item.label}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
};

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <li className={pathname === href ? "text-blue-500" : ""}>
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default Nav;
