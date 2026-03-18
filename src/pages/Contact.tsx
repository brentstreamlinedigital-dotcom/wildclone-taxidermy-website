import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useContactForm } from "@/hooks/useContactForm";

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
  const { form, onSubmit, isSubmitting } = useContactForm();
  const { register, formState: { errors } } = form;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section ref={heroRef} className="pt-32 pb-8 bg-background overflow-hidden">
        <motion.div style={{ y: heroY }} className="container mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <div className="flex justify-center mb-8">
              <img src="/modernised logo bgless.jpeg" alt="Wild Clone Taxidermy Logo" className="h-24 w-auto md:h-32 object-contain" />
            </div>
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

          {/* Contact Form — first */}
          <AnimatedSection scale>
            <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto hover:border-gray-medium transition-colors duration-500 mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Send Us a Message</h2>
              <form onSubmit={onSubmit} className="space-y-6">
                <input type="hidden" {...register("bot-field")} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-sm text-foreground mb-2 block">First name*</label>
                    <input
                      {...register("firstName")}
                      type="text"
                      placeholder="Jane"
                      className={`w-full bg-gray-dark border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-gray-medium focus:outline-none focus:border-gray-light transition-colors ${errors.firstName ? 'border-red-500' : 'border-border'}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="font-body text-sm text-foreground mb-2 block">Last Name*</label>
                    <input
                      {...register("lastName")}
                      type="text"
                      placeholder="Smith"
                      className={`w-full bg-gray-dark border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-gray-medium focus:outline-none focus:border-gray-light transition-colors ${errors.lastName ? 'border-red-500' : 'border-border'}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="font-body text-sm text-foreground mb-2 block">How can we reach you?*</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full bg-gray-dark border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-gray-medium focus:outline-none focus:border-gray-light transition-colors ${errors.email ? 'border-red-500' : 'border-border'}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-sm text-foreground mb-2 block">Where Are you from?*</label>
                    <select
                      {...register("country")}
                      className={`w-full bg-gray-dark border rounded-lg px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gray-light transition-colors appearance-none ${errors.country ? 'border-red-500' : 'border-border'}`}
                    >
                      <option value="">Select your country…</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                  </div>
                  <div>
                    <label className="font-body text-sm text-foreground mb-2 block">What kind of animal are you looking to preserve?</label>
                    <select
                      {...register("animalCategory")}
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
                    {...register("message")}
                    rows={5}
                    placeholder="Type your message..."
                    className={`w-full bg-gray-dark border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-gray-medium focus:outline-none focus:border-gray-light transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-border'}`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-body text-sm px-8 py-4 bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Submit Now"}
                </motion.button>
              </form>
            </div>
          </AnimatedSection>

          {/* Branch Cards + Contact Details — second */}
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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

            <div className="text-center mb-12">
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

        </div>
      </section>

      {/* Branch Map */}
      <section className="pb-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="max-w-6xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Our Branches</h2>
              <p className="font-body text-sm text-muted-foreground text-center max-w-lg mx-auto mb-8">
                Wild Clone Taxidermy operates from multiple locations across South Africa.
              </p>
              <div className="rounded-2xl overflow-hidden border border-border">
                <img
                  src="/wild clone map.png"
                  alt="Wild Clone Taxidermy Branch Locations"
                  className="w-full h-auto object-contain max-h-[700px]"
                />
              </div>
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
