import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { Lock, User, Wine, Eye, EyeOff } from "lucide-react";

const ADMIN_USERNAME = "Saltier";
const ADMIN_PASSWORD = "Espana";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16 px-4">
        <div className="container max-w-md mx-auto">
          <div className="card-elegant p-8 shadow-elegant">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-wine/20 to-wine/10 mb-4">
                <Lock className="h-8 w-8 text-wine" />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-foreground mb-2">
                Admin Portal
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access the dashboard
              </p>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <Wine className="h-4 w-4 text-gold" />
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent" />
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-background border-border focus:ring-wine focus:border-wine rounded-lg"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-background border-border focus:ring-wine focus:border-wine rounded-lg"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-destructive text-center animate-fade-in">
                    {error}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-wine hover:bg-wine-light text-primary-foreground rounded-full py-3 font-medium btn-elegant text-base"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Decorative footer */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
                <span className="text-gold">✦</span> 
                Secure Admin Access 
                <span className="text-gold">✦</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
