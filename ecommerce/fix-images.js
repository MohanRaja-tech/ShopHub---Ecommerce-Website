import { products } from './products.ts';

// Reliable image URLs for different categories
const categoryImages = {
  "Electronics": [
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop&auto=format"
  ],
  "Fashion": [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop&auto=format"
  ],
  "Home & Kitchen": [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1542990253-0b5d4fe8c985?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop&auto=format"
  ],
  "Books": [
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop&auto=format"
  ],
  "Sports & Fitness": [
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1434596922112-19c563067271?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&auto=format"
  ],
  "Beauty & Personal Care": [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1631730486886-8e56b0f2f89b?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1503236823255-94609f598e71?w=500&h=500&fit=crop&auto=format"
  ]
};