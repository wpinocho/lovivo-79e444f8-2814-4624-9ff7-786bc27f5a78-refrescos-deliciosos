import React, { useState, useMemo } from 'react';
import { CartProvider } from '../context/CartContext';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import Cart from '../components/Cart';
import { products } from '../data/products';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  console.log('Index component rendered');
  console.log('Products loaded:', products.length);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    console.log('Available categories:', uniqueCategories);
    return uniqueCategories;
  }, []);

  // Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    console.log('Filtered products:', filtered.length);
    return filtered;
  }, [searchTerm, selectedCategory]);

  const handleCartToggle = () => {
    console.log('Cart toggle clicked');
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <Header onCartClick={handleCartToggle} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Bienvenido a RefrescoMart
            </h2>
            <p className="text-gray-600">
              Encuentra los mejores refrescos al mejor precio
            </p>
          </div>

          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No se encontraron productos que coincidan con tu búsqueda
              </p>
            </div>
          )}
        </main>

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
};

export default Index;