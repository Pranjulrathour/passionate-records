interface ShareOptions {
  title: string;
  text: string;
  url?: string;
}

export const shareContent = async (options: ShareOptions): Promise<boolean> => {
  const shareData: ShareData = {
    title: options.title,
    text: options.text,
    url: options.url || window.location.href,
  };

  // Check if the Web Share API is available
  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      // User cancelled the share or there was an error
      console.log('Share cancelled or failed:', error);
    }
  }

  // Fallback to copying URL to clipboard
  try {
    await navigator.clipboard.writeText(shareData.url || window.location.href);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = shareData.url || window.location.href;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
};

// Predefined share functions for different content types
export const shareArtist = (artistName: string, url?: string) => {
  return shareContent({
    title: `${artistName} - Passionate Records`,
    text: `Check out this amazing artist: ${artistName} from Passionate Records!`,
    url
  });
};

export const shareRelease = (releaseTitle: string, artistName: string, url?: string) => {
  return shareContent({
    title: `${releaseTitle} by ${artistName}`,
    text: `Listen to "${releaseTitle}" by ${artistName} on Passionate Records!`,
    url
  });
};

export const shareEvent = (eventTitle: string, venue: string, url?: string) => {
  return shareContent({
    title: `${eventTitle} - Passionate Records`,
    text: `Join us at ${eventTitle} - ${venue}!`,
    url
  });
};

export const shareGeneric = (title: string, description: string, url?: string) => {
  return shareContent({
    title: `${title} - Passionate Records`,
    text: description,
    url
  });
}; 