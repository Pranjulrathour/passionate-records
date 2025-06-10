// Utility functions for handling images with fallbacks and error prevention

// Fallback image URLs - using data URLs for generic placeholders instead of external images
export const FALLBACK_IMAGES = {
  artist: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjEyMTIxIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTYwIiByPSI2MCIgZmlsbD0iIzQ0NDQ0NCIvPjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIzMDAiIHJ4PSIxMDAiIHJ5PSI2MCIgZmlsbD0iIzQ0NDQ0NCIvPjx0ZXh0IHg9IjIwMCIgeT0iMzUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzc3Nzc3IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==",
  project: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjEyMTIxIi8+PHJlY3QgeD0iMTAwIiB5PSIxMDAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNDQ0NDQ0IiByeD0iMTAiLz48dGV4dCB4PSIyMDAiIHk9IjM1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzc3Nzc3NyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=", 
  event: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjEyMTIxIi8+PHJlY3QgeD0iMTAwIiB5PSIxMDAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNDQ0NDQ0IiByeD0iMTAiLz48dGV4dCB4PSIyMDAiIHk9IjM1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzc3Nzc3NyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=",
  release: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjEyMTIxIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSIxMDAiIGZpbGw9IiM0NDQ0NDQiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjMwIiBmaWxsPSIjMjEyMTIxIi8+PHRleHQgeD0iMjAwIiB5PSIzNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM3Nzc3NzciIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+",
  profile: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjEyMTIxIi8+PGNpcmNsZSBjeD0iNzUiIGN5PSI2MCIgcj0iMzAiIGZpbGw9IiM0NDQ0NDQiLz48ZWxsaXBzZSBjeD0iNzUiIGN5PSIxMjAiIHJ4PSI0NSIgcnk9IjI1IiBmaWxsPSIjNDQ0NDQ0Ii8+PC9zdmc+",
  default: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjEyMTIxIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSI1MCIgZmlsbD0iIzQ0NDQ0NCIvPjx0ZXh0IHg9IjIwMCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzc3Nzc3IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=="
};

/**
 * Get a safe image URL with fallback
 * @param imageUrl - The original image URL
 * @param fallbackType - Type of fallback image to use
 * @returns A safe image URL
 */
export function getSafeImageUrl(
  imageUrl: string | null | undefined, 
  fallbackType: keyof typeof FALLBACK_IMAGES = 'default'
): string {
  if (!imageUrl || imageUrl.trim() === '') {
    return FALLBACK_IMAGES[fallbackType];
  }
  return imageUrl;
}

/**
 * Handle image error by setting a fallback source
 * @param event - The image error event
 * @param fallbackType - Type of fallback image to use
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement>, 
  fallbackType: keyof typeof FALLBACK_IMAGES = 'default'
): void {
  const img = event.target as HTMLImageElement;
  if (img.src !== FALLBACK_IMAGES[fallbackType]) {
    img.src = FALLBACK_IMAGES[fallbackType];
  }
}

/**
 * Create image props with error handling
 * @param imageUrl - The original image URL
 * @param alt - Alt text for the image
 * @param fallbackType - Type of fallback image to use
 * @returns Object with src, alt, and onError props
 */
export function createSafeImageProps(
  imageUrl: string | null | undefined,
  alt: string,
  fallbackType: keyof typeof FALLBACK_IMAGES = 'default'
) {
  const safeUrl = getSafeImageUrl(imageUrl, fallbackType);
  
  // Debug logging for image display
  console.log('🖼️ createSafeImageProps called:', {
    originalUrl: imageUrl,
    safeUrl: safeUrl,
    alt: alt,
    fallbackType: fallbackType,
    isOriginalUrl: safeUrl === imageUrl,
    isFallback: safeUrl !== imageUrl
  });
  
  return {
    src: safeUrl,
    alt,
    onError: (e: React.SyntheticEvent<HTMLImageElement>) => handleImageError(e, fallbackType)
  };
} 