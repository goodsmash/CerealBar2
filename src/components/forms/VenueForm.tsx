import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { venueSchema } from "@/lib/form-validation";

interface VenueFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export const VenueForm = ({ onSubmit, defaultValues }: VenueFormProps) => {
  const form = useForm({
    resolver: zodResolver(venueSchema),
    defaultValues: defaultValues || {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="address">Street Address *</Label>
        <Input
          id="address"
          {...form.register("address")}
          className="mt-1"
          error={form.formState.errors.address?.message}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            {...form.register("city")}
            className="mt-1"
            error={form.formState.errors.city?.message}
          />
        </div>

        <div>
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            {...form.register("state")}
            placeholder="MA"
            maxLength={2}
            className="mt-1"
            error={form.formState.errors.state?.message}
          />
        </div>

        <div>
          <Label htmlFor="zipCode">ZIP Code *</Label>
          <Input
            id="zipCode"
            {...form.register("zipCode")}
            placeholder="02135"
            maxLength={5}
            className="mt-1"
            error={form.formState.errors.zipCode?.message}
          />
        </div>
      </div>
    </form>
  );
};
