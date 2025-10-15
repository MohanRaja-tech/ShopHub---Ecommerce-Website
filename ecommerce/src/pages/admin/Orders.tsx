import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOrders } from "@/contexts/OrderContext";
import { users } from "@/data/users";
import { Search, Eye, Package, TrendingUp, DollarSign, Clock } from "lucide-react";
import { motion } from "framer-motion";

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getUserName(order.userId).toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "default";
      case "shipped":
        return "secondary";
      case "processing":
        return "outline";
      case "pending":
        return "destructive";
      default:
        return "outline";
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === "pending").length;
  const processingOrders = orders.filter(order => order.status === "processing").length;
  const completedOrders = orders.filter(order => order.status === "delivered").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">
              Track and manage all customer orders ({orders.length} total orders)
            </p>
          </div>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString('en-IN')}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Processing</p>
                <p className="text-2xl font-bold text-gray-900">{processingOrders}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center">
                <Package className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedOrders}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
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
      <div className="bg-white rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-900">Order ID</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Customer</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Items</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Total</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-medium text-gray-900">#{order.id.slice(-6)}</p>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">{getUserName(order.userId)}</p>
                        <p className="text-sm text-gray-600">
                          {order.shippingAddress.city}, {order.shippingAddress.state}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-gray-600">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-900">{order.items.length} items</p>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-gray-900">₹{order.total.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-gray-500">{order.paymentMethod}</p>
                    </td>
                    <td className="p-4">
                      <Select 
                        value={order.status} 
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <Badge variant={getStatusColor(order.status)} className="border-0">
                            {order.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
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

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found matching your search</p>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default AdminOrders;
