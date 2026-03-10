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

      {/* Diagram */}
      <section className="pb-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src="/images/diagram_inverted.jpg"
                alt="Mounting Direction Diagram"
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Download CTA */}
      <section className="pb-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <AnimatedSection>
            <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-gray-medium transition-colors duration-500">
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Mounts Album</h3>
                <p className="font-body text-sm text-muted-foreground max-w-md">
                  Browse our full collection of completed works in the Wild Clone Mounts Album. Download to view at your leisure.
                </p>
              </div>
              <a
                href="/MountsAlbum.pdf"
                download="Wild Clone Mounts Album.pdf"
                className="shrink-0 flex items-center gap-2 font-body text-sm px-8 py-4 bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground transition-all duration-300 rounded"
              >
                <Download className="w-4 h-4" />
                Download Mounts Album
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
};

export default Mounts;
