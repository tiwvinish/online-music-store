import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Check, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type PaymentMethod = 'esewa' | 'card';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('esewa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nepal',
  });

  const shipping = totalPrice > 500 ? 0 : 49;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: 'Order Placed Successfully!',
      description: 'Thank you for your purchase. You will receive a confirmation email shortly.',
    });

    clearCart();
    setIsProcessing(false);
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-serif text-2xl lg:text-3xl font-bold mb-2">
            No Items to Checkout
          </h1>
          <p className="text-muted-foreground mb-8">
            Add some items to your cart before checking out.
          </p>
          <Link to="/products">
            <Button variant="gold" size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-background">
      <div className="container px-4 py-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Shipping & Payment */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-xl font-semibold">Shipping Information</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-xl font-semibold">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  {/* eSewa */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('esewa')}
                    className={cn(
                      'w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4',
                      paymentMethod === 'esewa'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">eSewa</p>
                      <p className="text-sm text-muted-foreground">
                        Pay securely with eSewa digital wallet
                      </p>
                    </div>
                    {paymentMethod === 'esewa' && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={cn(
                      'w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4',
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">Credit / Debit Card</p>
                      <p className="text-sm text-muted-foreground">
                        Visa, Mastercard, and other major cards
                      </p>
                    </div>
                    {paymentMethod === 'card' && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-6 p-4 rounded-xl bg-secondary/50 text-sm text-muted-foreground">
                    Card payment integration coming soon. For demo purposes, please select eSewa.
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl border border-border p-6">
                <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-500">Free</span>
                      ) : (
                        `$${shipping}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-serif text-xl font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
