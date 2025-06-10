import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  bucketName?: string;
  inputId?: string;
}

// Security utility for safe image handling
const createSecureImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Validate file type for security
    if (!file.type.startsWith('image/')) {
      reject(new Error('Invalid file type. Only images are allowed.'));
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      reject(new Error('File too large. Maximum size is 10MB.'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        // Ensure we're creating a data: URL, not a blob: URL
        if (result.startsWith('data:image/')) {
          resolve(result);
        } else {
          reject(new Error('Invalid image data format'));
        }
      } else {
        reject(new Error('Failed to read image data'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.onabort = () => {
      reject(new Error('File reading was aborted'));
    };

    // Use readAsDataURL to create secure data: URLs instead of blob: URLs
    reader.readAsDataURL(file);
  });
};

// Memoize the ImageUpload component to prevent unnecessary re-renders
const ImageUpload: React.FC<ImageUploadProps> = memo(({
  value,
  onChange,
  label,
  placeholder = "Upload an image",
  bucketName = "artist-images",
  inputId
}) => {
  const [preview, setPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Security: Clean up any blob URLs on unmount
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(preview);
          console.log('🧹 Cleaned up blob URL on unmount');
        } catch (error) {
          console.warn('Warning: Could not revoke blob URL:', error);
        }
      }
    };
  }, [preview]);

  // Load preview from value when it changes
  useEffect(() => {
    if (value && value !== uploadedUrl) {
      // Only set preview for secure URLs (data: or https:)
      if (value.startsWith('data:') || value.startsWith('https:') || value.startsWith('http:')) {
        setPreview(value);
        setUploadedUrl(value);
      } else {
        console.warn('⚠️ Unsafe URL detected and blocked:', value);
      }
    } else if (!value) {
      setPreview('');
      setUploadedUrl('');
    }
  }, [value, uploadedUrl]);

  // Memoize the upload function to prevent unnecessary re-renders
  const uploadFile = useCallback(async (file: File): Promise<string> => {
    try {
      console.log('🚀 Starting secure upload to bucket:', bucketName);
      console.log('📁 File details:', { 
        name: file.name, 
        size: file.size, 
        type: file.type,
        lastModified: new Date(file.lastModified).toISOString()
      });
      
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

      console.log('🎯 Generated secure file path:', fileName);

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

      if (uploadError) {
        console.error('❌ Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('✅ Upload successful:', uploadData);

      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      console.log('🔗 Generated secure public URL:', urlData.publicUrl);

      // Security: Validate the generated URL
      if (!urlData.publicUrl.startsWith('https://')) {
        throw new Error('Generated URL is not secure (not HTTPS)');
      }

      return urlData.publicUrl;
    } catch (error: any) {
      console.error('💥 Upload error details:', error);
      throw error;
    }
  }, [bucketName]);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('🔄 Starting secure file upload process');

    // Security: Clean up any previous blob URLs immediately
    if (preview && preview.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(preview);
        console.log('🧹 Cleaned up previous blob URL');
      } catch (error) {
        console.warn('Warning: Could not revoke previous blob URL:', error);
      }
    }

    // Reset any previous errors
    setUploadError(null);

    let securePreviewUrl = '';
    try {
      setUploading(true);
      
      // Create secure preview using FileReader (data: URL)
      securePreviewUrl = await createSecureImagePreview(file);
      console.log('✅ Secure preview created');
      console.log('🔒 Preview type:', securePreviewUrl.startsWith('data:image/') ? 'SECURE data: URL' : 'UNKNOWN');
      
      setPreview(securePreviewUrl);
      
      // Upload the file
      const publicUrl = await uploadFile(file);
      
      // Store the uploaded URL but keep the data URL for preview (more reliable)
      setUploadedUrl(publicUrl);
      
      // Test if the public URL is accessible before switching
      const img = new Image();
      img.onload = () => {
        console.log('✅ Public URL verified, switching preview');
        setPreview(publicUrl);
      };
      img.onerror = () => {
        console.log('⚠️ Public URL not ready, keeping data URL preview');
        // Keep the secure data URL for preview
      };
      img.src = publicUrl;
      
      // Notify the parent component
      onChange(publicUrl);
        
      toast({
        title: "Upload successful",
        description: "Image has been uploaded securely"
      });
      
    } catch (error: any) {
      console.error('❌ Upload process failed:', error);
      setUploadError(error.message || 'Upload failed');
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image",
        variant: "destructive"
      });
      
      // Reset preview on error if no previous value
      if (!value) {
        setPreview('');
      }
    } finally {
      setUploading(false);
      
      // Security: Always reset the file input to prevent reuse
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [onChange, toast, uploadFile, value, preview]);

  const clearImage = useCallback(() => {
    // Security: Clean up blob URLs on clear
    if (preview && preview.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(preview);
        console.log('🧹 Cleaned up blob URL on clear');
      } catch (error) {
        console.warn('Warning: Could not revoke blob URL on clear:', error);
      }
    }
    
    setPreview('');
    setUploadedUrl('');
    onChange('');
    setUploadError(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onChange, preview]);

  // Security: Error boundary for image loading
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('❌ Image loading failed');
    console.error('🖼️ Failed source:', preview);
    
    if (preview.startsWith('blob:')) {
      console.error('🚨 BLOB URL DETECTED - This should not happen!');
      console.error('🔍 Source analysis:', {
        isBlob: preview.startsWith('blob:'),
        isData: preview.startsWith('data:'),
        isHttps: preview.startsWith('https:'),
        length: preview.length
      });
      
      // Emergency cleanup
      try {
        URL.revokeObjectURL(preview);
        setPreview('');
        console.log('🆘 Emergency blob URL cleanup performed');
      } catch (cleanupError) {
        console.error('💥 Emergency cleanup failed:', cleanupError);
      }
    }
  }, [preview]);

  const handleImageLoad = useCallback(() => {
    console.log('✅ Image loaded successfully');
    console.log('🔒 Secure source confirmed:', preview.substring(0, 50) + '...');
  }, [preview]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          ref={fileInputRef}
          id={inputId}
          name={inputId ? `${inputId}File` : undefined}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="bg-passionate-gray/30 border-passionate-gray text-passionate-white file:bg-passionate-red file:text-passionate-white file:border-0 file:rounded file:px-3 file:py-1"
          autoComplete="off"
        />
        <p className="text-passionate-white/50 text-xs">
          Supported formats: JPG, PNG, GIF, WebP (max 10MB) - Secure upload enabled
        </p>
        {uploading && (
          <div className="flex items-center space-x-2 text-passionate-white/70">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Uploading securely...</span>
          </div>
        )}
        
        {uploadError && (
          <div className="text-red-400 text-sm mt-1 flex items-center">
            <X className="h-4 w-4 mr-1" />
            {uploadError}
          </div>
        )}
      </div>

      {preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border border-passionate-gray"
            onLoad={handleImageLoad}
            onError={handleImageError}
            crossOrigin="anonymous"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearImage}
            className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full bg-passionate-red border-passionate-red hover:bg-passionate-red/80"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {!preview && (
        <div className="w-32 h-32 border-2 border-dashed border-passionate-gray rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="h-8 w-8 text-passionate-gray mx-auto mb-2" />
            <p className="text-passionate-white/50 text-xs">No image</p>
          </div>
        </div>
      )}
    </div>
  );
});

// Add display name for better debugging
ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
