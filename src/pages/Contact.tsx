import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    animalCategory: "",
    message: "",
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your enquiry! We'll be in touch shortly.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section ref={heroRef} className="pt-32 pb-8 bg-background overflow-hidden">
        <motion.div style={{ y: heroY }} className="container mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-2">
              Contact Wild Clone
            </h1>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-gray-light tracking-tight mb-8">
              Taxidermy
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
              Reach out to our team to discuss your project, request a quote, or get expert advice on shipping and specimen preparation.
            </p>
          </AnimatedSection>
        </motion.div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-gray-medium transition-colors">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Port Elizabeth</h3>
                <p className="font-body text-sm text-muted-foreground">46 de Stades<br/>Colleen Glen<br/>Port Elizabeth</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-gray-medium transition-colors">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">North West</h3>
                <p className="font-body text-sm text-muted-foreground">N4 Sterkstroom<br/>Polkadraaispruit<br/>Groot Marico</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-gray-medium transition-colors">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Limpopo</h3>
                <p className="font-body text-sm text-muted-foreground">5 Warmbad Weg Rd<br/>Thabazimbi</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-gray-medium transition-colors">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Freestate</h3>
                <p className="font-body text-sm text-muted-foreground">Kouter 568<br/>Hertzogville</p>
              </div>
            </div>
            
            <div className="text-center mb-16">
              <div className="inline-flex flex-col md:flex-row items-center gap-6 md:gap-12 bg-gray-dark border border-border rounded-2xl p-8">
                <div>
                  <h4 className="font-heading text-sm text-gray-medium tracking-widest uppercase mb-2">Email Us</h4>
                  <a href="mailto:customer.services@wildclone.com" className="font-body text-lg text-foreground hover:text-gray-light transition-colors">customer.services@wildclone.com</a>
                </div>
                <div className="hidden md:block w-px h-12 bg-border"></div>
                <div>
                  <h4 className="font-heading text-sm text-gray-medium tracking-widest uppercase mb-2">Call Us</h4>
                  <div className="flex items-center gap-4">
                    <a href="tel:+27605350791" className="font-body text-lg text-foreground hover:text-gray-light transition-colors">+27 (60) 535-0791</a>
                    <span className="text-muted-foreground italic">or</span>
                    <a href="tel:+27605350703" className="font-body text-lg text-foreground hover:text-gray-light transition-colors">+27 (60) 535-0703</a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection scale>
            <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto hover:border-gray-medium transition-colors duration-500">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-sm text-foreground mb-2 block">First name*</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full bg-gray-dark border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-gray-medium focus:outline-none focus:border-gray-light transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm text-foreground mb-2 block">Last Name*</label>
                    <input
                      type="text"
                      required
                      placeholder="Smith"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full bg-gray-dark border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-gray-medium focus:outline-none focus:border-gray-light transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-body text-sm text-foreground mb-2 block">How can we reach you?*</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-gray-dark border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-gray-medium focus:outline-none focus:border-gray-light transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-sm text-foreground mb-2 block">Where Are you from?*</label>
                    <select
                      required
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="w-full bg-gray-dark border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gray-light transition-colors appearance-none"
                    >
                      <option value="">Select your country…</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-body text-sm text-foreground mb-2 block">What kind of animal are you looking to preserve?</label>
                    <select
                      value={form.animalCategory}
                      onChange={(e) => setForm({ ...form, animalCategory: e.target.value })}
                      className="w-full bg-gray-dark border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gray-light transition-colors appearance-none"
                    >
                      <option value="">Select category</option>
                      {animalCategories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-body text-sm text-foreground mb-2 block">Message*</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Type your message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-gray-dark border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-gray-medium focus:outline-none focus:border-gray-light transition-colors resize-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full font-body text-sm px-8 py-4 bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground transition-all duration-300"
                >
                  Submit Now
                </motion.button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <FAQSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Contact;
