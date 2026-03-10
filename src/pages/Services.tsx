
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Mounting",
    desc: "Our core service - from shoulder mounts to full custom builds. Each piece is crafted with museum-quality precision by our skilled artisans, preserving every detail of your trophy for a lifetime.",
    href: "/mounts",
    external: false,
  },
  {
    title: "Tanning",
    desc: "Professional skin preparation and tanning using industry-leading techniques. We ensure every hide is treated to the highest standard for durability and a natural, supple finish.",
    href: "/services/tanning",
    external: false,
  },
  {
    title: "Dip & Pack",
    desc: "Chemical treatment and professional packing services for safe export of your trophies. We handle all dipping requirements to meet international import standards.",
    href: "/services/dip-pack",
    external: false,
  },
  {
    title: "Leather Worx",
    desc: "Premium bespoke leather goods handcrafted to complement your trophies and lifestyle. From custom leather panels to decorative pieces, every item is made with care and precision.",
    href: "/services/leatherworks",
    external: false,
  },
  {
    title: "Wyldecraft",
    desc: "Handcrafted woodwork to mount, frame, and showcase your trophies. Custom shields, plaques, habitat bases and display furniture, built to the highest standard.",
    href: "/services/wyldecraft",
    external: false,
  },
];

const Services = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-16 bg-background overflow-hidden">
        <motion.div style={{ y: heroY }} className="container mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-2">
              Wild Clone
            </h1>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-gray-light tracking-tight mb-8">
              Services
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
              Comprehensive taxidermy and export services, from mounting to global shipping - all handled with precision and care.
            </p>
          </AnimatedSection>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 lg:pb-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-center gap-6">
            {services.map((svc, i) => (
              <AnimatedSection
                key={svc.title}
                delay={i * 0.1}
                scale
                className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333333%-1rem)]"
              >
                {svc.external ? (
                  <a
                    href={svc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <motion.div
                      whileHover={{ y: -6, transition: { duration: 0.3 } }}
                      className="bg-card border border-border rounded-xl p-8 h-full flex flex-col group hover:border-gray-medium transition-all duration-500 cursor-pointer"
                    >

                      <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">{svc.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">{svc.desc}</p>
                    </motion.div>
                  </a>
                ) : (
                  <Link to={svc.href} className="block h-full">
                    <motion.div
                      whileHover={{ y: -6, transition: { duration: 0.3 } }}
                      className="bg-card border border-border rounded-xl p-8 h-full flex flex-col group hover:border-gray-medium transition-all duration-500 cursor-pointer"
                    >

                      <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">{svc.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">{svc.desc}</p>
                    </motion.div>
                  </Link>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Services;
