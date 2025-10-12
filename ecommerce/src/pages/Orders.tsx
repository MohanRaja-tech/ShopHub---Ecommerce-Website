import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getOrdersByUserId } from "@/data/orders";
import { useNavigate } from "react-router-dom";
import { Package, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const orders = getOrdersByUserId(user.id);

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
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-4">
                Start shopping to see your orders here
              </p>
              <Button onClick={() => navigate("/products")}>
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Ordered: {new Date(order.orderDate).toLocaleDateString()}</span>
                          </div>
                          {order.estimatedDelivery && (
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4" />
                              <span>Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{order.shippingAddress.address}, {order.shippingAddress.city}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                        <p className="text-2xl font-bold">₹{Math.round(order.total).toLocaleString('en-IN')}</p>
                        <p className="text-sm text-muted-foreground mt-1">{order.paymentMethod}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-3">
                      <h4 className="font-medium">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.productId} className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{item.productName}</p>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
