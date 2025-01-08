export type MenuCategory = 'Shakes' | 'Bowls' | 'Water' | 'Add-Ons';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  popular?: boolean;
  allergens?: string[];
  options?: {
    milkOptions?: {
      maxSelections: number;
      items: any[];
    };
    whippedCream?: {
      available: boolean;
      price: number;
    };
    iceCreamOptions?: {
      maxSelections: number;
      items: any[];
    };
  };
}
