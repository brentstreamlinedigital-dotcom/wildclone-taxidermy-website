import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const whyCards = [
  {
    title: "Cutting Edge Communication",
    desc: "Wildclone taxidermy has invested in cutting edge systems which allow us to update you as your trophy moves from 1 stage to the next.",
    image: "/images/HH8GLs9hiwlxJTmnlCc9i0L2fXM-39ce814654dd8.png",
    href: "/services/professional-communication",
  },
  {
    title: "Expert Craftsmanship",
    desc: "Our trophies are Crafted by artisans who live and breathe the wild. Where precision, artistry, and respect for the animal come together in every detail.",
    href: "/services/expert-craftsmanship",
    image: "/EXPERT CRAFTMINSHIP CARD PHOTO.png",
  },
  {
    title: "Global Shipping",
    desc: "Bringing your trophies to any corner of the globe, with the same care, precision, and craftsmanship as in our studio.",
    href: "/services/global-shipping",
    image: "/images/truck_enhanced.png",
    imageClassName: "object-cover group-hover:scale-110",
  },
  {
    title: "12 Month Guarantee",
    desc: "Once your trophies have arrived at our facility, your deposit has been received, and mounting instructions have been confirmed.",
    href: "/services/turnaround-time-guarantee",
    image: "/images/completion_enhanced.png",
    imageClassName: "object-cover group-hover:scale-110",
  },
];



const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero with parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/images/hero-bg.mp4" type="video/mp4" />
          </video>
        </motion.div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Bottom gradient fade into page background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background" />
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 40, damping: 20, mass: 1, delay: 0.2, filter: { duration: 0.4 } }}
          style={{ y: heroY }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 tracking-tight"
          >
            Wild Clone{"\n"}Taxidermy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-body text-base md:text-lg text-gray-light max-w-2xl mx-auto leading-relaxed"
          >
            Craftsmanship that will capture the moment for a lifetime
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Link
              to="/contact"
              className="font-body text-sm px-8 py-4 bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground rounded transition-all duration-300 w-full sm:w-52 text-center"
            >
              Contact Us
            </Link>
            <a
              href="https://portal.wildclone.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm px-8 py-4 bg-transparent text-foreground border border-foreground rounded hover:bg-foreground hover:text-background transition-all duration-300 w-full sm:w-52 text-center"
            >
              Outfitters Portal
            </a>
          </motion.div>
        </motion.div>

      </section>

      {/* Why Hunters Choose Wild Clone */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center mb-6">
              Our 4 Key Differentiators
            </h2>
            <p className="font-body text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-16">
              From expert artisans to worldwide delivery, every step of our process is designed to exceed your expectations.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCards.map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.1} scale>
                <div className="group h-full flex flex-col relative">
                  <motion.div
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    className="bg-card border border-border rounded-xl p-8 h-full flex flex-col hover:border-gray-medium transition-colors duration-500 overflow-hidden"
                  >
                    <Link to={card.href} className="absolute inset-0 z-0" aria-label={`View ${card.title}`} />
                    <h3 className="relative z-10 font-heading text-xl md:text-2xl font-semibold text-foreground mb-4 text-center min-h-[64px] flex items-center justify-center pointer-events-none">
                      {card.title}
                    </h3>
                    <p className="relative z-10 font-body text-sm text-muted-foreground leading-relaxed text-center mb-6 flex-grow pointer-events-none">
                      {card.desc}
                    </p>
                    <div className="relative z-10 mt-auto aspect-square rounded-lg overflow-hidden pointer-events-none">
                      <img src={card.image} alt={card.title} className={`w-full h-full object-cover transition-transform duration-700 ease-out ${card.imageClassName || "group-hover:scale-110"}`} />
                    </div>
                  </motion.div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Big statement - with gray-dark bg for variety */}
      <section className="py-24 lg:py-32 bg-gray-dark">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="max-w-5xl mx-auto text-center">
              <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
                At Wild Clone we are passionate about exceeding expectations, we have built and continue to build a team of craftsmen & women who know and understand how important it is to 'Capture the Moment' on that once-in-a-lifetime animal.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block mt-10"
              >
                <Link
                  to="/about"
                  className="font-body text-sm px-8 py-4 bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground rounded transition-all duration-300"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>


      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Banner */}
      <CTABanner />

      <Footer />
    </div>
  );
};

export default Index;
