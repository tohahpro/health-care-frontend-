"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const SchedulesFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local state for inputs with debouncing - use lazy initialization
  const [startDateInput, setStartDateInput] = useState(
    () => searchParams.get("startDateTime") || ""
  );
  const [endDateInput, setEndDateInput] = useState(
    () => searchParams.get("endDateTime") || ""
  );

  // Debounced values
  const debouncedStartDate = useDebounce(startDateInput, 500);
  const debouncedEndDate = useDebounce(endDateInput, 500);

  // Apply debounced filters to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Update debounced fields
    if (debouncedStartDate) {
      params.set("startDateTime", debouncedStartDate);
    } else {
      params.delete("startDateTime");
    }

    if (debouncedEndDate) {
      params.set("endDateTime", debouncedEndDate);
    } else {
      params.delete("endDateTime");
    }

    // Reset to page 1 when filters change
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedStartDate, debouncedEndDate]);

  return (
    <div className="space-y-3">
      {/* Row 1: Filters and Refresh */}
      <div className="flex items-center gap-3">
        {/* Start Date Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="startDateTime" className="text-sm font-medium">
            Start Date:
          </label>
          <Input
            id="startDateTime"
            type="date"
            value={startDateInput}
            onChange={(e) => setStartDateInput(e.target.value)}
            className="w-40 h-10"
            disabled={isPending}
          />
        </div>

        {/* End Date Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="endDateTime" className="text-sm font-medium">
            End Date:
          </label>
          <Input
            id="endDateTime"
            type="date"
            value={endDateInput}
            onChange={(e) => setEndDateInput(e.target.value)}
            className="w-40 h-10"
            disabled={isPending}
          />
        </div>

        <RefreshButton />

        {/* Clear Filters */}
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default SchedulesFilter;