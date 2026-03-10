import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const faqItems = [
  {
    q: "How long does a taxidermy project take to complete?",
    a: "Timelines depend on the complexity and type of mount. Trusted by Hunters Worldwide, our streamlined process ensures efficiency. Custom and full mounts may take longer. We'll provide a timeline estimate when you submit your order.",
  },
  {
    q: "What do I need to do to preserve my animal before bringing it in?",
    a: "Proper field care is essential. Keep the skin cool, salt heavily, and avoid folding ears or lips. For shoulder mounts, cape well behind the shoulders. Contact us for a detailed field care guide specific to your species.",
  },
  {
    q: "Do you offer custom poses or habitat bases?",
    a: "Absolutely. We specialise in custom poses, habitat scenes, and unique bases tailored to your vision. Whether it's a dynamic action pose or a serene natural setting, our artisans bring your concept to life.",
  },
  {
    q: "Can you repair or restore old taxidermy pieces?",
    a: "Yes, we offer full restoration services for damaged or aging mounts. From re-painting and re-setting eyes to complete re-mounting, we can breathe new life into your treasured pieces.",
  },
  {
    q: "Do you handle exotic or international species?",
    a: "Yes. We work with species from across the globe and are experienced in CITES documentation and international shipping regulations. Our team ensures full compliance for import and export.",
  },
  {
    q: "What sets Wild Clone apart from other taxidermists?",
    a: "Our combination of artisan craftsmanship, cutting-edge technology, professional communication through our outfitter portal, a 14,000 sq ft facility with 4 branches, and being Trusted by Hunters Worldwide sets us apart in the industry.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Frequently</h2>
            <h2 className="font-heading text-3xl md:text-4xl text-muted-foreground">Asked Questions</h2>
            <p className="font-body text-sm text-muted-foreground mt-4 max-w-lg mx-auto">
              Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-card/50 transition-colors"
                >
                  <span className="font-body text-sm font-medium text-foreground pr-4">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
