import Link from "next/link";

const NavItem = ({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) => {
  return (
    <li className={active ? "text-blue-500" : ""}>
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default NavItem;
