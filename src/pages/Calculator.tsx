import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

// ─── Calculator Iframe Embed ──────────────────────────────────────────────────
// The standalone calculator HTML is served as a static file from
// /public/calculator-tool/index.html
const CalculatorEmbed = () => {
  const [iframeHeight, setIframeHeight] = useState("900px");

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'resize-iframe') {
        // Add a bit of buffer to prevent sub-pixel rounding scrollbars
        setIframeHeight(`${event.data.height + 20}px`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <iframe
      src="/calculator-tool/index.html"
      title="Wildclone Price Calculator"
      className="w-full border-0 overflow-hidden"
      scrolling="no"
      style={{ height: iframeHeight, transition: 'height 0.3s ease-out' }}
    />
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const Calculator = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-40 pb-16 bg-background overflow-hidden relative">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          <AnimatedSection>
            <div className="flex justify-center mb-8">
              <img
                src="/modernised logo bgless.jpeg"
                alt="Wild Clone Taxidermy Logo"
                className="h-24 w-auto md:h-32 object-contain"
              />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-4">
              Price Calculator
            </h1>
            <p className="font-body text-base md:text-lg text-gray-light max-w-2xl mx-auto mb-8">
              Get an instant estimate for any mount style and optional global
              shipping — combined in one itemised quote.
            </p>
          </AnimatedSection>
        </motion.div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <CalculatorEmbed />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Calculator;
