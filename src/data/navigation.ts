export interface NavLinkItem {
  id: string;
  label: string;
  num: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { id: "about", label: "About", num: "01" },
  { id: "projects", label: "Projects", num: "02" },
  { id: "skills", label: "Capabilities", num: "03" },
  { id: "github", label: "Archive", num: "04" },
  { id: "certifications", label: "Education", num: "05" },
  { id: "contact", label: "Contact", num: "06" },
];
