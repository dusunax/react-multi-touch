import Link from "next/link";

interface NavItemProps extends React.ComponentProps<typeof Link> {
  active?: boolean;
  children: React.ReactNode;
}

const NavItem = ({ href, children, active, ...props }: NavItemProps) => {
  return (
    <li className={active ? "text-blue-500" : ""}>
      <Link href={href} {...props}>
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
