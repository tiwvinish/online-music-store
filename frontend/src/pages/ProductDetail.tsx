import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Minus, Plus, Star, Check, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button variant="outline">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Added to cart',
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    toast({
      title: inWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      description: `${product.name} has been ${inWishlist ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="container px-4 py-8">
        {/* Breadcrumb */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-card border border-border">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.brand}
              </p>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-5 w-5',
                        i < Math.floor(product.rating)
                          ? 'text-primary fill-primary'
                          : 'text-muted'
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif text-4xl font-bold text-foreground">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                    <span className="px-2 py-1 bg-destructive text-destructive-foreground text-sm font-semibold rounded">
                      SAVE ${(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.stock > 0 ? (
                  <>
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-green-500 font-medium">
                      In Stock ({product.stock} available)
                    </span>
                  </>
                ) : (
                  <span className="text-destructive font-medium">Out of Stock</span>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  variant="gold"
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className={cn('gap-2', inWishlist && 'text-primary border-primary')}
                  onClick={handleToggleWishlist}
                >
                  <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
                  {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">
                      On orders over $500. Delivered in 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-border pt-6">
              <h3 className="font-serif text-xl font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
