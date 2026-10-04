import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import {
  Upload,
  X,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { Stepper, type StepItem } from "../components/react-bits/Stepper";
import { siteConfig } from "../config/siteConfig";
import type { RequestItem, SourcingRequest, ProductCategory } from "../types";
import { saveSourcingRequest } from "../services/storageService";

export const RequestPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRequest, setSubmittedRequest] = useState<SourcingRequest | null>(null);

  // Step 1: Items List (multi-item support)
  const [items, setItems] = useState<RequestItem[]>([
    {
      id: "item-init",
      productName: "",
      category: "other",
      productUrl: "",
      imageUrl: "",
      imageFileName: "",
      brand: "",
      quantity: 1,
      size: "",
      color: "",
      variantNotes: "",
      estimatedBudget: "",
      budgetCurrency: "PKR",
    },
  ]);

  // Step 2: Delivery Details
  const [delivery, setDelivery] = useState({
    countryCode: "PK",
    countryName: "Pakistan",
    city: "Karachi",
    postalCode: "",
    desiredDeliveryDate: "",
  });
  const [isUnsupportedCountry, setIsUnsupportedCountry] = useState(false);
  const [countryEnquirySubmitted, setCountryEnquirySubmitted] = useState(false);

  // Step 3: Contact Details
  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    whatsappCountryCode: "+92",
    whatsappNumber: "",
    preferredContact: "whatsapp" as "whatsapp" | "email" | "both",
    notes: "",
  });

  // Step 4: Terms
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Inline Validation Errors per step
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  // Pre-fill query parameters if present
  useEffect(() => {
    const query = searchParams.get("query");
    const productName = searchParams.get("productName");
    const category = searchParams.get("category") as ProductCategory | null;
    const brand = searchParams.get("brand");
    const referenceUrl = searchParams.get("url");

    if (query || productName) {
      setItems((prev) => [
        {
          ...prev[0],
          productName: productName || query || "",
          category: category || "other",
          brand: brand || "",
          productUrl: referenceUrl || "",
        },
        ...prev.slice(1),
      ]);
    }
  }, [searchParams]);

  const stepsConfig: StepItem[] = [
    { id: 1, title: "Product Details", description: "Item link, photo, or specs" },
    { id: 2, title: "Delivery Location", description: "Destination & timeline" },
    { id: 3, title: "Contact Details", description: "Where to send your quote" },
    { id: 4, title: "Review & Submit", description: "Verify order specifications" },
  ];

  // Item management
  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `item-${Date.now()}`,
        productName: "",
        category: "other",
        productUrl: "",
        imageUrl: "",
        imageFileName: "",
        brand: "",
        quantity: 1,
        size: "",
        color: "",
        variantNotes: "",
        estimatedBudget: "",
        budgetCurrency: "PKR",
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: keyof RequestItem, value: any) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WEBP).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      alert("File size exceeds 8MB. Please choose a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      updateItem(id, "imageUrl", result);
      updateItem(id, "imageFileName", file.name);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (id: string) => {
    updateItem(id, "imageUrl", "");
    updateItem(id, "imageFileName", "");
  };

  // Validation functions
  const validateStep1 = () => {
    const errors: Record<string, string> = {};

    items.forEach((item, index) => {
      const hasDescription = item.productName.trim().length >= 3;
      const hasUrl = Boolean(item.productUrl && item.productUrl.trim().length > 5);
      const hasImage = Boolean(item.imageUrl && item.imageUrl.length > 0);

      if (!hasDescription && !hasUrl && !hasImage) {
        errors[`item_${index}`] =
          "Please provide at least a product description, link, or photo for this item.";
      }
    });

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};

    if (isUnsupportedCountry) {
      errors.delivery =
        "The selected destination is currently not on our active delivery schedule. Please submit an availability enquiry or select Pakistan / UAE.";
    }

    if (!delivery.city.trim()) {
      errors.city = "Please specify your destination city.";
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const errors: Record<string, string> = {};

    if (!contact.fullName.trim() || contact.fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidEmail = emailRegex.test(contact.email.trim());
    const hasValidPhone = contact.whatsappNumber.trim().length >= 7;

    if (!hasValidEmail && !hasValidPhone) {
      errors.contact = "Please provide either a valid Email address or WhatsApp number.";
    } else {
      if (contact.email.trim() && !hasValidEmail) {
        errors.email = "Please enter a valid email format.";
      }
      if (contact.whatsappNumber.trim() && !hasValidPhone) {
        errors.whatsappNumber = "Please enter a valid phone number.";
      }
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep4 = () => {
    const errors: Record<string, string> = {};
    if (!termsAccepted) {
      errors.terms = "Please acknowledge that this is a quotation request and agree to the request terms.";
    }
    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    if (currentStep === 1) isValid = validateStep1();
    if (currentStep === 2) isValid = validateStep2();
    if (currentStep === 3) isValid = validateStep3();

    if (isValid) {
      setStepErrors({});
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setStepErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  // Submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    // Simulate reliable persistence
    setTimeout(() => {
      try {
        const randomRefSuffix = Math.floor(1000 + Math.random() * 9000);
        const refNumber = `TGS-2026-${randomRefSuffix}`;

        const newRequest: SourcingRequest = {
          id: `req-${Date.now()}`,
          referenceNumber: refNumber,
          createdAt: new Date().toISOString(),
          status: "SUBMITTED",
          items: items.map((it) => ({
            ...it,
            productName: it.productName.trim() || "Requested Item (Photo / Link)",
          })),
          delivery,
          contact,
          timeline: [
            {
              status: "SUBMITTED",
              label: "Request Submitted",
              date: "Just now",
              description: "Received by Dubai sourcing concierge.",
              completed: true,
              current: true,
            },
            {
              status: "REVIEWING",
              label: "Boutique Verification",
              date: "Expected in 4–12 hours",
              description: "Checking availability with UAE flagships and stockists.",
              completed: false,
            },
            {
              status: "QUOTE_READY",
              label: "Itemised Quotation",
              date: "Pending",
              description: "Breakdown of item price, service fee, and express shipping.",
              completed: false,
            },
            {
              status: "AWAITING_PAYMENT",
              label: "Payment & Approval",
              date: "Pending",
              description: "Customer confirms quotation and payment.",
              completed: false,
            },
            {
              status: "PURCHASED",
              label: "Procured in Dubai",
              date: "Pending",
              description: "Item purchased in store with original receipt.",
              completed: false,
            },
            {
              status: "SHIPPED",
              label: "Dispatched via Air Courier",
              date: "Pending",
              description: "Dispatched from Dubai to Pakistan destination.",
              completed: false,
            },
            {
              status: "DELIVERED",
              label: "Delivered to Doorstep",
              date: "Pending",
              description: "Final doorstep delivery handover.",
              completed: false,
            },
          ],
        };

        saveSourcingRequest(newRequest);
        setSubmittedRequest(newRequest);
        setIsSubmitting(false);

        // Celebration confetti
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ["#777348", "#111111", "#FFFFF0", "#E1DECE"],
          });
        } catch {
          // ignore if canvas not supported
        }

        window.scrollTo({ top: 100, behavior: "smooth" });
      } catch (err: any) {
        setIsSubmitting(false);
        setSubmitError(
          "We could not save your request. Please try again. Your entered data has been preserved."
        );
      }
    }, 700);
  };

  // If successfully submitted, render Success Confirmation View
  if (submittedRequest) {
    const whatsappLink = `https://wa.me/${siteConfig.brand.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      `Hello The Gulf Store! I have just submitted a sourcing request with reference ${submittedRequest.referenceNumber} for ${submittedRequest.items[0]?.productName}. Please check availability.`
    )}`;

    return (
      <div className="py-16 bg-ivory min-h-[80vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-border-tgs p-8 sm:p-12 shadow-elevated text-center"
          >
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-olive/15 text-olive flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-widest text-olive block mb-2">
              Request Received Successfully
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-tgs-black mb-3">
              We’re on it.
            </h1>
            <p className="text-text-secondary text-sm sm:text-base max-w-lg mx-auto mb-8 font-sans">
              Your personal shopping request has been logged with our Dubai concierge team. We will check boutique availability and prepare an itemised quotation for you.
            </p>

            {/* Reference Badge */}
            <div className="bg-beige/80 rounded-2xl border border-border-tgs p-6 max-w-md mx-auto mb-8 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted block mb-1">
                Your Request Reference Number
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-bold tracking-wider text-tgs-black block select-all">
                {submittedRequest.referenceNumber}
              </span>
              <p className="text-xs text-text-secondary mt-2">
                Keep this reference number for status tracking or WhatsApp support inquiries.
              </p>
            </div>

            {/* Next Steps Box */}
            <div className="text-left bg-ivory rounded-2xl border border-border-tgs p-6 mb-8 max-w-xl mx-auto space-y-3">
              <h3 className="font-serif text-lg font-medium text-tgs-black flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-olive" />
                <span>What happens next?</span>
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-text-secondary">
                <li>
                  <strong className="text-tgs-black">Boutique Check:</strong> We visit UAE flagships or stockists to confirm your items in your exact size/color.
                </li>
                <li>
                  <strong className="text-tgs-black">Itemised Quote:</strong> You will receive a breakdown of store price, concierge fee, and international air shipping.
                </li>
                <li>
                  <strong className="text-tgs-black">Zero Obligation:</strong> You only proceed if you are completely happy with the quote.
                </li>
              </ol>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={`/track?ref=${submittedRequest.referenceNumber}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-tgs-black text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-olive transition-colors shadow-sm"
              >
                <span>Track Request Status</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-border-tgs text-tgs-black text-xs font-semibold uppercase tracking-wider hover:bg-beige transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-olive" />
                <span>Message on WhatsApp</span>
              </a>
            </div>

            {/* Demo Note */}
            <div className="mt-8 pt-6 border-t border-border-tgs/60 text-xs text-text-muted">
              <span>Demo mode active: Your request has been stored locally in your browser. You can click &quot;Track Request Status&quot; above at any time.</span>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-beige border border-border-tgs text-xs font-semibold uppercase tracking-widest text-olive mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personal Sourcing Form</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-tgs-black mb-3">
            Request a Product
          </h1>
          <p className="text-sm sm:text-base text-text-secondary">
            Tell us what you desire from Dubai. We will check availability and prepare an itemised quotation with zero obligation.
          </p>
        </div>

        {/* Stepper Component */}
        <Stepper
          steps={stepsConfig}
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
          allowStepNavigation={true}
        />

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-border-tgs shadow-elevated p-6 sm:p-10 relative">
          {submitError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* STEP 1: Product details */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="font-serif text-2xl font-medium text-tgs-black mb-1">
                    Step 1: Product Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-secondary">
                    Provide a description, web link, or photo for each item you want us to source from Dubai.
                  </p>
                </div>

                {/* Items Loop */}
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-5 sm:p-7 rounded-2xl bg-ivory/50 border border-border-tgs space-y-5 relative"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-border-tgs">
                      <span className="font-serif text-lg font-medium text-tgs-black flex items-center gap-2">
                        <span>Item #{index + 1}</span>
                        {items.length > 1 && (
                          <span className="text-xs text-text-muted font-sans">
                            ({item.productName || "Untitled item"})
                          </span>
                        )}
                      </span>

                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 p-1 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove Item</span>
                        </button>
                      )}
                    </div>

                    {stepErrors[`item_${index}`] && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{stepErrors[`item_${index}`]}</span>
                      </div>
                    )}

                    {/* Product Name or Description */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                        Product Name or Description <span className="text-olive">*</span>
                      </label>
                      <input
                        type="text"
                        value={item.productName}
                        onChange={(e) => updateItem(item.id, "productName", e.target.value)}
                        placeholder="e.g. Omega Speedmaster Moonwatch 42mm, or Zara Linen Shirt"
                        className="w-full px-4 py-3 bg-white rounded-xl border border-border-tgs text-sm text-tgs-black placeholder:text-text-muted focus:ring-2 focus:ring-olive/40 focus:outline-none"
                      />
                    </div>

                    {/* URL & Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                          Product URL / Link <span className="text-text-muted">(Optional)</span>
                        </label>
                        <input
                          type="url"
                          value={item.productUrl || ""}
                          onChange={(e) => updateItem(item.id, "productUrl", e.target.value)}
                          placeholder="https://..."
                          className="w-full px-4 py-3 bg-white rounded-xl border border-border-tgs text-sm text-tgs-black placeholder:text-text-muted focus:ring-2 focus:ring-olive/40 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                          Category <span className="text-olive">*</span>
                        </label>
                        <select
                          value={item.category}
                          onChange={(e) => updateItem(item.id, "category", e.target.value)}
                          className="w-full px-4 py-3 bg-white rounded-xl border border-border-tgs text-sm text-tgs-black focus:ring-2 focus:ring-olive/40 focus:outline-none"
                        >
                          <option value="other">Select a category...</option>
                          <option value="watches">Watches & Horology</option>
                          <option value="clothing">Clothing & Apparel</option>
                          <option value="shoes">Shoes & Sneakers</option>
                          <option value="bags-accessories">Bags & Accessories</option>
                          <option value="beauty-skincare">Beauty & Fragrance</option>
                          <option value="bottles-essentials">Bottles & Everyday Essentials</option>
                        </select>
                      </div>
                    </div>

                    {/* Image Upload with Preview & Remove controls */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                        Photo or Screenshot <span className="text-text-muted">(Optional, recommended)</span>
                      </label>

                      {item.imageUrl ? (
                        <div className="relative inline-block border border-border-tgs rounded-xl p-2 bg-white shadow-xs">
                          <img
                            src={item.imageUrl}
                            alt="Uploaded preview"
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(item.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md hover:bg-red-700"
                            title="Remove photo"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <p className="text-[10px] text-text-secondary mt-1 text-center truncate max-w-[120px]">
                            {item.imageFileName || "Uploaded image"}
                          </p>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border-tgs rounded-2xl cursor-pointer hover:border-olive/50 bg-white/70 transition-colors">
                          <Upload className="w-6 h-6 text-olive mb-2" />
                          <span className="text-xs font-medium text-tgs-black">
                            Upload a product screenshot or photo
                          </span>
                          <span className="text-[11px] text-text-muted mt-1">
                            JPG, PNG, or WEBP up to 8MB
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(item.id, e)}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* Brand, Quantity, Size/Color, Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                          Brand
                        </label>
                        <input
                          type="text"
                          value={item.brand || ""}
                          onChange={(e) => updateItem(item.id, "brand", e.target.value)}
                          placeholder="e.g. Rolex, Nike, Zara"
                          className="w-full px-3 py-2.5 bg-white rounded-xl border border-border-tgs text-sm text-tgs-black focus:ring-2 focus:ring-olive/40 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                          Quantity
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={50}
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(item.id, "quantity", parseInt(e.target.value) || 1)
                          }
                          className="w-full px-3 py-2.5 bg-white rounded-xl border border-border-tgs text-sm text-tgs-black focus:ring-2 focus:ring-olive/40 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                          Size / Color / Variant
                        </label>
                        <input
                          type="text"
                          value={item.size || ""}
                          onChange={(e) => updateItem(item.id, "size", e.target.value)}
                          placeholder="e.g. EU 42, Beige, 100ml"
                          className="w-full px-3 py-2.5 bg-white rounded-xl border border-border-tgs text-sm text-tgs-black focus:ring-2 focus:ring-olive/40 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                          Budget (Optional)
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={item.estimatedBudget || ""}
                            onChange={(e) => updateItem(item.id, "estimatedBudget", e.target.value)}
                            placeholder="Amount"
                            className="w-full px-3 py-2.5 bg-white rounded-l-xl border border-r-0 border-border-tgs text-sm text-tgs-black focus:ring-2 focus:ring-olive/40 focus:outline-none"
                          />
                          <select
                            value={item.budgetCurrency}
                            onChange={(e) =>
                              updateItem(item.id, "budgetCurrency", e.target.value as any)
                            }
                            className="px-2 py-2.5 bg-beige rounded-r-xl border border-border-tgs text-xs text-tgs-black font-semibold focus:outline-none"
                          >
                            <option value="PKR">PKR</option>
                            <option value="AED">AED</option>
                            <option value="USD">USD</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Another Item Button */}
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={addItem}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-beige border border-border-tgs text-xs font-semibold uppercase tracking-wider text-tgs-black hover:bg-border-tgs/60 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-olive" />
                    <span>Add Another Item to Request</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Delivery Details */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-serif text-2xl font-medium text-tgs-black mb-1">
                    Step 2: Delivery Destination
                  </h2>
                  <p className="text-xs sm:text-sm text-text-secondary">
                    Our initial active delivery corridor is Dubai to Pakistan. Additional destinations can be evaluated by enquiry.
                  </p>
                </div>

                {stepErrors.delivery && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{stepErrors.delivery}</span>
                  </div>
                )}

                {/* Destination Country Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                    Destination Country <span className="text-olive">*</span>
                  </label>
                  <select
                    value={delivery.countryCode}
                    onChange={(e) => {
                      const selected = siteConfig.supportedCountries.find(
                        (c) => c.code === e.target.value
                      );
                      if (selected) {
                        setDelivery({
                          ...delivery,
                          countryCode: selected.code,
                          countryName: selected.name,
                          city: selected.cities?.[0] || "",
                        });
                        setIsUnsupportedCountry(!selected.supported);
                      }
                    }}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-border-tgs text-sm text-tgs-black focus:ring-2 focus:ring-olive/40 focus:outline-none"
                  >
                    {siteConfig.supportedCountries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name} {c.supported ? "— Active Route" : "— Enquiry Only"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Route Information Box */}
                {delivery.countryCode === "PK" ? (
                  <div className="p-4 bg-beige/80 rounded-2xl border border-border-tgs text-xs text-text-secondary space-y-2">
                    <div className="font-semibold text-tgs-black flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-olive" />
                      <span>Active Corridor: Dubai → Pakistan Door-to-Door</span>
                    </div>
                    <p>
                      Direct air transit to major cities across Pakistan. Estimated transit 7–21 business days once purchased in Dubai.
                    </p>
                  </div>
                ) : isUnsupportedCountry ? (
                  <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-3">
                    <div className="font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Destination Availability Notice</span>
                    </div>
                    <p>
                      {delivery.countryName} is not yet on our standard automated delivery corridor. We can still prepare a custom air consignment quote for you.
                    </p>
                    {!countryEnquirySubmitted ? (
                      <button
                        type="button"
                        onClick={() => setCountryEnquirySubmitted(true)}
                        className="px-4 py-2 bg-amber-800 text-white rounded-lg font-medium hover:bg-amber-900"
                      >
                        Submit Delivery Route Enquiry
                      </button>
                    ) : (
                      <div className="font-semibold text-green-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Enquiry noted. Our team will verify carrier feasibility.</span>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* City and Postal Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                      City <span className="text-olive">*</span>
                    </label>
                    <input
                      type="text"
                      value={delivery.city}
                      onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                      placeholder="e.g. Lahore, Karachi, Islamabad"
                      className="w-full px-4 py-3 bg-white rounded-xl border border-border-tgs text-sm text-tgs-black placeholder:text-text-muted focus:ring-2 focus:ring-olive/40 focus:outline-none"
                    />
                    {stepErrors.city && (
                      <p className="text-[11px] text-red-600 mt-1">{stepErrors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                      Postal Code / Area Code <span className="text-text-muted">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={delivery.postalCode}
                      onChange={(e) => setDelivery({ ...delivery, postalCode: e.target.value })}
                      placeholder="e.g. 54000 or DHA Phase 5"
                      className="w-full px-4 py-3 bg-white rounded-xl border border-border-tgs text-sm text-tgs-black placeholder:text-text-muted focus:ring-2 focus:ring-olive/40 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Desired Date */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                    Desired Delivery Target <span className="text-text-muted">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    value={delivery.desiredDeliveryDate}
                    onChange={(e) =>
                      setDelivery({ ...delivery, desiredDeliveryDate: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white rounded-xl border border-border-tgs text-sm text-tgs-black focus:ring-2 focus:ring-olive/40 focus:outline-none"
                  />
                  <p className="text-[11px] text-text-muted mt-1">
                    Helpful if this is for an upcoming event, wedding, or birthday.
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Contact Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-serif text-2xl font-medium text-tgs-black mb-1">
                    Step 3: Contact & Communication
                  </h2>
                  <p className="text-xs sm:text-sm text-text-secondary">
                    Provide the channel where you would like to receive your official itemised quotation.
                  </p>
                </div>

                {stepErrors.contact && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{stepErrors.contact}</span>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                    Full Name <span className="text-olive">*</span>
                  </label>
                  <input
                    type="text"
                    value={contact.fullName}
                    onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white rounded-xl border border-border-tgs text-sm text-tgs-black placeholder:text-text-muted focus:ring-2 focus:ring-olive/40 focus:outline-none"
                  />
                  {stepErrors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1">{stepErrors.fullName}</p>
                  )}
                </div>

                {/* Email & WhatsApp Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-white rounded-xl border border-border-tgs text-sm text-tgs-black placeholder:text-text-muted focus:ring-2 focus:ring-olive/40 focus:outline-none"
                    />
                    {stepErrors.email && (
                      <p className="text-[11px] text-red-600 mt-1">{stepErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                      WhatsApp Number
                    </label>
                    <div className="flex">
                      <select
                        value={contact.whatsappCountryCode}
                        onChange={(e) =>
                          setContact({ ...contact, whatsappCountryCode: e.target.value })
                        }
                        className="px-3 py-3 bg-beige rounded-l-xl border border-r-0 border-border-tgs text-xs text-tgs-black font-semibold focus:outline-none"
                      >
                        <option value="+92">+92 (PK)</option>
                        <option value="+971">+971 (AE)</option>
                        <option value="+966">+966 (SA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+1">+1 (US)</option>
                      </select>
                      <input
                        type="tel"
                        value={contact.whatsappNumber}
                        onChange={(e) =>
                          setContact({ ...contact, whatsappNumber: e.target.value })
                        }
                        placeholder="300 1234567"
                        className="w-full px-4 py-3 bg-white rounded-r-xl border border-border-tgs text-sm text-tgs-black placeholder:text-text-muted focus:ring-2 focus:ring-olive/40 focus:outline-none"
                      />
                    </div>
                    {stepErrors.whatsappNumber && (
                      <p className="text-[11px] text-red-600 mt-1">{stepErrors.whatsappNumber}</p>
                    )}
                  </div>
                </div>

                {/* Preferred Method */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                    Preferred Contact Channel
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-tgs-black cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="whatsapp"
                        checked={contact.preferredContact === "whatsapp"}
                        onChange={() => setContact({ ...contact, preferredContact: "whatsapp" })}
                        className="text-olive focus:ring-olive"
                      />
                      <span>WhatsApp (Recommended for fast quotes)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-tgs-black cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={contact.preferredContact === "email"}
                        onChange={() => setContact({ ...contact, preferredContact: "email" })}
                        className="text-olive focus:ring-olive"
                      />
                      <span>Email</span>
                    </label>
                  </div>
                </div>

                {/* Optional Notes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5">
                    Additional Instructions or Notes <span className="text-text-muted">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={contact.notes}
                    onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                    placeholder="e.g. Please verify that the watch comes with international warranty card, or require gift packaging."
                    className="w-full px-4 py-3 bg-white rounded-xl border border-border-tgs text-sm text-tgs-black placeholder:text-text-muted focus:ring-2 focus:ring-olive/40 focus:outline-none"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 4: Review and Submit */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-serif text-2xl font-medium text-tgs-black mb-1">
                    Step 4: Review Your Sourcing Request
                  </h2>
                  <p className="text-xs sm:text-sm text-text-secondary">
                    Review your items, delivery destination, and contact channels before requesting your quotation.
                  </p>
                </div>

                {/* Items Summary Table */}
                <div className="bg-ivory/60 rounded-2xl border border-border-tgs p-5 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-border-tgs">
                    <span className="font-serif text-lg font-medium text-tgs-black">
                      Requested Items ({items.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-semibold text-olive hover:underline"
                    >
                      Edit Items
                    </button>
                  </div>

                  <div className="space-y-3">
                    {items.map((it, idx) => (
                      <div
                        key={it.id}
                        className="flex items-start justify-between gap-4 p-3 bg-white rounded-xl border border-border-tgs/70"
                      >
                        <div className="flex items-start gap-3">
                          {it.imageUrl ? (
                            <img
                              src={it.imageUrl}
                              alt={it.productName}
                              className="w-12 h-12 rounded-lg object-cover border border-border-tgs shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-beige flex items-center justify-center text-text-muted text-xs font-mono shrink-0">
                              #{idx + 1}
                            </div>
                          )}
                          <div>
                            <div className="text-xs sm:text-sm font-semibold text-tgs-black">
                              {it.productName || "Product photo / link provided"}
                            </div>
                            <div className="text-[11px] text-text-secondary flex flex-wrap gap-x-2 gap-y-0.5 mt-0.5">
                              {it.brand && <span>Brand: {it.brand}</span>}
                              <span>Qty: {it.quantity}</span>
                              {it.size && <span>Specs: {it.size}</span>}
                              {it.estimatedBudget && (
                                <span>Budget: {it.estimatedBudget} {it.budgetCurrency}</span>
                              )}
                            </div>
                            {it.productUrl && (
                              <a
                                href={it.productUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-olive hover:underline flex items-center gap-1 mt-1"
                              >
                                <span>View Reference Link</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery & Contact Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Delivery summary */}
                  <div className="bg-ivory/60 rounded-2xl border border-border-tgs p-5">
                    <div className="flex items-center justify-between pb-2 border-b border-border-tgs mb-2">
                      <span className="font-serif text-base font-medium text-tgs-black">
                        Delivery Destination
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-xs font-semibold text-olive hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-xs text-text-secondary space-y-1">
                      <p>
                        <strong>Country:</strong> {delivery.countryName}
                      </p>
                      <p>
                        <strong>City:</strong> {delivery.city}
                      </p>
                      {delivery.postalCode && (
                        <p>
                          <strong>Area/Postal:</strong> {delivery.postalCode}
                        </p>
                      )}
                      {delivery.desiredDeliveryDate && (
                        <p>
                          <strong>Target Date:</strong> {delivery.desiredDeliveryDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact summary */}
                  <div className="bg-ivory/60 rounded-2xl border border-border-tgs p-5">
                    <div className="flex items-center justify-between pb-2 border-b border-border-tgs mb-2">
                      <span className="font-serif text-base font-medium text-tgs-black">
                        Contact Details
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-xs font-semibold text-olive hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-xs text-text-secondary space-y-1">
                      <p>
                        <strong>Name:</strong> {contact.fullName}
                      </p>
                      {contact.email && (
                        <p>
                          <strong>Email:</strong> {contact.email}
                        </p>
                      )}
                      {contact.whatsappNumber && (
                        <p>
                          <strong>WhatsApp:</strong> {contact.whatsappCountryCode}{" "}
                          {contact.whatsappNumber}
                        </p>
                      )}
                      <p>
                        <strong>Preferred:</strong> {contact.preferredContact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Important Quote Notice */}
                <div className="p-4 bg-beige rounded-2xl border border-border-tgs text-xs text-text-secondary space-y-1">
                  <p className="font-semibold text-tgs-black">
                    Zero-Obligation Quotation Process:
                  </p>
                  <p>
                    Submitting this form does NOT charge your card or execute a purchase. It alerts our Dubai shoppers to check retail availability and compile an itemised price breakdown for your review.
                  </p>
                </div>

                {/* Terms Acknowledgement */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 rounded text-olive focus:ring-olive border-border-tgs"
                    />
                    <span className="text-xs text-text-secondary">
                      I understand that submitting this request initiates a quote calculation and not a finalized purchase. I agree to the{" "}
                      <Link to="/#faqs" className="text-tgs-black underline font-medium">
                        Request Terms
                      </Link>{" "}
                      and{" "}
                      <span className="text-tgs-black font-medium">Privacy Policy</span>.
                    </span>
                  </label>
                  {stepErrors.terms && (
                    <p className="text-[11px] text-red-600 mt-1">{stepErrors.terms}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="mt-10 pt-6 border-t border-border-tgs flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border-tgs text-xs font-semibold uppercase tracking-wider text-tgs-black hover:bg-beige transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Step</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-tgs-black text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-olive transition-colors shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-tgs-black text-ivory text-xs font-bold uppercase tracking-wider hover:bg-olive transition-colors shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Submit Sourcing Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
