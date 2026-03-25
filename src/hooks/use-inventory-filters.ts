"use client";

import { useState, useMemo } from "react";
import type { InventoryItem } from "@/lib/types";

export interface InventoryFilters {
  search: string;
  category: string;
  condition: string;
  status: string;
}

const DEFAULT_FILTERS: InventoryFilters = {
  search: "",
  category: "",
  condition: "",
  status: "",
};

export function useInventoryFilters(items: InventoryItem[]) {
  const [filters, setFilters] = useState<InventoryFilters>(DEFAULT_FILTERS);
  const [sortField, setSortField] = useState<keyof InventoryItem>("last_updated");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.item_type.toLowerCase().includes(search) ||
          (item.brand?.toLowerCase().includes(search) ?? false) ||
          (item.model?.toLowerCase().includes(search) ?? false) ||
          (item.notes?.toLowerCase().includes(search) ?? false)
      );
    }

    if (filters.category) {
      result = result.filter((item) => item.category === filters.category);
    }

    if (filters.condition) {
      result = result.filter((item) => item.condition === filters.condition);
    }

    if (filters.status) {
      result = result.filter((item) => item.status === filters.status);
    }

    result.sort((a, b) => {
      const aVal = a[sortField] ?? "";
      const bVal = b[sortField] ?? "";
      const comparison = String(aVal).localeCompare(String(bVal));
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [items, filters, sortField, sortDirection]);

  const toggleSort = (field: keyof InventoryItem) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return {
    filters,
    setFilters,
    filteredItems,
    sortField,
    sortDirection,
    toggleSort,
    clearFilters,
    hasActiveFilters,
  };
}
