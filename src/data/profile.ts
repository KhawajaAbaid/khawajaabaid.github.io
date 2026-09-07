export const profile = {
  name: "Khawaja Abaid Ullah",
  shortName: "K. Abaid Ullah",
  role: "PhD Student in Electrical & Computer Engineering",
  institution: "Rochester Institute of Technology",
  lab: "Khojasteh Autonomous Systems Laboratory",
  email: "khawaja.abaid@gmail.com",
  credentials: ["Fulbright Scholar", "Former AWS AI/ML Intern"],
  description:
    "PhD researcher at RIT working on machine learning security, reinforcement learning, multi-agent autonomous systems, and LLM-assisted reasoning.",
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
      "Learning to coordinate when energy, information, and communication are limited.",
    tags: "Reinforcement learning · Coordination",
    question: "How should autonomous agents coordinate with limited resources?",
    detail:
      "Long-running autonomous systems have to allocate energy as carefully as they allocate work. I am interested in reinforcement learning, environment design, and policies that account for the constraints shared by a team of agents.",
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
