import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/common/Hero';
import Breadcrumbs from '../components/common/Breadcrumbs';
import OptimizedImage from '../components/common/OptimizedImage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useLoading } from '../context/LoadingContext';
import { useCart } from '../context/CartContext';
import dataService from '../services/dataService';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  featured?: boolean;
  discountPercentage?: number;
}

// Placeholder data until backend is connected
const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    _id: '1',
    name: 'Racing Team Jersey 2023',
    description: 'Official racing team jersey with team logo and sponsor logos. Made with moisture-wicking fabric for maximum comfort.',
    price: 49.99,
    category: 'apparel',
    imageUrl: '/images/merchandise/jersey1.svg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Black'],
    inStock: true,
    featured: true
  },
  {
    _id: '2',
    name: 'Team Polo Shirt',
    description: 'Casual team polo shirt with embroidered logo, perfect for race day or casual wear.',
    price: 34.99,
    category: 'apparel',
    imageUrl: '/images/merchandise/polo.svg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'White', 'Black'],
    inStock: true
  },
  {
    _id: '3',
    name: 'Racing Cap',
    description: 'Adjustable team cap with embroidered logo, perfect for race day.',
    price: 24.99,
    category: 'accessories',
    imageUrl: '/images/merchandise/cap.svg',
    colors: ['Red', 'Black'],
    inStock: true,
    featured: true
  },
  {
    _id: '4',
    name: 'Team Hoodie',
    description: 'Warm and comfortable team hoodie with printed logo and sponsor details.',
    price: 59.99,
    category: 'apparel',
    imageUrl: '/images/merchandise/hoodie.svg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Red'],
    inStock: true
  },
  {
    _id: '5',
    name: 'Racing Team Backpack',
    description: 'High-quality backpack with team logo, multiple compartments, and laptop sleeve.',
    price: 69.99,
    category: 'accessories',
    imageUrl: '/images/merchandise/backpack.svg',
    colors: ['Black'],
    inStock: true,
    featured: true
  },
  {
    _id: '6',
    name: 'Team Water Bottle',
    description: 'Stainless steel water bottle with team logo, keeps drinks cold for up to 24 hours.',
    price: 19.99,
    category: 'accessories',
    imageUrl: '/images/merchandise/bottle.svg',
    colors: ['Silver', 'Red'],
    inStock: true
  },
  {
    _id: '7',
    name: 'Racing Team T-Shirt',
    description: 'Comfortable cotton T-shirt with printed team logo.',
    price: 29.99,
    category: 'apparel',
    imageUrl: '/images/merchandise/tshirt.svg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Black', 'White'],
    inStock: true,
    discountPercentage: 10
  },
  {
    _id: '8',
    name: 'Team Umbrella',
    description: 'Compact racing team umbrella with automatic opening mechanism.',
    price: 29.99,
    category: 'accessories',
    imageUrl: '/images/merchandise/umbrella.svg',
    colors: ['Black/Red'],
    inStock: true
  },
  {
    _id: '9',
    name: 'Racing Team Jacket',
    description: 'Windproof and water-resistant jacket with team logo and sponsor details.',
    price: 89.99,
    category: 'apparel',
    imageUrl: '/images/merchandise/jacket.svg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red/Black'],
    inStock: true,
    featured: true
  },
  {
    _id: '10',
    name: 'Team Lanyard',
    description: 'High-quality lanyard with team logo and detachable key ring.',
    price: 9.99,
    category: 'accessories',
    imageUrl: '/images/merchandise/lanyard.svg',
    colors: ['Red', 'Black'],
    inStock: true
  },
  {
    _id: '11',
    name: 'Racing Team Beanie',
    description: 'Warm knitted beanie with embroidered team logo.',
    price: 19.99,
    category: 'accessories',
    imageUrl: '/images/merchandise/beanie.svg',
    colors: ['Black', 'Red'],
    inStock: true
  },
  {
    _id: '12',
    name: 'Scale Model Car',
    description: '1:18 scale model of our current racing car with detailed features.',
    price: 129.99,
    category: 'collectibles',
    imageUrl: '/images/merchandise/model.svg',
    inStock: false,
    featured: true
  }
];

const MerchandisePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(PLACEHOLDER_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 150 });
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const { startLoading, stopLoading } = useLoading();
  const { addToCart } = useCart();
  
  // Selected product options
  const [selectedProductOptions, setSelectedProductOptions] = useState<Record<string, { size?: string; color?: string }>>({});

  // Add a sort state and handler
  const [sortBy, setSortBy] = useState<string>('featured');

  // This will be used when backend is connected
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      startLoading();
      try {
        // Get merchandise data from dataService
        const merchandiseData = await dataService.getAllMerchandise();
        console.log('Merchandise data loaded:', merchandiseData);
        
        // Map merchandise data to Product format
        const formattedProducts: Product[] = merchandiseData.map(item => ({
          _id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          imageUrl: item.imageUrl,
          sizes: item.availableSizes,
          colors: undefined, // Merchandise data doesn't have colors
          inStock: item.stockQuantity > 0,
          featured: item.featured,
          discountPercentage: undefined
        }));
        
        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        // Keep using placeholder data
        setProducts(PLACEHOLDER_PRODUCTS);
      } finally {
        setLoading(false);
        stopLoading();
      }
    };

    fetchProducts();
  }, [startLoading, stopLoading]);

  // Format price
  const formatPrice = (price: number): string => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Calculate discount price
  const calculateDiscountPrice = (price: number, discountPercentage?: number): number => {
    if (!discountPercentage) return price;
    return price - (price * (discountPercentage / 100));
  };

  // Add a sort function
  const sortProducts = (products: Product[]): Product[] => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price_low':
        return sorted.sort((a, b) => {
          const priceA = a.discountPercentage ? a.price * (1 - a.discountPercentage / 100) : a.price;
          const priceB = b.discountPercentage ? b.price * (1 - b.discountPercentage / 100) : b.price;
          return priceA - priceB;
        });
        
      case 'price_high':
        return sorted.sort((a, b) => {
          const priceA = a.discountPercentage ? a.price * (1 - a.discountPercentage / 100) : a.price;
          const priceB = b.discountPercentage ? b.price * (1 - b.discountPercentage / 100) : b.price;
          return priceB - priceA;
        });
        
      case 'name_asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
        
      case 'name_desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
        
      case 'featured':
      default:
        return sorted.sort((a, b) => {
          // Featured items first
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }
  };

  // Update the filtered products to include sorting
  const filteredProducts = sortProducts(
    products.filter(product => {
      // Apply category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      
      // Apply size filter
      if (selectedSizes.length > 0 && (!product.sizes || !product.sizes.some(size => selectedSizes.includes(size)))) {
        return false;
      }
      
      // Apply color filter
      if (selectedColors.length > 0 && (!product.colors || !product.colors.some(color => selectedColors.includes(color)))) {
        return false;
      }
      
      // Apply price range filter
      const effectivePrice = product.discountPercentage 
        ? calculateDiscountPrice(product.price, product.discountPercentage) 
        : product.price;
      
      if (effectivePrice < priceRange.min || effectivePrice > priceRange.max) {
        return false;
      }
      
      // Apply in-stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      
      return true;
    })
  );

  // Get all available sizes
  const allSizes = Array.from(
    new Set(
      products
        .filter(p => p.sizes && p.sizes.length > 0)
        .flatMap(p => p.sizes as string[])
    )
  ).sort();
  
  // Get all available colors
  const allColors = Array.from(
    new Set(
      products
        .filter(p => p.colors && p.colors.length > 0)
        .flatMap(p => p.colors as string[])
    )
  ).sort();
  
  // Get all available categories
  const allCategories = Array.from(
    new Set(products.map(p => p.category))
  ).sort();

  // Toggle a size in the filter
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  
  // Toggle a color in the filter
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setActiveCategory('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange({ min: 0, max: 150 });
    setInStockOnly(false);
    setSortBy('featured');
  };
  
  // Handle adding to cart
  const handleAddToCart = (product: Product) => {
    // Check if product has size or color options
    const hasSizes = product.sizes && product.sizes.length > 0;
    const hasColors = product.colors && product.colors.length > 0;
    
    // Get selected options
    const options = selectedProductOptions[product._id] || {};
    
    // Validate selections if needed
    if (hasSizes && !options.size) {
      alert('Please select a size');
      return;
    }
    
    if (hasColors && !options.color) {
      alert('Please select a color');
      return;
    }
    
    // Add to cart
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.discountPercentage 
        ? calculateDiscountPrice(product.price, product.discountPercentage) 
        : product.price,
      imageUrl: product.imageUrl,
      size: options.size,
      color: options.color
    });
    
    // Reset selections
    setSelectedProductOptions(prev => ({
      ...prev,
      [product._id]: { size: undefined, color: undefined }
    }));
    
    // Show confirmation
    alert(`${product.name} added to your cart!`);
  };

  // Handle size selection for a specific product
  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedProductOptions(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        size
      }
    }));
  };
  
  // Handle color selection for a specific product
  const handleColorSelect = (productId: string, color: string) => {
    setSelectedProductOptions(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        color
      }
    }));
  };

  return (
    <Layout>
      <Hero 
        title="Merchandise"
        subtitle="Support our racing team with official merchandise"
        backgroundImage="/images/hero/merchandise-hero.svg"
      />
      
      <Breadcrumbs 
        customPaths={{
          'merchandise': 'Merchandise'
        }}
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            {/* Filters sidebar */}
            <div className="w-full md:w-1/4 md:mr-8 mb-8 md:mb-0">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Categories</h3>
                  <div className="space-y-2">
                    <div 
                      className={`cursor-pointer py-1 px-2 rounded ${activeCategory === 'all' ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}
                      onClick={() => setActiveCategory('all')}
                    >
                      All Categories
                    </div>
                    {allCategories.map(category => (
                      <div
                        key={category} 
                        className={`cursor-pointer py-1 px-2 rounded capitalize ${activeCategory === category ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
                
                {allSizes.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {allSizes.map(size => (
                        <div
                          key={size}
                          className={`cursor-pointer py-1 px-3 border rounded-md ${
                            selectedSizes.includes(size) 
                              ? 'bg-red-600 text-white border-red-600' 
                              : 'border-gray-300 hover:border-red-600'
                          }`}
                          onClick={() => toggleSize(size)}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {allColors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {allColors.map(color => (
                        <div
                          key={color}
                          className={`cursor-pointer py-1 px-3 border rounded-md capitalize ${
                            selectedColors.includes(color) 
                              ? 'bg-red-600 text-white border-red-600' 
                              : 'border-gray-300 hover:border-red-600'
                          }`}
                          onClick={() => toggleColor(color)}
                        >
                          {color}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Price Range</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span>{formatPrice(priceRange.min)}</span>
                    <span>{formatPrice(priceRange.max)}</span>
                  </div>
                  <div className="flex space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="150"
                      step="10"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                      className="w-1/2"
                    />
                    <input
                      type="range"
                      min="0"
                      max="150"
                      step="10"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                      className="w-1/2"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={inStockOnly}
                      onChange={() => setInStockOnly(prev => !prev)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
                      Show only in-stock items
                    </label>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    onClick={resetFilters}
                    className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md transition duration-200"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
            
            {/* Products grid */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {activeCategory === 'all' ? 'All Products' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`}
                </h2>
                <div className="flex items-center">
                  <label className="mr-2 text-gray-700">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="featured">Featured</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="name_asc">Name: A to Z</option>
                    <option value="name_desc">Name: Z to A</option>
                  </select>
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <LoadingSpinner size="lg" />
                </div>
              ) : error ? (
                <div className="bg-red-100 p-4 rounded-md text-red-700 mb-6">
                  {error}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your criteria</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 py-2 px-6 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-48 bg-gray-200">
                        {product.imageUrl ? (
                          <OptimizedImage 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                        {!product.inStock && (
                          <div className="absolute top-0 right-0 bg-gray-800 text-white py-1 px-3 m-2 rounded">
                            Out of Stock
                          </div>
                        )}
                        {product.discountPercentage && (
                          <div className="absolute top-0 left-0 bg-red-600 text-white py-1 px-3 m-2 rounded">
                            {product.discountPercentage}% OFF
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                        
                        <div className="mb-4">
                          {product.discountPercentage ? (
                            <div className="flex items-center">
                              <span className="text-xl font-bold text-red-600 mr-2">
                                {formatPrice(calculateDiscountPrice(product.price, product.discountPercentage))}
                              </span>
                              <span className="text-gray-500 line-through">
                                {formatPrice(product.price)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xl font-bold">{formatPrice(product.price)}</span>
                          )}
                        </div>
                        
                        {/* Product options */}
                        {product.sizes && product.sizes.length > 0 && (
                          <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Size:</label>
                            <div className="flex flex-wrap gap-1">
                              {product.sizes.map(size => (
                                <button
                                  key={size}
                                  type="button"
                                  className={`px-2 py-1 text-xs border rounded-md ${
                                    selectedProductOptions[product._id]?.size === size
                                      ? 'bg-red-600 text-white border-red-600'
                                      : 'border-gray-300'
                                  }`}
                                  onClick={() => handleSizeSelect(product._id, size)}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {product.colors && product.colors.length > 0 && (
                          <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Color:</label>
                            <div className="flex flex-wrap gap-1">
                              {product.colors.map(color => (
                                <button
                                  key={color}
                                  type="button"
                                  className={`px-2 py-1 text-xs border rounded-md capitalize ${
                                    selectedProductOptions[product._id]?.color === color
                                      ? 'bg-red-600 text-white border-red-600'
                                      : 'border-gray-300'
                                  }`}
                                  onClick={() => handleColorSelect(product._id, color)}
                                >
                                  {color}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <button
                          className={`w-full py-2 px-4 rounded-md transition duration-200 ${
                            product.inStock 
                              ? 'bg-red-600 hover:bg-red-700 text-white' 
                              : 'bg-gray-300 cursor-not-allowed text-gray-500'
                          }`}
                          onClick={() => product.inStock && handleAddToCart(product)}
                          disabled={!product.inStock}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MerchandisePage;