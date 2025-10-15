import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { Edit, Trash2, Search, Plus } from "lucide-react";
import { motion } from "framer-motion";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Products</h1>
            <p className="text-gray-600">View and manage all products</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Products Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold">Product</th>
                    <th className="text-left p-4 font-semibold">Category</th>
                    <th className="text-left p-4 font-semibold">Price</th>
                    <th className="text-left p-4 font-semibold">Stock</th>
                    <th className="text-left p-4 font-semibold">Rating</th>
                    <th className="text-left p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-semibold">${product.price}</p>
                          {product.originalPrice && (
                            <p className="text-xs text-muted-foreground line-through">
                              ${product.originalPrice}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {product.inStock ? (
                          <Badge className="bg-success">In Stock</Badge>
                        ) : (
                          <Badge variant="destructive">Out of Stock</Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{product.rating}</p>
                          <p className="text-xs text-muted-foreground">
                            {product.reviews} reviews
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
