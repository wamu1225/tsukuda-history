export type Zone = 'old' | 'new' | 'boundary';

/** 亀戸型「歴史と文化」8分野（O-2-30・2026-09-11）。土地に実在しない分野は無理に埋めない。 */
export type Category = 'name-origin' | 'history' | 'shrine' | 'food' | 'industry' | 'culture' | 'spots' | 'faq';

export const CATEGORY_LABEL: Record<Category, string> = {
  'name-origin': '地名の由来',
  history: '通史',
  shrine: '社寺・信仰',
  food: '名物・食',
  industry: '産業・生業',
  culture: '文化・文学・芸能',
  spots: '見どころ',
  faq: 'よくある誤解',
};

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
  category: Category;
  sections: ArticleSection[];
  sources: string[];
  updatedAt: string;
}

export interface ContrastRow {
  label: string;
  old: string;
  next: string;
}
