interface NavLinkDataProps {
  text: string;
  href: string;
}

export const navLinkData: NavLinkDataProps[] = [
  {
    href: "/products",
    text: "Products",
  },
  {
    href: "/solutions",
    text: "Solutions",
  },
  {
    href: "/developers",
    text: "Developers",
  },
  {
    href: "/bussiness",
    text: "Bussiness",
  },
  {
    href: "/pricing",
    text: "Pricing",
  },
];

export const authenticatedNavLinkData: NavLinkDataProps[] = [
  {
    href: "/create-project",
    text: "Create Project",
  },
  {
    href: "/profile",
    text: "Profile"
  }
];
