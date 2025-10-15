import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Order } from "@/data/orders";
import { ordersAPI } from "@/services/api";

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  addOrder: (order: Omit<Order, "id" | "orderDate">) => Promise<void>;
  updateOrderStatus: (id: string, status: Order["status"]) => Promise<void>;
  getOrderById: (id: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const addOrder = async (orderData: Omit<Order, "id" | "orderDate">) => {
    try {
      const response = await ordersAPI.create({
        ...orderData,
        orderDate: new Date().toISOString(),
      });
      setOrders(prev => [response.data, ...prev]);
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  };

  const updateOrderStatus = async (id: string, status: Order["status"]) => {
    try {
      const response = await ordersAPI.updateStatus(id, status);
      setOrders(prev => 
        prev.map(order => 
          order.id === id ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const getUserOrders = (userId: string) => {
    return orders.filter(order => order.userId === userId);
  };

  const refreshOrders = async () => {
    await fetchOrders();
  };

  const value: OrderContextType = {
    orders,
    loading,
    addOrder,
    updateOrderStatus,
    getOrderById,
    getUserOrders,
    refreshOrders,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};