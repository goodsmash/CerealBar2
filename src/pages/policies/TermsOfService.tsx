import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8">
          Terms of Service
        </h1>

        <div className="space-y-6 text-secondary-light">
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Agreement to Terms</h2>
            <p>
              By accessing and using Sweet & Comfy Boston's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Use of Services</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 13 years old to use our services</li>
              <li>You agree to provide accurate and complete information</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You agree not to misuse our services or help anyone else do so</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Orders and Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All orders are subject to availability</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment must be made at the time of ordering</li>
              <li>We accept major credit cards and other payment methods as specified</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Delivery Policy</h2>
            <p>
              We strive to deliver your orders within the specified timeframe. However, delivery times may vary based on location and circumstances beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any significant changes via email or website notification.
            </p>
          </section>

          <div className="pt-8">
            <Link
              to="/"
              className="text-primary hover:text-secondary transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
