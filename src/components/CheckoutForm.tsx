import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Package, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCart, CartItem } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const checkoutSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onSuccess?: () => void;
}

export function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const { toast } = useToast();
  const { items, total, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<{ orderReference: string; expiresAt: string } | null>(null);
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    company: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add documents to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof CheckoutFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-documents", {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company || undefined,
          items: items,
        },
      });

      if (error) {
        console.error("Error sending documents:", error);
        throw new Error(error.message || "Failed to process order");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setOrderResult({
        orderReference: data.orderReference,
        expiresAt: data.expiresAt,
      });

      clearCart();
      
      toast({
        title: "Order confirmed!",
        description: `Your documents have been sent to ${formData.email}`,
      });

      onSuccess?.();

    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Order failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderResult) {
    const expiryDate = new Date(orderResult.expiresAt);
    const formattedExpiry = expiryDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
          <CheckCircle className="h-8 w-8 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h3>
        <p className="text-muted-foreground mb-6">
          Your documents have been sent to your email.
        </p>
        
        <div className="bg-muted/50 rounded-lg p-6 mb-6 text-left space-y-4">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Order Reference</p>
              <p className="font-mono font-semibold text-foreground">{orderResult.orderReference}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Sent to</p>
              <p className="font-medium text-foreground">{formData.email}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Download links expire</p>
              <p className="font-medium text-foreground">{formattedExpiry}</p>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Please check your email (including spam folder) for download links.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="checkout-name">Full Name *</Label>
          <Input
            id="checkout-name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="checkout-email">Email Address *</Label>
          <Input
            id="checkout-email"
            type="email"
            placeholder="john@company.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          <p className="text-xs text-muted-foreground">
            Documents will be sent to this email address
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="checkout-company">Company Name (Optional)</Label>
          <Input
            id="checkout-company"
            placeholder="Acme Inc."
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className={errors.company ? "border-destructive" : ""}
          />
          {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-muted-foreground">Documents</span>
          <span className="font-medium">{items.length} items</span>
        </div>
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button 
        type="submit" 
        size="lg" 
        className="w-full" 
        disabled={isSubmitting || items.length === 0}
      >
        {isSubmitting ? (
          "Processing..."
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Complete Order & Receive Documents
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By completing this order, you'll receive download links via email. 
        Links expire after 48 hours.
      </p>
    </form>
  );
}
