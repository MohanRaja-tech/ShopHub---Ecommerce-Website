import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usersAPI } from "@/services/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  joinedDate: string;
}

interface UserContextType {
  users: User[];
  loading: boolean;
  addUser: (user: Omit<User, "id">) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  getUserById: (id: string) => User | undefined;
  refreshUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData: Omit<User, "id">) => {
    try {
      const response = await usersAPI.create(userData);
      setUsers(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };

  const updateUser = async (id: string, userData: Partial<User>) => {
    try {
      const response = await usersAPI.update(id, userData);
      setUsers(prev => 
        prev.map(user => 
          user.id === id ? response.data : user
        )
      );
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await usersAPI.delete(id);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  const refreshUsers = async () => {
    await fetchUsers();
  };

  const value: UserContextType = {
    users,
    loading,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    refreshUsers,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

export type { User };