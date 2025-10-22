export const buildShowcaseItems = (items, { key, value, limit = 8, shuffle = true } = {}) => {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  let workingItems = [...items];

  if (key && value !== undefined) {
    workingItems = workingItems.filter((item) => item?.[key] === value);
  }

  if (shuffle) {
    workingItems.sort(() => Math.random() - 0.5);
  }

  const sliced = limit > 0 ? workingItems.slice(0, limit) : workingItems;

  return sliced.map((item) => ({
    ...item,
    tag: item.isBestseller ? 'Best Seller' : item.isVeg ? 'Veg' : 'Popular',
  }));
};
