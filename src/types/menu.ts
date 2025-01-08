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
  customizations?: {
    milk: string;
    iceCream: string[];
    whippedCream: boolean;
  };
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  unit?: string;
}
