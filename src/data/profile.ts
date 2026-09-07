export const profile = {
  name: "Khawaja Abaid Ullah",
  shortName: "K. Abaid Ullah",
  role: "PhD Student in Electrical & Computer Engineering",
  institution: "Rochester Institute of Technology",
  lab: "Khojasteh Autonomous Systems Laboratory",
  email: "khawaja.abaid@gmail.com",
  credentials: ["Fulbright Scholar", "Former AWS AI/ML Intern"],
  researchStatement:
    "I work on machine learning security and autonomous systems—from protecting deployed models against extraction to developing coordinated multi-agent robots for search-and-rescue.",
  advisor: "Dr. Mohammad Javad Khojasteh",
  description:
    "PhD researcher at RIT working on model extraction defenses and coordinated multi-agent robots for search-and-rescue. Fulbright Scholar and former AWS AI/ML intern.",
  links: {
    rit: "https://www.rit.edu/kaslab/people/khawaja",
    github: "https://github.com/KhawajaAbaid",
    linkedin: "https://www.linkedin.com/in/KhawajaAbaid",
  },
};
export const navigation = [
  { label: "Research", href: "/research/" },
  { label: "Publications", href: "/publications/" },
  { label: "Projects", href: "/projects/" },
  { label: "About", href: "/about/" },
  { label: "CV ↗", href: "/cv.pdf" },
];
export const directions = [
  {
    id: "secure-learning",
    title: "Secure learning",
    description:
      "Protecting deployed models against extraction while preserving the predictions legitimate users rely on.",
    tags: "Model extraction · Antidistillation",
    question: "How much can a model reveal without giving itself away?",
    detail:
      "Prediction APIs expose more than a label. I study how their probability distributions enable distillation-based replication, and how inference-time defenses can reduce that signal without changing the served top-1 prediction.",
    href: "/research/ads-c/",
    linkLabel: "Explore secure learning",
  },
  {
    id: "multi-agent-systems",
    title: "Autonomous multi-agent systems",
    description:
      "Developing coordinated teams of robots for search-and-rescue in disaster-struck regions.",
    tags: "Reinforcement learning · Coordination",
    question: "How can teams of robots coordinate for search-and-rescue?",
    detail:
      "My work in autonomous systems is driven by the goal of developing highly coordinated multi-agent robots for search-and-rescue in disaster-struck regions. I study reinforcement learning and coordination under energy, information, and communication constraints in support of that goal.",
    href: "/research/#multi-agent-systems",
    linkLabel: "Explore multi-agent systems",
  },
  {
    id: "machine-reasoning",
    title: "Machine reasoning & optimization",
    description:
      "Exploring language-model agents for search and decision-making under partial information.",
    tags: "LLMs · Agents · Optimization",
    status: "Current direction",
    question:
      "Can language-model agents help search under incomplete information?",
    detail:
      "I am exploring LLM-assisted combinatorial decision-making, especially where a problem is distributed across agents. This is an emerging direction. My public collaborative work on LLM evaluation provides a complementary perspective on the reliability of model judgments.",
    href: "/research/#machine-reasoning",
    linkLabel: "Explore current direction",
  },
];
