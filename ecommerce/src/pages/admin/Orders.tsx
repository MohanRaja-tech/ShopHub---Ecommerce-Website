import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { orders } from "@/data/orders";
import { Search, Eye } from "lucide-react";
import { motion } from "framer-motion";

const AdminOrders = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  if (!user || !isAdmin) {
    navigate("/");
    return null;
  }

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.shippingAddress.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-success";
      case "shipped":
        return "bg-info";
      case "processing":
        return "bg-warning";
      case "pending":
        return "bg-muted";
      default:
        return "bg-destructive";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Manage Orders</h1>
            <p className="text-muted-foreground">View and manage all customer orders</p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Orders Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold">Order ID</th>
                    <th className="text-left p-4 font-semibold">Customer</th>
                    <th className="text-left p-4 font-semibold">Date</th>
                    <th className="text-left p-4 font-semibold">Items</th>
                    <th className="text-left p-4 font-semibold">Total</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-4">
                        <p className="font-medium">{order.id}</p>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{order.shippingAddress.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="font-medium">{order.items.length} items</p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold">${order.total.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{order.paymentMethod}</p>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No orders found</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminOrders;
