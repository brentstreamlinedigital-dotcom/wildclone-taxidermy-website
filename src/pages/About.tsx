import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity, y: heroY }} className="absolute inset-0">
          <img src="/images/DSC02614.jpg" alt="Wild Clone Studio" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-background/40" />
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 40, damping: 20, mass: 1, delay: 0.2, filter: { duration: 0.4 } }}
          style={{ y: heroY }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-4">
            About Wild Clone
          </h1>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-gray-light tracking-tight">
            Taxidermy
          </h2>
          <p className="font-body text-sm text-gray-light mt-6">
            Capture the moment. Preserve the memory.
          </p>
        </motion.div>
      </section>

      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Text */}
          <AnimatedSection direction="left">
            <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-4 max-w-4xl mx-auto mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <p>Wild Clone Taxidermy has created a close-knit family of artisans passionate about recreating the extraordinary animals our wonderful clients entrust us with. We have made some big investments to ensure that we can process everything in-house and future-proof the business.</p>
              <p>Our investments include a new 14,000 square feet facility in Port Elizabeth and two Treatment and Prep facilities to enable our clients easy access. This expands our facilities to 4 branches, located in Port Elizabeth, North West, Free State, and Limpopo.</p>
              <p>By expanding our business we boost <strong className="text-foreground">Local Entrepreneurship</strong>, our facilities provide local artisans with access to high-quality materials from our tanneries, and this support helps them craft products destined for both local and international markets.</p>
              <p>We also focus on <strong className="text-foreground">Skills Development</strong>, we are committed to training the youth and adults in these regions, equipping them with the skills needed to excel in the workforce, either at our facilities or beyond.</p>
              <p>We provide <strong className="text-foreground">Nationwide Services</strong>, our strategically located Treatment and Prep facilities ensure we're never far from our clients, simplifying delivery and service processes.</p>
              <p><strong className="text-foreground">Quality Assurance</strong> is highly important, before any trophy reaches our main mounting and finishing hub in Port Elizabeth, Eastern Cape, it undergoes rigorous processing to maintain our high standards of quality.</p>
              <p>So far we have achieved big things, and exciting times lay ahead for the Wild Clone Taxidermy Team.</p>
            </div>
          </AnimatedSection>

          {/* Photo Grid */}
          <AnimatedSection delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {[
                { src: "/images/about_1.jpg", alt: "Craftsmanship" },
                { src: "/images/staff_1.jpg", alt: "Wild Clone team" },
                { src: "/images/staff_2.jpg", alt: "Wild Clone team at work" },
                { src: "/images/about_2.jpg", alt: "Facility details" },
                { src: "/images/staff_3.jpg", alt: "Wild Clone artisan" },
                { src: "/images/staff_4.jpg", alt: "Wild Clone craftsman" },
                { src: "/images/about_3.jpg", alt: "Trophy preparation" },
                { src: "/images/staff_5.jpg", alt: "Wild Clone craftsman with form" },
              ].map((img, i) => (
                <motion.div key={i} whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} className="border border-border rounded-xl overflow-hidden cursor-pointer aspect-square">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover object-top" />
                </motion.div>
              ))}
            </div>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} className="aspect-[21/9] border border-border rounded-xl overflow-hidden cursor-pointer">
              <img src="/images/about_4.jpg" alt="Wild Clone Workshop" className="w-full h-full object-cover" />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* PHASA Membership */}
      <section className="py-16 bg-gray-dark">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-3xl mx-auto text-center md:text-left">
              <img src="/images/S2yplh1DbUFF3qfoWSukRnpP6u8.png" alt="PHASA Member Badge" className="h-28 w-auto object-contain shrink-0" />
              <div>
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">Proud PHASA Member</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Wild Clone Taxidermy is a proud member of the Professional Hunters' Association of South Africa (PHASA), reflecting our commitment to ethical practices, conservation, and the highest standards in the hunting and taxidermy industry.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default About;
