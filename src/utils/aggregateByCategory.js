export function aggregateByCategory(products) {
  const groups = {};

  products.forEach((product) => {
    const { category, rating, discountPct, ratingCount } = product;

    if (!groups[category]) {
      groups[category] = {
        category,
        totalRating: 0,
        totalDiscountPct: 0,
        totalReviews: 0,
        productCount: 0,
      };
    }

    groups[category].totalRating += rating;
    groups[category].totalDiscountPct += discountPct;
    groups[category].totalReviews += ratingCount;
    groups[category].productCount += 1;
  });

  return Object.values(groups).map((g) => ({
    category: g.category,
    avgRating: (g.totalRating / g.productCount).toFixed(2),
    avgDiscountPct: (g.totalDiscountPct / g.productCount).toFixed(1),
    totalReviews: g.totalReviews,
    productCount: g.productCount,
  }));
}