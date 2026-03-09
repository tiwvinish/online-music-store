import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  const subtotal = product.price * quantity;

  return (
    <div className="flex gap-4 p-4 bg-card rounded-xl border border-border">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="shrink-0">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.brand}
            </p>
            <Link
              to={`/product/${product.id}`}
              className="font-serif text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
            >
              {product.name}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              ${product.price.toLocaleString()} each
            </p>
          </div>

          {/* Price (Desktop) */}
          <div className="hidden md:block text-right">
            <p className="font-serif text-xl font-bold text-foreground">
              ${subtotal.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              disabled={quantity >= product.stock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {/* Price (Mobile) */}
            <p className="md:hidden font-serif text-lg font-bold text-foreground">
              ${subtotal.toLocaleString()}
            </p>
            
            {/* Remove Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => removeFromCart(product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
