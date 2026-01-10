import express, { Request, Response } from 'express';
import Coupon from '../models/Coupon.js';

const router = express.Router();

// Generate unique coupon code
const generateCouponCode = (): string => {
  const prefix = "SAL";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// Get all coupons
router.get('/', async (req: Request, res: Response) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coupons' });
  }
});

// Get single coupon by code
router.get('/code/:code', async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase() });
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coupon' });
  }
});

// Get single coupon by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coupon' });
  }
});

// Create coupon
router.post('/', async (req: Request, res: Response) => {
  try {
    let code = generateCouponCode();
    
    // Ensure code is unique
    let existing = await Coupon.findOne({ code });
    while (existing) {
      code = generateCouponCode();
      existing = await Coupon.findOne({ code });
    }

    const coupon = new Coupon({
      ...req.body,
      code,
    });
    
    const savedCoupon = await coupon.save();
    res.status(201).json(savedCoupon);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to create coupon' });
  }
});

// Delete coupon
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete coupon' });
  }
});

export default router;



