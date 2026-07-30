import Papa from 'papaparse';

const REQUIRED_COLUMNS = [
  'product_name',
  'category',
  'discounted_price',
  'actual_price',
  'discount_percentage',
  'rating',
  'rating_count',
];

function parseNumeric(value) {
  const cleaned = String(value ?? '').replace(/[^0-9.]/g, '');
  return cleaned === '' ? NaN : parseFloat(cleaned);
}

function buildReviews(titleField, contentField) {
  const titles = String(titleField ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const contents = String(contentField ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const count = Math.max(titles.length, contents.length);

  const reviews = [];
  for (let i = 0; i < count; i += 1) {
    const title = titles[i];
    const content = contents[i];
    if (title && content) reviews.push(`${title}: ${content}`);
    else if (content) reviews.push(content);
    else if (title) reviews.push(title);
  }
  return reviews;
}

export function parseAmazonCsv(csvText) {
  const { data, meta } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const missingColumns = REQUIRED_COLUMNS.filter(
    (col) => !meta.fields?.includes(col)
  );
  if (missingColumns.length > 0) {
    return {
      products: [],
      skippedRows: 0,
      error: `CSV is missing required column(s): ${missingColumns.join(', ')}`,
    };
  }

  let skippedRows = 0;
  const products = [];

  data.forEach((row, index) => {
    const price = parseNumeric(row.actual_price);
    const discountedPrice = parseNumeric(row.discounted_price);
    const discountPct = parseNumeric(row.discount_percentage);
    const rating = parseNumeric(row.rating);
    const ratingCount = parseNumeric(row.rating_count);

    const hasRequiredValues =
      row.product_name &&
      !Number.isNaN(price) &&
      !Number.isNaN(discountedPrice) &&
      !Number.isNaN(discountPct) &&
      !Number.isNaN(rating) &&
      !Number.isNaN(ratingCount);

    if (!hasRequiredValues) {
      skippedRows += 1;
      return;
    }

    products.push({
      id: `${row.product_id || 'row'}-${index}`,
      name: row.product_name,
      category: (row.category || 'Uncategorized').split('|')[0],
      price,
      discountedPrice,
      discountPct,
      rating,
      ratingCount: Math.round(ratingCount),
      reviews: buildReviews(row.review_title, row.review_content),
      aiSummary: null,
    });
  });

  return { products, skippedRows, error: null };
}
