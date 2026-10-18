export const profile = {
  name: "Khawaja Abaid Ullah",
  shortName: "K. Abaid Ullah",
  role: "PhD Researcher in Electrical & Computer Engineering",
  institution: "Rochester Institute of Technology",
  lab: "Khojasteh Autonomous Systems Laboratory (KAS Lab)",
  email: "khawaja.abaid@gmail.com",
  credentials: [
    "U.S. Fulbright Scholar (4.0 GPA)",
    "Former AWS AI/ML SDE Intern (Return Offer)",
    "Creator of Teras · Keras 3 Contributor",
  ],
  researchStatement:
    "PhD researcher at RIT’s Khojasteh Autonomous Systems Laboratory (KAS Lab) researching multi-agent coordination, dynamic resource allocation, constrained communication, and compromised-agent containment for autonomous disaster search-and-rescue robot teams—alongside test-time antidistillation defenses against model extraction.",
  advisor: "Dr. Mohammad Javad Khojasteh",
  description:
    "Khawaja Abaid Ullah — PhD researcher at RIT's KAS Lab working on multi-agent robot coordination for disaster search-and-rescue and ML security (antidistillation). U.S. Fulbright Scholar (4.0 GPA), former AWS AI/ML SDE intern, creator of Teras, and Keras 3 contributor.",
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
  { label: "Dossier & CV", href: "/about/" },
  { label: "Resume PDF ↗", href: "/cv.pdf" },
];

export const directions = [
  {
    id: "multi-agent-systems",
    title: "Multi-Agent Autonomy & Search-and-Rescue",
    status: "Primary KAS Lab Ph.D. Focus",
    description:
      "Dynamic resource allocation, communication under constraints, and detection and containment of compromised agents for autonomous disaster-response robot teams.",
    tags: "Multi-Agent RL · Resource Allocation · Compromised-Agent Containment · ROS 2",
    question:
      "How do autonomous robot teams coordinate under energy, communication, and adversarial constraints?",
    detail:
      "At RIT’s KAS Lab (advised by Dr. Mohammad Javad Khojasteh), I research multi-agent coordination and decision-making toward autonomous robot teams for disaster search and rescue. Current work spans dynamic resource allocation, multi-agent communication under bandwidth and energy limits, detection and containment of compromised agents, and PettingZoo/RLlib aerial UAV recharging environments (Fontus).",
    href: "/research/#multi-agent-systems",
    linkLabel: "Inspect Volume I (Autonomy & MARL)",
  },
  {
    id: "secure-learning",
    title: "ML Security & Test-Time Antidistillation",
    status: "ADS-C & Matched-Cost Benchmark",
    description:
      "Margin-aware inference-time perturbations and matched-cost evaluation protocols that suppress unauthorized model distillation without altering served top-1 predictions.",
    tags: "Antidistillation · Model Extraction · Margin-Aware Sampling · PyTorch",
    question:
      "How can deployed classifiers suppress unauthorized knowledge distillation at zero top-1 accuracy cost?",
    detail:
      "Prediction APIs return probability vectors that adversaries exploit to train surrogate models via knowledge distillation. With ADS-C (arXiv:2607.15467), we enforce a closed-form per-input confidence-margin budget that preserves every served top-1 prediction while reducing distilled-student accuracy by 29.6 pp on CIFAR-10, 17.4 pp on CIFAR-100, and 13.3 pp on Tiny-ImageNet. In our companion review, directed perturbations under a unified matched-cost wrapper drive distilled students 34.5 pp (CIFAR-10) and 47.7 pp (CIFAR-100) below the hard-label baseline.",
    href: "/research/ads-c/",
    linkLabel: "Inspect Volume II (ADS-C & ML Security)",
  },
  {
    id: "machine-reasoning",
    title: "LLM Distillation, Evaluation & Optimization",
    status: "Flax NNX & 34-LLM Study",
    description:
      "Staged knowledge distillation for compact code-generation models (Flax NNX), LLM-assisted combinatorial optimization, and large-scale human-LLM alignment studies.",
    tags: "Knowledge Distillation · JAX / Flax NNX · LLM Evaluation · Combinatorial Optimization",
    question:
      "How do we distill, evaluate, and coordinate language models for structured decision-making?",
    detail:
      "My work on language models spans both compact model distillation and rigorous behavioral evaluation. For codriver, I ported Gemma 2 from Flax Linen to the NNX API and applied two-stage distillation (from Gemma 2 2B on text and CodeGemma 2B on fill-in-the-middle code) into a 260M local model. In collaborative research at RIT (arXiv:2608.09717), we evaluated social-judgment reliability and human-LLM alignment across 34 LLMs and 198 human participants.",
    href: "/research/#machine-reasoning",
    linkLabel: "Inspect Volume III (LLMs & Optimization)",
  },
];

