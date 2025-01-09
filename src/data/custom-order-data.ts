// Base Ice Cream Flavors
export const baseIceCreamFlavors = [
  {
    id: "vanilla",
    name: "Vanilla Bean",
    description: "Premium Madagascar vanilla beans",
    price: 4.99,
    allergens: ["milk"],
    dietary: {
      vegan: false,
      glutenFree: true,
    },
  },
  {
    id: "chocolate",
    name: "Belgian Chocolate",
    description: "Rich dark Belgian chocolate",
    price: 4.99,
    allergens: ["milk", "soy"],
    dietary: {
      vegan: false,
      glutenFree: true,
    },
  },
  {
    id: "strawberry",
    name: "Fresh Strawberry",
    description: "Made with real strawberries",
    price: 5.49,
    allergens: ["milk"],
    dietary: {
      vegan: false,
      glutenFree: true,
    },
  },
  {
    id: "mint-chip",
    name: "Mint Chocolate Chip",
    description: "Cool mint with dark chocolate chips",
    price: 5.49,
    allergens: ["milk", "soy"],
    dietary: {
      vegan: false,
      glutenFree: true,
    },
  },
  {
    id: "vegan-vanilla",
    name: "Vegan Vanilla",
    description: "Creamy coconut-based vanilla",
    price: 5.99,
    allergens: ["coconut"],
    dietary: {
      vegan: true,
      glutenFree: true,
    },
  },
];

// Milk Options
export const milkOptions = [
  {
    id: "whole",
    name: "Whole Milk",
    price: 0,
    dietary: { vegan: false, glutenFree: true },
  },
  {
    id: "oat",
    name: "Oat Milk",
    price: 0.50,
    dietary: { vegan: true, glutenFree: true },
  },
  {
    id: "almond",
    name: "Almond Milk",
    price: 0.50,
    dietary: { vegan: true, glutenFree: true },
  },
  {
    id: "coconut",
    name: "Coconut Milk",
    price: 0.50,
    dietary: { vegan: true, glutenFree: true },
  },
];

// Cereals
export const cereals = [
  {
    id: "cinnamon-toast",
    name: "Cinnamon Toast Crunch",
    price: 1.50,
    allergens: ["wheat", "soy"],
    dietary: { vegan: false, glutenFree: false },
    category: "sweet",
  },
  {
    id: "fruity-pebbles",
    name: "Fruity Pebbles",
    price: 1.50,
    allergens: ["wheat"],
    dietary: { vegan: true, glutenFree: false },
    category: "fruity",
  },
  {
    id: "cocoa-puffs",
    name: "Cocoa Puffs",
    price: 1.50,
    allergens: ["wheat", "soy"],
    dietary: { vegan: false, glutenFree: false },
    category: "chocolate",
  },
  {
    id: "rice-krispies",
    name: "Rice Krispies",
    price: 1.00,
    allergens: [],
    dietary: { vegan: true, glutenFree: true },
    category: "plain",
  },
];

// Toppings
export const toppings = [
  // Fresh Fruits
  {
    category: "Fresh Fruits",
    items: [
      { id: "strawberries", name: "Fresh Strawberries", price: 1.00 },
      { id: "bananas", name: "Sliced Bananas", price: 0.75 },
      { id: "blueberries", name: "Fresh Blueberries", price: 1.00 },
      { id: "raspberries", name: "Fresh Raspberries", price: 1.00 },
    ],
  },
  // Candies
  {
    category: "Candies",
    items: [
      { id: "mm", name: "M&Ms", price: 0.75, allergens: ["milk", "soy", "peanuts"] },
      { id: "gummy-bears", name: "Gummy Bears", price: 0.75 },
      { id: "sprinkles", name: "Rainbow Sprinkles", price: 0.50 },
      { id: "chocolate-chips", name: "Chocolate Chips", price: 0.75, allergens: ["soy"] },
    ],
  },
  // Nuts & Crunch
  {
    category: "Nuts & Crunch",
    items: [
      { id: "almonds", name: "Sliced Almonds", price: 0.75, allergens: ["tree nuts"] },
      { id: "pecans", name: "Candied Pecans", price: 1.00, allergens: ["tree nuts"] },
      { id: "granola", name: "House-made Granola", price: 0.75 },
      { id: "cookie-crumbs", name: "Cookie Crumbs", price: 0.75, allergens: ["wheat", "soy"] },
    ],
  },
  // Sauces
  {
    category: "Sauces",
    items: [
      { id: "chocolate-sauce", name: "Hot Fudge", price: 0.75, allergens: ["soy"] },
      { id: "caramel", name: "Caramel Sauce", price: 0.75 },
      { id: "strawberry-sauce", name: "Strawberry Sauce", price: 0.75 },
      { id: "condensed-milk", name: "Condensed Milk", price: 0.75, allergens: ["milk"] },
    ],
  },
];

// Whipped Cream Options
export const whippedCreamOptions = [
  {
    id: "regular",
    name: "Fresh Whipped Cream",
    price: 0.75,
    dietary: { vegan: false, glutenFree: true },
  },
  {
    id: "coconut",
    name: "Coconut Whipped Cream",
    price: 1.00,
    dietary: { vegan: true, glutenFree: true },
  },
];

// Size Options
export const sizeOptions = [
  { id: "small", name: "Small (12 oz)", price: 0, multiplier: 1 },
  { id: "medium", name: "Medium (16 oz)", price: 2, multiplier: 1.2 },
  { id: "large", name: "Large (20 oz)", price: 3, multiplier: 1.4 },
];

// Dietary Preferences
export const dietaryPreferences = [
  { id: "vegan", name: "Vegan" },
  { id: "gluten-free", name: "Gluten Free" },
  { id: "nut-free", name: "Nut Free" },
  { id: "dairy-free", name: "Dairy Free" },
];

// Flavor Profiles for Recommendations
export const flavorProfiles = {
  sweet: ["cinnamon-toast", "fruity-pebbles"],
  fruity: ["fruity-pebbles", "strawberries", "bananas"],
  chocolate: ["cocoa-puffs", "chocolate-sauce", "chocolate-chips"],
  nutty: ["almonds", "pecans", "granola"],
};
