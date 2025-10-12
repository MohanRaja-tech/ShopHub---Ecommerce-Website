export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  estimatedDelivery?: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: string;
}

export const orders: Order[] = [
  {
    id: "ORD-001",
    userId: "user1",
    items: [
      {
        productId: "1",
        productName: "Wireless Bluetooth Headphones",
        quantity: 1,
        price: 79.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
      },
      {
        productId: "3",
        productName: "Laptop Backpack",
        quantity: 1,
        price: 49.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop"
      }
    ],
    total: 129.98,
    status: "delivered",
    orderDate: "2025-10-01",
    estimatedDelivery: "2025-10-05",
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "+1234567890"
    },
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-002",
    userId: "user1",
    items: [
      {
        productId: "2",
        productName: "Smart Watch Series 7",
        quantity: 1,
        price: 299.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
      }
    ],
    total: 299.99,
    status: "shipped",
    orderDate: "2025-10-08",
    estimatedDelivery: "2025-10-15",
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "+1234567890"
    },
    paymentMethod: "PayPal"
  },
  {
    id: "ORD-003",
    userId: "user2",
    items: [
      {
        productId: "5",
        productName: "Running Shoes Elite",
        quantity: 2,
        price: 119.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"
      },
      {
        productId: "9",
        productName: "Yoga Mat Premium",
        quantity: 1,
        price: 29.99,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop"
      }
    ],
    total: 269.97,
    status: "processing",
    orderDate: "2025-10-10",
    estimatedDelivery: "2025-10-18",
    shippingAddress: {
      name: "Jane Smith",
      address: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      phone: "+1987654321"
    },
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-004",
    userId: "user3",
    items: [
      {
        productId: "6",
        productName: "Digital Camera 4K",
        quantity: 1,
        price: 599.99,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop"
      }
    ],
    total: 599.99,
    status: "pending",
    orderDate: "2025-10-11",
    estimatedDelivery: "2025-10-20",
    shippingAddress: {
      name: "Mike Johnson",
      address: "789 Pine Road",
      city: "Chicago",
      state: "IL",
      zipCode: "60007",
      phone: "+1122334455"
    },
    paymentMethod: "Debit Card"
  },
  {
    id: "ORD-005",
    userId: "user1",
    items: [
      {
        productId: "12",
        productName: "Gaming Chair Pro",
        quantity: 1,
        price: 249.99,
        image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&h=500&fit=crop"
      }
    ],
    total: 249.99,
    status: "delivered",
    orderDate: "2025-09-25",
    estimatedDelivery: "2025-09-30",
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "+1234567890"
    },
    paymentMethod: "Credit Card"
  }
];

export const getOrdersByUserId = (userId: string) => orders.filter(order => order.userId === userId);
export const getOrderById = (orderId: string) => orders.find(order => order.id === orderId);
