import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { BrandContainer, BrandHeading } from '@/components/ui/brand-theme';

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    text: "Best ice cream experience ever! The cereal combinations are genius. My kids absolutely love this place!",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Michael R.",
    rating: 5,
    text: "Amazing flavors and great atmosphere. The staff is super friendly and always ready with great recommendations.",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Emily K.",
    rating: 5,
    text: "Such a unique concept! The nostalgic cereal flavors mixed with premium ice cream is pure genius. A must-try!",
    date: "3 weeks ago"
  }
];

export const ReviewsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative py-24 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-brand-blue/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      <BrandContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <BrandHeading level={2}>What Our Customers Say</BrandHeading>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our amazing customers!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/20 to-brand-blue/20 rounded-2xl blur-xl transition-all duration-300 group-hover:scale-105" />
              <div className="relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 h-full transition-all duration-300 group-hover:border-brand-pink/50">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-brand-pink opacity-50" />
                </div>
                <p className="text-gray-200 mb-6 leading-relaxed">{review.text}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="text-sm text-gray-400">{review.date}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-brand-pink/50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="https://g.page/r/your-google-review-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full backdrop-blur-sm border border-white/10 hover:border-brand-pink/50 transition-all duration-300"
          >
            <Star className="w-5 h-5 mr-2 text-yellow-400" />
            Leave a Review
          </a>
        </motion.div>
      </BrandContainer>
    </motion.section>
  );
};
