"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

function Accordion({ children, className }: AccordionProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {children}
    </div>
  );
}

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>(defaultOpen ? "none" : "0px");

  useEffect(() => {
    if (isOpen) {
      const scrollHeight = contentRef.current?.scrollHeight ?? 0;
      setMaxHeight(`${scrollHeight}px`);
      // After transition, remove max-height constraint so content can resize
      const timer = setTimeout(() => setMaxHeight("none"), 300);
      return () => clearTimeout(timer);
    } else {
      // Set explicit height first so transition works from a numeric value
      if (contentRef.current) {
        setMaxHeight(`${contentRef.current.scrollHeight}px`);
        // Force reflow, then collapse
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setMaxHeight("0px");
          });
        });
      }
    }
  }, [isOpen]);

  const panelId = `accordion-panel-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const buttonId = `accordion-button-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={cn(
      "rounded-xl px-5 transition-all duration-300",
      isOpen ? "bg-off-white/80 border-l-[3px] border-l-accent" : "bg-transparent hover:bg-off-white/50"
    )}>
      <button
        id={buttonId}
        type="button"
        className="flex w-full items-center justify-between min-h-[48px] py-4 text-left font-heading font-semibold text-text-primary transition-colors duration-200 hover:text-primary-dark cursor-pointer rounded-sm"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        ref={contentRef}
        role="region"
        aria-labelledby={buttonId}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight }}
      >
        <div
          className={cn(
            "px-2 pb-4 transition-opacity duration-300 ease-in-out",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export { Accordion, AccordionItem, type AccordionProps, type AccordionItemProps };
