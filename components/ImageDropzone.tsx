'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageDropzone({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const onDrop = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;

    // TEMP: local preview URL
    const previewUrl = URL.createObjectURL(file);
    onUpload(previewUrl);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
        ${isDragActive ? 'border-green-600 bg-green-50' : 'border-gray-300 hover:border-green-600'}`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        Drag & drop image here, or click to select
      </p>
    </div>
  );
}
