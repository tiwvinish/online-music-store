import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

export default function Wishlist() {
  const { wishlist } = useCart();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center px-4">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-serif text-2xl lg:text-3xl font-bold mb-2">
            Your Wishlist is Empty
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Save items you love by clicking the heart icon on any product. They will appear here for easy access.
          </p>
          <Link to="/products">
            <Button variant="gold" size="lg" className="gap-2">
              Explore Products
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2">
            My Wishlist
          </h1>
          <p className="text-muted-foreground">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
