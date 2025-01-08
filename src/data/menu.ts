import { MenuItem } from '@/types/menu';
import { milkOptions, iceCreamOptions, whippedCreamOption } from './add-ons';

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/pink/white?text=';

function getImagePath(category: 'Shakes' | 'Bowls' | 'Water', filename: string) {
  const categoryPath = {
    'Shakes': '/images/menu/shakes/',
    'Bowls': '/images/menu/bowls/',
    'Water': '/images/menu/drinks/'
  }[category];

  return `${categoryPath}${filename}`;
}

export const menuItems: MenuItem[] = [
  // Seasonal Specials
  {
    id: "pumpkin-spice-supreme-shake",
    name: "Pumpkin Spice Supreme Shake",
    description: "Our seasonal favorite! Made with real pumpkin spice, vanilla ice cream, and topped with whipped cream and a golden cookie.",
    price: 16.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Pumpkin+Spice+Supreme+Shake`,
    popular: true
  },
  {
    id: "pumpkin-spice-supreme-bowl",
    name: "Pumpkin Spice Supreme Bowl",
    description: "Experience autumn in a bowl with our Pumpkin Spice Supreme! Creamy pumpkin-spiced ice cream topped with cinnamon-dusted whipped cream and seasonal toppings.",
    price: 13.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Pumpkin+Spice+Supreme+Bowl`
  },

  // Basic Options
  {
    id: "basic-milkshake",
    name: "Basic Milkshake (No Cereal)",
    description: "Classic milkshake with your choice of ice cream and cold milk",
    price: 12.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Basic+Milkshake`,
    popular: true,
    allergens: ["milk"]
  },
  {
    id: "build-your-own-shake",
    name: "Build Your Own Shake",
    description: "Create your dream shake with our Build Your Own Shake option! Choose up to 4 cereals, 2 ice creams, 2 cookies, and your favorite syrups for a custom-made treat that's totally you.",
    price: 15.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Build+Your+Own+Shake`,
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

  // Signature Shakes
  {
    id: "buttercup-shake",
    name: "Buttercup Shake",
    description: "Indulge in our Buttercup milkshake—creamy vanilla ice cream blended with Reese's Puffs, Cocoa Puffs, Nutter Butter cookies, Reese's Peanut Butter sauce, and cold milk. A rich, peanut buttery delight in every sip!",
    price: 14.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Buttercup+Shake`
  },
  {
    id: "cookies-cream-shake",
    name: "Cookies & Cream Shake",
    description: "Satisfy your cravings with our Cookies & Cream milkshake—Oreo ice cream blended with Oreo Cereal, Cookie Crisp, Frosted Flakes, Oreo cookies, chocolate syrup, and cold milk. A chocolatey, cookie-filled dream in every sip!",
    price: 14.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Cookies+And+Cream+Shake`
  },
  {
    id: "fresh-prince-shake",
    name: "Fresh Prince(SS) Of Bel-Air Shake",
    description: "Treat yourself like royalty with our Fresh Prince(SS) of Boston milkshake—vanilla ice cream blended with Frosted Flakes, Froot Loops, Lucky Charms, golden Oreo cookies, caramel syrup, and cold milk. A sweet, colorful delight fit for a king or queen in every sip!",
    price: 14.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Fresh+Prince+Shake`
  },
  {
    id: "liquid-gold-shake",
    name: "Liquid Gold Shake",
    description: "Indulge in our Liquid Gold milkshake—vanilla ice cream blended with Cap'n Crunch Peanut Butter, Lucky Charms, golden Oreos, cookie butter, banana syrup, and cold milk. A rich, creamy, and magical flavor explosion in every sip!",
    price: 14.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Liquid+Gold+Shake`
  },
  {
    id: "mcfly-shake",
    name: "Mcflyyyy Shake",
    description: "Take a trip with our Mcflyyy milkshake—vanilla ice cream blended with Apple Jacks, Froot Loops, golden Oreos, and cold milk, topped with gummy bears for a fun, sweet finish. Every sip is a blast from the past!",
    price: 14.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Mcfly+Shake`
  },
  {
    id: "mucha-lucha-shake",
    name: "Mucha Lucha Shake",
    description: "Get ready for a flavor fiesta with our Mucha Lucha milkshake—vanilla ice cream blended with Cinnamon Toast Crunch, Cinnamon Toast Rolls, golden Oreo cookies, and cold milk. A bold, sweet, and crunchy delight in every sip!",
    price: 14.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Mucha+Lucha+Shake`
  },
  {
    id: "oddparents-shake",
    name: "Oddparents Shake",
    description: "Experience a magical blend with our Oddparents milkshake—vanilla ice cream mixed with Froot Loops, Cap'n Crunch All Berries, golden Oreo cookies, and strawberry syrup. A colorful and enchanting treat in every sip!",
    price: 14.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Oddparents+Shake`
  },
  {
    id: "rooby-snacks-shake",
    name: "Rooooby Snacks Shake",
    description: "Solve the mystery of deliciousness with our Rooooby Snacks milkshake—Oreo ice cream blended with Cinnamon Toast Crunch, Oreo cookies, caramel syrup, and cold milk. Topped with Scooby Snacks for that perfect finish!",
    price: 14.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Rooby+Snacks+Shake`
  },
  {
    id: "strawberry-shortcake-shake",
    name: "Strawberry Shortcake Shake",
    description: "Savor the sweetness of our Strawberry Shortcake milkshake—strawberry cheesecake ice cream blended with Honey Comb cereal, Strawberry Frosted Flakes, golden Oreo cookies, and cold milk. A fruity paradise in every sip!",
    price: 14.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Strawberry+Shortcake+Shake`
  },
  {
    id: "beehive-shake",
    name: "The Beehive Shake",
    description: "Experience the sweet harmony of our Beehive milkshake—vanilla ice cream blended with Honey Nut Cheerios, Honey Bunches of Oats, Graham crackers, honey, and cold milk. A honey-lover's dream come true!",
    price: 14.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Beehive+Shake`
  },
  {
    id: "homer-shake",
    name: "The Homer Shake",
    description: "D'oh-licious! Our Homer milkshake blends Oreo ice cream with Honey Nut Cheerios, Cocoa Puffs, chocolate chip cookies, chocolate syrup, and cold milk for a perfectly sweet treat!",
    price: 14.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Homer+Shake`
  },
  {
    id: "unicorn-breath-shake",
    name: "Unicorn Breath Shake",
    description: "Experience the magic in liquid form with our Unicorn Breath milkshake—vanilla ice cream blended with Frosted Flakes, Fruity Pebbles, Lucky Charms, golden Oreo cookies, and cold milk. A rainbow of flavors in every magical sip!",
    price: 14.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Unicorn+Breath+Shake`
  },
  {
    id: "wicked-wednesday-shake",
    name: "Wicked Wednesday Shake",
    description: "Embrace the mystery with our Wicked Wednesday milkshake—a surprise combination that changes weekly. Perfect for adventurous souls!",
    price: 15.00,
    category: "Shakes",
    image: `${PLACEHOLDER_IMAGE}Wicked+Wednesday+Shake`
  },

  // Bowl Options
  {
    id: "bowl-of-ice-cream",
    name: "Bowl of Ice Cream",
    description: "Enjoy our Basic Bowl—your choice of ice cream, served just the way you like it. Want to mix it up? Add your favorite cookies and syrups for an extra sweet twist!",
    price: 10.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Bowl+Of+Ice+Cream`
  },
  {
    id: "build-your-own-bowl",
    name: "Build Your Own Bowl",
    description: "Create your perfect treat and Build Your Own Bowl! Choose up to 4 cereals, 2 ice creams, 2 cookies, and your favorite syrups for a deliciously personalized bowl that's all about your cravings! Served with a side bottle of cold milk.",
    price: 13.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Build+Your+Own+Bowl`
  },
  {
    id: "buttercup-bowl",
    name: "Buttercup Bowl",
    description: "Dive into our Buttercup Bowl—vanilla ice cream topped with Reese's Puffs, Cocoa Puffs, Nutter Butter cookies, and drizzled with Reese's Peanut Butter sauce. Served with a side bottle of cold milk for the ultimate indulgence!",
    price: 12.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Buttercup+Bowl`
  },
  {
    id: "cookies-and-cream-bowl",
    name: "Cookies & Cream Bowl",
    description: "Indulge in our Cookies & Cream Bowl—Oreo ice cream topped with Oreo Cereal, Cookie Crisp, Frosted Flakes, and an Oreo cookie, all drizzled with Reese's chocolate syrup and served with a side bottle of cold milk. A cookie lover's dream come true!",
    price: 12.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Cookies+And+Cream+Bowl`
  },
  {
    id: "fresh-prince-bowl",
    name: "Fresh Prince(SS) Of Bel-Air Bowl",
    description: "Treat yourself to our Fresh Prince(SS) of Boston Bowl—vanilla ice cream topped with Frosted Flakes, Froot Loops, Lucky Charms, golden Oreo cookies, and drizzled with caramel syrup. Served with a side bottle of cold milk for a royally sweet experience!",
    price: 12.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Fresh+Prince+Bowl`
  },
  {
    id: "liquid-gold-bowl",
    name: "Liquid Gold Bowl",
    description: "Indulge in our Liquid Gold Bowl—vanilla ice cream topped with Cap'n Crunch Peanut Butter Crunch, Lucky Charms, a golden Oreo cookie, and drizzled with banana syrup. Served with a side bottle of cold milk for a creamy, nutty, and magical treat",
    price: 12.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Liquid+Gold+Bowl`
  },
  {
    id: "mcfly-bowl",
    name: "Mcflyyyy Bowl",
    description: "Blast off with our Mcflyyy Bowl—vanilla ice cream loaded with Apple Jacks, Froot Loops, golden Oreo cookies. Served with a side bottle of cold milk and topped with gummy bears for a fun and colorful twist!",
    price: 12.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Mcfly+Bowl`
  },
  {
    id: "mucha-lucha-bowl",
    name: "Mucha Lucha Bowl",
    description: "Satisfy your cravings with our Mucha Lucha Bowl—vanilla ice cream topped with Cinnamon Toast Crunch, Cinnamon Toast Rolls, golden Oreo cookies, and served with a side bottle of cold milk. A bold, sweet, and crunchy flavor fiesta in every bite!",
    price: 12.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Mucha+Lucha+Bowl`
  },
  {
    id: "oddparents-bowl",
    name: "Oddparents Bowl",
    description: "Get ready for a colorful adventure with our Oddparents Bowl—vanilla ice cream topped with Froot Loops, Cap'n Crunch All Berries, a golden Oreo cookie, and a drizzle of strawberry syrup. Served with a side bottle of cold milk for a fruity, sweet treat!",
    price: 12.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Oddparents+Bowl`
  },
  {
    id: "rooooby-snacks-bowl",
    name: "Rooooby Snacks Bowl",
    description: "Unleash your sweet tooth with our Rooooby Snacks Bowl—Oreo ice cream topped with Cinnamon Toast Crunch, an Oreo cookie, drizzled with caramel syrup, and served with a side bottle of cold milk. Finished with a couple of Scooby Snacks for that extra treat!",
    price: 12.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Rooby+Snacks+Bowl`
  },
  {
    id: "strawberry-shortcake-bowl",
    name: "Strawberry Shortcake Bowl",
    description: "Indulge in our Strawberry Shortcake Bowl—strawberry cheesecake ice cream topped with Honey Comb cereal, Strawberry Frosted Flakes, and a golden Oreo cookie. Paired with a side bottle of cold milk for the ultimate fruity, crunchy delight!",
    price: 12.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Strawberry+Shortcake+Bowl`
  },
  {
    id: "the-beehive-bowl",
    name: "The Beehive Bowl",
    description: "Dive into the sweet crunch of our Beehive Bowl—vanilla ice cream topped with Honey Nut Cheerios, Honey Bunches of Oats, a Graham cracker, and drizzled with honey. Served with a side bottle of cold milk for a perfect honey-filled treat!",
    price: 12.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Beehive+Bowl`
  },
  {
    id: "the-homer-bowl",
    name: "The Homer Bowl",
    description: "Indulge in our Homer Bowl—Oreo ice cream topped with Honey Nut Cheerios, Cocoa Puffs, a chocolate chip cookie, and drizzled with rich chocolate syrup. Served with a side bottle of cold milk for a sweet, crunchy delight!",
    price: 12.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Homer+Bowl`
  },
  {
    id: "unicorn-breath-bowl",
    name: "Unicorn Breath Bowl",
    description: "Taste the magic with our Unicorn Breath Bowl—vanilla ice cream topped with Frosted Flakes, Fruity Pebbles, Lucky Charms, and a golden Oreo cookie. Paired with a side bottle of cold milk for a colorful and sweet adventure in every bite!",
    price: 12.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Unicorn+Breath+Bowl`
  },
  {
    id: "wicked-wednesday-bowl",
    name: "Wicked Wednesday Bowl",
    description: "Dive into the allure of mystery with our Wicked Wednesday Bowl, featuring a surprise combination of ingredients.",
    price: 13.00,
    category: "Bowls",
    image: `${PLACEHOLDER_IMAGE}Wicked+Wednesday+Bowl`
  },

  // Beverages
  {
    id: "bottled-water",
    name: "Bottled Water",
    description: "Stay refreshed with our cool bottled water.",
    price: 2.25,
    category: "Water",
    image: `${PLACEHOLDER_IMAGE}Bottled+Water`
  }
];

export function getDefaultProductImage(category: 'Shakes' | 'Bowls' | 'Water') {
  switch (category) {
    case 'Shakes':
      return `${PLACEHOLDER_IMAGE}Default+Shake`;
    case 'Bowls':
      return `${PLACEHOLDER_IMAGE}Default+Bowl`;
    case 'Water':
      return `${PLACEHOLDER_IMAGE}Default+Water`;
  }
}
