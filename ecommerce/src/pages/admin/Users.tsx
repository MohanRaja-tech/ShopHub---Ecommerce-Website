import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/contexts/UserContext";
import { useOrders } from "@/contexts/OrderContext";
import { Search, Mail, Phone, MapPin, Calendar, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const AdminUsers = () => {
  const { users, loading: usersLoading } = useUsers();
  const { orders, loading: ordersLoading } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");

  // Show loading state
  if (usersLoading || ordersLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUserOrderStats = (userId: string) => {
    const userOrders = orders.filter(order => order.userId === userId);
    const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
    return {
      totalOrders: userOrders.length,
      totalSpent,
      lastOrderDate: userOrders.length > 0 
        ? Math.max(...userOrders.map(order => new Date(order.orderDate).getTime()))
        : null
    };
  };

  const regularUsers = filteredUsers.filter(user => user.role === "user");
  const adminUsers = filteredUsers.filter(user => user.role === "admin");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">
              Manage users and view customer analytics ({regularUsers.length} customers, {adminUsers.length} admins)
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Customers</p>
                <p className="text-3xl font-bold text-gray-900">{regularUsers.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Customers</p>
                <p className="text-3xl font-bold text-gray-900">
                  {regularUsers.filter(user => {
                    const stats = getUserOrderStats(user.id);
                    return stats.totalOrders > 0;
                  }).length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user, index) => {
              const stats = getUserOrderStats(user.id);
              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                            {user.role}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {user.phone}
                            </div>
                          )}
                          {user.address && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              {user.address.city}, {user.address.state}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            Joined {new Date(user.joinedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {user.role === "user" && (
                      <div className="text-right">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-900">
                            {stats.totalOrders} Orders
                          </p>
                          <p className="text-sm text-gray-600">
                            ₹{stats.totalSpent.toLocaleString('en-IN')} Total
                          </p>
                          {stats.lastOrderDate && (
                            <p className="text-xs text-gray-500">
                              Last order: {new Date(stats.lastOrderDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found matching your search</p>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default AdminUsers;
