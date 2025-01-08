import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { menuItems } from "@/data/menu";
import { milkOptions, iceCreamOptions, whippedCreamOption } from "@/data/add-ons";
import { CerealItem } from "@/types/cereal";

interface Preference {
  sweetness: number;
  fruitiness: number;
  chocolate: number;
  nutty: number;
  dietary: {
    vegan: boolean;
    glutenFree: boolean;
    nutFree: boolean;
  };
}

interface CerealBuilderProps {
  onAddToCart: (item: CerealItem) => void;
}

export const CerealBuilder = ({ onAddToCart }: CerealBuilderProps) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<Preference>({
    sweetness: 50,
    fruitiness: 50,
    chocolate: 50,
    nutty: 50,
    dietary: {
      vegan: false,
      glutenFree: false,
      nutFree: false,
    },
  });
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [selectedBase, setSelectedBase] = useState("");
  const [customizations, setCustomizations] = useState({
    milk: milkOptions[0].id,
    iceCream: [],
    whippedCream: false,
    toppings: [],
  });

  // Generate recommendations based on preferences
  useEffect(() => {
    if (step === 2) {
      const getScore = (item: any) => {
        let score = 0;
        
        // Score based on description keywords
        const desc = item.description.toLowerCase();
        if (preferences.sweetness > 50 && desc.includes("sweet")) score += 2;
        if (preferences.fruitiness > 50 && (desc.includes("fruit") || desc.includes("berry"))) score += 2;
        if (preferences.chocolate > 50 && desc.includes("chocolate")) score += 2;
        if (preferences.nutty > 50 && (desc.includes("nut") || desc.includes("peanut"))) score += 2;

        // Dietary restrictions
        if (preferences.dietary.vegan && !desc.includes("vegan")) score -= 10;
        if (preferences.dietary.glutenFree && !desc.includes("gluten-free")) score -= 10;
        if (preferences.dietary.nutFree && (desc.includes("nut") || desc.includes("peanut"))) score -= 10;

        return score;
      };

      const scored = menuItems
        .filter(item => item.category === "Shakes" || item.category === "Bowls")
        .map(item => ({
          ...item,
          score: getScore(item),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      setRecommendations(scored);
    }
  }, [step, preferences]);

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Tell us your preferences</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Sweetness Level</Label>
            <Slider
              value={[preferences.sweetness]}
              onValueChange={([value]) => setPreferences(prev => ({ ...prev, sweetness: value }))}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <Label>Fruitiness Level</Label>
            <Slider
              value={[preferences.fruitiness]}
              onValueChange={([value]) => setPreferences(prev => ({ ...prev, fruitiness: value }))}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <Label>Chocolate Level</Label>
            <Slider
              value={[preferences.chocolate]}
              onValueChange={([value]) => setPreferences(prev => ({ ...prev, chocolate: value }))}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <Label>Nutty Level</Label>
            <Slider
              value={[preferences.nutty]}
              onValueChange={([value]) => setPreferences(prev => ({ ...prev, nutty: value }))}
              max={100}
              step={1}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h4 className="font-medium">Dietary Preferences</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={preferences.dietary.vegan}
                onCheckedChange={(checked) =>
                  setPreferences(prev => ({
                    ...prev,
                    dietary: { ...prev.dietary, vegan: checked }
                  }))
                }
              />
              <Label>Vegan</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={preferences.dietary.glutenFree}
                onCheckedChange={(checked) =>
                  setPreferences(prev => ({
                    ...prev,
                    dietary: { ...prev.dietary, glutenFree: checked }
                  }))
                }
              />
              <Label>Gluten Free</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={preferences.dietary.nutFree}
                onCheckedChange={(checked) =>
                  setPreferences(prev => ({
                    ...prev,
                    dietary: { ...prev.dietary, nutFree: checked }
                  }))
                }
              />
              <Label>Nut Free</Label>
            </div>
          </div>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={() => setStep(2)}
      >
        Get Recommendations
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold mb-4">Recommended for You</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((item) => (
            <Card
              key={item.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedBase === item.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedBase(item.id)}
            >
              <div className="aspect-square relative mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover rounded-md"
                />
              </div>
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <p className="mt-2 font-medium">${item.price.toFixed(2)}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(1)}
        >
          Back
        </Button>
        <Button
          disabled={!selectedBase}
          onClick={() => setStep(3)}
        >
          Customize
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold mb-4">Customize Your Order</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Choose your milk</Label>
            <RadioGroup
              value={customizations.milk}
              onValueChange={(value) =>
                setCustomizations(prev => ({ ...prev, milk: value }))
              }
            >
              <div className="grid grid-cols-2 gap-2">
                {milkOptions.map((milk) => (
                  <div key={milk.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={milk.id} id={milk.id} />
                    <Label htmlFor={milk.id}>{milk.name}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Ice Cream (Choose up to 2)</Label>
            <div className="grid grid-cols-2 gap-2">
              {iceCreamOptions.map((iceCream) => (
                <div key={iceCream.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={iceCream.id}
                    checked={customizations.iceCream.includes(iceCream.id)}
                    onChange={(e) => {
                      if (e.target.checked && customizations.iceCream.length < 2) {
                        setCustomizations(prev => ({
                          ...prev,
                          iceCream: [...prev.iceCream, iceCream.id]
                        }));
                      } else if (!e.target.checked) {
                        setCustomizations(prev => ({
                          ...prev,
                          iceCream: prev.iceCream.filter(id => id !== iceCream.id)
                        }));
                      }
                    }}
                  />
                  <Label htmlFor={iceCream.id}>{iceCream.name}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={customizations.whippedCream}
              onCheckedChange={(checked) =>
                setCustomizations(prev => ({ ...prev, whippedCream: checked }))
              }
            />
            <Label>Add Whipped Cream (+${whippedCreamOption.price.toFixed(2)})</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(2)}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            const baseItem = menuItems.find(item => item.id === selectedBase);
            if (baseItem) {
              onAddToCart({
                ...baseItem,
                customizations: {
                  milk: customizations.milk,
                  iceCream: customizations.iceCream,
                  whippedCream: customizations.whippedCream,
                }
              });
            }
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((number) => (
            <div
              key={number}
              className={`flex items-center ${
                number !== 3 ? "flex-1" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= number
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {number}
              </div>
              {number !== 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > number ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm">Preferences</span>
          <span className="text-sm">Recommendations</span>
          <span className="text-sm">Customize</span>
        </div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </motion.div>
    </div>
  );
};