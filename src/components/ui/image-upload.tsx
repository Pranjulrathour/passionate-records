
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label,
  placeholder = "Upload an image or enter URL"
}) => {
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [preview, setPreview] = useState<string>(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For now, we'll create a blob URL for preview
      // In a real app, you'd upload to your storage service
      const blobUrl = URL.createObjectURL(file);
      setPreview(blobUrl);
      onChange(blobUrl);
    }
  };

  const handleUrlChange = (url: string) => {
    setPreview(url);
    onChange(url);
  };

  const clearImage = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-passionate-white">{label}</Label>
      
      <div className="flex space-x-2 mb-4">
        <Button
          type="button"
          variant={uploadMode === 'url' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setUploadMode('url')}
          className={uploadMode === 'url' ? 'bg-passionate-red' : ''}
        >
          URL
        </Button>
        <Button
          type="button"
          variant={uploadMode === 'file' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setUploadMode('file')}
          className={uploadMode === 'file' ? 'bg-passionate-red' : ''}
        >
          Upload File
        </Button>
      </div>

      {uploadMode === 'url' ? (
        <Input
          type="url"
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => handleUrlChange(e.target.value)}
          className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
        />
      ) : (
        <div className="space-y-2">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="bg-passionate-gray/30 border-passionate-gray text-passionate-white file:bg-passionate-red file:text-passionate-white file:border-0 file:rounded file:px-3 file:py-1"
          />
          <p className="text-passionate-white/50 text-xs">
            Supported formats: JPG, PNG, GIF, WebP (max 10MB)
          </p>
        </div>
      )}

      {preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border border-passionate-gray"
            onError={() => setPreview('')}
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
};

export default ImageUpload;
