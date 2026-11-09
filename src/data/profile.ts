export const profile = {
  name: "Khawaja Abaid Ullah",
  shortName: "K. Abaid Ullah",
  role: "PhD student in Electrical and Computer Engineering",
  institution: "Rochester Institute of Technology",
  lab: "Khojasteh Autonomous Systems Laboratory (KAS Lab)",
  location: "Rochester, NY",
  email: "khawaja.abaid@gmail.com",
  advisor: "Dr. Mohammad Javad Khojasteh",
  researchStatement:
    "I’m a first-year PhD student in Electrical and Computer Engineering at Rochester Institute of Technology, where I study multi-agent coordination and decision-making at the Khojasteh Autonomous Systems Laboratory. My current work focuses on decentralized task allocation and LLM-assisted planning for autonomous systems.",
  secondaryBio:
    "I also build machine-learning software, including Teras, a multi-backend tabular deep-learning library, and have contributed code and tests to Keras. Previously, I completed an SDE internship at AWS and earned my MS in Artificial Intelligence at RIT as a Fulbright Scholar.",
  currentOverview:
    "My research focuses on how autonomous agents coordinate decisions, share information, and allocate tasks under communication and resource constraints. I am particularly interested in decentralized coordination and in combining LLM-assisted planning with explicit coordination algorithms.",
  futureOverview:
    "I am beginning to explore LLM-guided algorithm discovery and optimization, where candidate solutions are improved using evaluation feedback. Longer term, I want to develop compact, computationally efficient reasoning models that can run directly on robots and edge devices, helping autonomous teams adapt and coordinate reliably. Multi-robot search and rescue is one application I hope to work toward.",
  description:
    "Khawaja Abaid Ullah is a PhD student at RIT’s KAS Lab studying multi-agent coordination, decentralized task allocation and LLM-assisted planning. Creator of Teras and contributor to Keras.",
  links: {
    rit: "https://www.rit.edu/kaslab/people/khawaja",
    github: "https://github.com/KhawajaAbaid",
    linkedin: "https://www.linkedin.com/in/KhawajaAbaid",
  },
};

export const navigation = [
  { label: "Research", homeHref: "#research", href: "/research/" },
  { label: "Publications", homeHref: "#publications", href: "/publications/" },
  { label: "Projects", homeHref: "#projects", href: "/projects/" },
  { label: "Experience & CV", homeHref: "#experience", href: "/about/" },
  { label: "CV (PDF)", homeHref: "/cv.pdf", href: "/cv.pdf", external: true },
];

export const directions = [
  {
    id: "multi-agent-systems",
    accent: "teal" as const,
    title: "Multi-agent coordination & decision-making",
    status: "Current research · KAS Lab",
    question:
      "How can autonomous teams allocate tasks and coordinate decisions with limited communication and resources?",
    summary: profile.currentOverview,
    tags: [
      "Decentralized task allocation",
      "LLM-assisted planning",
      "Autonomous systems",
    ],
    links: [{ label: "Coordination testbed", href: "/research/coordination/" }],
  },
  {
    id: "machine-reasoning",
    accent: "brass" as const,
    title: "Algorithm discovery & efficient reasoning",
    status: "Emerging direction & long-term goals",
    question:
      "How might evaluation feedback guide algorithm discovery, and how could compact reasoning models support autonomous teams?",
    summary: profile.futureOverview,
    tags: [
      "Emerging: LLM-guided algorithm discovery",
      "Goal: on-device reasoning",
    ],
    links: [
      {
        label: "Inspiration: AlphaEvolve",
        href: "https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/",
      },
      {
        label: "Inspiration: Learning to Discover at Test Time",
        href: "https://arxiv.org/abs/2601.16175",
      },
    ],
  },
];

