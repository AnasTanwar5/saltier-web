import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import CouponTicket from "@/components/CouponTicket";
import { OrderItem, Coupon, generateCouponCode, saveCoupon } from "@/lib/data";
import { Download, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import html2canvas from "html2canvas";

const Ticket = () => {
  const navigate = useNavigate();
  const ticketRef = useRef<HTMLDivElement>(null);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const createCoupon = async () => {
      const storedItems = sessionStorage.getItem("selectedItems");
      if (!storedItems) {
        navigate("/");
        return;
      }

      const items: OrderItem[] = JSON.parse(storedItems);
      const storedUserInfo = sessionStorage.getItem("userInfo");
      const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

      try {
        const savedCoupon = await saveCoupon({
          items,
          userType: userInfo?.userType || undefined,
          userName: userInfo?.name || undefined,
          rollNo: userInfo?.rollNo || undefined,
        });
        setCoupon(savedCoupon);
        sessionStorage.removeItem("selectedItems");
        sessionStorage.removeItem("userInfo");
        
        // Show success animation
        setTimeout(() => setShowSuccess(true), 300);
      } catch (error) {
        console.error('Failed to save coupon:', error);
        // Still show the coupon locally even if save fails
        const localCoupon: Coupon = {
          id: crypto.randomUUID(),
          code: generateCouponCode(),
          items,
          userType: userInfo?.userType,
          userName: userInfo?.name,
          rollNo: userInfo?.rollNo,
          createdAt: new Date(),
        };
        setCoupon(localCoupon);
        setTimeout(() => setShowSuccess(true), 300);
      }
    };

    createCoupon();
  }, [navigate]);

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: "#F5F0E8",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: ticketRef.current.offsetWidth,
        height: ticketRef.current.offsetHeight,
      });
      
      const link = document.createElement("a");
      link.download = `saltier-ticket-${coupon?.code}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating ticket image:", error);
    }
    setIsDownloading(false);
  };

  if (!coupon) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 animate-spin" />
          Generating your coupon...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Success banner */}
      {showSuccess && (
        <div className="bg-green-50 border-b border-green-200 py-4 animate-fade-in">
          <div className="container max-w-2xl mx-auto flex items-center justify-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-800 font-medium">
              Your coupon has been successfully generated!
            </p>
          </div>
        </div>
      )}
      
      <section className="py-12 px-4">
        <div className="container max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-2">
              Your Ticket
            </h2>
            <p className="text-muted-foreground">
              Download or screenshot this ticket to redeem your appetizers
            </p>
          </div>
          
          {/* Ticket */}
          <div className="animate-scale-in mb-8">
            <CouponTicket ref={ticketRef} coupon={coupon} />
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="gap-2 rounded-full px-6 border-border hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Menu
            </Button>
            
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="gap-2 rounded-full px-6 bg-wine hover:bg-wine-light text-primary-foreground btn-elegant"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Generating..." : "Download Ticket"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ticket;
