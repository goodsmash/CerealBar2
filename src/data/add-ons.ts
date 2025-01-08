import { AddOn } from '@/types/menu';

export const milkOptions: AddOn[] = [
  { id: 'whole-milk', name: 'Whole Milk', price: 0 },
  { id: 'almond-milk', name: 'Almond Milk', price: 1 },
  { id: 'oat-milk', name: 'Oat Milk', price: 1 },
  { id: 'soy-milk', name: 'Soy Milk', price: 1 }
];

export const iceCreamOptions: AddOn[] = [
  { id: 'vanilla', name: 'Vanilla', price: 0 },
  { id: 'chocolate', name: 'Chocolate', price: 0 },
  { id: 'strawberry', name: 'Strawberry', price: 0 },
  { id: 'cookies-cream', name: 'Cookies & Cream', price: 1 },
  { id: 'mint-chocolate-chip', name: 'Mint Chocolate Chip', price: 1 }
];

export const whippedCreamOption: AddOn = {
  id: 'whipped-cream',
  name: 'Whipped Cream',
  price: 1.00
};
