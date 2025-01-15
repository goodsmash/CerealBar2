import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const CookieSettings = () => {
  const [preferences, setPreferences] = useState({
    essential: true,
    functional: true,
    analytics: false,
    marketing: false,
  });

  const handleSave = () => {
    // Here you would typically save these preferences
    console.log('Saving preferences:', preferences);
    // You could also show a success message
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8">
          Cookie Settings
        </h1>

        <div className="space-y-8 text-secondary-light">
          <section>
            <p className="mb-6">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. Please select your preferences below.
            </p>
          </section>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-primary/10">
              <div>
                <h3 className="font-semibold text-primary">Essential Cookies</h3>
                <p className="text-sm text-secondary-light">Required for the website to function properly</p>
              </div>
              <Switch
                checked={preferences.essential}
                disabled
                className="data-[state=checked]:bg-primary"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-primary/10">
              <div>
                <h3 className="font-semibold text-primary">Functional Cookies</h3>
                <p className="text-sm text-secondary-light">Remember your preferences and settings</p>
              </div>
              <Switch
                checked={preferences.functional}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, functional: checked }))}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-primary/10">
              <div>
                <h3 className="font-semibold text-primary">Analytics Cookies</h3>
                <p className="text-sm text-secondary-light">Help us improve our website by collecting usage information</p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, analytics: checked }))}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-primary/10">
              <div>
                <h3 className="font-semibold text-primary">Marketing Cookies</h3>
                <p className="text-sm text-secondary-light">Used to deliver personalized advertisements</p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, marketing: checked }))}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-6">
            <Link
              to="/"
              className="text-primary hover:text-secondary transition-colors"
            >
              ← Back to Home
            </Link>
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Save Preferences
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
