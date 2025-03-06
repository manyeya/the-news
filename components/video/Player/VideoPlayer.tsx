"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { useVideoContext } from './VideoContext';
import ReactPlayer from 'react-player';
import type { ReactPlayerProps } from 'react-player';
import { Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  id: string;
  title?: string;
  onError?: (error: Error) => void;
}

export default function VideoPlayer({ url, id, onError }: VideoPlayerProps) {
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);
  const { activeVideo, handlePlay: contextHandlePlay } = useVideoContext();

  const handleReady = useCallback(() => {
    setIsReady(true);
    setHasError(false);
  }, []);

  useEffect(() => {
    if (activeVideo !== id && playerRef.current) {
      playerRef.current.getInternalPlayer()?.pauseVideo();
    }
  }, [activeVideo, id]);

  const handleVideoPlay = useCallback(() => {
    contextHandlePlay(id);
  }, [contextHandlePlay, id]);

  const handleError = useCallback((error: Error) => {
    console.error('Video playback error:', error);
    setHasError(true);
    setIsReady(false);
    if (onError) onError(error);
  }, [onError]);

  return (
    <div className="relative w-full aspect-video bg-black overflow-hidden shadow-lg">
      {/* Video Player */}
      <div className="absolute inset-0">
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          onReady={handleReady}
          onError={handleError}
          controls
          onPlay={() => handleVideoPlay()}
          playsinline
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                origin: typeof window !== 'undefined' ? window.location.origin : undefined,
                enablejsapi: 1,
                autoplay: 0
              }
            }
          } as ReactPlayerProps['config']}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>

      {/* Loading State */}
      {!isReady && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="text-center text-white">
            <p className="text-xl font-semibold">Error loading video</p>
            <p className="text-sm opacity-75">Please try again later</p>
          </div>
        </div>
      )}
    </div>
  );
}
