import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Check, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface MountData {
  title: string;
  subtitle: string;
  description: string[];
  highlights: string[];
  finishingNote: string;
  images: string[];
}

const mountData: Record<string, MountData> = {
  "shoulder-mounts": {
    title: "Shoulder Mounts",
    subtitle: "The most popular and timeless way to display your trophy.",
    description: [
      "A shoulder mount captures the head, neck, and upper body of the animal in a natural, lifelike pose. It's the most requested style of taxidermy and the perfect centrepiece for any trophy room.",
      "At Wild Clone, every shoulder mount is sculpted with anatomical precision, using custom forms and hand-finished detailing to bring out the animal's unique character.",
    ],
    highlights: [
      "Classic Straight-On Pose – A timeless, symmetrical presentation.",
      "Dynamic Turn Pose – Sculpted angles for added depth and expression.",
      "Semi-Sneak Pose – A low, alert stance capturing predatory instinct.",
      "Wall Feature Shoulder Mount – Designed to anchor any trophy wall.",
      "Premium Detail Series – Enhanced musculature and lifelike finishing.",
    ],
    finishingNote:
      "Every shoulder mount includes hand-painted detail work, glass eyes selected for species accuracy, and custom-fitted ear liners for a natural, expressive result.",
    images: ["/images/mount_shoulder.png"],
  },
  "custom-mounts": {
    title: "Custom / Full Mounts",
    subtitle: "Complete, full-body artistry for the ultimate display.",
    description: [
      "Custom and full mounts bring the entire animal to life in a freestanding or wall-integrated display. These pieces are the pinnacle of taxidermy artistry, designed for collectors and lodges who demand the extraordinary.",
      "Each full mount is built on a custom armature, sculpted for anatomical accuracy, and finished with museum-quality detail from nose to tail.",
    ],
    highlights: [
      "Lifesize Wildlife Display – Full-body realism in natural stance.",
      "Habitat Scene Full Mount – Custom terrain for true-to-life environments.",
      "Free-Standing 360° Mount – Ideal for open rooms and lodge spaces.",
      "Action Pose Full Mount – Dynamic motion captured in lifelike form.",
    ],
    finishingNote:
      "Full mounts include habitat base options, custom lighting consultation, and white-glove delivery for oversized pieces.",
    images: ["/images/mount_full.png"],
  },
  "european-mounts": {
    title: "European Mounts",
    subtitle: "Clean, modern skull presentations with timeless appeal.",
    description: [
      "European mounts offer a clean, minimalist way to display horns and antlers on a prepared skull. This style celebrates the raw beauty of the animal's headgear in its purest form.",
      "Our process uses precision beetle cleaning and professional whitening to produce a flawless, long-lasting result every time.",
    ],
    highlights: [
      "Classic Skull Mount – Clean, bleached skull on custom plaque.",
      "Dipped European Mount – Hydro-dipped patterns for a modern twist.",
      "Pedestal Skull Display – Elevated presentation on wooden or stone base.",
      "Multi-Horn European Set – Grouped skulls for a dramatic wall feature.",
    ],
    finishingNote:
      "All European mounts are sealed with a UV-resistant coating to prevent yellowing and preserve the finish for years to come.",
    images: ["/images/QWS9E07qeaf2sP2VkEWJZpb2ixY.png"],
  },
  "wall-pedestal": {
    title: "Wall Pedestal",
    subtitle: "Compact elegance that commands attention at eye level.",
    description: [
      "Wall pedestals offer a refined middle ground between a shoulder mount and a full mount. They extend the animal further from the wall, creating depth and dimension that draws the eye.",
      "Ideal for feature walls, hallways, and spaces where a full mount isn't practical but a standard shoulder mount doesn't do the trophy justice.",
    ],
    highlights: [
      "Standard Wall Pedestal – Compact, elegant presentation at eye level.",
      "Extended Pedestal – Longer form for added presence and detail.",
      "Offset Angle Pedestal – Angled mount for dynamic wall displays.",
      "Custom Habitat Pedestal – Integrated scenery for a natural setting.",
    ],
    finishingNote:
      "Wall pedestals include a reinforced steel hanging system rated for the specific weight of your mount, ensuring safe and secure display.",
    images: ["/images/mount_wall_pedestal.png"],
  },
  "floor-pedestal": {
    title: "Floor Pedestal",
    subtitle: "Freestanding trophy displays for lodges and grand spaces.",
    description: [
      "Floor pedestals create a dramatic, freestanding presentation that turns any trophy into a room-defining focal point. Perfect for lodges, offices, and open-plan spaces.",
      "Each floor pedestal is custom-built to the proportions of your animal, ensuring a balanced, stable, and visually striking display from every angle.",
    ],
    highlights: [
      "Classic Floor Pedestal – Freestanding display for lodges and offices.",
      "Rotating Base Pedestal – 360° viewing on a turntable base.",
      "Tall Pedestal Display – Elevated height for dramatic presentation.",
      "Dual-Mount Floor Pedestal – Two trophies on one sculpted base.",
    ],
    finishingNote:
      "Floor pedestals are finished with weighted bases for stability and come with optional habitat integration including rocks, grasses, and terrain elements.",
    images: ["/images/mount_floor_pedestal.png"],
  },
  "half-mounts": {
    title: "Half Mounts",
    subtitle: "Where shoulder meets full - maximum impact, minimal space.",
    description: [
      "Half mounts extend the animal from head to mid-body, creating the illusion of the animal emerging through the wall. They deliver more presence than a shoulder mount while fitting spaces where a full mount isn't feasible.",
      "This style is especially popular for dangerous game and larger species where the chest and forelegs add dramatic visual weight.",
    ],
    highlights: [
      "Front Half Mount – Head to mid-body, wall-mounted realism.",
      "Emerging Half Mount – Animal appearing to step through the wall.",
      "Offset Half Mount – Angled for corner or feature wall placement.",
      "Scenic Half Mount – Integrated base with habitat elements.",
    ],
    finishingNote:
      "Half mounts require reinforced wall brackets and structural assessment. Our team provides full installation guidance with every piece.",
    images: ["/images/mount_half.png"],
  },
  "african-3d-shield": {
    title: "African 3D Shield",
    subtitle: "A bold, sculptural tribute to the African safari tradition.",
    description: [
      "The African 3D Shield is a unique presentation style that combines traditional hide-wrapped shields with dimensional horn and skull displays. It's a statement piece that honours the heritage of the African hunt.",
      "Each shield is handcrafted using authentic materials and techniques, creating a one-of-a-kind trophy display that tells the story of your safari.",
    ],
    highlights: [
      "Traditional Shield Mount – Hide-wrapped shield with horn display.",
      "Modern 3D Shield – Sculpted dimensional shield with lifelike detail.",
      "Multi-Species Shield – Combined trophies on one dramatic shield.",
      "Custom Engraved Shield – Personalised details and safari branding.",
    ],
    finishingNote:
      "African 3D Shields are finished with hand-stitched leather edging and optional brass plaques engraved with hunt details, dates, and locations.",
    images: ["/images/mount_3d.png"],
  },
};

