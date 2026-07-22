import { describe, it, expect } from 'vitest';
import { aggregateByCategory } from './aggregateByCategory';

describe('aggregateByCategory', () => {
  it('returns one row per distinct category', () => {
    const products = [
      { category: 'Electronics', rating: 4, discountPct: 10, ratingCount: 100 },
      { category: 'Beauty', rating: 3, discountPct: 20, ratingCount: 50 },
    ];

    const result = aggregateByCategory(products);

    expect(result).toHaveLength(2);
    expect(result.map((r) => r.category).sort()).toEqual(['Beauty', 'Electronics']);
  });

  it('averages rating and discount, and sums reviews and product count', () => {
    const products = [
      { category: 'Electronics', rating: 4, discountPct: 10, ratingCount: 100 },
      { category: 'Electronics', rating: 2, discountPct: 30, ratingCount: 50 },
    ];

    const [row] = aggregateByCategory(products);

    expect(row.avgRating).toBe('3.00');
    expect(row.avgDiscountPct).toBe('20.0');
    expect(row.totalReviews).toBe(150);
    expect(row.productCount).toBe(2);
  });

  it('returns an empty array for an empty input', () => {
    expect(aggregateByCategory([])).toEqual([]);
  });
});
