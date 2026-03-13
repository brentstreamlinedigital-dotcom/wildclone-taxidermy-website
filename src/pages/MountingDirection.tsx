import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTABanner from "@/components/CTABanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Mounts = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-40 pb-16 bg-background overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <div className="flex justify-center mb-8">
              <img src="/modernised logo bgless.jpeg" alt="Wild Clone Taxidermy Logo" className="h-24 w-auto md:h-32 object-contain" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-2">
              Mounting
            </h1>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-gray-light tracking-tight mb-8">
              Direction
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
              Follow our field preparation guidelines to ensure your trophy reaches us in the best possible condition for a flawless mount.
            </p>
          </AnimatedSection>
        </motion.div>
      </section>

      {/* Download CTA */}
      <section className="pb-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <AnimatedSection>
            <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 flex flex-col items-center gap-6 hover:border-gray-medium transition-colors duration-500 text-center">
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Mounting Directions</h3>
                <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
                  Download our mounting instructions and direction documents to ensure your trophy is prepared and submitted correctly for the best possible result.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/pdfs/Mounting Instructions.xlsx"
                  download="Wild Clone Mounting Instructions.xlsx"
                  className="flex items-center gap-2 font-body text-sm px-8 py-4 bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground transition-all duration-300 rounded"
                >
                  <Download className="w-4 h-4" />
                  Download Mounting Instructions
                </a>
                <a
                  href="/pdfs/Mounting Directions.pdf"
                  download="Wild Clone Mounting Directions.pdf"
                  className="flex items-center gap-2 font-body text-sm px-8 py-4 bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground transition-all duration-300 rounded"
                >
                  <Download className="w-4 h-4" />
                  Download Mounting Directions
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Diagram */}
      <section className="pb-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="flex flex-col gap-6 mb-12">

            {/* Top half — Shoulder Mount */}
            <AnimatedSection delay={0}>
              <div className="rounded-2xl border border-border bg-black overflow-hidden">
                <div className="px-6 pt-5 pb-3">
                  <p className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">Shoulder Mount</p>
                </div>
                {/* Show top half: container is 50% of the natural image height */}
                <div className="relative overflow-hidden w-full" style={{ paddingBottom: "52%" }}>
                  <img
                    src="/images/diagram_inverted.jpg"
                    alt="Shoulder Mount Direction Diagram"
                    className="absolute inset-0 w-full"
                    style={{ top: "0", height: "200%" }}
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Bottom half — Wall Pedestal Mount */}
            <AnimatedSection delay={0.1}>
              <div className="rounded-2xl border border-border bg-black overflow-hidden">
                <div className="px-6 pt-5 pb-3">
                  <p className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">Wall Pedestal Mount</p>
                </div>
                {/* Show bottom half: push image up by 50% */}
                <div className="relative overflow-hidden w-full" style={{ paddingBottom: "52%" }}>
                  <img
                    src="/images/diagram_inverted.jpg"
                    alt="Wall Pedestal Mount Direction Diagram"
                    className="absolute w-full"
                    style={{ top: "-100%", height: "200%" }}
                  />
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
};

export default Mounts;
