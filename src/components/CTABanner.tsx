import { useState, useRef, FormEvent } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { X } from "lucide-react";

const countries = [
  "United States", "Canada", "United Kingdom", "Germany", "France", "Australia",
  "South Africa", "Namibia", "Mozambique", "Tanzania", "Zimbabwe", "Zambia",
  "Botswana", "Spain", "Italy", "Netherlands", "Sweden", "Norway", "Denmark",
  "Austria", "Switzerland", "New Zealand", "Mexico", "Argentina", "Brazil", "Other",
];

const animalCategories = [
  "Big Game", "Plains Game", "Predator", "Small Game or Primates", "Fish",
  "Exotic / International Species", "Other",
];

const CTABanner = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", country: "", animalCategory: "", message: "" });
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Thank you for your enquiry! We'll be in touch shortly.");
    setIsFormOpen(false);
    setForm({ firstName: "", lastName: "", email: "", country: "", animalCategory: "", message: "" });
  };

  return (
    <motion.section layout transition={{ type: "spring", stiffness: 200, damping: 25 }} ref={ref} className="relative py-32 lg:py-40 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <img src="/images/029577_a71f122453564c86bfe94d3e276e26bemv2.jpg" alt="Shipping crates" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />

      <AnimatedSection>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Ready to preserve your<br />trophy for a lifetime?
          </h2>
          <p className="font-body text-sm text-gray-light mb-10 max-w-xl mx-auto">
            Request a quote today and let our team of expert craftsmen transform your trophy into a lifelike masterpiece you'll treasure forever.
          </p>

          <AnimatePresence mode="wait">
            {!isFormOpen ? (
              <motion.button
                key="cta-button"
                onClick={() => setIsFormOpen(true)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="font-body text-sm px-8 py-4 bg-foreground text-background border border-foreground rounded transition-colors duration-300 cursor-pointer outline-none"
              >
                Contact Us
              </motion.button>
            ) : (
              <motion.div
                key="cta-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-2xl text-left"
              >
                <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-2xl relative hover:border-gray-medium transition-colors duration-500">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="absolute top-4 right-4 text-gray-medium hover:text-foreground transition-colors z-20 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-xs text-foreground mb-1.5 block">First name*</label>
                        <input type="text" required placeholder="Jane" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          className="w-full bg-gray-dark border border-border rounded-lg px-3 py-2.5 font-body text-sm text-foreground placeholder:text-gray-medium focus:outline-none focus:border-gray-light transition-colors" />
                      </div>
                      <div>
                        <label className="font-body text-xs text-foreground mb-1.5 block">Last Name*</label>
                        <input type="text" required placeholder="Smith" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          className="w-full bg-gray-dark border border-border rounded-lg px-3 py-2.5 font-body text-sm text-foreground placeholder:text-gray-medium focus:outline-none focus:border-gray-light transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="font-body text-xs text-foreground mb-1.5 block">How can we reach you?*</label>
                      <input type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-gray-dark border border-border rounded-lg px-3 py-2.5 font-body text-sm text-foreground placeholder:text-gray-medium focus:outline-none focus:border-gray-light transition-colors" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-xs text-foreground mb-1.5 block">Where Are you from?*</label>
                        <select required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
                          className="w-full bg-gray-dark border border-border rounded-lg px-3 py-2.5 font-body text-sm text-foreground focus:outline-none focus:border-gray-light transition-colors appearance-none">
                          <option value="">Select your country…</option>
                          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="font-body text-xs text-foreground mb-1.5 block">What kind of animal are you looking to preserve?</label>
                        <select value={form.animalCategory} onChange={(e) => setForm({ ...form, animalCategory: e.target.value })}
                          className="w-full bg-gray-dark border border-border rounded-lg px-3 py-2.5 font-body text-sm text-foreground focus:outline-none focus:border-gray-light transition-colors appearance-none">
                          <option value="">Select category</option>
                          {animalCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="font-body text-xs text-foreground mb-1.5 block">Message*</label>
                      <textarea required rows={4} placeholder="Type your message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-gray-dark border border-border rounded-lg px-3 py-2.5 font-body text-sm text-foreground placeholder:text-gray-medium focus:outline-none focus:border-gray-light transition-colors resize-none" />
                    </div>
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit"
                      className="w-full font-body text-sm px-8 py-3 bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground transition-all duration-300">
                      Submit Now
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnimatedSection>
    </motion.section>
  );
};

export default CTABanner;
