export interface CerealItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  allergens: string[];
  popular: boolean;
}

export interface CustomItem {
  base: string;
  cereals: string[];
  toppings: string[];
  mixins: string[];
  milk: string;
  iceCream: string[];
  style: string;
  size: string;
}