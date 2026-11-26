import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItem } from '../data/seoMeta';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
  dark?: boolean;
}

export function Breadcrumb({ items, onNavigate, dark = false }: BreadcrumbProps) {
  return (
    <nav aria-label="현재 위치" className="mb-6">
      <ol
        className={`flex flex-wrap items-center gap-1.5 text-xs ${
          dark ? 'text-[#B8C0B9]' : 'text-[#4B5852]'
        }`}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />}
              {isLast ? (
                <span
                  aria-current="page"
                  className={dark ? 'font-medium text-[#E2C98C]' : 'font-medium text-[#09271F]'}
                >
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.path);
                  }}
                  className={`transition-colors ${
                    dark ? 'hover:text-[#F4F1E8]' : 'hover:text-[#09271F] hover:underline'
                  }`}
                >
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
