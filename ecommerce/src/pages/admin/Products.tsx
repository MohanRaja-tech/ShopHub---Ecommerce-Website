import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useProducts } from "@/contexts/ProductContext";
import { ProductFormDialog } from "@/components/admin/ProductFormDialog";
import { Product } from "@/data/products";
import { Edit, Trash2, Search, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const AdminProducts = () => {
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      toast.success("Product deleted successfully!");
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Products</h1>
            <p className="text-gray-600">View and manage all products ({filteredProducts.length} total)</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button size="sm" variant="secondary" className="p-2" onClick={() => handleEditProduct(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" className="p-2" onClick={() => handleDeleteClick(product)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </div>
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your search</p>
          </div>
        )}
      </div>

      {/* Product Form Dialog */}
      <ProductFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={editingProduct}
        mode={editingProduct ? "edit" : "add"}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProducts;