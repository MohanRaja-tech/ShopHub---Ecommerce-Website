import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { useProducts } from "@/contexts/ProductContext";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.tags?.includes("featured"));
  const trendingProducts = products.filter(p => p.tags?.includes("trending"));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50/50 via-white to-orange-50/30 py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Shop Smarter with{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  ShopHub
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Discover thousands of quality products at unbeatable prices. Fast shipping, secure payments, and hassle-free returns guaranteed.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 text-white border-0 shadow-lg h-14 px-8 text-lg font-semibold"
                  onClick={() => navigate("/products")}
                >
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-8 text-lg font-semibold border-2 hover:bg-gradient-primary hover:text-white hover:border-transparent transition-all duration-300"
                >
                  Browse Categories
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gradient-to-r from-blue-50/30 via-white to-orange-50/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="text-gradient">ShopHub</span>?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the best online shopping with our premium features and services
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
                  <Truck className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Lightning Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Get your orders delivered in 24-48 hours with our express shipping network
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
                  <Shield className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">100% Secure Payments</h3>
                <p className="text-muted-foreground">
                  Your transactions are protected with bank-level encryption and fraud detection
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
                  <Zap className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Unbeatable Deals</h3>
                <p className="text-muted-foreground">
                  Save big with our exclusive offers, flash sales, and member-only discounts
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured <span className="text-gradient">Products</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Discover our carefully curated selection of premium products
              </p>
              <Button 
                variant="outline" 
                onClick={() => navigate("/products")}
                className="border-2 hover:bg-gradient-primary hover:text-white hover:border-transparent transition-all duration-300"
              >
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {featuredProducts.slice(0, 4).map((product) => (
                <motion.div key={product.id} variants={item}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="py-20 bg-gradient-to-r from-orange-50/30 via-white to-blue-50/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trending <span className="text-gradient">Now</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                See what's hot and popular among our customers
              </p>
              <Button 
                variant="outline" 
                onClick={() => navigate("/products")}
                className="border-2 hover:bg-gradient-primary hover:text-white hover:border-transparent transition-all duration-300"
              >
                View All Trending
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {trendingProducts.slice(0, 4).map((product) => (
                <motion.div key={product.id} variants={item}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Start Shopping Today
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Join thousands of satisfied customers and experience the best online shopping platform
              </p>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent-hover text-accent-foreground"
                onClick={() => navigate("/products")}
              >
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
