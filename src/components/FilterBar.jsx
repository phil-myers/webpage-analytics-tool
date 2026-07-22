import products from '../data/products.json';

const categories = [...new Set(products.map((product) => product.category))];

function FilterBar({ selectedCategory, onCategoryChange }) {
  return (
    <div className="filter-bar">
      <label htmlFor="category-filter">Category: </label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All Categories">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
