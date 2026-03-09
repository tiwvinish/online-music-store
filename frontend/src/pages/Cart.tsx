import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/CartItem';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { items, totalPrice, clearCart } = useCart();

  const shipping = totalPrice > 500 ? 0 : 49;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-serif text-2xl lg:text-3xl font-bold mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Looks like you have not added anything to your cart yet. Start shopping to fill it up!
          </p>
          <Link to="/products">
            <Button variant="gold" size="lg" className="gap-2">
              Start Shopping
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-destructive gap-2"
            onClick={clearCart}
          >
            <Trash2 className="h-4 w-4" />
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-2xl border border-border p-6">
              <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-500">Free</span>
                    ) : (
                      `$${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-serif text-xl font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-sm text-muted-foreground mb-6">
                  Add ${(500 - totalPrice).toFixed(2)} more for free shipping!
                </p>
              )}

              <Link to="/checkout" className="block">
                <Button variant="gold" size="lg" className="w-full gap-2">
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>

              <Link
                to="/products"
                className="block mt-4 text-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
