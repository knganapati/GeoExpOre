import { useState, ChangeEvent, DragEvent } from 'react';
import { cn } from '../../lib/utils';
import { Upload, X, FileText, Check } from 'lucide-react';
import Button from './Button';

interface FileUploadProps {
  label?: string;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  onChange: (file: File | null) => void;
  className?: string;
  error?: string;
  value?: File | null;
}

const FileUpload = ({
  label,
  acceptedFileTypes,
  maxFileSizeMB = 10,
  onChange,
  className,
  error,
  value
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(value?.name || null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const handleFile = (file: File | null) => {
    if (!file) {
      onChange(null);
      setFileName(null);
      return;
    }
    
    // Check file size
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      alert(`File size should not exceed ${maxFileSizeMB}MB`);
      return;
    }
    
    // Check file type if specified
    if (acceptedFileTypes && !acceptedFileTypes.includes(file.type)) {
      alert(`Only ${acceptedFileTypes} files are allowed`);
      return;
    }
    
    setFileName(file.name);
    onChange(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0] || null;
    handleFile(file);
  };

  const removeFile = () => {
    onChange(null);
    setFileName(null);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      
      {!fileName ? (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-4 transition-colors duration-200',
            isDragging ? 'border-primary bg-primary-50' : 'border-gray-300 bg-gray-50',
            error ? 'border-red-300' : '',
            'focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary',
            className
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center py-4 text-sm">
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
            <p className="mb-1 font-medium text-gray-700">
              Drag and drop your file here or
            </p>
            <p className="text-xs text-gray-500">
              {acceptedFileTypes ? `${acceptedFileTypes} up to ${maxFileSizeMB}MB` : `Max ${maxFileSizeMB}MB`}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              Browse files
            </Button>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={acceptedFileTypes}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{fileName}</p>
              <p className="text-xs text-gray-500">
                <Check className="inline w-3 h-3 mr-1 text-green-500" />
                File uploaded successfully
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-gray-500 hover:text-red-500"
            aria-label="Remove file"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;