import { appetizerAPI, couponAPI, type Appetizer, type OrderItem, type Coupon } from './api';

// Re-export types for backward compatibility
export type { Appetizer, OrderItem, Coupon };

// Helper to normalize appetizer IDs (backend uses _id, frontend expects id)
const normalizeAppetizer = (appetizer: Appetizer): Appetizer => ({
  ...appetizer,
  id: appetizer._id || appetizer.id || '',
});

const normalizeCoupon = (coupon: Coupon): Coupon => ({
  ...coupon,
  id: coupon._id || coupon.id || '',
  createdAt: coupon.createdAt ? new Date(coupon.createdAt) : new Date(),
});

// Appetizer functions using API
export const getAppetizers = async (): Promise<Appetizer[]> => {
  try {
    const appetizers = await appetizerAPI.getAll();
    return appetizers.map(normalizeAppetizer);
  } catch (error) {
    console.error('Failed to fetch appetizers:', error);
    // Fallback to empty array or handle error as needed
    return [];
  }
};

export const saveAppetizers = async (appetizers: Appetizer[]): Promise<void> => {
  try {
    // Update each appetizer
    await Promise.all(
      appetizers.map((appetizer) => {
        const id = appetizer._id || appetizer.id;
        if (id) {
          return appetizerAPI.update(id, appetizer);
        } else {
          return appetizerAPI.create(appetizer);
        }
      })
    );
  } catch (error) {
    console.error('Failed to save appetizers:', error);
    throw error;
  }
};

export const resetAppetizers = async (): Promise<void> => {
  try {
    await appetizerAPI.seed();
  } catch (error) {
    console.error('Failed to reset appetizers:', error);
    throw error;
  }
};

// Coupon functions using API
export const getCoupons = async (): Promise<Coupon[]> => {
  try {
    const coupons = await couponAPI.getAll();
    return coupons.map(normalizeCoupon);
  } catch (error) {
    console.error('Failed to fetch coupons:', error);
    return [];
  }
};

export const saveCoupon = async (coupon: Omit<Coupon, 'id' | 'code' | 'createdAt'>): Promise<Coupon> => {
  try {
    const savedCoupon = await couponAPI.create(coupon);
    return normalizeCoupon(savedCoupon);
  } catch (error) {
    console.error('Failed to save coupon:', error);
    throw error;
  }
};

export const deleteCoupon = async (couponId: string): Promise<void> => {
  try {
    await couponAPI.delete(couponId);
  } catch (error) {
    console.error('Failed to delete coupon:', error);
    throw error;
  }
};

// Generate unique coupon code (now handled by backend, but kept for compatibility)
export const generateCouponCode = (): string => {
  const prefix = "SAL";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};
