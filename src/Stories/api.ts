import { Story } from './types';
import { ReactNode } from 'react';

export async function fetchStories(): Promise<Story[]> {
  // Simulating API call - in real app, replace with actual API fetch
   const stories = [
    {
      url: 'https://picsum.photos/1080/1920',
      seeMore: ()=>null,
      header: {
        heading: 'aamir',
        subheading: 'Posted 5h ago',
        profileImage: 'https://picsum.photos/1000/1000'
      }
    },
    {
      url:
        'https://fsa.zobj.net/crop.php?r=dyJ08vhfPsUL3UkJ2aFaLo1LK5lhjA_5o6qEmWe7CW6P4bdk5Se2tYqxc8M3tcgYCwKp0IAyf0cmw9yCmOviFYb5JteeZgYClrug_bvSGgQxKGEUjH9H3s7PS9fQa3rpK3DN3nx-qA-mf6XN',
      header: {
        heading: 'aamir',
        subheading: 'Posted 32m ago',
        profileImage: 'https://picsum.photos/1080/1920'
      }
    },
    {
      url:
        'https://media.idownloadblog.com/wp-content/uploads/2016/04/iPhone-wallpaper-abstract-portrait-stars-macinmac.jpg',
      header: {
        heading: 'aamir/stories',
        subheading: 'Posted 32m ago',
        profileImage:
          'https://avatars0.githubusercontent.com/u/24852829?s=400&v=4'
      }
    },
    {
      url: 'https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4',
      type: 'video',
      duration: 1000,
      header: {
        heading: 'Story Title',
        subheading: 'Posted now',
        profileImage: 'https://picsum.photos/1000/1000'
      }
    },
    {
      url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      type: 'video',
      seeMore: ()=>null,
      header: {
        heading: 'Story Title',
        subheading: 'Posted now',
        profileImage: 'https://picsum.photos/1000/1000'
      }
    },
    {
      url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      type: 'video',
      header: {
        heading: 'Story Title',
        subheading: 'Posted now',
        profileImage: 'https://picsum.photos/1000/1000'
      }
    },
    {
      url: 'https://images.unsplash.com/photo-1534856966153-c86d43d53fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80',
      type: 'image',
      header: {
        heading: 'Story Title',
        subheading: 'Posted now',
        profileImage: 'https://picsum.photos/1000/1000'
      }
    }
  ] as Story[];
  return new Promise((resolve, reject)=>{
    return resolve(stories);
  });
}