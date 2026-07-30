import { aggregateByCategory } from '../utils/aggregateByCategory';

function CategorySummary({ products }) {
  const summary = aggregateByCategory(products);

  return (
    <div className="category-summary">
      <h2>Category Performance Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Avg Rating</th>
            <th>Avg Discount %</th>
            <th>Total Reviews</th>
            <th># Products</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((row) => (
            <tr key={row.category}>
              <td>{row.category}</td>
              <td>{row.avgRating}</td>
              <td>{row.avgDiscountPct}%</td>
              <td>{row.totalReviews.toLocaleString()}</td>
              <td>{row.productCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategorySummary;