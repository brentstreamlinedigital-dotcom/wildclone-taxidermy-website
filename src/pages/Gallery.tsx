import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import CTABanner from "@/components/CTABanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const galleryImages = [
    { src: "/images/New Gallery Watermark Images/Untitled design (1).png", alt: "Gallery Mount 1" },
    { src: "/images/New Gallery Watermark Images/Untitled design (2).png", alt: "Gallery Mount 2" },
    { src: "/images/New Gallery Watermark Images/Untitled design (3).png", alt: "Gallery Mount 3" },
    { src: "/images/New Gallery Watermark Images/Untitled design (4).png", alt: "Gallery Mount 4" },
    { src: "/images/New Gallery Watermark Images/Untitled design (6).png", alt: "Gallery Mount 6" },
    { src: "/images/New Gallery Watermark Images/Untitled design (7).png", alt: "Gallery Mount 7" },
    { src: "/images/New Gallery Watermark Images/Untitled design (8).png", alt: "Gallery Mount 8" },
    { src: "/images/New Gallery Watermark Images/Untitled design (9).png", alt: "Gallery Mount 9" },
    { src: "/images/New Gallery Watermark Images/Untitled design (12).png", alt: "Gallery Mount 12" },
    { src: "/images/New Gallery Watermark Images/Untitled design (13).png", alt: "Gallery Mount 13" },
    { src: "/images/New Gallery Watermark Images/Untitled design (14).png", alt: "Gallery Mount 14" },
    { src: "/images/New Gallery Watermark Images/Untitled design (15).png", alt: "Gallery Mount 15" },
    { src: "/images/New Gallery Watermark Images/Untitled design (16).png", alt: "Gallery Mount 16" },
    { src: "/images/New Gallery Watermark Images/Untitled design (17).png", alt: "Gallery Mount 17" },
    { src: "/images/New Gallery Watermark Images/Untitled design (18).png", alt: "Gallery Mount 18" },
    { src: "/images/New Gallery Watermark Images/Untitled design (19).png", alt: "Gallery Mount 19" },
    { src: "/images/New Gallery Watermark Images/Wild Clone Brochure July 2025_Compressed(9).pdf (1).png", alt: "Gallery Feature 1" },
    { src: "/images/New Gallery Watermark Images/Wild Clone Brochure July 2025_Compressed(9).pdf (2).png", alt: "Gallery Feature 2" },
    { src: "/images/New Gallery Watermark Images/Wild Clone Brochure July 2025_Compressed(9).pdf (3).png", alt: "Gallery Feature 3" },
    { src: "/images/New Gallery Watermark Images/Wild Clone Brochure July 2025_Compressed(9).pdf (4).png", alt: "Gallery Feature 4" },
];

const Gallery = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section ref={heroRef} className="pt-40 pb-16 bg-background overflow-hidden">
                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-6 lg:px-12 text-center">
                    <AnimatedSection>
                        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-2">
                            Gallery
                        </h1>
                        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-gray-light tracking-tight mb-8">
                            Our Work
                        </h2>
                        <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
                            A showcase of some of the finest mounts and trophies produced by the Wild Clone Taxidermy team.
                        </p>
                    </AnimatedSection>
                </motion.div>
            </section>

            <section className="pb-32 bg-background">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {galleryImages.map((img, i) => (
                            <AnimatedSection key={i} delay={i * 0.05} scale>
                                <motion.div
                                    whileHover={{ scale: img.src ? 1.02 : 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="aspect-square bg-black border border-border rounded-xl flex items-center justify-center overflow-hidden"
                                >
                                    {img.src ? (
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-dark flex flex-col items-center justify-center gap-2">
                                            <span className="text-gray-medium text-3xl">+</span>
                                            <span className="font-body text-xs text-gray-medium">Coming Soon</span>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            <CTABanner />
            <Footer />
        </div>
    );
};

export default Gallery;
