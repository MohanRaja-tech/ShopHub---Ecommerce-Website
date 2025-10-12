// Script to replace problematic images with working ones
const imageReplacements = {
  // Books - using book-related images
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop": [
    "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&h=500&fit=crop&auto=format"
  ],
  
  // Sports & Fitness
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop": [
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1434596922112-19c563067271?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=500&h=500&fit=crop&auto=format"
  ],
  
  // Beauty & Personal Care
  "https://images.unsplash.com/photo-1556228578-dd6c8e2c1d13?w=500&h=500&fit=crop": [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1631730486886-8e56b0f2f89b?w=500&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1503236823255-94609f598e71?w=500&h=500&fit=crop&auto=format"
  ]
};