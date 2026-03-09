import { useState } from 'react';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { categories, brands } from '@/data/products';
import { cn } from '@/lib/utils';

interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
}

interface ProductFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  maxPrice: number;
}

export function ProductFilter({ filters, onFilterChange, maxPrice }: ProductFilterProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['category', 'brand', 'price']);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((c) => c !== categoryId);
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter((b) => b !== brand);
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handlePriceChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      brands: [],
      priceRange: [0, maxPrice],
    });
  };

  const activeFilterCount = filters.categories.length + filters.brands.length + 
    (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <span className="font-serif text-lg font-semibold">Category</span>
          <ChevronDown
            className={cn(
              'h-5 w-5 text-muted-foreground transition-transform',
              expandedSections.includes('category') && 'rotate-180'
            )}
          />
        </button>
        {expandedSections.includes('category') && (
          <div className="space-y-3">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category.id, checked as boolean)
                  }
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {category.icon} {category.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <span className="font-serif text-lg font-semibold">Brand</span>
          <ChevronDown
            className={cn(
              'h-5 w-5 text-muted-foreground transition-transform',
              expandedSections.includes('brand') && 'rotate-180'
            )}
          />
        </button>
        {expandedSections.includes('brand') && (
          <div className="space-y-3">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) =>
                    handleBrandChange(brand, checked as boolean)
                  }
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <span className="font-serif text-lg font-semibold">Price Range</span>
          <ChevronDown
            className={cn(
              'h-5 w-5 text-muted-foreground transition-transform',
              expandedSections.includes('price') && 'rotate-180'
            )}
          />
        </button>
        {expandedSections.includes('price') && (
          <div className="space-y-4">
            <Slider
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onValueChange={handlePriceChange}
              min={0}
              max={maxPrice}
              step={50}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                ${filters.priceRange[0].toLocaleString()}
              </span>
              <span className="text-muted-foreground">
                ${filters.priceRange[1].toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={clearFilters}
        >
          Clear All Filters ({activeFilterCount})
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => setIsMobileOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-card border-l border-border p-6 animate-slide-in-right overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-bold">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block">
        <FilterContent />
      </div>
    </>
  );
}
