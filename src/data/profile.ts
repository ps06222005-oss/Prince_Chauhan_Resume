import profileImg from "@/assets/profile.jpg";

export const PROFILE = {
  name: "Prince Chauhan",
  role: "B.Tech CSE (AI & ML) Student",
  headline: "Aspiring Software Developer & AI Enthusiast",
  location: "Ghaziabad, Uttar Pradesh, India",
  email: "ps06222005@gmail.com",
  phone: "+91 70424 81850",
  github: "https://github.com/ps06222005-oss",
  githubUser: "ps06222005-oss",
  linkedin: "https://www.linkedin.com/in/prince-chauhan-3418a3288",
  resume: "/resume.pdf",
  profileImage: profileImg,
  jarvisRepo: "https://github.com/ps06222005-oss/JARVIS",
  bio: "Building modern web experiences while learning React, JavaScript and Python — and continuously improving my software development and AI fundamentals through real projects.",
  availability: ["Open to internships", "Open to collaboration", "Responds within 24h"],
} as const;

export const STATS = [
  { label: "Projects Built", value: 2, suffix: "+" },
  { label: "Certificates", value: 3, suffix: "" },
  { label: "Technologies", value: 12, suffix: "+" },
  { label: "Internship", value: "Open", suffix: "" },
] as const;

export const LINKEDIN_PROFILE = {
  headline: PROFILE.headline,
  about: PROFILE.bio,
  url: PROFILE.linkedin,
  education: "B.Tech in Computer Science Engineering (AI & ML)",
  experience: "Project-based learning and open-source development",
  certifications: "AI, Python and university workshop coursework",
  skills: ["Python", "React", "JavaScript", "Machine Learning", "NLP", "Automation"],
  achievements: ["AI/ML workshops", "Project-based learning", "Open to internships"],
} as const;