import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { products } from "@/data/products";
import { orders } from "@/data/orders";
import { users } from "@/data/users";
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!user || !isAdmin) {
    navigate("/");
    return null;
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalUsers = users.filter(u => u.role === "user").length;

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-success",
      bg: "bg-success/10",
      link: null,
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      color: "text-primary",
      bg: "bg-primary/10",
      link: "/admin/orders",
    },
    {
      title: "Products",
      value: totalProducts,
      icon: Package,
      color: "text-accent",
      bg: "bg-accent/10",
      link: "/admin/products",
    },
    {
      title: "Customers",
      value: totalUsers,
      icon: Users,
      color: "text-info",
      bg: "bg-info/10",
      link: "/admin/users",
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.name}</p>
            </div>
            <Button className="bg-accent hover:bg-accent-hover">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => stat.link && navigate(stat.link)}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`h-12 w-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate("/admin/orders")}>
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.shippingAddress.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.total.toFixed(2)}</p>
                        <p className={`text-sm ${
                          order.status === "delivered" ? "text-success" :
                          order.status === "shipped" ? "text-info" :
                          order.status === "processing" ? "text-warning" :
                          "text-muted-foreground"
                        }`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/admin/products")}>
                  <Package className="mr-2 h-4 w-4" />
                  Manage Products
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/admin/orders")}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Manage Orders
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/admin/users")}>
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
