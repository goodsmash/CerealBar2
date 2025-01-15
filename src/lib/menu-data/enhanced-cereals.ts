export type CerealType = {
  id: string;
  name: string;
  price: number;
  description: string;
  flavors: string[];
  texture: string[];
  pairings: string[];
  imageUrl?: string;
};

export const enhancedCereals: CerealType[] = [
  {
    id: 'fruity-pebbles',
    name: 'Fruity Pebbles',
    price: 1.00,
    description: 'Colorful, fruity-flavored crunchy rice cereal that adds a rainbow of flavor to your ice cream.',
    flavors: ['fruity', 'citrus', 'sweet'],
    texture: ['crunchy', 'crispy'],
    pairings: ['vanilla', 'strawberry', 'lemon'],
    imageUrl: '/images/cereals/fruity-pebbles.png'
  },
  {
    id: 'cinnamon-toast',
    name: 'Cinnamon Toast Crunch',
    price: 1.00,
    description: 'Sweet squares of crunchy cereal with the perfect blend of cinnamon and sugar.',
    flavors: ['cinnamon', 'sweet', 'buttery'],
    texture: ['crunchy', 'sugary'],
    pairings: ['vanilla', 'coffee', 'caramel'],
    imageUrl: '/images/cereals/cinnamon-toast.png'
  },
  {
    id: 'lucky-charms',
    name: 'Lucky Charms',
    price: 1.00,
    description: 'Magical combination of frosted oats and colorful marshmallow shapes.',
    flavors: ['sweet', 'marshmallow', 'vanilla'],
    texture: ['crunchy', 'chewy'],
    pairings: ['vanilla', 'mint', 'strawberry'],
    imageUrl: '/images/cereals/lucky-charms.png'
  },
  {
    id: 'cocoa-puffs',
    name: 'Cocoa Puffs',
    price: 1.00,
    description: 'Chocolate-flavored corn puffs that turn any ice cream into a chocolatey delight.',
    flavors: ['chocolate', 'rich', 'sweet'],
    texture: ['crunchy', 'light'],
    pairings: ['vanilla', 'chocolate', 'peanut butter'],
    imageUrl: '/images/cereals/cocoa-puffs.png'
  }
];
