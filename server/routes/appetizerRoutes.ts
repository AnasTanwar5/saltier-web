import express, { Request, Response } from 'express';
import Appetizer from '../models/Appetizer.js';

const router = express.Router();

// Get all appetizers
router.get('/', async (req: Request, res: Response) => {
  try {
    const appetizers = await Appetizer.find().sort({ createdAt: -1 });
    res.json(appetizers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appetizers' });
  }
});

// Get single appetizer
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const appetizer = await Appetizer.findById(req.params.id);
    if (!appetizer) {
      return res.status(404).json({ error: 'Appetizer not found' });
    }
    res.json(appetizer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appetizer' });
  }
});

// Create appetizer
router.post('/', async (req: Request, res: Response) => {
  try {
    const appetizer = new Appetizer(req.body);
    const savedAppetizer = await appetizer.save();
    res.status(201).json(savedAppetizer);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to create appetizer' });
  }
});

// Update appetizer
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const appetizer = await Appetizer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!appetizer) {
      return res.status(404).json({ error: 'Appetizer not found' });
    }
    res.json(appetizer);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update appetizer' });
  }
});

// Delete all appetizers (must be before /:id route)
router.delete('/all', async (req: Request, res: Response) => {
  try {
    const result = await Appetizer.deleteMany({});
    res.json({ message: 'All appetizers deleted successfully', count: result.deletedCount });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete appetizers' });
  }
});

// Delete appetizer
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const appetizer = await Appetizer.findByIdAndDelete(req.params.id);
    if (!appetizer) {
      return res.status(404).json({ error: 'Appetizer not found' });
    }
    res.json({ message: 'Appetizer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete appetizer' });
  }
});

// Seed default appetizers
router.post('/seed', async (req: Request, res: Response) => {
  try {
    const defaultAppetizers = [
      {
        name: "French Onion Soup",
        description: "Classic caramelized onion soup with rich beef broth, topped with crusty bread and melted Gruyère cheese",
        price: 12.50,
        image: "/src/assets/appetizer-2.jpg",
      },
      {
        name: "Burgundy Escargots",
        description: "Tender snails baked in aromatic garlic-parsley butter, served with artisan bread for dipping",
        price: 18.00,
        image: "/src/assets/appetizer-3.jpg",
      },
      {
        name: "Country Pâté",
        description: "Rustic terrine with cornichons, Dijon mustard, and freshly toasted brioche slices",
        price: 14.50,
        image: "/src/assets/appetizer-6.jpg",
      },
      {
        name: "Salmon Tartare",
        description: "Fresh Atlantic salmon with capers, shallots, fresh herbs, and crispy golden crostini",
        price: 16.00,
        image: "/src/assets/appetizer-4.jpg",
      },
      {
        name: "Cheese Soufflé",
        description: "Light and airy soufflé made with aged Comté cheese and fresh aromatic herbs",
        price: 15.00,
        image: "/src/assets/appetizer-5.jpg",
      },
      {
        name: "Duck Foie Gras",
        description: "Silky smooth duck liver pâté with sweet fig compote and warm toasted brioche",
        price: 24.00,
        image: "/src/assets/appetizer-1.jpg",
      },
    ];

    // Clear existing appetizers
    await Appetizer.deleteMany({});
    
    // Insert default appetizers
    const created = await Appetizer.insertMany(defaultAppetizers);
    res.status(201).json({ message: 'Default appetizers seeded', count: created.length });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to seed appetizers' });
  }
});

export default router;

