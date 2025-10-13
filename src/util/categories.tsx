const categoriesArr = [
  "Grains",
  "Baked goods",
  "Alcohol",
  "Dairy",
  "Desserts",
  "Seafood",
  "Hot drinks",
  "Fruits and Vegetables",
  "Meat",
  "Personal hygiene",
  "Snacks and treats",
  "Spices and herbs",
  "Cleaning Supplies",
  "Laundry",
  "Health and Medicine",
  "Pets",
  "Home and Tools",
  "Baby Products",
  "Stationery and Office",
  "Others",
];

const categories = categoriesArr.map((category, i) => {
  return { id: i + 1, name: category };
});

export { categories };
