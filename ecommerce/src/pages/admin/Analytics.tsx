import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart } from "@/components/ui/LineChart";
import { useOrders } from "@/contexts/OrderContext";
import { useProducts } from "@/contexts/ProductContext";
import { useUsers } from "@/contexts/UserContext";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  Calendar,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

const AdminAnalytics = () => {
  const { products, loading: productsLoading } = useProducts();
  const { orders, loading: ordersLoading } = useOrders();
  const { users, loading: usersLoading } = useUsers();

  // Show loading state while data is being fetched
  if (productsLoading || ordersLoading || usersLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Calculate analytics data
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalUsers = users.filter((u) => u.role === "user").length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Order status breakdown
  const ordersByStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Monthly revenue calculation based on actual orders
  const monthlyData = (() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
      const monthKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;

      const monthOrders = orders.filter((order) =>
        order.orderDate.startsWith(monthKey)
      );

      const monthRevenue = monthOrders.reduce(
        (sum, order) => sum + order.total,
        0
      );

      last6Months.push({
        month: `${months[monthIndex]} ${year}`,
        revenue: monthRevenue,
        orders: monthOrders.length,
      });
    }

    return last6Months;
  })();

  // Chart data for revenue trend
  const chartData = {
    labels: monthlyData.map((d) => d.month.split(" ")[0]),
    datasets: [
      {
        label: "Revenue",
        data: monthlyData.map((d) => d.revenue),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
    ],
  };

  // Top selling categories
  const categorySales = products.reduce((acc, product) => {
    const productOrders = orders.filter((order) =>
      order.items.some((item) => item.productId === product.id)
    );
    const categoryRevenue = productOrders.reduce((sum, order) => {
      const productItems = order.items.filter(
        (item) => item.productId === product.id
      );
      return (
        sum +
        productItems.reduce(
          (itemSum, item) => itemSum + item.price * item.quantity,
          0
        )
      );
    }, 0);

    acc[product.category] = (acc[product.category] || 0) + categoryRevenue;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categorySales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Product performance
  const productPerformance = products
    .map((product) => {
      const productOrders = orders.filter((order) =>
        order.items.some((item) => item.productId === product.id)
      );
      const totalSold = productOrders.reduce((sum, order) => {
        const productItems = order.items.filter(
          (item) => item.productId === product.id
        );
        return (
          sum +
          productItems.reduce((itemSum, item) => itemSum + item.quantity, 0)
        );
      }, 0);

      return {
        ...product,
        totalSold,
        revenue: totalSold * product.price,
      };
    })
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5);

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Avg Order Value",
      value: `₹${averageOrderValue.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      })}`,
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Total Users",
      value: totalUsers.toString(),
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600">
              Comprehensive business insights and performance metrics
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            <Calendar className="mr-1 h-3 w-3" />
            October 2024
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`h-12 w-12 rounded-lg ${stat.bg} flex items-center justify-center`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 text-xs">Live Data</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">
            Revenue Trend (Last 6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={chartData} height={300} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Data */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Monthly Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.slice(-3).map((data, index) => (
                <div
                  key={data.month}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-900">{data.month}</p>
                    <p className="text-sm text-gray-600">
                      {data.orders} orders
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{data.revenue.toLocaleString("en-IN")}
                    </p>
                    <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.max(
                            10,
                            (data.revenue /
                              Math.max(...monthlyData.map((d) => d.revenue))) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Status Breakdown */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">
              Order Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(ordersByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${
                        status === "delivered"
                          ? "bg-green-500"
                          : status === "shipped"
                          ? "bg-blue-500"
                          : status === "processing"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}
                    ></div>
                    <span className="font-medium text-gray-900 capitalize">
                      {status}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">
                      {count as number}
                    </span>
                    <span className="text-sm text-gray-600 ml-1">
                      (
                      {totalOrders > 0
                        ? (((count as number) / totalOrders) * 100).toFixed(1)
                        : "0"}
                      %)
                    </span>
                  </div>
                </div>
              ))}
              {Object.keys(ordersByStatus).length === 0 && (
                <p className="text-gray-500 text-center py-4">No orders yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">
              Top Performing Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map(([category, revenue], index) => (
                <div
                  key={category}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-400 w-6">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900">
                      {category}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ₹{revenue.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">
              Best Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productPerformance.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-400 w-6">
                      {index + 1}
                    </span>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900 truncate max-w-40">
                        {product.name}
                      </p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        {product.rating}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {product.totalSold} sold
                    </p>
                    <p className="text-sm text-gray-600">
                      ₹{product.revenue.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
