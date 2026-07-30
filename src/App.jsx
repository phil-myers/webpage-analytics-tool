import { useState } from 'react';
import CategorySummary from './components/CategorySummary';
import CsvUpload from './components/CsvUpload';
import FilterBar from './components/FilterBar';
import ProductTable from './components/ProductTable';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [skippedRows, setSkippedRows] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const handleDataLoaded = (newProducts, skipped = 0) => {
    setProducts(newProducts);
    setSkippedRows(skipped);
    setSelectedCategory('All Categories');
  };

  const handleReset = () => {
    setProducts([]);
    setSkippedRows(0);
    setSelectedCategory('All Categories');
  };

  const filteredProducts =
    selectedCategory === 'All Categories'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="app">
      <ThemeToggle />
      <h1>E-Commerce Category Performance Dashboard</h1>

      {products.length === 0 ? (
        <CsvUpload onDataLoaded={handleDataLoaded} />
      ) : (
        <>
          <div className="data-source-bar">
            {skippedRows > 0 && (
              <span className="data-source-bar__warning">
                {skippedRows} row(s) skipped due to invalid or missing data.
              </span>
            )}
            <button
              type="button"
              className="data-source-bar__reset"
              onClick={handleReset}
            >
              Upload a different file
            </button>
          </div>
          <CategorySummary products={products} />
          <FilterBar
            products={products}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <ProductTable products={filteredProducts} />
        </>
      )}
    </div>
  );
}

export default App;
