export interface CateringPackage {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  servingSize: string;
  minimumOrder: number;
  timeOfDay: 'All Day' | 'Morning' | 'Afternoon' | 'Evening';
  type: 'Corporate' | 'Party' | 'Event' | 'Wedding';
  includes: string[];
  addOns?: {
    name: string;
    price: number;
    unit: string;
  }[];
  notice: string;
  popular?: boolean;
}

export const cateringPackages: CateringPackage[] = [
  {
    id: "sweet-morning-corporate",
    name: "Sweet Morning Corporate Package",
    description: "Perfect for morning meetings and corporate breakfasts. A delightful selection of our signature pastries and drinks.",
    basePrice: 15.99,
    servingSize: "per person",
    minimumOrder: 10,
    timeOfDay: "Morning",
    type: "Corporate",
    includes: [
      "Choice of 2 pastries per person (Croissants, Muffins, Danish)",
      "Fresh brewed coffee or tea",
      "Choice of Signature Hot Chocolate or Matcha Latte",
      "Fresh fruit platter",
      "Setup and serving equipment included",
      "Professional setup service"
    ],
    addOns: [
      {
        name: "Additional pastries",
        price: 3.50,
        unit: "per piece"
      },
      {
        name: "Premium beverage package",
        price: 5.00,
        unit: "per person"
      }
    ],
    notice: "48 hours advance notice required",
    popular: true
  },
  {
    id: "dessert-party-package",
    name: "Sweet Celebration Party Package",
    description: "Perfect for birthdays, graduations, and special celebrations. A customizable dessert spread that will delight your guests.",
    basePrice: 22.99,
    servingSize: "per person",
    minimumOrder: 15,
    timeOfDay: "All Day",
    type: "Party",
    includes: [
      "Mini versions of 3 signature shakes per person",
      "Choice of 2 dessert items per person",
      "Ice cream sundae bar with 6 toppings",
      "Custom event signage",
      "Dedicated event coordinator",
      "All serving equipment and supplies",
      "2-hour service staff"
    ],
    addOns: [
      {
        name: "Custom celebration cake",
        price: 45.00,
        unit: "per cake (serves 12)"
      },
      {
        name: "Additional hour of service",
        price: 75.00,
        unit: "per hour"
      },
      {
        name: "Premium topping bar upgrade",
        price: 4.00,
        unit: "per person"
      }
    ],
    notice: "72 hours advance notice required"
  },
  {
    id: "corporate-dessert-social",
    name: "Corporate Dessert Social",
    description: "Elevate your corporate events with our premium dessert catering. Perfect for company celebrations, client meetings, and team building events.",
    basePrice: 19.99,
    servingSize: "per person",
    minimumOrder: 20,
    timeOfDay: "Afternoon",
    type: "Corporate",
    includes: [
      "Selection of mini desserts (3 pieces per person)",
      "Custom shake bar with 4 signature flavors",
      "Coffee and tea service",
      "Professional serving staff",
      "Corporate branded dessert displays",
      "All setup and cleanup included",
      "3-hour service"
    ],
    addOns: [
      {
        name: "Branded dessert packaging",
        price: 3.50,
        unit: "per person"
      },
      {
        name: "Additional shake flavors",
        price: 35.00,
        unit: "per flavor"
      }
    ],
    notice: "5 business days advance notice required",
    popular: true
  },
  {
    id: "premium-wedding-dessert",
    name: "Premium Wedding Dessert Package",
    description: "Make your special day even sweeter with our luxury wedding dessert catering. Customizable to match your wedding theme and preferences.",
    basePrice: 32.99,
    servingSize: "per person",
    minimumOrder: 50,
    timeOfDay: "Evening",
    type: "Wedding",
    includes: [
      "Customized dessert bar with 5 signature items",
      "Luxury shake station with 3 premium flavors",
      "Wedding cake alternative option",
      "Champagne-infused dessert options",
      "Custom signage and displays",
      "Premium serving equipment",
      "4-hour full-service staff",
      "Wedding coordinator consultation",
      "Tasting session for up to 4 people"
    ],
    addOns: [
      {
        name: "Late night snack station",
        price: 8.00,
        unit: "per person"
      },
      {
        name: "Custom monogrammed desserts",
        price: 4.50,
        unit: "per piece"
      },
      {
        name: "Additional tasting session",
        price: 75.00,
        unit: "per session"
      }
    ],
    notice: "3 months advance notice required for peak season"
  }
];