export const experienceLedger = [
  {
    period: "Jun 2026 – Present",
    role: "Graduate Research Assistant (Ph.D. in ECE)",
    organization: "Khojasteh Autonomous Systems Laboratory (KAS Lab) · RIT",
    location: "Rochester, NY",
    badge: "FULL GRA FELLOWSHIP",
    highlights: [
      "Advised by Dr. Mohammad Javad Khojasteh (Expected Ph.D. graduation: May 2029).",
      "Researching multi-agent coordination and decision-making for autonomous systems: dynamic resource allocation, multi-agent communication under constraints, and detection and containment of compromised agents toward autonomous disaster search-and-rescue robot teams.",
      "Researching test-time antidistillation defenses to prevent unauthorized knowledge distillation of deployed machine learning models.",
    ],
  },
  {
    period: "May 2025 – Aug 2025",
    role: "Software Development Engineer Intern, AI/ML",
    organization: "Amazon Web Services (AWS)",
    location: "East Palo Alto, CA",
    badge: "FULL-TIME RETURN OFFER",
    featured: true,
    highlights: [
      "Engineered core Apache Spark testing modules for a next-generation internal benchmarking platform, closing feature-parity gaps with its legacy predecessor across targeted benchmarking workflows.",
      "Exceeded the original project scope by independently identifying and implementing additional benchmarking capabilities, earning strong recognition from team leadership and a full-time return offer.",
    ],
  },
  {
    period: "Aug 2026 – Present",
    role: "Teaching Assistant — Principles of Robotics",
    organization: "Rochester Institute of Technology",
    location: "Rochester, NY",
    badge: "ROS 1 / ROS 2 / DOCKER",
    highlights: [
      "Develop lecture and laboratory material for a combined undergraduate and graduate robotics course using ROS 1, ROS 2, and Arduino.",
      "Designed and built the course’s ROS-based Docker containers and reproducible VM images, replacing a brittle third-party dependency across the full lab sequence.",
    ],
  },
  {
    period: "Jun 2026 – Present",
    role: "Manuscript Reviewer",
    organization: "IEEE Signal Processing Letters",
    location: "Academic Service",
    badge: "PEER REVIEW",
    highlights: [
      "Review manuscripts in machine learning, signal processing, and related areas for technical soundness, novelty, experimental methodology, and reproducibility.",
    ],
  },
  {
    period: "Feb 2023 – May 2023",
    role: "Junior Python Developer (Remote)",
    organization: "Comundo",
    location: "Copenhagen, Denmark",
    badge: "DATA & ML PIPELINES",
    highlights: [
      "Built semi-supervised web-scraping and data-curation pipelines for energy-consumption data; cleaned and aggregated outputs for CO2 estimation and downstream ML forecasting.",
    ],
  },
];

export const educationLedger = [
  {
    period: "Jun 2026 – May 2029 (Exp.)",
    degree: "Ph.D. in Electrical and Computer Engineering",
    institution: "Rochester Institute of Technology",
    location: "Rochester, NY",
    stamp: "FULLY FUNDED GRA · KAS LAB",
    details:
      "Fully funded Graduate Research Assistantship in the Khojasteh Autonomous Systems Laboratory, advised by Dr. Mohammad Javad Khojasteh.",
  },
  {
    period: "Aug 2024 – May 2026",
    degree: "M.S. in Artificial Intelligence",
    institution: "Rochester Institute of Technology",
    location: "Rochester, NY",
    stamp: "U.S. FULBRIGHT SCHOLAR · 4.0 / 4.0 GPA",
    details:
      "GPA: 4.0 / 4.0. Fully funded by the U.S. Department of State Fulbright Scholarship. Master’s Thesis: “Antidistillation Sampling for Classification.”",
    thesisHref: "https://repository.rit.edu/theses/12584/",
  },
  {
    period: "2017 – 2021",
    degree: "B.S. in Computer Science",
    institution: "University of Narowal",
    location: "Narowal, Pakistan",
    stamp: "RANKED 1ST IN CLASS OF 2021",
    details:
      "Graduated first (Valedictorian / 1st rank) in the Computer Science class of 2021.",
  },
];

export const apparatusSkills = [
  {
    callNo: "CAT. I // LANGUAGES",
    label: "Systems & Programming Languages",
    items: ["Python", "C", "C++", "Bash"],
  },
  {
    callNo: "CAT. II // DEEP LEARNING & ML",
    label: "Machine Learning Frameworks & Engines",
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
    callNo: "CAT. III // ROBOTICS & INFRASTRUCTURE",
    label: "Robotics, Simulation & Systems Tooling",
    items: ["ROS 1", "ROS 2", "Docker", "Linux", "Git", "Arduino"],
  },
  {
    callNo: "CAT. IV // RESEARCH METHODS",
    label: "Core Research Methodologies",
    items: [
      "Multi-Agent Reinforcement Learning",
      "Multi-Agent Systems",
      "Antidistillation & Model Extraction Defense",
      "Knowledge Distillation",
      "Neural Combinatorial Optimization",
      "LLM-Assisted Optimization",
    ],
  },
];
