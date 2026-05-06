export type Screen = 'home' | 'procedures' | 'tracking' | 'booking' | 'feedback' | 'profile';

export interface Procedure {
  id: string;
  title: string;
  category: string;
  duration: string;
  fee: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  image: string;
}
