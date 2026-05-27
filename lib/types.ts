export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  impact: string;
  tags: string[];
  featured: boolean;
  coverColor: string; // bg color for card visual
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Belief {
  heading: string;
  body: string;
}
