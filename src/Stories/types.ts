export interface Story {
  url: string;
  type?: 'image' | 'video';
  duration?: number;
  header?: {
    heading: string;
    subheading: string;
    profileImage: string;
  };
  seeMore?: () => React.ReactNode;
} 