const allSlugs = Object.keys(mountData);

const MountCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug || !mountData[slug]) {
    return <Navigate to="/mounts" replace />;
  }

  const data = mountData[slug];
  const otherMounts = allSlugs.filter((s) => s !== slug);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-16 bg-background overflow-hidden">
        <motion.div style={{ y: heroY }} className="container mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-4">
              {data.title}
            </h1>
            <p className="font-body text-base md:text-lg text-gray-light max-w-2xl mx-auto mb-8">
              {data.subtitle}
            </p>
            <Link
              to="/contact"
              className="inline-block font-body text-sm px-8 py-4 bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground rounded transition-all duration-300"
            >
              Get a Quote
            </Link>
          </AnimatedSection>
        </motion.div>
      </section>

      {/* Hero Image */}
      <section className="pb-16 pt-8">
        <div className="container mx-auto px-6 lg:px-12 flex justify-center">
          <AnimatedSection>
            <div className="w-full max-w-2xl aspect-[4/5] bg-black border border-border rounded-xl overflow-hidden p-8 flex items-center justify-center">
              <motion.img style={{ scale: heroScale }} src={data.images[0]} alt={data.title} className="w-full h-full object-contain origin-center saturate-100" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content: Description + Highlights */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <AnimatedSection direction="left">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  About This Mount Style
                </h2>
                {data.description.map((p, i) => (
                  <p key={i} className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
                <p className="font-body text-sm text-gray-light leading-relaxed mt-6 border-l-2 border-border pl-4">
                  {data.finishingNote}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                  Pose & Presentation Options
                </h3>
                <div className="border-t border-border pt-6 space-y-5">
                  {data.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-gray-light mt-0.5 shrink-0" />
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* View Other Mounts */}
      <section className="py-16 lg:py-24 bg-gray-dark border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              View Other Mounts
            </h2>
            <p className="font-body text-sm text-muted-foreground text-center max-w-lg mx-auto mb-12">
              Explore our full range of mount styles and find the perfect presentation for your trophy.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherMounts.map((s, i) => (
              <AnimatedSection key={s} delay={i * 0.08} scale>
                <Link to={`/mounts/${s}`}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:border-gray-medium transition-colors duration-500"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-black p-10 flex items-center justify-center">
                      <img src={mountData[s].images[0]} alt={mountData[s].title} className="w-full h-full object-contain" />
                    </div>
                    <div className="p-6 flex items-center justify-between">
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {mountData[s].title}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-gray-medium group-hover:text-foreground transition-colors" />
                    </div>
                  </motion.div>
                </Link>
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

export default MountCategory;
