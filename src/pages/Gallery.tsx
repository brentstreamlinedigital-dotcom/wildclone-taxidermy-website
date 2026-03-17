import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import CTABanner from "@/components/CTABanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";

const galleryImages = [
    { src: "/images/New Gallery Watermark Images/Untitled design (1).png", alt: "Gallery Mount 1" },
    { src: "/New gallery images/mounts (5).png", alt: "Gallery Mount 2" },
    { src: "/New gallery images/mounts (4).png", alt: "Gallery Mount 3" },
    { src: "/images/New Gallery Watermark Images/Untitled design (4).png", alt: "Gallery Mount 4" },
    { src: "/images/New Gallery Watermark Images/Untitled design (6).png", alt: "Gallery Mount 6" },
    { src: "/images/New Gallery Watermark Images/Untitled design (7).png", alt: "Gallery Mount 7" },
    { src: "/images/New Gallery Watermark Images/Untitled design (8).png", alt: "Gallery Mount 8" },
    { src: "/images/New Gallery Watermark Images/Untitled design (9).png", alt: "Gallery Mount 9" },
    { src: "/images/New Gallery Watermark Images/Untitled design (12).png", alt: "Gallery Mount 12" },
    { src: "/images/New Gallery Watermark Images/Untitled design (13).png", alt: "Gallery Mount 13" },
    { src: "/images/New Gallery Watermark Images/Untitled design (15).png", alt: "Gallery Mount 15" },
    { src: "/images/New Gallery Watermark Images/Untitled design (16).png", alt: "Gallery Mount 16" },
    { src: "/images/New Gallery Watermark Images/Untitled design (17).png", alt: "Gallery Mount 17" },
    { src: "/images/New Gallery Watermark Images/Untitled design (18).png", alt: "Gallery Mount 18" },
    { src: "/images/New Gallery Watermark Images/Untitled design (19).png", alt: "Gallery Mount 19" },
    { src: "/New gallery images/EXPERT CRAFTMINSHIP CARD PHOTO (2).png", alt: "Expert Craftsmanship" },
    { src: "/New gallery images/mounts (1).png", alt: "Gallery Mount 20" },
];

const Gallery = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section ref={heroRef} className="pt-40 pb-16 bg-background overflow-hidden">
                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-6 lg:px-12 text-center">
                    <AnimatedSection>
                        <div className="flex justify-center mb-8">
                          <img src="/modernised logo bgless.jpeg" alt="Wild Clone Taxidermy Logo" className="h-24 w-auto md:h-32 object-contain" />
                        </div>
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
                    <div className="flex flex-wrap justify-center -mx-2">
                        {galleryImages.map((img, i) => (
                            <AnimatedSection 
                                key={i} 
                                delay={i * 0.05} 
                                scale 
                                className="px-2 mb-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4 }}
                                    onClick={() => openLightbox(i)}
                                    className="aspect-square bg-black border border-border rounded-xl flex items-center justify-center overflow-hidden cursor-zoom-in"
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                                    />
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Videos Section */}
            <section className="pb-24 pt-8 bg-background">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <AnimatedSection key="video-1" delay={0.1} scale>
                                <div className="aspect-[9/16] bg-black border border-border rounded-2xl overflow-hidden group hover:border-gray-medium transition-colors duration-500 relative">
                                    <video 
                                        src="/gallery videos/video_2026-03-13_09-55-51.mp4" 
                                        className="w-full h-full object-cover"
                                        controls
                                        loop
                                        muted
                                        playsInline
                                    />
                                </div>
                            </AnimatedSection>

                            <AnimatedSection key="video-2" delay={0.2} scale>
                                <div className="aspect-[9/16] bg-black border border-border rounded-2xl overflow-hidden group hover:border-gray-medium transition-colors duration-500 relative">
                                    <video 
                                        src="/gallery videos/video_2026-03-13_09-55-51 (2).mp4" 
                                        className="w-full h-full object-cover"
                                        controls
                                        loop
                                        muted
                                        playsInline
                                    />
                                </div>
                            </AnimatedSection>

                            <AnimatedSection key="video-3" delay={0.3} scale>
                                <div className="aspect-[9/16] bg-black border border-border rounded-2xl overflow-hidden group hover:border-gray-medium transition-colors duration-500 relative">
                                    <video 
                                        src="/gallery videos/video_2026-03-13_09-55-51 (3).mp4" 
                                        className="w-full h-full object-cover"
                                        controls
                                        loop
                                        muted
                                        playsInline
                                    />
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>

            <Lightbox
                images={galleryImages}
                currentIndex={lightboxIndex}
                onClose={closeLightbox}
                onNavigate={setLightboxIndex}
            />

            <CTABanner />
            <Footer />
        </div>
    );
};

export default Gallery;
