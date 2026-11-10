export type Work = {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  summary: string;
  deliverables: string[];
  src: string;
  alt: string;
  folderColor?: string;
};

export const works: Work[] = [
  {
    id: "01",
    title: "Aura Intelligence",
    category: "Brand systems & Strategy",
    year: "2026",
    client: "Aura Labs Inc.",
    summary:
      "A calm, enduring visual system and design tokens for a next-gen ambient intelligence platform.",
    deliverables: ["Visual Identity", "Typography System", "Motion Guidelines", "Web Platform"],
    src: "/works/01.svg",
    alt: "Aura Intelligence brand system",
    folderColor: "#d9d5cb",
  },
  {
    id: "02",
    title: "Kinfolk Financial",
    category: "Product UI & Design System",
    year: "2025",
    client: "Kinfolk Group",
    summary:
      "End-to-end interface architecture for modern treasury operations, emphasizing radical legibility under stress.",
    deliverables: ["Product Architecture", "Design System", "Design Tokens", "Mobile App"],
    src: "/works/02.svg",
    alt: "Kinfolk Financial interface",
    folderColor: "#d2ccc0",
  },
  {
    id: "03",
    title: "Mono Studio Deck",
    category: "Art Direction & Editorial",
    year: "2025",
    client: "Mono Collective",
    summary:
      "Minimalist brand collateral, physical monographs, and campaign direction celebrating architectural materials.",
    deliverables: ["Print Production", "Art Direction", "Photography Direction", "Packaging"],
    src: "/works/03.svg",
    alt: "Mono Studio editorial deck",
    folderColor: "#ccc6b8",
  },
  {
    id: "04",
    title: "Vessel Commerce",
    category: "Product UI & Web",
    year: "2025",
    client: "Vessel Ware",
    summary:
      "E-commerce flagship store engineered with zero friction checkout and tactile typography.",
    deliverables: ["Storefront UX", "Interaction Design", "Next.js Architecture", "Performance"],
    src: "/works/04.svg",
    alt: "Vessel Commerce flagship",
    folderColor: "#c7c1b2",
  },
  {
    id: "05",
    title: "Chronicle OS",
    category: "Brand Systems & Interface",
    year: "2024",
    client: "Chronicle Labs",
    summary:
      "An archival publishing platform for longform essayists with bespoke reading typography and ink tones.",
    deliverables: ["Design Language", "Reader Mode", "Type Specimen", "Desktop App"],
    src: "/works/05.svg",
    alt: "Chronicle OS typography and reader",
    folderColor: "#c2bcac",
  },
  {
    id: "06",
    title: "Horizon Spatial",
    category: "Art Direction & 3D",
    year: "2024",
    client: "Horizon Systems",
    summary:
      "Spatial interface guidelines and launch film exploring three-dimensional typography in mixed reality.",
    deliverables: ["3D Visual Systems", "Concept Prototyping", "Keynote Direction"],
    src: "/works/06.svg",
    alt: "Horizon Spatial campaign",
    folderColor: "#bcb5a4",
  },
];
