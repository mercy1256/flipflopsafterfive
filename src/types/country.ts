export interface Country {
  name: string;
  region: string;
  capital: string;
  timeZone: string;
  visaRequirements: string;
  currency: string;
  languages: string[];
  about: {
    description: string;
    highlights: string[];
  };
  travelTips: {
    bestTimeToVisit: string;
    transportation: string[];
    culturalNotes: string[];
  };
  articles?: {
    title: string;
    slug: string;
    description: string;
    image: string;
    date: string;
    readTime: string;
  }[];
} 