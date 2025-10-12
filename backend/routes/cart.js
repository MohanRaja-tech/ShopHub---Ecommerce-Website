const express = require('express');
const { body } = require('express-validator');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');
const { validationResult } = require('express-validator');

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user._id,
        items: [],
        totalItems: 0,
        totalPrice: 0
      });
    }

    res.status(200).json({
      status: 'success',
      cart: {
        items: cart.items,
        totalItems: cart.totalItems,
        totalPrice: cart.totalPrice,
        lastUpdated: cart.lastUpdated
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
router.post('/add', [
  body('product.id').notEmpty().withMessage('Product ID is required'),
  body('product.name').notEmpty().withMessage('Product name is required'),
  body('product.price').isNumeric().withMessage('Product price must be a number'),
  body('product.image').notEmpty().withMessage('Product image is required'),
  body('product.category').notEmpty().withMessage('Product category is required'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be a positive integer')
], handleValidationErrors, async (req, res) => {
  try {
    const { product, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: [],
        totalItems: 0,
        totalPrice: 0
      });
    }

    await cart.addItem(product, quantity);

    res.status(200).json({
      status: 'success',
      message: 'Item added to cart',
      cart: {
        items: cart.items,
        totalItems: cart.totalItems,
        totalPrice: cart.totalPrice,
        lastUpdated: cart.lastUpdated
      }
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @desc    Update item quantity in cart
// @route   PUT /api/cart/update
// @access  Private
router.put('/update', [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
], handleValidationErrors, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart not found'
      });
    }

    await cart.updateItemQuantity(productId, quantity);

    res.status(200).json({
      status: 'success',
      message: 'Cart updated',
      cart: {
        items: cart.items,
        totalItems: cart.totalItems,
        totalPrice: cart.totalPrice,
        lastUpdated: cart.lastUpdated
      }
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
router.delete('/remove/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart not found'
      });
    }

    await cart.removeItem(productId);

    res.status(200).json({
      status: 'success',
      message: 'Item removed from cart',
      cart: {
        items: cart.items,
        totalItems: cart.totalItems,
        totalPrice: cart.totalPrice,
        lastUpdated: cart.lastUpdated
      }
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
router.delete('/clear', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart not found'
      });
    }

    await cart.clearCart();

    res.status(200).json({
      status: 'success',
      message: 'Cart cleared',
      cart: {
        items: cart.items,
        totalItems: cart.totalItems,
        totalPrice: cart.totalPrice,
        lastUpdated: cart.lastUpdated
      }
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @desc    Sync cart with frontend cart (merge carts)
// @route   POST /api/cart/sync
// @access  Private
router.post('/sync', [
  body('items').isArray().withMessage('Items must be an array')
], handleValidationErrors, async (req, res) => {
  try {
    const { items } = req.body;

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: [],
        totalItems: 0,
        totalPrice: 0
      });
    }

    // Merge frontend cart with backend cart
    for (const item of items) {
      const existingItem = cart.items.find(cartItem => cartItem.productId === item.productId);
      
      if (existingItem) {
        // If item exists, update quantity to the higher value
        existingItem.quantity = Math.max(existingItem.quantity, item.quantity);
      } else {
        // Add new item to cart
        cart.items.push({
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          category: item.category
        });
      }
    }

    await cart.save();

    res.status(200).json({
      status: 'success',
      message: 'Cart synced successfully',
      cart: {
        items: cart.items,
        totalItems: cart.totalItems,
        totalPrice: cart.totalPrice,
        lastUpdated: cart.lastUpdated
      }
    });
  } catch (error) {
    console.error('Sync cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router;