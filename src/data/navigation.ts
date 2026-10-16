export interface NavLinkItem {
  id: string;
  label: string;
  num: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { id: "home", label: "Home", num: "01" },
  { id: "projects", label: "Work", num: "02" },
  { id: "about", label: "About", num: "03" },
  { id: "skills", label: "Skills", num: "04" },
  { id: "experience", label: "Experience", num: "05" },
  { id: "contact", label: "Contact", num: "06" },
];
