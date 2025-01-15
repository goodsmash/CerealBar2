import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dateTimeSchema } from "@/lib/form-validation";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface DateTimeFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export const DateTimeForm = ({ onSubmit, defaultValues }: DateTimeFormProps) => {
  const form = useForm({
    resolver: zodResolver(dateTimeSchema),
    defaultValues: defaultValues || {
      date: new Date(),
      startTime: "",
      endTime: "",
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Event Date *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal mt-1"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {form.watch("date") ? (
                format(form.watch("date"), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={form.watch("date")}
              onSelect={(date) => form.setValue("date", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startTime">Start Time *</Label>
          <Input
            id="startTime"
            type="time"
            {...form.register("startTime")}
            className="mt-1"
            error={form.formState.errors.startTime?.message}
          />
        </div>

        <div>
          <Label htmlFor="endTime">End Time *</Label>
          <Input
            id="endTime"
            type="time"
            {...form.register("endTime")}
            className="mt-1"
            error={form.formState.errors.endTime?.message}
          />
        </div>
      </div>
    </form>
  );
};
