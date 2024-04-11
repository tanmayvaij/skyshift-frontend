import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  text: string;
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ text, href }) => {
  const path = useLocation().pathname;

  return (
    <Link
      to={href}
      className={`${
        path === href ? "bg-gray-200" : "bg-gray-50"
      } hover:bg-gray-200 px-6 py-2 rounded-lg font-medium text-gray-900`}
    >
      {text}
    </Link>
  );
};

export default NavLink;
