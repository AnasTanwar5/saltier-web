import { Instagram, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border py-8 px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <h4 className="font-serif text-lg text-foreground mb-1">
        Saltire España
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          Learning the art of hospitality, one dish at a time
        </p>
        
        {/* Instagram Link */}
        <a
          href="https://www.instagram.com/fyb_ihm?igsh=NDZ6bDdrNHZpdzB5"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-wine hover:text-wine-light transition-colors mb-4"
        >
          <Instagram className="h-5 w-5" />
          <span className="text-sm font-medium">@fyb_ihm</span>
        </a>
        
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            Crafted with <Heart className="h-3 w-3 text-wine fill-wine" /> elegance
          </span>
        </div>
        
        {/* <p className="text-xs text-muted-foreground mt-2 tracking-widest uppercase">
          A project by Espana
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;
