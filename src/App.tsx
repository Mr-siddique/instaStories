import React, { useState, useEffect, useRef } from 'react';
import { fetchStories } from './stories/api';
import { Story } from './stories/types';

interface Story {
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

const StoryViewer: React.FC<{
  stories: Story[];
  defaultInterval: number;
  initialStoryIndex: number;
}> = ({ stories, defaultInterval, initialStoryIndex }) => {
  const [currentStory, setCurrentStory] = useState(initialStoryIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressInterval = 50; // Update progress every 50ms

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + (progressInterval / defaultInterval) * 100;
      });
    }, progressInterval);

    const storyTimer = setTimeout(() => {
      if (currentStory < stories.length - 1) {
        setCurrentStory(curr => curr + 1);
      }
    }, defaultInterval);

    return () => {
      clearTimeout(storyTimer);
      clearInterval(progressTimer);
    };
  }, [currentStory, stories.length, defaultInterval]);

  const handleClick = (e: React.MouseEvent) => {
    const x = e.nativeEvent.offsetX;
    const width = e.currentTarget.clientWidth;
    
    if (x < width / 2) {
      if (currentStory > 0) {
        setCurrentStory(curr => curr - 1);
      }
    } else {
      if (currentStory < stories.length - 1) {
        setCurrentStory(curr => curr + 1);
      }
    }
  };

  const handleMediaLoaded = () => {
    setIsLoading(false);
  };

  const story = stories[currentStory];

  return (
    <div 
      data-testid="story-viewer"
      style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative', 
        backgroundColor: '#000',
        touchAction: 'none' // Prevents default touch behaviors
      }}
      onClick={handleClick}
    >
      {/* Progress bars */}
      <div data-testid="story-progress-bars" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        padding: '10px',
        display: 'flex',
        gap: '5px'
      }}>
        {stories.map((_, i) => (
          <div
            key={i}
            data-testid={`progress-bar-${i}`}
            style={{
              flex: 1,
              height: '2px',
              backgroundColor: 'rgba(255,255,255,0.3)',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              backgroundColor: 'white',
              width: i < currentStory ? '100%' : i === currentStory ? `${progress}%` : '0%',
              transition: i === currentStory ? 'width 0.1s linear' : undefined
            }} />
          </div>
        ))}
      </div>

      {/* Loading spinner */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          zIndex: 1
        }}>
          Loading...
        </div>
      )}

      {story.type === 'video' ? (
        <video
          src={story.url}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          autoPlay
          muted
          onLoadedData={handleMediaLoaded}
        />
      ) : (
        <img
          src={story.url}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt="story"
          onLoad={handleMediaLoaded}
        />
      )}
      
      {story.header && (
        <div data-testid="story-header-heading" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'white'
        }}>
          <img 
            src={story.header.profileImage} 
            style={{ width: 40, height: 40, borderRadius: '50%' }}
            alt="profile"
          />
          <div>
            <div>{story.header.heading}</div>
            <div style={{ fontSize: '0.8em' }}>{story.header.subheading}</div>
          </div>
        </div>
      )}

      {story.seeMore && (
        <div style={{ position: 'absolute', bottom: 20, width: '100%', textAlign: 'center' }}>
          {story.seeMore()}
        </div>
      )}

      <button
        data-testid="close-button"
        onClick={handleClick}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '28px',
          padding: '8px',
          cursor: 'pointer',
          opacity: 0.8
        }}
      >
        ×
      </button>
    </div>
  );
};

const StoryCircle: React.FC<{
  story: Story;
  onClick: () => void;
  isSelected: boolean;
}> = ({ story, onClick, isSelected }) => {
  const circleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!circleRef.current) return;
    
    if (isSelected) {
      const rect = circleRef.current.getBoundingClientRect();
      const scaleX = window.innerWidth / rect.width;
      const scaleY = window.innerHeight / rect.height;
      const scale = Math.max(scaleX, scaleY);
      
      circleRef.current.style.transform = `scale(${scale})`;
      circleRef.current.style.opacity = '0';
    } else {
      // Reset styles when not selected
      circleRef.current.style.transform = 'scale(1)';
      circleRef.current.style.opacity = '1';
    }
  }, [isSelected]);

  return (
    <div 
      ref={circleRef}
      data-testid="story-circle"
      onClick={onClick}
      style={{ 
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 4px',
        minWidth: '64px',
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
      }}
    >
      <div style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        padding: 2,
        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
      }}>
        <img
          src={story.header?.profileImage || story.url}
          alt="story"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '2px solid white',
            objectFit: 'cover'
          }}
        />
      </div>
      <span style={{ 
        fontSize: '11px',
        marginTop: '4px',
        maxWidth: '64px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: '#262626'
      }}>
        {story.header?.heading || 'Story'}
      </span>
    </div>
  );
};

const App: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const fetchedStories = await fetchStories();
        setStories(fetchedStories);
      } catch (error) {
        console.error('Failed to fetch stories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStories();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleStoryClick = (index: number) => {
    setIsTransitioning(true);
    setSelectedStoryIndex(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 150); // Match the transition duration
  };

  const closeStory = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedStoryIndex(null);
      setIsTransitioning(false);
    }, 150);
  };

  if (!isMobile) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
        color: '#666'
      }}>
        Please view on a mobile device or reduce browser window size.
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading stories...</div>;
  }

  return (
    <div style={{ 
      maxWidth: '100vw', 
      overflowX: 'hidden',
      backgroundColor: '#fff',
      minHeight: '100vh'
    }}>
      {/* Story circles container */}
      <div data-testid="story-circles-container" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        zIndex: 1,
        opacity: selectedStoryIndex !== null ? 0 : 1,
        transition: 'opacity 0.3s ease-out',
      }}>
        <div style={{
          display: 'flex',
          padding: '12px 8px',
          overflowX: 'auto',
          maxWidth: '100%',
          margin: '0 auto',
          justifyContent: 'flex-start',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '::-webkit-scrollbar': { display: 'none' },
          paddingLeft: 'max(8px, env(safe-area-inset-left))',
          paddingRight: 'max(8px, env(safe-area-inset-right))',
        }}>
          <div style={{ 
            display: 'flex',
            gap: '8px',
            margin: '0 auto',
            padding: '0 4px',
          }}>
            {stories.map((story, index) => (
              <StoryCircle
                key={index}
                story={story}
                onClick={() => handleStoryClick(index)}
                isSelected={index === selectedStoryIndex}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add padding to prevent content from hiding under fixed header */}
      <div style={{ paddingTop: '96px' }} />

      {/* Story viewer modal */}
      {(selectedStoryIndex !== null || isTransitioning) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#000',
          zIndex: 1000,
          overflow: 'hidden',
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 0.3s ease-out',
        }}>
          <div style={{ 
            position: 'absolute', 
            top: 12, 
            right: 12,
            zIndex: 1001 
          }}>
            <button
              onClick={closeStory}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '28px',
                padding: '8px',
                cursor: 'pointer',
                opacity: 0.8
              }}
            >
              ×
            </button>
          </div>
          <StoryViewer
            stories={stories}
            defaultInterval={5000}
            initialStoryIndex={selectedStoryIndex}
          />
        </div>
      )}
    </div>
  );
};

export default App;
