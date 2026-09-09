export type Zone = 'old' | 'new' | 'boundary';

export interface GeoPoint {
  id: string;
  name: string;
  zone: Zone;
  lat: number;
  lng: number;
  note: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface Article {
  slug: string;
  title: string;
  dek: string;
  zone: Zone;
  sections: ArticleSection[];
  sources: string[];
  updatedAt: string;
}

export interface ContrastRow {
  label: string;
  old: string;
  next: string;
}
