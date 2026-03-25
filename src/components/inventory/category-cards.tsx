import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { InventoryItem } from "@/lib/types";

interface CategoryCardsProps {
  items: InventoryItem[];
}

export function CategoryCards({ items }: CategoryCardsProps) {
  const categoryCounts = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryCounts).sort(
    ([a], [b]) => a.localeCompare(b)
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {sortedCategories.map(([category, count]) => (
        <Card key={category}>
          <CardContent className="text-center p-4">
            <p className="font-heading font-semibold text-sm">{category}</p>
            <Badge variant="primary" className="mt-2">
              {count}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
