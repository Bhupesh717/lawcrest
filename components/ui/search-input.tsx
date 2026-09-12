"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  debounceMs?: number;
  containerClassName?: string;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  debounceMs = 300,
  containerClassName,
  className,
  ...props
}: SearchInputProps) {
  const [internalValue, setInternalValue] = React.useState(value);

  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (internalValue !== value) {
        onChange(internalValue);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [internalValue, debounceMs, onChange, value]);

  const handleClear = () => {
    setInternalValue("");
    onChange("");
    onClear?.();
  };

  return (
    <div className={cn("relative flex items-center w-full max-w-sm", containerClassName)}>
      <Search className="absolute left-3 h-4 w-4 text-[#8F897F] pointer-events-none" />
      <input
        type="text"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-9 w-full rounded-md border border-[#2A231C] bg-[#14110F] pl-9 pr-8 text-sm text-[#F5F1E8] placeholder:text-[#6E675D] transition-colors focus-visible:outline-none focus-visible:border-[#C9A45C] focus-visible:ring-1 focus-visible:ring-[#C9A45C]/40",
          className
        )}
        {...props}
      />
      {internalValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 flex h-4 w-4 items-center justify-center rounded-sm text-[#8F897F] hover:text-[#F5F1E8] transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
