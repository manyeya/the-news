import { createContext, useCallback, useContext, useState } from 'react';

interface VideoContextType {
  activeVideo: string | null;
  setActiveVideo: (videoId: string | null) => void;
  handlePlay: (videoId: string) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handlePlay = useCallback((videoId: string) => {
    if (activeVideo !== videoId) {
      setActiveVideo(videoId);
    }
  }, [activeVideo]);

  return (
    <VideoContext.Provider value={{ activeVideo, setActiveVideo, handlePlay }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideoContext() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
}