export const experienceLedger = [
  {
    period: "Jun 2026 – Present",
    role: "Graduate Research Assistant (Ph.D. in ECE)",
    organization: "Khojasteh Autonomous Systems Laboratory (KAS Lab), RIT",
    location: "Rochester, NY",
    note: "Fully funded graduate research assistantship",
    highlights: [
      "Advised by Dr. Mohammad Javad Khojasteh (expected graduation: May 2029).",
      "Study multi-agent coordination and decision-making, particularly decentralized task allocation and LLM-assisted planning under communication and resource constraints.",
    ],
  },
  {
    period: "May 2025 – Aug 2025",
    role: "Software Development Engineer Intern, AI/ML",
    organization: "Amazon Web Services (AWS)",
    location: "East Palo Alto, CA",
    note: "Full-Time Return Offer",
    featured: true,
    highlights: [
      "Engineered core Apache Spark testing and evaluation modules for an internal benchmarking platform, closing feature-parity gaps with its legacy predecessor.",
      "Independently identified and delivered additional benchmarking capabilities beyond original project scope, earning team leadership recognition and a full-time return offer.",
    ],
  },
  {
    period: "Aug 2026 – Present",
    role: "Teaching Assistant — Principles of Robotics",
    organization: "Rochester Institute of Technology",
    location: "Rochester, NY",
    note: "ROS 1 / ROS 2 / Docker",
    highlights: [
      "Develop lecture and lab material for undergraduate and graduate robotics students; designed reproducible ROS Docker containers and VM images replacing a brittle third-party setup.",
    ],
  },
  {
    period: "Feb 2023 – May 2023",
    role: "Junior Python Developer (Remote)",
    organization: "Comundo",
    location: "Copenhagen, Denmark",
    highlights: [
      "Built semi-supervised data-curation pipelines for building energy-consumption records used in CO2 estimation and downstream forecasting.",
    ],
  },
];

export const serviceLedger = [
  {
    period: "Jun 2026 – Present",
    role: "Manuscript Reviewer",
    organization: "IEEE Signal Processing Letters",
    location: "Academic Service",
    highlights: [
      "Began reviewing manuscripts for IEEE Signal Processing Letters in June 2026.",
    ],
  },
];

export const educationLedger = [
  {
    period: "Jun 2026 – May 2029 (expected)",
    degree: "Ph.D. in Electrical and Computer Engineering",
    institution: "Rochester Institute of Technology",
    location: "Rochester, NY",
    note: "Fully funded graduate research assistantship",
    details:
      "Advised by Dr. Mohammad Javad Khojasteh in the Khojasteh Autonomous Systems Laboratory.",
  },
  {
    period: "Aug 2024 – May 2026",
    degree: "M.S. in Artificial Intelligence",
    institution: "Rochester Institute of Technology",
    location: "Rochester, NY",
    note: "U.S. Fulbright Scholar · 4.0 / 4.0 GPA",
    details:
      "Funded by the U.S. Department of State Fulbright Foreign Student Program. Thesis: “Antidistillation Sampling for Classification.”",
    thesisHref: "https://repository.rit.edu/theses/12584/",
  },
  {
    period: "2017 – 2021",
    degree: "B.S. in Computer Science",
    institution: "University of Narowal",
    location: "Narowal, Pakistan",
    note: "Ranked 1st in Class of 2021",
    details: "Graduated first in the Computer Science class of 2021.",
  },
];

export const apparatusSkills = [
  {
    label: "Languages",
    items: ["Python", "C", "C++", "Bash"],
  },
  {
    label: "ML & Deep Learning",
    items: [
      "JAX",
      "Flax (Linen & NNX)",
      "Keras 3",
      "PyTorch",
      "TensorFlow",
      "Ray RLlib",
      "PettingZoo",
      "NumPy",
      "Apache Spark",
    ],
  },
  {
    label: "Robotics & Systems",
    items: ["ROS 1", "ROS 2", "Docker", "Linux", "Git", "Arduino"],
  },
  {
    label: "Research Focus",
    items: [
      "Multi-Agent Reinforcement Learning",
      "Decentralized Task Allocation",
      "Antidistillation & ML Security",
      "Knowledge Distillation",
      "LLM-Assisted Planning",
    ],
  },
];
