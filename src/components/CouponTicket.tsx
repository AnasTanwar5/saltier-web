import { forwardRef } from "react";
import { Coupon } from "@/lib/data";
import { format } from "date-fns";

interface CouponTicketProps {
  coupon: Coupon;
}

const CouponTicket = forwardRef<HTMLDivElement, CouponTicketProps>(({ coupon }, ref) => {
  return (
    <div 
      ref={ref} 
      className="max-w-md mx-auto bg-cream p-8 rounded-lg shadow-lg"
      style={{ minWidth: "380px", minHeight: "500px" }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-serif text-3xl font-bold text-wine mb-1">Saltier</h2>
        <p className="text-xs tracking-widest text-charcoal/70 uppercase">By Espana</p>
      </div>
      
      {/* Decorative border */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gold/50" />
        <span className="text-gold text-lg">❧</span>
        <div className="h-px flex-1 bg-gold/50" />
      </div>
      
      {/* Coupon code */}
      <div className="text-center mb-6">
        <p className="text-xs text-charcoal/60 uppercase tracking-widest mb-2">Your Coupon Code</p>
        <p className="font-mono text-2xl font-bold text-charcoal tracking-widest bg-beige px-6 py-3 rounded-lg inline-block border-2 border-wine/20">
          {coupon.code}
        </p>
      </div>
      
      {/* Dashed divider */}
      <div className="border-t-2 border-dashed border-charcoal/20 my-6" />
      
      {/* User Information */}
      {(coupon.userName || coupon.rollNo) && (
        <div className="mb-6">
          <div className="bg-beige/30 rounded-lg p-4 border border-charcoal/10">
            <div className="space-y-2">
              {coupon.userName && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-charcoal/70 font-medium">
                    {coupon.userType === "student" ? "Student Name" : "Staff Name"}:
                  </span>
                  <span className="text-sm text-charcoal font-semibold">
                    {coupon.userName}
                  </span>
                </div>
              )}
              {coupon.rollNo && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-charcoal/70 font-medium">
                    Roll Number:
                  </span>
                  <span className="text-sm text-charcoal font-semibold">
                    {coupon.rollNo}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Dashed divider */}
      {(coupon.userName || coupon.rollNo) && (
        <div className="border-t-2 border-dashed border-charcoal/20 my-6" />
      )}
      
      {/* Order details */}
      <div className="mb-6">
        <h3 className="font-serif text-lg font-semibold text-center mb-4 text-charcoal">
          Selected Appetizers
        </h3>
        <div className="bg-beige/50 rounded-lg p-4 border border-charcoal/10">
          {coupon.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-charcoal/10 last:border-0">
              <span className="text-sm text-charcoal font-medium">{item.appetizer.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-charcoal/60">₹{(item.appetizer.price || 0).toFixed(2)}</span>
                <span className="font-serif font-bold text-wine bg-wine/10 px-3 py-1 rounded">×{item.quantity}</span>
              </div>
            </div>
          ))}
          
          {/* Total */}
          <div className="flex justify-between items-center pt-3 mt-3 border-t-2 border-charcoal/20">
            <span className="font-serif font-semibold text-charcoal">Total</span>
            <span className="font-serif text-xl font-bold text-wine">
              ₹{coupon.items.reduce((sum, item) => sum + (item.appetizer.price || 0) * item.quantity, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Dashed divider */}
      <div className="border-t-2 border-dashed border-charcoal/20 my-6" />
      
      {/* Footer */}
      <div className="text-center">
        <p className="text-xs text-charcoal/60 mb-1">
          Generated on {format(new Date(coupon.createdAt), "MMMM d, yyyy 'at' h:mm a")}
        </p>
        <p className="text-xs text-charcoal/60 italic">
          Present this ticket at the counter
        </p>
      </div>
      
      {/* Bottom decorative element */}
      <div className="flex items-center justify-center mt-6 pt-4 border-t border-charcoal/10">
        <div className="flex items-center gap-3">
          <span className="text-gold text-sm">✦</span>
          <span className="text-xs text-charcoal/60 tracking-widest uppercase font-medium">Thank You</span>
          <span className="text-gold text-sm">✦</span>
        </div>
      </div>
    </div>
  );
});

CouponTicket.displayName = "CouponTicket";

export default CouponTicket;
