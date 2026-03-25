"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  EQUIPMENT_CATEGORIES,
  EQUIPMENT_CONDITIONS,
  INVENTORY_STATUSES,
} from "@/lib/constants";
import type { InventoryFilters } from "@/hooks/use-inventory-filters";

interface InventoryFiltersProps {
  onFilterChange: (filters: InventoryFilters) => void;
  filters: InventoryFilters;
}

const categoryOptions = [
  { value: "", label: "All Categories" },
  ...EQUIPMENT_CATEGORIES.map((c) => ({ value: c, label: c })),
];

const conditionOptions = [
  { value: "", label: "All Conditions" },
  ...EQUIPMENT_CONDITIONS.map((c) => ({ value: c, label: c })),
];

const statusOptions = [
  { value: "", label: "All Statuses" },
  ...INVENTORY_STATUSES.map((s) => ({ value: s, label: s })),
];

export function InventoryFiltersBar({
  onFilterChange,
  filters,
}: InventoryFiltersProps) {
  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  const updateFilter = (key: keyof InventoryFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
        <Input
          type="text"
          placeholder="Search equipment..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-10"
        />
      </div>

      <Select
        options={categoryOptions}
        value={filters.category}
        onChange={(e) => updateFilter("category", e.target.value)}
        aria-label="Filter by category"
      />

      <Select
        options={conditionOptions}
        value={filters.condition}
        onChange={(e) => updateFilter("condition", e.target.value)}
        aria-label="Filter by condition"
      />

      <Select
        options={statusOptions}
        value={filters.status}
        onChange={(e) => updateFilter("status", e.target.value)}
        aria-label="Filter by status"
      />

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            onFilterChange({ search: "", category: "", condition: "", status: "" })
          }
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
