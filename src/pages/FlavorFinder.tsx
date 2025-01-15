import { Button } from "@/components/ui/button";
import { enhancedCereals, CerealType } from "@/lib/menu-data/enhanced-cereals";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

type Preference = {
  flavor: string;
  texture: string;
};

type RecommendationResult = {
  cereal: CerealType;
  score: number;
};

export const FlavorFinder = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<Preference>({
    flavor: "",
    texture: "",
  });
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);

  const flavorOptions = [
    { value: "sweet", label: "Sweet & Sugary" },
    { value: "chocolate", label: "Rich Chocolate" },
    { value: "fruity", label: "Fruity & Fresh" },
    { value: "cinnamon", label: "Warm Cinnamon" },
  ];

  const textureOptions = [
    { value: "crunchy", label: "Extra Crunchy" },
    { value: "chewy", label: "Soft & Chewy" },
    { value: "crispy", label: "Light & Crispy" },
    { value: "mixed", label: "Mix of Textures" },
  ];

  const findRecommendations = () => {
    const results = enhancedCereals.map(cereal => {
      let score = 0;
      
      // Score based on flavor match
      if (cereal.flavors.includes(preferences.flavor)) score += 2;
      if (cereal.texture.includes(preferences.texture)) score += 2;
      
      // Bonus points for complementary flavors
      if (preferences.flavor === "sweet" && cereal.flavors.includes("fruity")) score += 1;
      if (preferences.flavor === "chocolate" && cereal.flavors.includes("rich")) score += 1;
      
      return { cereal, score };
    });

    // Sort by score and get top 3
    const topRecommendations = results
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setRecommendations(topRecommendations);
    setStep(3);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Flavor Finder
          </h1>
          <p className="mt-4 text-secondary-light">
            Let's find your perfect ice cream and cereal combination!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative pt-4">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
            <motion.div
              initial={{ width: "33.3%" }}
              animate={{ width: `${(step / 3) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
            />
          </div>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-primary">What flavors do you love?</h2>
            <div className="grid grid-cols-2 gap-4">
              {flavorOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={preferences.flavor === option.value ? "default" : "outline"}
                  className="h-24 text-lg"
                  onClick={() => {
                    setPreferences({ ...preferences, flavor: option.value });
                    setStep(2);
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-primary">What texture do you prefer?</h2>
            <div className="grid grid-cols-2 gap-4">
              {textureOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={preferences.texture === option.value ? "default" : "outline"}
                  className="h-24 text-lg"
                  onClick={() => {
                    setPreferences({ ...preferences, texture: option.value });
                    findRecommendations();
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-semibold text-primary">Your Perfect Matches!</h2>
            <div className="grid gap-6">
              {recommendations.map(({ cereal, score }, index) => (
                <motion.div
                  key={cereal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background/50 border border-primary/10 rounded-lg p-6 flex items-center gap-6"
                >
                  <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                    {/* You can add cereal images here */}
                    <span className="text-4xl">🍨</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary">{cereal.name}</h3>
                    <p className="text-secondary-light mt-1">{cereal.description}</p>
                    <div className="mt-2 flex gap-2">
                      {cereal.pairings.map((pairing) => (
                        <span
                          key={pairing}
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {pairing}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center gap-4 pt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setStep(1);
                  setPreferences({ flavor: "", texture: "" });
                }}
              >
                Start Over
              </Button>
              <Link to="/menu">
                <Button>View Full Menu</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
