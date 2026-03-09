import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid3X3, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilter } from '@/components/ProductFilter';
import { products as allProducts } from '@/data/products';
import { cn } from '@/lib/utils';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    categories: searchParams.get('category') ? [searchParams.get('category')!] : [] as string[],
    brands: [] as string[],
    priceRange: [0, 5000] as [number, number],
  });

  const maxPrice = Math.max(...allProducts.map((p) => p.price));

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    if (category) {
      setFilters((prev) => ({ ...prev, categories: [category] }));
    }
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams((prev) => {
      if (searchQuery) {
        prev.set('search', searchQuery);
      } else {
        prev.delete('search');
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {allProducts.length} products
          </p>
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search guitars, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
          </form>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <ProductFilter
              filters={filters}
              onFilterChange={setFilters}
              maxPrice={maxPrice}
            />
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div
                className={cn(
                  'grid gap-6',
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                )}
              >
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">
                  No products found matching your criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      categories: [],
                      brands: [],
                      priceRange: [0, maxPrice],
                    });
                    setSearchParams({});
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
