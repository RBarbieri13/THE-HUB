"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InventoryFiltersBar } from "@/components/inventory/inventory-filters";
import { useInventoryFilters } from "@/hooks/use-inventory-filters";
import type { InventoryItem } from "@/lib/types";
import type { BadgeVariant } from "@/components/ui/badge";

interface InventoryTableProps {
  items: InventoryItem[];
}

const STATUS_VARIANT: Record<string, BadgeVariant> = {
  Available: "success",
  Pending: "warning",
  "In Refurbishment": "primary",
  Assigned: "accent",
  Unavailable: "error",
};

type SortableField = keyof InventoryItem;

const SORTABLE_COLUMNS: { key: SortableField; label: string }[] = [
  { key: "category", label: "Category" },
  { key: "item_type", label: "Type" },
  { key: "brand", label: "Brand" },
  { key: "model", label: "Model" },
  { key: "size", label: "Size" },
  { key: "condition", label: "Condition" },
  { key: "status", label: "Status" },
  { key: "last_updated", label: "Last Updated" },
];

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function SortIndicator({
  field,
  sortField,
  sortDirection,
}: {
  field: SortableField;
  sortField: SortableField;
  sortDirection: "asc" | "desc";
}) {
  if (sortField !== field) {
    return <ChevronUp className="inline h-3 w-3 ml-1 opacity-30" />;
  }
  return sortDirection === "asc" ? (
    <ChevronUp className="inline h-3 w-3 ml-1" />
  ) : (
    <ChevronDown className="inline h-3 w-3 ml-1" />
  );
}

export function InventoryTable({ items }: InventoryTableProps) {
  const {
    filters,
    setFilters,
    filteredItems,
    sortField,
    sortDirection,
    toggleSort,
    clearFilters,
    hasActiveFilters,
  } = useInventoryFilters(items);

  return (
    <div className="space-y-6">
      <InventoryFiltersBar onFilterChange={setFilters} filters={filters} />

      <p className="text-sm text-text-secondary">
        Showing {filteredItems.length} of {items.length} items
      </p>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-secondary mb-4">
            No items match your filters
          </p>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters}>
              Reset filters
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {SORTABLE_COLUMNS.map((col) => (
                    <TableHead
                      key={col.key}
                      className="cursor-pointer select-none hover:text-text-primary whitespace-nowrap"
                      onClick={() => toggleSort(col.key)}
                    >
                      {col.label}
                      <SortIndicator
                        field={col.key}
                        sortField={sortField}
                        sortDirection={sortDirection}
                      />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.category}
                    </TableCell>
                    <TableCell>{item.item_type}</TableCell>
                    <TableCell>{item.brand ?? "-"}</TableCell>
                    <TableCell>{item.model ?? "-"}</TableCell>
                    <TableCell>{item.size ?? "-"}</TableCell>
                    <TableCell>{item.condition}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[item.status] ?? "primary"}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDate(item.last_updated)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {filteredItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-heading font-semibold text-sm">
                        {item.item_type}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {item.category}
                      </p>
                    </div>
                    <Badge
                      variant={STATUS_VARIANT[item.status] ?? "primary"}
                    >
                      {item.status}
                    </Badge>
                  </div>

                  {(item.brand || item.model) && (
                    <p className="text-sm">
                      {[item.brand, item.model].filter(Boolean).join(" ")}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary">
                    {item.size && <span>Size: {item.size}</span>}
                    <span>Condition: {item.condition}</span>
                    <span>Updated: {formatDate(item.last_updated)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
