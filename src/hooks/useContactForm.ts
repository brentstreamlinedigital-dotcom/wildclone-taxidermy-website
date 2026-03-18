import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  country: z.string().min(1, "Please select your country"),
  animalCategory: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
  "bot-field": z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const useContactForm = (onSuccess?: () => void) => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      animalCategory: "",
      message: "",
      "bot-field": "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check: if bot-field is filled, silently ignore
    if (data["bot-field"]) {
      console.log("Bot detected!");
      return;
    }

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || 'dbaa439b-0c43-4bf3-8082-9c3c0921270b';
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          ...data,
          from_name: "Wildclone Taxidermy Website",
          subject: `New Enquiry from ${data.firstName} ${data.lastName}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Thank you for your enquiry! We'll be in touch shortly.");
        form.reset();
        if (onSuccess) onSuccess();
      } else {
        toast.error(result.message || "Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send message. Please check your connection.");
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
  };
};
