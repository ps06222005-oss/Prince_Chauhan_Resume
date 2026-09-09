export const EDUCATION = [
  {
    degree: "B.Tech, Computer Science Engineering",
    specialization: "Artificial Intelligence & Machine Learning",
    school: "Sunderdeep Global University",
    period: "Expected 2028",
    status: "In progress",
  },
] as const;

export const LEARNING_PHASES = [
  { title: "Completed", items: ["Python Basics", "HTML", "CSS", "Git", "GitHub"] },
  { title: "Currently Learning", items: ["Machine Learning", "React", "Data Structures", "APIs"] },
  { title: "Future Goals", items: ["Cloud Computing", "Generative AI", "System Design"] },
] as const;

export const EXPERIENCE = [
  {
    title: "Project-based learning",
    period: "Current",
    description:
      "Building small Python, automation and web projects while developing an open-source presence on GitHub.",
  },
  {
    title: "AI/ML workshops",
    period: "2024",
    description:
      "Participating in workshops and coursework to build practical foundations in AI and machine learning.",
  },
] as const;
