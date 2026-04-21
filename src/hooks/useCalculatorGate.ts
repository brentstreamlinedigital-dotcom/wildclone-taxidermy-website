import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const gateSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

export type GateFormData = z.infer<typeof gateSchema>;

/**
 * Handles the calculator lead-gate form.
 * On successful submission the lead details are sent to Web3Forms
 * (routed to info@wildclone.com via dashboard config), then the
 * onUnlock callback is fired to reveal the calculator.
 */
export const useCalculatorGate = (onUnlock: () => void) => {
  const form = useForm<GateFormData>({
    resolver: zodResolver(gateSchema),
    defaultValues: { firstName: "", lastName: "", email: "" },
  });

  const onSubmit = async (data: GateFormData) => {
    try {
      const accessKey =
        import.meta.env.VITE_WEB3FORMS_KEY ||
        "dbaa439b-0c43-4bf3-8082-9c3c0921270b";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: "Wildclone Calculator Access",
          subject: `Calculator Access — ${data.firstName} ${data.lastName}`,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          source: "Price Calculator Gate",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Welcome! Your price calculator is now unlocked.");
        localStorage.setItem("wildclone_calculator_unlocked", "true");
        onUnlock();
      } else {
        toast.error(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Failed to submit. Please check your connection and try again.");
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
  };
};
