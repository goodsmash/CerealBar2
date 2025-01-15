import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-secondary-light">
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Introduction</h2>
            <p>
              At Sweet & Comfy Boston, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact information (name, email, phone number)</li>
              <li>Order history and preferences</li>
              <li>Website usage data</li>
              <li>Location data for delivery services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process your orders and payments</li>
              <li>Send you updates about your orders</li>
              <li>Improve our products and services</li>
              <li>Send promotional offers (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Data Protection</h2>
            <p>
              We implement various security measures to protect your personal information. Your data is encrypted and stored securely on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. Contact us if you wish to exercise these rights.
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
