import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface VisualFrameProps {
  src: string;
  alt: string;
  caption?: string;
  aspectClass?: string;
  eager?: boolean;
  darkSurface?: boolean;
  className?: string;
}

export function VisualFrame({
  src,
  alt,
  caption,
  aspectClass = 'aspect-[16/10]',
  eager = false,
  darkSurface = false,
  className = ''
}: VisualFrameProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`m-0 ${className}`}>
      <div
        className={`relative overflow-hidden border ${
          darkSurface
            ? 'border-[#C6A45B]/25 bg-[#071A15]'
            : 'border-[#09271F]/15 bg-[#E9E4D8]'
        } ${aspectClass}`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className={`flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center ${
              darkSurface ? 'bg-[#09271F] text-[#B8C0B9]' : 'bg-[#ECE7DA] text-[#4B5852]'
            }`}
          >
            <ImageOff className="h-6 w-6 opacity-60" aria-hidden="true" />
            <span className="text-xs leading-relaxed">{alt}</span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption
          className={`mt-2.5 text-xs leading-relaxed ${
            darkSurface ? 'text-[#B8C0B9]' : 'text-[#4B5852]'
          }`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
