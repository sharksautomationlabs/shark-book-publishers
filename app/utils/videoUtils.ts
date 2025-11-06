// Utility functions for video handling

export const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement>) => {
  const video = e.target as HTMLVideoElement;
  // Remove poster when video data is loaded
  video.removeAttribute('poster');
};

export const handleVideoCanPlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
  const video = e.target as HTMLVideoElement;
  // Ensure poster is removed when video can play
  video.removeAttribute('poster');
};

export const handleVideoPlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
  const video = e.target as HTMLVideoElement;
  // Remove poster when video starts playing
  video.removeAttribute('poster');
};

// Combined handler for all video events
export const handleVideoEvents = {
  onLoadedData: handleVideoLoad,
  onCanPlay: handleVideoCanPlay,
  onPlay: handleVideoPlay,
};
