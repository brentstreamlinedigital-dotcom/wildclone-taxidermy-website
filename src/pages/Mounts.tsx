import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTABanner from "@/components/CTABanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mountTypes = [
    {
        title: "Shoulder Mounts",
        slug: "shoulder-mounts",
        desc: "The timeless classic. A beautifully detailed presentation extending to the shoulder.",
        image: "/Shoulder Mounts/SHOULDER MOUNT ELAND.png",
    },
    {
        title: "Full Mounts / Combos",
        slug: "custom-mounts",
        desc: "A stunning, lifelike full-body display, often paired with custom-built habitat bases.",
        image: "/Custom Mounts/FULL MOUNT MOUNT - COMBO SHIEL IMPALA.png",
    },
    {
        title: "European Mounts",
        slug: "european-mounts",
        desc: "Clean, elegant skull and horn preservation. The perfect minimalist approach.",
        image: "/european mounts/EUROPEAN - DEER.png",
    },
    {
        title: "Wall Pedestal",
        slug: "wall-pedestal",
        desc: "Extending slightly from the wall, adding depth and dramatic presence.",
        image: "/wall pedastal/WALL PEDESTAL -  NYALA.png",
    },
    {
        title: "Floor Pedestal",
        slug: "floor-pedestal",
        desc: "A freestanding centerpiece, bringing your trophy into the heart of the room.",
        image: "/floor pedastals/FLOOR PEDESTAL - GEMSBOK.png",
    },
    {
        title: "Half Mounts",
        slug: "half-mounts",
        desc: "The perfect middle ground between a shoulder and full mount, showing powerful motion.",
        image: "/Half Mounts/HALF MOUNT - LECHWE.png",
    },
    {
        title: "African 3D Shield",
        slug: "african-3d-shield",
        desc: "A historic and bold display mapping horns onto custom-made African shields.",
        image: "/3d shields/AFRICAN 3D SHIELD (1).png",
    },
];

const Mounts = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero */}
            <section ref={heroRef} className="pt-40 pb-16 bg-background overflow-hidden relative border-b border-border">
                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-6 lg:px-12 text-center relative z-10">
                    <AnimatedSection>
                        <Link to="/services" className="inline-block font-body text-xs text-muted-foreground hover:text-foreground transition-colors mb-8 uppercase tracking-wider">
                          ← Back to Services
                        </Link>
                        <div className="flex justify-center mb-8">
                          <img
                            src="/modernised logo bgless.jpeg"
                            alt="Wild Clone Taxidermy Logo"
                            className="h-24 w-auto md:h-32 object-contain"
                          />
                        </div>
                        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-4">
                            Mounting
                        </h1>
                        <p className="font-body text-base md:text-lg text-gray-light max-w-2xl mx-auto mb-8">
                            Explore the different taxidermy presentations crafted by our artisans, from traditional shoulder mounts to intricate full-body habitats.
                        </p>
                    </AnimatedSection>
                </motion.div>
            </section>
            {/* Content: Description + Highlights */}
            <section className="py-16 lg:py-24 bg-background">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        <AnimatedSection direction="left">
                            <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-6">
                                <p>
                                    At Wild Clone Taxidermy, our master taxidermists combine decades of experience with exceptional craftsmanship to transform your trophies into timeless works of art. Every mount begins with the meticulous sculpting of our custom mannequins and continues through a carefully managed process where precision, anatomy, and artistic detail are paramount.
                                </p>
                                <p>
                                    From the first stage of preparation to the final inspection in quality control, each piece is crafted with uncompromising attention to detail to ensure a lifelike and elegant presentation worthy of your hunting memories.
                                </p>
                                <p>
                                    We offer a wide range of mounting styles, including European mounts, Shoulder mounts, Floor / Wall Pedestal mounts, and Full mounts. Each piece can be tailored to your preferred pose, habitat, and design to create a truly unique display.
                                </p>
                                <p>
                                    Should you require guidance, our experienced team will gladly assist you in selecting the most suitable mounting style to showcase your trophy to its fullest potential.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2} direction="right">
                            <div className="bg-card border border-border rounded-xl p-8">
                                <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">Key Highlights</h3>
                                <div className="space-y-4">
                                    {[
                                        "Over 30 Years of Craftsmanship & Experience",
                                        "Custom Sculpted Mannequins",
                                        "Signature Combo Floor Pedestals",
                                        "Signature Combo Wall Pedestals",
                                        "Bespoke Mounting Designs",
                                        "8–12 Month Completion"
                                    ].map((highlight, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-foreground mt-1.5 shrink-0" />
                                            <p className="font-body text-sm text-muted-foreground">{highlight}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6 lg:px-12">
                    <AnimatedSection>
                        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">
                            Mounting Styles
                        </h2>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
                        {mountTypes.map((mount, i) => (
                            <AnimatedSection
                                key={mount.slug}
                                delay={i * 0.1}
                                scale
                                className="w-full"
                            >
                                <Link to={`/mounts/${mount.slug}`} className="block h-full">
                                    <motion.div
                                        whileHover={{ y: -6 }}
                                        transition={{ duration: 0.4 }}
                                        className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-gray-medium transition-colors duration-500 flex flex-col h-full p-8"
                                    >
                                        <div className="flex flex-col flex-1">
                                            <div className="w-full aspect-[4/3] bg-black rounded-xl mb-6 overflow-hidden flex items-center justify-center p-12">
                                                <img src={mount.image} alt={mount.title} className="w-full h-full object-contain hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-heading text-2xl font-semibold text-foreground">
                                                    {mount.title}
                                                </h3>
                                                <div className="w-8 h-8 rounded-full bg-gray-dark flex items-center justify-center group-hover:bg-foreground transition-colors duration-300">
                                                    <ArrowRight className="w-4 h-4 text-gray-light group-hover:text-background transition-colors duration-300" />
                                                </div>
                                            </div>
                                            <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
                                                {mount.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                </Link>
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

export default Mounts;
