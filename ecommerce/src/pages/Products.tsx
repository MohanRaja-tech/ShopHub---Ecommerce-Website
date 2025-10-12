import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Filter, Search } from "lucide-react";
import { motion } from "framer-motion";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<number[]>([0, 200000]);
  const [minPrice, setMinPrice] = useState<string>("0");
  const [maxPrice, setMaxPrice] = useState<string>("200000");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Handle URL search params
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Handle price input changes
  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    const numValue = parseInt(value) || 0;
    setPriceRange([numValue, priceRange[1]]);
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    const numValue = parseInt(value) || 200000;
    setPriceRange([priceRange[0], numValue]);
  };

  let filteredProducts = products.filter((product) => {
    // Category filter
    if (selectedCategory !== "All" && product.category !== selectedCategory) return false;
    
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">All Products</h1>
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="space-y-6">
              <div className="bg-card border rounded-lg p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <Filter className="h-5 w-5 text-muted-foreground" />
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <h4 className="font-medium">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={selectedCategory === "All" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory("All")}
                    >
                      All
                    </Badge>
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <h4 className="font-medium">Price Range</h4>
                  
                  {/* Price Input Boxes */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label htmlFor="minPrice" className="text-xs text-muted-foreground">Min</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                          <Input
                            id="minPrice"
                            type="number"
                            placeholder="0"
                            value={minPrice}
                            onChange={(e) => handleMinPriceChange(e.target.value)}
                            className="pl-7 h-9 text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="maxPrice" className="text-xs text-muted-foreground">Max</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                          <Input
                            id="maxPrice"
                            type="number"
                            placeholder="200000"
                            value={maxPrice}
                            onChange={(e) => handleMaxPriceChange(e.target.value)}
                            className="pl-7 h-9 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => {
                        const min = parseInt(minPrice) || 0;
                        const max = parseInt(maxPrice) || 200000;
                        setPriceRange([min, max]);
                      }}
                    >
                      Apply Price Filter
                    </Button>
                  </div>

                  {/* Price Slider */}
                  <div className="space-y-3">
                    <Slider
                      min={0}
                      max={200000}
                      step={1000}
                      value={priceRange}
                      onValueChange={(value) => {
                        setPriceRange(value);
                        setMinPrice(value[0].toString());
                        setMaxPrice(value[1].toString());
                      }}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                      <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Quick Price Filters */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Quick Filters</Label>
                    <div className="flex flex-wrap gap-1">
                      {[
                        { label: "Under ₹1K", min: 0, max: 1000 },
                        { label: "₹1K - ₹5K", min: 1000, max: 5000 },
                        { label: "₹5K - ₹15K", min: 5000, max: 15000 },
                        { label: "₹15K - ₹50K", min: 15000, max: 50000 },
                        { label: "Above ₹50K", min: 50000, max: 200000 }
                      ].map((filter) => (
                        <Button
                          key={filter.label}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2"
                          onClick={() => {
                            setPriceRange([filter.min, filter.max]);
                            setMinPrice(filter.min.toString());
                            setMaxPrice(filter.max.toString());
                          }}
                        >
                          {filter.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sort By */}
                <div className="space-y-3">
                  <h4 className="font-medium">Sort By</h4>
                  <div className="flex flex-col gap-2">
                    {[
                      { value: "featured", label: "Featured" },
                      { value: "price-low", label: "Price: Low to High" },
                      { value: "price-high", label: "Price: High to Low" },
                      { value: "rating", label: "Highest Rated" },
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={sortBy === option.value ? "default" : "ghost"}
                        className="justify-start"
                        onClick={() => setSortBy(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange([0, 1000]);
                    setSortBy("featured");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No products found matching your filters.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategory("All");
                      setPriceRange([0, 1000]);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
