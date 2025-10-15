import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product, categories } from "@/data/products";
import { useProducts } from "@/contexts/ProductContext";
import { toast } from "sonner";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  mode: "add" | "edit";
}

export const ProductFormDialog = ({ open, onOpenChange, product, mode }: ProductFormDialogProps) => {
  const { addProduct, updateProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    image: "",
    rating: "4.0",
    reviews: "0",
    inStock: true,
    tags: "",
  });

  useEffect(() => {
    if (product && mode === "edit") {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || "",
        category: product.category,
        image: product.image,
        rating: product.rating.toString(),
        reviews: product.reviews.toString(),
        inStock: product.inStock,
        tags: product.tags?.join(", ") || "",
      });
    } else {
      // Reset form for add mode
      setFormData({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "",
        image: "",
        rating: "4.0",
        reviews: "0",
        inStock: true,
        tags: "",
      });
    }
  }, [product, mode, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.image) {
      toast.error("Please fill in all required fields");
      return;
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      image: formData.image,
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
      inStock: formData.inStock,
      tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag) : [],
    };

    try {
      if (mode === "add") {
        await addProduct(productData);
        toast.success("Product added successfully!");
      } else if (product) {
        await updateProduct(product.id, productData);
        toast.success("Product updated successfully!");
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(`Failed to ${mode} product. Please try again.`);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter product description"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price (₹)</Label>
              <Input
                id="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL *</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              placeholder="https://images.unsplash.com/..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                value={formData.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
                min="1"
                max="5"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reviews">Reviews Count</Label>
              <Input
                id="reviews"
                type="number"
                value={formData.reviews}
                onChange={(e) => handleInputChange("reviews", e.target.value)}
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inStock">In Stock</Label>
              <div className="flex items-center pt-2">
                <Switch
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) => handleInputChange("inStock", checked)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleInputChange("tags", e.target.value)}
              placeholder="trending, featured, premium"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {mode === "add" ? "Add Product" : "Update Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};