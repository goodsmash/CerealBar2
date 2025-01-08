import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    author: "Erica S.",
    rating: 5,
    text: "The ambiance of the establishment was exceptionally impressive, exuding a welcoming and positive atmosphere. My children thoroughly enjoyed their experience, even during the brief wait for their milkshakes. The employees displayed a remarkable level of enthusiasm and positivity.",
    isLocalGuide: true,
    reviewCount: "8 reviews"
  },
  {
    id: 2,
    author: "Alyssa",
    rating: 5,
    text: "Great new addition to Oak Square! The employees are very attentive and friendly. Decor inside is super cool. Love the vibe overall. Cereal treats are sweet!",
    reviewCount: "6 reviews"
  },
  {
    id: 3,
    author: "Cyndi Rosenblatt",
    rating: 5,
    text: "Fantastic place! Cereal sundaes and shakes are out of this world! They came up with some great flavor combinations of your fave cereals or you can make your own. Such a great idea in a really cute place. Totally hits the mark! A++",
    reviewCount: "4 reviews"
  },
  {
    id: 4,
    author: "ThisisCourt_TV",
    rating: 5,
    text: "What an amazing dessert shop!! Never been to a cereal bar, so glad I got to stop on for the grand opening, and I was NOT disappointed! Great music, great people and my Mucha Lucha shake was out of this world! Finished it off with some waffle fries and was beyond satisfied!",
    reviewCount: "10 reviews"
  },
  {
    id: 5,
    author: "Michaela Youngberg",
    rating: 5,
    text: "Extremely happy that I stopped into this place, I had been meaning to go and I was not disappointed! The staff were so friendly and helpful, it was my first time so the gentleman at the counter helped me navigate the menu. Would highly recommend if you're looking for a sweet, nostalgic treat!",
    reviewCount: "17 reviews"
  }
];

export const ReviewsSection = () => {
  return (
    <section className="py-16 bg-accent/5">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-2">What Our Customers Say</h2>
          <div className="flex justify-center items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
          </div>
          <p className="text-secondary">5.0 rating based on 119 Google reviews</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-background p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-primary">{review.author}</h3>
                  <p className="text-sm text-secondary">
                    {review.isLocalGuide ? "Local Guide • " : ""}{review.reviewCount}
                  </p>
                </div>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
              <p className="text-secondary text-sm line-clamp-4">{review.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://www.google.com/maps/place/Day+%26+Night+Cereal+Bar:+Boston/@42.3485,-71.1535,15z/data=!4m6!3m5!1s0x89e379a606c9e879:0x4395e689feb76639!8m2!3d42.3485!4d-71.1535!16s%2Fg%2F11t82_8tn1?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <span className="mr-2">See all reviews on Google</span>
            <span className="text-lg">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
