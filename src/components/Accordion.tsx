import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionEntry {
  question: string;
  answer: string;
  category?: string;
}

interface AccordionProps {
  items: AccordionEntry[];
  defaultOpenIndex?: number | null;
  dark?: boolean;
}

export function Accordion({ items, defaultOpenIndex = 0, dark = false }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div
      className={`divide-y border-y ${
        dark
          ? 'divide-[#C6A45B]/20 border-[#C6A45B]/20'
          : 'divide-[#09271F]/12 border-[#09271F]/15'
      }`}
    >
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question} className="py-1">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(idx)}
              className={`flex w-full items-start justify-between gap-4 py-4 text-left transition-colors duration-200 cursor-pointer ${
                dark ? 'hover:text-[#E2C98C]' : 'hover:text-[#103A2D]'
              }`}
            >
              <div className="min-w-0 flex-1">
                {item.category && (
                  <span
                    className={`mb-1 block text-xs font-medium tracking-wide ${
                      dark ? 'text-[#C6A45B]' : 'text-[#103A2D]'
                    }`}
                  >
                    {item.category}
                  </span>
                )}
                <span
                  className={`block text-base font-medium leading-snug ${
                    dark ? 'text-[#F4F1E8]' : 'text-[#14221D]'
                  }`}
                >
                  {item.question}
                </span>
              </div>
              <span
                className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                } ${dark ? 'text-[#C6A45B]' : 'text-[#09271F]'}`}
                aria-hidden="true"
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            {isOpen && (
              <div
                className={`pb-5 pr-8 text-[15px] leading-relaxed ${
                  dark ? 'text-[#B8C0B9]' : 'text-[#4B5852]'
                }`}
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
