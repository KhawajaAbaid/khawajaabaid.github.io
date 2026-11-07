export const profile = {
  name: "Khawaja Abaid Ullah",
  shortName: "K. Abaid Ullah",
  role: "Ph.D. Researcher · Machine Learning & Autonomous Systems",
  institution: "Rochester Institute of Technology",
  lab: "Khojasteh Autonomous Systems Laboratory (KAS Lab)",
  location: "Rochester, NY",
  email: "khawaja.abaid@gmail.com",
  advisor: "Dr. Mohammad Javad Khojasteh",
  researchStatement:
    "I research cooperative multi-agent autonomy—dynamic resource allocation, constrained communication, and aerial recharging for disaster search-and-rescue robot teams—alongside inference-time defenses that protect deployed machine learning models from unauthorized extraction.",
  secondaryBio:
    "Previously an AI/ML Software Development Engineer Intern at Amazon Web Services (full-time return offer) and a U.S. Fulbright Scholar at RIT (M.S. in AI, 4.0 GPA). Alongside research, I build open-source ML tools including Teras and contribute to Keras 3.",
  description:
    "Khawaja Abaid Ullah — Ph.D. researcher at RIT's KAS Lab working on cooperative multi-agent autonomy for disaster search-and-rescue and ML security. U.S. Fulbright Scholar (4.0 GPA), former AWS AI/ML SDE intern, creator of Teras, and Keras 3 contributor.",
  proofStrip: [
    {
      label: "Fellowship & Academics",
      title: "U.S. Fulbright Scholar",
      detail: "M.S. in AI (4.0 / 4.0 GPA) · RIT · 1st in B.S. CS Class",
    },
    {
      label: "Industry Engineering",
      title: "Amazon Web Services",
      detail: "AI/ML SDE Intern · East Palo Alto · Return Offer",
    },
    {
      label: "Open-Source Ecosystems",
      title: "Teras & Keras 3",
      detail: "Creator of Teras · Official Keras 3 Contributor",
    },
  ],
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
    title: "Cooperative Multi-Agent Autonomy & Search-and-Rescue",
    status: "Primary Ph.D. Focus · KAS Lab",
    question:
      "How can autonomous robot teams coordinate reliably when energy, bandwidth, and trust are constrained?",
    summary:
      "Developing multi-agent reinforcement learning and coordination methods for disaster search-and-rescue teams—spanning dynamic resource allocation, communication relays under bandwidth limits, aerial UAV battery recharging (Fontus), and containment of compromised agents.",
    tags: [
      "Multi-Agent RL",
      "Search & Rescue",
      "Resource Allocation",
      "ROS 2",
      "PettingZoo / RLlib",
    ],
    links: [
      {
        label: "Fontus Environment (GitHub)",
        href: "https://github.com/KhawajaAbaid/fontus2d",
      },
    ],
  },
  {
    id: "secure-learning",
    accent: "peach" as const,
    title: "ML Security & Inference-Time Antidistillation",
    status: "ADS-C · Matched-Cost Benchmark",
    question:
      "How can deployed classifiers deter unauthorized model extraction without altering legitimate predictions?",
    summary:
      "Designing closed-form per-input confidence-margin perturbations (ADS-C) and matched-cost evaluation wrappers that preserve 100% of served top-1 predictions while substantially degrading surrogate student distillation.",
    tags: [
      "Model Extraction Defense",
      "Antidistillation",
      "Margin Bounds",
      "PyTorch",
    ],
    links: [
      {
        label: "ADS-C Preprint (arXiv)",
        href: "https://arxiv.org/abs/2607.15467",
      },
      {
        label: "PyTorch Harness",
        href: "https://github.com/the-kas-lab/ADS-C",
      },
    ],
  },
  {
    id: "machine-reasoning",
    accent: "brass" as const,
    title: "LLM Distillation, Alignment & Optimization",
    status: "JAX / Flax NNX · 34-LLM Study",
    question:
      "How do we distill compact language models and evaluate alignment for structured decision-making?",
    summary:
      "Exploring two-stage knowledge distillation for compact local code-generation models in JAX/Flax NNX (codriver, 260M parameters) alongside theory-grounded behavioral alignment studies across 34 LLMs and 198 human participants.",
    tags: [
      "Knowledge Distillation",
      "JAX / Flax NNX",
      "LLM Evaluation",
      "Combinatorial Optimization",
    ],
    links: [
      {
        label: "34-LLM Alignment Paper (arXiv)",
        href: "https://arxiv.org/abs/2608.09717",
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
    note: "Full GRA Fellowship",
    highlights: [
      "Advised by Dr. Mohammad Javad Khojasteh (expected graduation: May 2029).",
      "Researching cooperative multi-agent decision-making, dynamic resource allocation, constrained communication, and compromised-agent containment for disaster search-and-rescue robot teams, alongside test-time antidistillation defenses.",
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
      "Engineered core Apache Spark testing and evaluation modules for a next-generation internal benchmarking platform, closing feature-parity gaps with its legacy predecessor.",
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
      "Develop lecture and lab material for a combined undergraduate/graduate robotics course; designed reproducible ROS Docker containers and VM images replacing a brittle third-party setup.",
    ],
  },
  {
    period: "Jun 2026 – Present",
    role: "Manuscript Reviewer",
    organization: "IEEE Signal Processing Letters",
    location: "Academic Service",
    highlights: [
      "Peer-review manuscripts in machine learning and signal processing for technical soundness, novelty, and experimental reproducibility.",
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

export const educationLedger = [
  {
    period: "2026 – 2029 (Exp.)",
    degree: "Ph.D. in Electrical and Computer Engineering",
    institution: "Rochester Institute of Technology",
    location: "Rochester, NY",
    note: "Fully Funded GRA · KAS Lab",
    details:
      "Advised by Dr. Mohammad Javad Khojasteh in the Khojasteh Autonomous Systems Laboratory.",
  },
  {
    period: "2024 – 2026",
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
    details:
      "Graduated first (Valedictorian) in the Computer Science class of 2021.",
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
      "Cooperative Search & Rescue",
      "Antidistillation & ML Security",
      "Knowledge Distillation",
      "LLM Evaluation & Optimization",
    ],
  },
];
