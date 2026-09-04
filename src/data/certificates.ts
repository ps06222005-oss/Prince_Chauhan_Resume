export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  category: "AI/ML" | "Programming" | "Workshop";
  verifyUrl?: string;
  fileUrl?: string;
};

export const CERTIFICATES: Certificate[] = [
  { title: "AI For All", issuer: "Intel & CBSE Initiative", year: "2024", category: "AI/ML" },
  { title: "Introduction to Python", issuer: "Online Coursework", year: "2024", category: "Programming" },
  { title: "AI/ML Workshop Participation", issuer: "University Program", year: "2024", category: "Workshop" },
];