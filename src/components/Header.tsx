import { Link } from "react-router-dom";
import { Wine } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-4 px-4 bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-40">
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-full bg-wine/10 group-hover:bg-wine/20 transition-colors duration-300">
            <Wine className="h-6 w-6 text-wine" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-serif text-2xl md:text-3xl font-semibold text-wine tracking-wide transition-colors duration-300 group-hover:text-wine-light leading-none">
              Saltier
            </h1>
            <span className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase font-medium">
              By Espana
            </span>
          </div>
        </Link>
        
        <nav className="flex items-center gap-1">
          <Link 
            to="/" 
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full transition-all duration-300"
          >
            Menu
          </Link>
          <Link 
            to="/admin" 
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full transition-all duration-300"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
