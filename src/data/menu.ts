import { MenuItem } from '@/types/menu';
import { milkOptions, iceCreamOptions, whippedCreamOption } from './add-ons';

const defaultImage = '/lovable-uploads/243c40d2-d14b-416e-8873-7604cdce8f88.png';

export const menuItems: MenuItem[] = [
  {
    id: "pumpkin-spice-supreme-shake",
    name: "Pumpkin Spice Supreme Shake",
    description: "Our seasonal favorite! Made with real pumpkin spice, vanilla ice cream, and topped with whipped cream and a golden cookie.",
    price: 16.00,
    category: "Shakes",
    image: '/lovable-uploads/48cc2571-6467-4a2f-b999-ecd2b5a3e3e5.png',
    popular: true
  },
  {
    id: "pumpkin-spice-supreme-bowl",
    name: "Pumpkin Spice Supreme Bowl",
    description: "Experience autumn in a bowl with our Pumpkin Spice Supreme! Creamy pumpkin-spiced ice cream topped with cinnamon-dusted whipped cream and seasonal toppings.",
    price: 13.00,
    category: "Bowls",
    image: '/lovable-uploads/4f0d8112-36cd-4880-baa4-784fe1f6ad63.png'
  },
  {
    id: "basic-milkshake",
    name: "Basic Milkshake (No Cereal)",
    description: "Classic milkshake with your choice of ice cream and cold milk",
    price: 12.00,
    category: "Shakes",
    image: '/lovable-uploads/8a73202d-ae48-4f13-aca5-5bd0546080a6.png',
    popular: true,
    allergens: ["milk"]
  },
  {
    id: "build-your-own-shake",
    name: "Build Your Own Shake",
    description: "Create your dream shake with our Build Your Own Shake option! Choose up to 4 cereals, 2 ice creams, 2 cookies, and your favorite syrups for a custom-made treat that's totally you.",
    price: 15.00,
    category: "Shakes",
    image: '/lovable-uploads/9cd29c97-6b4e-4450-9724-aa0008736c4e.png',
    options: {
      milkOptions: {
        maxSelections: 1,
        items: milkOptions
      },
      whippedCream: {
        available: true,
        price: whippedCreamOption.price
      },
      iceCreamOptions: {
        maxSelections: 2,
        items: iceCreamOptions
      }
    }
  },
  {
    id: "buttercup-shake",
    name: "Buttercup Shake",
    description: "Indulge in our Buttercup milkshake—creamy vanilla ice cream blended with Reese's Puffs, Cocoa Puffs, Nutter Butter cookies, Reese's Peanut Butter sauce, and cold milk. A rich, peanut buttery delight in every sip!",
    price: 14.00,
    category: "Shakes",
    image: '/lovable-uploads/baa9dff7-6a6a-4016-ba18-4bdc39f68d3e.png'
  },
  {
    id: "cookies-cream-shake",
    name: "Cookies & Cream Shake",
    description: "Satisfy your cravings with our Cookies & Cream milkshake—Oreo ice cream blended with Oreo Cereal, Cookie Crisp, Frosted Flakes, Oreo cookies, chocolate syrup, and cold milk. A chocolatey, cookie-filled dream in every sip!",
    price: 14.00,
    category: "Shakes",
    image: '/lovable-uploads/bb4cdb3d-b798-436d-b1a5-7b4cc6b53f9b.png'
  },
  {
    id: "fresh-prince-shake",
    name: "Fresh Prince(SS) Of Bel-Air Shake",
    description: "Treat yourself like royalty with our Fresh Prince(SS) of Boston milkshake—vanilla ice cream blended with Frosted Flakes, Froot Loops, Lucky Charms, golden Oreo cookies, caramel syrup, and cold milk. A sweet, colorful delight fit for a king or queen in every sip!",
    price: 14.00,
    category: "Shakes",
    image: '/lovable-uploads/d45ffff9-e94b-4cb8-842c-10bc11b0e47e.png'
  },
  {
    id: "liquid-gold-shake",
    name: "Liquid Gold Shake",
    description: "Indulge in our Liquid Gold milkshake—vanilla ice cream blended with Cap'n Crunch Peanut Butter, Lucky Charms, golden Oreos, cookie butter, banana syrup, and cold milk. A rich, creamy, and magical flavor explosion in every sip!",
    price: 14.00,
    category: "Shakes",
    image: '/lovable-uploads/dc2eb79b-547b-4fe9-bcd8-7a97aef63f8a.png'
  },
  {
    id: "mcfly-shake",
    name: "Mcflyyyy Shake",
    description: "Take a trip with our Mcflyyy milkshake—vanilla ice cream blended with Apple Jacks, Froot Loops, golden Oreos, and cold milk, topped with gummy bears for a fun, sweet finish. Every sip is a blast from the past!",
    price: 14.00,
    category: "Shakes",
    image: '/lovable-uploads/e7f0f120-3958-43d6-a8f2-a201efe7c197.png'
  },
  {
    id: "cookies-and-cream-bowl",
    name: "Cookies & Cream Bowl",
    description: "Indulge in our Cookies & Cream Bowl—Oreo ice cream topped with Oreo Cereal, Cookie Crisp, Frosted Flakes, and an Oreo cookie, all drizzled with Reese's chocolate syrup and served with a side bottle of cold milk. A cookie lover's dream come true!",
    price: 12.00,
    category: "Bowls",
    image: '/lovable-uploads/ea412657-13df-4bba-be9f-142d8f8b2fa4.png'
  },
  {
    id: "bowl-of-ice-cream",
    name: "Bowl of Ice Cream",
    description: "Enjoy our Basic Bowl—your choice of ice cream, served just the way you like it. Want to mix it up? Add your favorite cookies and syrups for an extra sweet twist!",
    price: 10.00,
    category: "Bowls",
    image: defaultImage
  },
  {
    id: "build-your-own-bowl",
    name: "Build Your Own Bowl",
    description: "Create your perfect treat and Build Your Own Bowl! Choose up to 4 cereals, 2 ice creams, 2 cookies, and your favorite syrups for a deliciously personalized bowl that's all about your cravings! Served with a side bottle of cold milk.",
    price: 13.00,
    category: "Bowls",
    image: defaultImage
  },
  {
    id: "fresh-prince-bowl",
    name: "Fresh Prince(SS) Of Bel-Air Bowl",
    description: "Treat yourself to our Fresh Prince(SS) of Boston Bowl—vanilla ice cream topped with Frosted Flakes, Froot Loops, Lucky Charms, golden Oreo cookies, and drizzled with caramel syrup. Served with a side bottle of cold milk for a royally sweet experience!",
    price: 12.00,
    category: "Bowls",
    image: defaultImage
  },
  {
    id: "liquid-gold-bowl",
    name: "Liquid Gold Bowl",
    description: "Indulge in our Liquid Gold Bowl—vanilla ice cream topped with Cap'n Crunch Peanut Butter Crunch, Lucky Charms, a golden Oreo cookie, and drizzled with banana syrup. Served with a side bottle of cold milk for a creamy, nutty, and magical treat",
    price: 12.00,
    category: "Bowls",
    image: defaultImage
  },
  {
    id: "mucha-lucha-bowl",
    name: "Mucha Lucha Bowl",
    description: "Satisfy your cravings with our Mucha Lucha Bowl—vanilla ice cream topped with Cinnamon Toast Crunch, Cinnamon Toast Rolls, golden Oreo cookies, and served with a side bottle of cold milk. A bold, sweet, and crunchy flavor fiesta in every bite!",
    price: 12.00,
    category: "Bowls",
    image: defaultImage
  },
  {
    id: "oddparents-bowl",
    name: "Oddparents Bowl",
    description: "Get ready for a colorful adventure with our Oddparents Bowl—vanilla ice cream topped with Froot Loops, Cap'n Crunch All Berries, a golden Oreo cookie, and a drizzle of strawberry syrup. Served with a side bottle of cold milk for a fruity, sweet treat!",
    price: 12.00,
    category: "Bowls",
    image: defaultImage
  },
  {
    id: "rooooby-snacks-bowl",
    name: "Rooooby Snacks Bowl",
    description: "Unleash your sweet tooth with our Rooooby Snacks Bowl—Oreo ice cream topped with Cinnamon Toast Crunch, an Oreo cookie, drizzled with caramel syrup, and served with a side bottle of cold milk. Finished with a couple of Scooby Snacks for that extra treat!",
    price: 12.00,
    category: "Bowls",
    image: defaultImage
  },
  {
    id: "strawberry-shortcake-bowl",
    name: "Strawberry Shortcake Bowl",
    description: "Indulge in our Strawberry Shortcake Bowl—strawberry cheesecake ice cream topped with Honey Comb cereal, Strawberry Frosted Flakes, and a golden Oreo cookie. Paired with a side bottle of cold milk for the ultimate fruity, crunchy delight!",
    price: 12.00,
    category: "Bowls",
    image: defaultImage
  },
  {
    id: "the-beehive-bowl",
    name: "The Beehive Bowl",
    description: "Dive into the sweet crunch of our Beehive Bowl—vanilla ice cream topped with Honey Nut Cheerios, Honey Bunches of Oats, a Graham cracker, and drizzled with honey. Served with a side bottle of cold milk for a perfect honey-filled treat!",
    price: 12.00,
    category: "Bowls",
    image: defaultImage
  },
  {
    id: "the-homer-bowl",
    name: "The Homer Bowl",
    description: "Indulge in our Homer Bowl—Oreo ice cream topped with Honey Nut Cheerios, Cocoa Puffs, a chocolate chip cookie, and drizzled with rich chocolate syrup. Served with a side bottle of cold milk for a sweet, crunchy delight!",
    price: 12.00,
    category: "Bowls",
    image: defaultImage
  },
  {
    id: "unicorn-breath-bowl",
    name: "Unicorn Breath Bowl",
    description: "Taste the magic with our Unicorn Breath Bowl—vanilla ice cream topped with Frosted Flakes, Fruity Pebbles, Lucky Charms, and a golden Oreo cookie. Paired with a side bottle of cold milk for a colorful and sweet adventure in every bite!",
    price: 12.00,
    category: "Bowls",
    image: defaultImage
  },
  {
    id: "wicked-wednesday-bowl",
    name: "Wicked Wednesday Bowl",
    description: "Dive into the allure of mystery with our Wicked Wednesday Bowl, featuring a surprise combination of ingredients.",
    price: 13.00,
    category: "Bowls",
    image: defaultImage
  },
  {
    id: "buttercup-bowl",
    name: "Buttercup Bowl",
    description: "Dive into our Buttercup Bowl—vanilla ice cream topped with Reese's Puffs, Cocoa Puffs, Nutter Butter cookies, and drizzled with Reese's Peanut Butter sauce. Served with a side bottle of cold milk for the ultimate indulgence!",
    price: 12.00,
    category: "Bowls",
    image: defaultImage
  },
  {
    id: "mcfly-bowl",
    name: "Mcflyyyy Bowl",
    description: "Blast off with our Mcflyyy Bowl—vanilla ice cream loaded with Apple Jacks, Froot Loops, golden Oreo cookies. Served with a side bottle of cold milk and topped with gummy bears for a fun and colorful twist!",
    price: 12.00,
    category: "Bowls",
    image: defaultImage
  },
  {
    id: "bottled-water",
    name: "Bottled Water",
    description: "Stay refreshed with our cool bottled water.",
    price: 2.25,
    category: "Water",
    image: defaultImage
  }
];

export function getDefaultProductImage(category: 'Shakes' | 'Bowls' | 'Water') {
  return defaultImage;
}
