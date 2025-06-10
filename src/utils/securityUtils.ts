/**
 * Security utilities for safe file handling and blob URL management
 * Prevents "Not allowed to load local resource: blob:" errors
 */

export interface SecureFileValidation {
  isValid: boolean;
  error?: string;
  fileType?: string;
  size?: number;
}

/**
 * Validates file type and size for security
 */
export const validateImageFile = (file: File, maxSizeMB: number = 10): SecureFileValidation => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return {
      isValid: false,
      error: 'Invalid file type. Only images are allowed.',
      fileType: file.type,
      size: file.size
    };
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `File too large. Maximum size is ${maxSizeMB}MB.`,
      fileType: file.type,
      size: file.size
    };
  }

  // Check for valid image extensions
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const fileName = file.name.toLowerCase();
  const hasValidExtension = validExtensions.some(ext => fileName.endsWith(`.${ext}`));
  
  if (!hasValidExtension) {
    return {
      isValid: false,
      error: 'Invalid file extension. Allowed: JPG, PNG, GIF, WebP',
      fileType: file.type,
      size: file.size
    };
  }

  return {
    isValid: true,
    fileType: file.type,
    size: file.size
  };
};

/**
 * Creates a secure data URL from file using FileReader
 * Completely avoids blob URLs to prevent security errors
 */
export const createSecureDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      reject(new Error(validation.error));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string' && result.startsWith('data:image/')) {
        resolve(result);
      } else {
        reject(new Error('Failed to create valid data URL'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.onabort = () => {
      reject(new Error('File reading was aborted'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Validates URL for security (prevents blob URLs)
 */
export const isSecureURL = (url: string): boolean => {
  if (!url) return false;
  
  // Allow data URLs and secure HTTP URLs
  return (
    url.startsWith('data:image/') ||
    url.startsWith('https://') ||
    url.startsWith('http://localhost') ||
    url.startsWith('http://127.0.0.1')
  );
};

/**
 * Sanitizes URL and blocks dangerous blob URLs
 */
export const sanitizeImageURL = (url: string): string | null => {
  if (!url) return null;
  
  if (url.startsWith('blob:')) {
    console.warn('🚨 Blob URL blocked for security:', url);
    return null;
  }
  
  if (isSecureURL(url)) {
    return url;
  }
  
  console.warn('⚠️ Unsafe URL blocked:', url);
  return null;
};

/**
 * Safe blob URL creator with automatic cleanup
 * Use only for immediate downloads, not for display
 */
export const createSafeDownloadBlob = (
  content: string | Blob,
  filename: string,
  mimeType: string = 'text/plain'
): void => {
  let blobUrl: string | null = null;
  
  try {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    
    blobUrl = URL.createObjectURL(blob);
    link.href = blobUrl;
    link.download = filename;
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('✅ Safe download completed:', filename);
    
  } catch (error) {
    console.error('❌ Download failed:', error);
    throw new Error('Failed to create download');
  } finally {
    // Always clean up immediately
    if (blobUrl) {
      setTimeout(() => {
        try {
          URL.revokeObjectURL(blobUrl as string);
          console.log('🧹 Download blob URL cleaned up');
        } catch (cleanupError) {
          console.warn('Warning: Could not revoke download blob URL:', cleanupError);
        }
      }, 100);
    }
  }
};

/**
 * Emergency blob URL cleanup
 * Call this to clean up any lingering blob URLs
 */
export const emergencyBlobCleanup = (): void => {
  console.log('🆘 Emergency blob URL cleanup initiated');
  
  // Find all img elements with blob URLs
  const images = document.querySelectorAll('img[src^="blob:"]');
  images.forEach((img) => {
    const src = (img as HTMLImageElement).src;
    try {
      URL.revokeObjectURL(src);
      (img as HTMLImageElement).src = '';
      console.log('🧹 Emergency cleaned blob URL from image');
    } catch (error) {
      console.warn('Could not revoke blob URL:', src);
    }
  });
  
  // Find all links with blob URLs
  const links = document.querySelectorAll('a[href^="blob:"]');
  links.forEach((link) => {
    const href = (link as HTMLAnchorElement).href;
    try {
      URL.revokeObjectURL(href);
      (link as HTMLAnchorElement).href = '#';
      console.log('🧹 Emergency cleaned blob URL from link');
    } catch (error) {
      console.warn('Could not revoke blob URL:', href);
    }
  });
};

/**
 * React hook for safe image preview with automatic cleanup
 */
export const useSafeImagePreview = () => {
  const createPreview = async (file: File): Promise<string> => {
    return createSecureDataURL(file);
  };
  
  const validateURL = (url: string): boolean => {
    return isSecureURL(url);
  };
  
  const sanitizeURL = (url: string): string | null => {
    return sanitizeImageURL(url);
  };
  
  return {
    createPreview,
    validateURL,
    sanitizeURL,
    emergencyCleanup: emergencyBlobCleanup
  };
};

// Export default security configuration
export const SECURITY_CONFIG = {
  MAX_IMAGE_SIZE_MB: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_IMAGE_EXTENSIONS: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  BLOB_CLEANUP_DELAY_MS: 100,
  ENABLE_SECURITY_LOGS: true
} as const; 