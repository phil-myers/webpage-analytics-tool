import { describe, it, expect } from 'vitest';
import { parseAmazonCsv } from './parseAmazonCsv';

const HEADER =
  'product_id,product_name,category,discounted_price,actual_price,discount_percentage,rating,rating_count,review_title,review_content';

describe('parseAmazonCsv', () => {
  it('parses a well-formed row into the internal product shape', () => {
    const csv =
      HEADER +
      '\n' +
      'B001,"Cable, Braided",Computers&Accessories|Cables,₹399,"₹1,099",64%,4.2,"24,269",Good product,Works great';

    const { products, skippedRows, error } = parseAmazonCsv(csv);

    expect(error).toBeNull();
    expect(skippedRows).toBe(0);
    expect(products).toHaveLength(1);
    expect(products[0]).toMatchObject({
      name: 'Cable, Braided',
      category: 'Computers&Accessories',
      price: 1099,
      discountedPrice: 399,
      discountPct: 64,
      rating: 4.2,
      ratingCount: 24269,
      reviews: ['Good product: Works great'],
      aiSummary: null,
    });
  });

  it('skips rows missing required numeric fields and counts them', () => {
    const csv =
      HEADER +
      '\n' +
      'B001,Cable,Cables,₹399,₹1099,64%,4.2,24269,Good,Great\n' +
      'B002,Bad Row,Cables,₹399,₹1099,,not-a-rating,24269,Ok,Fine';

    const { products, skippedRows } = parseAmazonCsv(csv);

    expect(products).toHaveLength(1);
    expect(skippedRows).toBe(1);
  });

  it('returns an error when required columns are missing', () => {
    const { products, error } = parseAmazonCsv('name,price\nWidget,9.99');

    expect(products).toEqual([]);
    expect(error).toMatch(/missing required column/i);
  });
});
