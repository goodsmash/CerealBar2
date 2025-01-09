import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  baseIceCreamFlavors,
  milkOptions,
  cereals,
  toppings,
  whippedCreamOptions,
  sizeOptions,
  dietaryPreferences,
  flavorProfiles,
} from "@/data/custom-order-data";

interface OrderItem {
  baseIceCream: string;
  size: string;
  milk: string;
  cereals: string[];
  toppings: string[];
  whippedCream: string | null;
  price: number;
  specialInstructions: string;
}

interface CerealBuilderProps {
  onAddToCart: (item: OrderItem) => void;
}

export const CerealBuilder = ({ onAddToCart }: CerealBuilderProps) => {
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState<OrderItem>({
    baseIceCream: "",
    size: "medium",
    milk: "whole",
    cereals: [],
    toppings: [],
    whippedCream: null,
    price: 0,
    specialInstructions: "",
  });
  const [dietary, setDietary] = useState({
    vegan: false,
    glutenFree: false,
    nutFree: false,
    dairyFree: false,
  });

  // Calculate total price whenever order changes
  useEffect(() => {
    let total = 0;
    
    // Base ice cream
    const baseIceCream = baseIceCreamFlavors.find(f => f.id === order.baseIceCream);
    if (baseIceCream) total += baseIceCream.price;
    
    // Size multiplier
    const size = sizeOptions.find(s => s.id === order.size);
    if (size) {
      total *= size.multiplier;
      total += size.price;
    }
    
    // Milk option
    const milk = milkOptions.find(m => m.id === order.milk);
    if (milk) total += milk.price;
    
    // Cereals
    order.cereals.forEach(cerealId => {
      const cereal = cereals.find(c => c.id === cerealId);
      if (cereal) total += cereal.price;
    });
    
    // Toppings
    order.toppings.forEach(toppingId => {
      const topping = toppings.flatMap(cat => cat.items).find(t => t.id === toppingId);
      if (topping) total += topping.price;
    });
    
    // Whipped cream
    if (order.whippedCream) {
      const cream = whippedCreamOptions.find(w => w.id === order.whippedCream);
      if (cream) total += cream.price;
    }
    
    setOrder(prev => ({ ...prev, price: parseFloat(total.toFixed(2)) }));
  }, [order.baseIceCream, order.size, order.milk, order.cereals, order.toppings, order.whippedCream]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-primary">Choose Your Base</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {baseIceCreamFlavors
                .filter(flavor => 
                  (!dietary.vegan || flavor.dietary.vegan) &&
                  (!dietary.dairyFree || flavor.dietary.vegan)
                )
                .map(flavor => (
                  <Card
                    key={flavor.id}
                    className={`p-4 cursor-pointer transition-all ${
                      order.baseIceCream === flavor.id
                        ? "border-primary border-2"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setOrder({ ...order, baseIceCream: flavor.id })}
                  >
                    <h3 className="font-semibold">{flavor.name}</h3>
                    <p className="text-sm text-muted-foreground">{flavor.description}</p>
                    <p className="text-sm text-primary mt-2">${flavor.price.toFixed(2)}</p>
                  </Card>
                ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-primary">Customize Your Order</h2>
            
            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold">Size</h3>
              <RadioGroup
                value={order.size}
                onValueChange={(value) => setOrder({ ...order, size: value })}
                className="grid grid-cols-3 gap-4"
              >
                {sizeOptions.map(size => (
                  <div key={size.id}>
                    <RadioGroupItem
                      value={size.id}
                      id={`size-${size.id}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`size-${size.id}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      {size.name}
                      <span className="text-sm text-muted-foreground">
                        {size.price > 0 ? `+$${size.price.toFixed(2)}` : "Base Price"}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Milk Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold">Milk Options</h3>
              <RadioGroup
                value={order.milk}
                onValueChange={(value) => setOrder({ ...order, milk: value })}
                className="grid grid-cols-2 gap-4"
              >
                {milkOptions
                  .filter(milk => 
                    (!dietary.vegan || milk.dietary.vegan) &&
                    (!dietary.dairyFree || milk.dietary.vegan)
                  )
                  .map(milk => (
                    <div key={milk.id}>
                      <RadioGroupItem
                        value={milk.id}
                        id={`milk-${milk.id}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`milk-${milk.id}`}
                        className="flex items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        {milk.name}
                        <span className="text-sm text-muted-foreground">
                          {milk.price > 0 ? `+$${milk.price.toFixed(2)}` : "Included"}
                        </span>
                      </Label>
                    </div>
                  ))}
              </RadioGroup>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-primary">Add Cereals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cereals
                .filter(cereal => 
                  (!dietary.glutenFree || cereal.dietary.glutenFree) &&
                  (!dietary.vegan || cereal.dietary.vegan)
                )
                .map(cereal => (
                  <Card
                    key={cereal.id}
                    className={`p-4 cursor-pointer transition-all ${
                      order.cereals.includes(cereal.id)
                        ? "border-primary border-2"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => {
                      const newCereals = order.cereals.includes(cereal.id)
                        ? order.cereals.filter(id => id !== cereal.id)
                        : [...order.cereals, cereal.id];
                      setOrder({ ...order, cereals: newCereals });
                    }}
                  >
                    <h3 className="font-semibold">{cereal.name}</h3>
                    <p className="text-sm text-primary mt-2">+${cereal.price.toFixed(2)}</p>
                  </Card>
                ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-primary">Choose Your Toppings</h2>
            {toppings.map(category => (
              <div key={category.category} className="space-y-4">
                <h3 className="font-semibold">{category.category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {category.items
                    .filter(item => 
                      (!dietary.nutFree || !item.allergens?.includes("tree nuts")) &&
                      (!dietary.dairyFree || !item.allergens?.includes("milk"))
                    )
                    .map(item => (
                      <Card
                        key={item.id}
                        className={`p-4 cursor-pointer transition-all ${
                          order.toppings.includes(item.id)
                            ? "border-primary border-2"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => {
                          const newToppings = order.toppings.includes(item.id)
                            ? order.toppings.filter(id => id !== item.id)
                            : [...order.toppings, item.id];
                          setOrder({ ...order, toppings: newToppings });
                        }}
                      >
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-primary mt-2">+${item.price.toFixed(2)}</p>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-primary">Review Your Order</h2>
            <Card className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Total Price</h3>
                <span className="text-xl font-bold text-primary">
                  ${order.price.toFixed(2)}
                </span>
              </div>
              
              <div className="space-y-2">
                <p><span className="font-medium">Base:</span> {
                  baseIceCreamFlavors.find(f => f.id === order.baseIceCream)?.name
                }</p>
                <p><span className="font-medium">Size:</span> {
                  sizeOptions.find(s => s.id === order.size)?.name
                }</p>
                <p><span className="font-medium">Milk:</span> {
                  milkOptions.find(m => m.id === order.milk)?.name
                }</p>
                {order.cereals.length > 0 && (
                  <p><span className="font-medium">Cereals:</span> {
                    order.cereals.map(id => cereals.find(c => c.id === id)?.name).join(", ")
                  }</p>
                )}
                {order.toppings.length > 0 && (
                  <p><span className="font-medium">Toppings:</span> {
                    order.toppings
                      .map(id => toppings
                        .flatMap(cat => cat.items)
                        .find(t => t.id === id)?.name
                      )
                      .join(", ")
                  }</p>
                )}
              </div>

              <div className="pt-4">
                <Button
                  className="w-full"
                  onClick={() => onAddToCart(order)}
                >
                  Add to Cart - ${order.price.toFixed(2)}
                </Button>
              </div>
            </Card>
          </motion.div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Dietary Preferences */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Dietary Preferences</h3>
        <div className="flex flex-wrap gap-4">
          {dietaryPreferences.map(pref => (
            <div key={pref.id} className="flex items-center space-x-2">
              <Switch
                id={pref.id}
                checked={dietary[pref.id as keyof typeof dietary]}
                onCheckedChange={(checked) =>
                  setDietary(prev => ({ ...prev, [pref.id]: checked }))
                }
              />
              <Label htmlFor={pref.id}>{pref.name}</Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4, 5].map((s) => (
          <Button
            key={s}
            variant={s === step ? "default" : "outline"}
            size="sm"
            onClick={() => setStep(s)}
            disabled={s > step && !order.baseIceCream}
          >
            {s}
          </Button>
        ))}
      </div>

      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setStep(step + 1)}
          disabled={step === 5 || (step === 1 && !order.baseIceCream)}
        >
          {step === 4 ? "Review Order" : "Next"}
        </Button>
      </div>
    </div>
  );
};