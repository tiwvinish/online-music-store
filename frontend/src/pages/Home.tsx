import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products, categories } from '@/data/products';

const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $500',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: '24/7 customer service',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: 'Premium instruments only',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.15)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--accent)/0.1)_0%,_transparent_60%)]" />
        </div>

        <div className="container relative z-10 px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full animate-fade-in">
              Premium Guitars & Accessories
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
              Craft Your
              <span className="text-gradient"> Perfect Sound</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Discover our curated collection of world-class guitars and accessories. 
              From legendary brands to hidden gems, find the instrument that speaks to your soul.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/products">
                <Button variant="hero" size="lg" className="gap-2">
                  Shop Collection
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/products?category=electric">
                <Button variant="outline" size="lg">
                  Explore Electric Guitars
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features */}
      <section className="py-16 border-y border-border bg-card/50">
        <div className="container px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 lg:py-28">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Find exactly what you are looking for across our carefully organized collections
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-gradient-card hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4">
                  <span className="text-4xl mb-3">{category.icon}</span>
                  <h3 className="font-serif text-lg font-semibold text-center group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
                <div className="absolute inset-0 border border-border rounded-2xl group-hover:border-primary/50 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-28 bg-card/30">
        <div className="container px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Handpicked favorites from our collection
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              Ready to Find Your Sound?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of musicians who trust StringMaster for their gear. 
              Sign up for exclusive deals and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="gold" size="lg">
                  Create Account
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="lg">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
