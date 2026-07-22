import { useState } from 'react';
import CategorySummary from './components/CategorySummary';
import FilterBar from './components/FilterBar';
import ProductTable from './components/ProductTable';
import ThemeToggle from './components/ThemeToggle';
import products from './data/products.json';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredProducts =
    selectedCategory === 'All Categories'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="app">
      <ThemeToggle />
      <h1>E-Commerce Category Performance Dashboard</h1>
      <CategorySummary />
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ProductTable products={filteredProducts} />
    </div>
  );
}

export default App;