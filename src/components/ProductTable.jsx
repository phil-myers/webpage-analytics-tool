import { useState } from 'react';

const SORTABLE_COLUMNS = {
  price: 'Price',
  discountPct: 'Discount %',
  rating: 'Rating',
  ratingCount: 'Rating Count',
};

function ProductTable({ products }) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleHeaderClick = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedProducts = sortColumn
    ? [...products].sort((a, b) => {
        const diff = a[sortColumn] - b[sortColumn];
        return sortDirection === 'asc' ? diff : -diff;
      })
    : products;

  const renderSortableHeader = (column) => (
    <th
      onClick={() => handleHeaderClick(column)}
      style={{ cursor: 'pointer' }}
    >
      {SORTABLE_COLUMNS[column]}
      {sortColumn === column ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
    </th>
  );

  return (
    <div className="product-table">
      <h2>All Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            {renderSortableHeader('price')}
            <th>Discounted Price</th>
            {renderSortableHeader('discountPct')}
            {renderSortableHeader('rating')}
            {renderSortableHeader('ratingCount')}
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>${product.discountedPrice.toFixed(2)}</td>
              <td>{product.discountPct}%</td>
              <td>{product.rating}</td>
              <td>{product.ratingCount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
