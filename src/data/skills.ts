import {
  BookOpen,
  Brain,
  Braces,
  Boxes,
  Cloud,
  Code,
  Database,
  FileCode2,
  GitBranch,
  Github as GithubIcon,
  Globe,
  Languages,
  ListTree,
  MessageSquare,
  Mic,
  Network,
  Palette,
  Server,
  Terminal,
  Volume2,
} from "lucide-react";

export type Skill = {
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  level?: string;
};

export const SKILL_GROUPS: { title: string; items: Skill[] }[] = [
  {
    title: "Programming",
    items: [
      { name: "Python", icon: Code, level: "Learning & Project Experience" },
      { name: "C", icon: Braces, level: "Basic" },
      { name: "HTML", icon: FileCode2 },
      { name: "CSS", icon: Palette },
    ],
  },
  {
    title: "Libraries",
    items: [
      { name: "SpeechRecognition", icon: Mic },
      { name: "pyttsx3", icon: Volume2 },
      { name: "Pandas", icon: Database, level: "Basic" },
      { name: "Requests", icon: Globe },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "VS Code", icon: Terminal },
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: GithubIcon },
      { name: "Google Colab", icon: Cloud },
      { name: "Jupyter Notebook", icon: BookOpen },
      { name: "ChatGPT", icon: MessageSquare },
    ],
  },
  {
    title: "Concepts",
    items: [
      { name: "ML Basics", icon: Brain },
      { name: "NLP Basics", icon: Languages },
      { name: "OOP", icon: Boxes },
      { name: "DBMS Basics", icon: Server },
      { name: "Computer Networks", icon: Network },
      { name: "Data Structures", icon: ListTree },
    ],
  },
];

export const ALL_SKILLS = SKILL_GROUPS.flatMap((group) => group.items.map((item) => item.name));
