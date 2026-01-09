import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantitySelector = ({ quantity, onIncrement, onDecrement }: QuantitySelectorProps) => {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full border-border hover:bg-wine hover:text-primary-foreground hover:border-wine transition-all duration-300"
        onClick={onDecrement}
        disabled={quantity === 0}
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <span className="w-8 text-center font-serif text-lg font-semibold text-foreground">
        {quantity}
      </span>
      
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full border-border hover:bg-wine hover:text-primary-foreground hover:border-wine transition-all duration-300"
        onClick={onIncrement}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
