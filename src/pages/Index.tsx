import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppetizerCard from "@/components/AppetizerCard";
import { getAppetizers, Appetizer, OrderItem } from "@/lib/data";
import { ShoppingBag, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-appetizers.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [appetizers, setAppetizers] = useState<Appetizer[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppetizers = async () => {
      try {
        setLoading(true);
        const data = await getAppetizers();
        setAppetizers(data);
      } catch (error) {
        console.error('Failed to load appetizers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppetizers();
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const selectedItems: OrderItem[] = appetizers
    .filter((a) => quantities[a.id] > 0)
    .map((a) => ({
      appetizer: a,
      quantity: quantities[a.id],
    }));

  const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + (item.appetizer.price || 0) * item.quantity,
    0
  );

  const handleProceed = () => {
    if (selectedItems.length > 0) {
      sessionStorage.setItem("selectedItems", JSON.stringify(selectedItems));
      navigate("/ticket");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero section with image */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Elegant dining experience"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-background" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <div className="animate-fade-in">
            <Sparkles className="h-8 w-8 text-gold mx-auto mb-4" />
          </div>
          
          <h2 className="font-serif text-4xl md:text-6xl font-semibold text-cream mb-4 animate-slide-up">
            Exquisite Appetizers
          </h2>
          
          <div className="flex items-center gap-4 mb-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-lg">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>
          
          <p className="text-cream/90 text-lg md:text-xl max-w-2xl animate-slide-up" style={{ animationDelay: "100ms" }}>
            Select your desired appetizers from our curated collection. 
            Adjust quantities and generate your personalized coupon.
          </p>
        </div>
        
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto fill-background">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Section title */}
      <section className="py-8 px-4 text-center">
        <div className="container max-w-4xl mx-auto">
          <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-2">
            From Our Kitchen
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
            Select Your Starters
          </h3>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/50 to-gold/50" />
            <span className="text-gold">❧</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent via-gold/50 to-gold/50" />
          </div>
        </div>
      </section>

      {/* Appetizers grid */}
      <section className="py-8 px-4 pb-32">
        <div className="container max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <Sparkles className="h-8 w-8 text-gold mx-auto mb-4 animate-spin" />
              <p className="text-muted-foreground">Loading appetizers...</p>
            </div>
          ) : appetizers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No appetizers available. Please check your connection or seed the database.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {appetizers.map((appetizer, index) => (
              <div 
                key={appetizer.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AppetizerCard
                  appetizer={appetizer}
                  quantity={quantities[appetizer.id] || 0}
                  onQuantityChange={(q) => handleQuantityChange(appetizer.id, q)}
                />
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Fixed bottom bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border py-4 px-4 animate-slide-up z-50 shadow-elegant">
          <div className="container max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-wine/10 rounded-full">
                <ShoppingBag className="h-5 w-5 text-wine" />
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Your Selection</span>
                <p className="font-serif text-lg font-semibold text-foreground">
                  {totalItems} {totalItems === 1 ? "item" : "items"} • <span className="text-wine">₹{totalPrice.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <Button
              onClick={handleProceed}
              className="bg-wine hover:bg-wine-light text-primary-foreground px-8 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-elegant btn-elegant gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Proceed • ₹{totalPrice.toFixed(2)}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
