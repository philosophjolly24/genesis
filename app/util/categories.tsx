// const categories = [
//   { id: 1, name: "Grains" },
//   { id: 2, name: "Baked goods" },
//   { id: 3, name: "Alcohol" },
//   { id: 4, name: "Dairy" },
//   { id: 5, name: "Desserts" },
//   { id: 6, name: "Seafood" },
//   { id: 7, name: "Beverages" },
//   { id: 8, name: "Hot drinks" },
//   { id: 9, name: "Fruits and Veg" },
//   { id: 10, name: "Meat" },
//   { id: 11, name: "Personal hygiene" },
//   { id: 12, name: "Snacks and treats" },
//   { id: 13, name: "Spices and herbs" },
//   { id: 15, name: "Cleaning Supplies" },
// ];

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
