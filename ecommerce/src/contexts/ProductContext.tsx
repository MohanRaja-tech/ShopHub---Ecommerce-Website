import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";
import { productsAPI } from "@/services/api";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData: Omit<Product, "id">) => {
    try {
      const response = await productsAPI.create(productData);
      setProducts(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const response = await productsAPI.update(id, productData);
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? response.data : product
        )
      );
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productsAPI.delete(id);
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const refreshProducts = async () => {
    await fetchProducts();
  };

  const value: ProductContextType = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    refreshProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};