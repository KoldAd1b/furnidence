export const formatPrice = (price) => {
  const newPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
  return newPrice;
};

export const getUniqueValues = (products, param) => {
  let newSet;
  if (param === "brand") {
    const brands = products.map((el) => el.brand);
    newSet = [...new Set(brands)];
  }
  if (param === "category") {
    const categories = products.map((el) => el.category);
    newSet = [...new Set(categories)];
  }
  if (param === "colors") {
    const colors = products.map((el) => el.variants);
    newSet = [...new Set(colors.flat())];
  }

  return ["all", ...newSet];
};
