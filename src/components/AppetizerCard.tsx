import { Appetizer } from "@/lib/data";
import QuantitySelector from "./QuantitySelector";

interface AppetizerCardProps {
  appetizer: Appetizer;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const AppetizerCard = ({ appetizer, quantity, onQuantityChange }: AppetizerCardProps) => {
  return (
    <div 
      className={`group card-elegant overflow-hidden transition-all duration-500 ${
        quantity > 0 ? "ring-2 ring-wine/40 shadow-elegant" : ""
      }`}
    >
      {/* Image */}
      {appetizer.image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={appetizer.image} 
            alt={appetizer.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
          
          {/* Selected badge */}
          {quantity > 0 && (
            <div className="absolute top-3 right-3 bg-wine text-primary-foreground px-3 py-1 rounded-full text-sm font-medium animate-scale-in">
              ×{quantity}
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        {/* Decorative accent */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
          <span className="text-gold text-sm">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-gold/60 to-transparent" />
        </div>
        
        {/* Appetizer name */}
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2 text-center">
          {appetizer.name}
        </h3>
        
        {/* Price */}
        <p className="text-wine font-serif text-lg font-semibold text-center mb-2">
          ₹{appetizer.price?.toFixed(2) || "0.00"}
        </p>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed text-center mb-6">
          {appetizer.description}
        </p>
        
        {/* Quantity selector */}
        <div className="flex justify-center pt-4 border-t border-border/50">
          <QuantitySelector
            quantity={quantity}
            onIncrement={() => onQuantityChange(quantity + 1)}
            onDecrement={() => onQuantityChange(Math.max(0, quantity - 1))}
          />
        </div>
      </div>
    </div>
  );
};

export default AppetizerCard;
