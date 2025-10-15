export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  role: "user" | "admin";
  joinedDate: string;
}

export const users: User[] = [
  {
    id: "user1",
    email: "john@example.com",
    password: "password123",
    name: "John Doe",
    phone: "+1234567890",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    role: "user",
    joinedDate: "2024-01-15"
  },
  {
    id: "user2",
    email: "jane@example.com",
    password: "password123",
    name: "Jane Smith",
    phone: "+1987654321",
    address: {
      street: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001"
    },
    role: "user",
    joinedDate: "2024-03-20"
  },
  {
    id: "user3",
    email: "mike@example.com",
    password: "password123",
    name: "Mike Johnson",
    phone: "+1122334455",
    address: {
      street: "789 Pine Road",
      city: "Chicago",
      state: "IL",
      zipCode: "60007"
    },
    role: "user",
    joinedDate: "2024-05-10"
  },
  {
    id: "admin1",
    email: "admin@gmail.com",
    password: "admin@123",
    name: "Admin User",
    phone: "+1555666777",
    role: "admin",
    joinedDate: "2023-01-01"
  }
];

export const getUserByEmail = (email: string) => users.find(user => user.email === email);
export const getUserById = (id: string) => users.find(user => user.id === id);

export const addUser = (userData: Omit<User, 'id' | 'role' | 'joinedDate'>): User => {
  // Check if user already exists
  if (getUserByEmail(userData.email)) {
    throw new Error('User with this email already exists');
  }

  const newUser: User = {
    ...userData,
    id: `user${Date.now()}`, // Simple ID generation
    role: 'user',
    joinedDate: new Date().toISOString().split('T')[0]
  };

  users.push(newUser);
  return newUser;
};
