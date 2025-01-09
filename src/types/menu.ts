export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Shakes' | 'Bowls' | 'Water';
  image: string;
  popular?: boolean;
  allergens?: string[];
  options?: {
    milkOptions?: {
      maxSelections: number;
      items: Array<{
        id: string;
        name: string;
        price: number;
      }>;
    };
    whippedCream?: {
      available: boolean;
      price: number;
    };
    iceCreamOptions?: {
      maxSelections: number;
      items: Array<{
        id: string;
        name: string;
        price: number;
      }>;
    };
  };
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  unit?: string;
}

// New Custom Order Types
export interface DietaryInfo {
  vegan: boolean;
  glutenFree: boolean;
}

export interface BaseIceCream {
  id: string;
  name: string;
  description: string;
  price: number;
  allergens: string[];
  dietary: DietaryInfo;
}

export interface MilkOption {
  id: string;
  name: string;
  price: number;
  dietary: DietaryInfo;
}

export interface Cereal {
  id: string;
  name: string;
  price: number;
  allergens: string[];
  dietary: DietaryInfo;
  category: 'sweet' | 'fruity' | 'chocolate' | 'plain';
}

export interface ToppingItem {
  id: string;
  name: string;
  price: number;
  allergens?: string[];
}

export interface ToppingCategory {
  category: string;
  items: ToppingItem[];
}

export interface WhippedCreamOption {
  id: string;
  name: string;
  price: number;
  dietary: DietaryInfo;
}

export interface SizeOption {
  id: string;
  name: string;
  price: number;
  multiplier: number;
}

export interface CustomOrderItem {
  baseIceCream: string;
  size: string;
  milk: string;
  cereals: string[];
  toppings: string[];
  whippedCream: string | null;
  price: number;
  specialInstructions: string;
}
