"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";


interface ClearFiltersButtonProps {
    preserveParams?: string[];
    excludeFromCount?: string[];
    onBeforeClear?: () => boolean | void;
    onAfterClear?: () => void;
    variant?: "ghost" | "outline" | "destructive" | "secondary";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
    label?: string;
    showCount?: boolean;
}


const ClearFiltersButton = ({
  preserveParams = [],
  excludeFromCount = ["page", "limit", "sortBy", "sortOrder"],
  onBeforeClear,
  onAfterClear,
  variant = "ghost",
  size = "default",
  className = "h-10 px-3",
  label = "Clear",
  showCount = true,
}: ClearFiltersButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Count active filters (excluding preserved params and excluded from count params)
  const activeFiltersCount = Array.from(searchParams.keys()).filter(
    (key) => !preserveParams.includes(key) && !excludeFromCount.includes(key)
  ).length;

  const handleClear = () => {
    // Run before clear handler
    if (onBeforeClear) {
      const shouldProceed = onBeforeClear();
      if (shouldProceed === false) return;
    }

    const params = new URLSearchParams();

    // Preserve specified params
    preserveParams.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        params.set(param, value);
      }
    });

    startTransition(() => {
      // If no params to preserve, just go to base path
      if (params.toString()) {
        router.push(`?${params.toString()}`);
      } else {
        router.push(window.location.pathname);
      }
    });

    // Run after clear handler
    onAfterClear?.();
  };

  // Don't render if no active filters
  if (activeFiltersCount === 0) {
    return null;
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClear}
      disabled={isPending}
      className={className}
    >
      <X className="h-4 w-4 mr-1" />
      {label}
      {showCount && ` (${activeFiltersCount})`}
    </Button>
  );
};

export default ClearFiltersButton;