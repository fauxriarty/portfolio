import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  className?: string;
}

export const Image: React.FC<ImageProps> = ({ 
  src,
  alt,
  loading = 'lazy',
  className
}) => {
  // Extract the path without extension
  const basePath = src.replace(/\.[^/.]+$/, '');
  
  return (
    <img
      src={`${basePath}.webp`}
      srcSet={`
        ${basePath}-567w.webp 567w,
        ${basePath}-768w.webp 768w,
        ${basePath}-992w.webp 992w
      `}
      sizes="(max-width: 567px) 567w,
             (max-width: 768px) 768w,
             (max-width: 992px) 992w"
      alt={alt}
      loading={loading}
      className={className}
    />
  );
};