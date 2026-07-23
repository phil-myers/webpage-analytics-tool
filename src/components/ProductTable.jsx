import { Fragment, useState } from 'react';

const SORTABLE_COLUMNS = {
  price: 'Price',
  discountPct: 'Discount %',
  rating: 'Rating',
  ratingCount: 'Rating Count',
};

const TABLE_COLUMN_COUNT = 8;

function ProductTable({ products }) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedProductId, setExpandedProductId] = useState(null);

  const handleRowClick = (productId) => {
    setExpandedProductId((current) => (current === productId ? null : productId));
  };

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
            <th>AI Review Summary</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => {
            const isExpanded = expandedProductId === product.id;
            return (
              <Fragment key={product.id}>
                <tr
                  onClick={() => handleRowClick(product.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    {isExpanded ? '▾' : '▸'} {product.name}
                  </td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>${product.discountedPrice.toFixed(2)}</td>
                  <td>{product.discountPct}%</td>
                  <td>{product.rating}</td>
                  <td>{product.ratingCount.toLocaleString()}</td>
                  <td>{product.aiSummary ?? 'No reviews yet'}</td>
                </tr>
                {isExpanded && (
                  <tr>
                    <td colSpan={TABLE_COLUMN_COUNT} className="product-reviews">
                      {product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                          <div key={index}>&ldquo;{review}&rdquo;</div>
                        ))
                      ) : (
                        <div>No reviews yet</div>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
