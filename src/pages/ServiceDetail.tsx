import { useParams, Link } from "react-router-dom";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import CTABanner from "@/components/CTABanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";



const serviceData: Record<string, { title: string; subtitle: string; description: string[]; highlights: string[]; image?: string; leftImage?: string; rightImage?: string; customGallery?: string[] }> = {
  "professional-communication": {
    title: "Cutting Edge Technology",
    subtitle: "Keeping you informed at every stage",
    description: [
      "At Wild Clone, communication is at the heart of everything we do. We believe that every client deserves to be kept informed throughout the entire taxidermy process - from the moment your trophy arrives at our facility to the day it's shipped to your door.", 
      "Our team provides real-time photo updates at every stage of the mounting process. You'll see your trophy as it progresses through preparation, sculpting, finishing, and final quality assurance.",
      "We use modern digital communication tools to ensure you're never left wondering about the status of your order. Whether you're across the country or across the globe, you're always connected to your trophy's journey.",
    ],
    highlights: [
      "Real-time photo updates at every stage",
      "Dedicated project manager for your order",
      "Digital communication tools for global clients",
      "Outfitter portal access for trade clients",
    ],
    image: "/images/HH8GLs9hiwlxJTmnlCc9i0L2fXM-39ce814654dd8.png",
  },
  "expert-craftsmanship": {
    title: "Expert Craftsmanship",
    subtitle: "Where precision meets artistry",
    description: [
      "Our mounts are built by artisans who live and breathe the wild. Every piece that leaves our 14,000 sq ft facility in Port Elizabeth is a testament to the skill, dedication, and passion of our team.",
      "Where precision, artistry, and respect for the animal come together in every detail. Our craftsmen and craftswomen undergo rigorous training and quality assurance processes to ensure every mount meets the highest standards.",
      "From anatomical accuracy to lifelike finishing, we use a combination of traditional handcrafting techniques and cutting-edge technology to create mounts that truly capture the essence of the animal.",
    ],
    highlights: [
      "Hand-crafted by expert artisans",
      "14,000 sq ft state-of-the-art facility",
      "Rigorous quality assurance process",
      "Museum-quality finishing and detail",
    ],
    image: "/images/029577_cd394e0a1be342418cc9b2e4a06302acmv2.jpg",
  },
  "global-shipping": {
    title: "Global Shipping",
    subtitle: "Delivering your trophies worldwide",
    description: [
      "Wild Clone Taxidermy has a dedicated onsite global logistics company with 50+ offices around the world to ensure that when it's time for your trophies to start their journey home, it is done in the most efficient way possible.",
      "30+ years of mastery ensure your trophies are in expert hands. Our vet-approved facilities ensure seamless imports and exports. Enjoy live tracking and low shipping costs. Trusted by Hunters Worldwide.",
      "The prices provided are per crate and includes all necessary documentation and fees associated with freight, clearance, export permits and applications. These prices apply only to shipments delivered to our nearest warehouse to you, as seen on the map, and do not include costs associated with onward shipping from our warehouse to your home address.",
    ],
    highlights: [
      "Crating & Packing",
      "International Freight",
      "Permits & Export Documentation",
      "Customs Clearance",
      "Delivery to Warehouse",
    ],
    image: "/images/23FVknLJGGuivl7ZZLQFdiXZFbI.jpg",
    customGallery: [
      "/images/crate_DSC02598.jpg",
      "/images/crate_DSC02600.jpg",
      "/images/crate_DSC02602.jpg",
      "/images/crate_DSC02603.jpg",
      "/images/crate_DSC02604.jpg",
      "/images/crate_DSC02606.jpg",
    ],
  },
  "turnaround-time-guarantee": {
    title: "12-Month Completion Guarantee",
    subtitle: "Your Trophy. Our Commitment. Completed Within 12 Months.",
    description: [
      "At Wild Clone Taxidermy, we understand that your trophies represent once-in-a-lifetime memories. That is why we proudly stand behind our 12-Month Completion Guarantee.",
      "Once your trophies have arrived at our facility, your deposit has been received, and mounting instructions have been confirmed, your order is placed into our structured production schedule. From that point forward, our team works through a carefully managed process to ensure your mounts are completed within 12 months.",
      "This timeline allows our master artisans the time required to craft each piece with precision, anatomical accuracy, and exceptional attention to detail — while still delivering your trophies within a reliable and transparent timeframe.",
      "With clear scheduling, regular progress updates, and strict quality control at every stage, you can trust that your trophies are in experienced hands from start to finish.",
    ],
    highlights: [
      "12-Month Completion Commitment",
      "Structured Production Scheduling for Reliable Turnaround Times",
      "Regular Progress Updates Throughout",
      "Trusted by Hunters & Outfitters Worldwide",
      "Exceptional Craftsmanship & Strict Quality Control",
      "Clear Communication from Start to Finish",
    ],
    image: "/images/XW6ZqhR2B6gGRCwq9bnFr7ES8.jpg",
  },
  "tanning": {
    title: "Tanning",
    subtitle: "Professional skin preparation & tanning",
    description: [
      "At Wild Clone Taxidermy, our professional tanning process ensures that every hide is treated to the highest standards of durability, softness, and natural beauty. Using industry-leading techniques and premium tanning chemicals, we preserve your trophy's skin to exceptional, quality standards.",
      "Each skin undergoes a meticulous preparation process where it is carefully cleaned, salted, and expertly processed through our specialised tanning pipeline before the tanning stage begins. This rigorous preparation ensures superior results, whether the hide is destined for mounting or displayed as a finished skin.",
      "Our tanning methods are developed to meet strict international export standards, ensuring your trophies are properly preserved and ready for safe shipment anywhere in the world.",
    ],
    highlights: [
      "Premium Tanning Chemicals",
      "Meticulous Skin Preparation & Cleaning",
      "Export-Ready Tanning Process",
      "Exceptional Durability & Softness",
      "Quality Preservation",
    ],
    image: "/images/tanning_service.jpg",
    customGallery: [
      "/images/tanning_process_1.jpg",
      "/Services images/tanning1.jpg",
      "/images/tanning_process_3.png",
    ]
  },
  "dip-pack": {
    title: "Dip & Pack",
    subtitle: "Export-compliant sterilisation & packing",
    description: [
      "Our taxidermy facility is veterinary approved, allowing us to professionally prepare trophies for clients who prefer to have their taxidermy completed in their home country or at a later stage. Through our specialised Dip & Pack service, raw trophies are carefully received, treated, dried, and prepared to ensure they leave our facility in optimal condition.",
      "Dip & Pack is the sterilisation process required for the international export of raw animal products. This process includes the thorough removal of all flesh and tissue from skulls, horns, and bones, followed by careful drying and bleaching to meet international veterinary standards.",
      "Skins are professionally dried, cleaned, and treated with specialised anti-bacterial agents to ensure your trophies arrive dry, clean, and pest-free — fully compliant with international import regulations.",
    ],
    highlights: [
      "Veterinary-Approved Facility",
      "Professional Dip & Pack Preparation",
      "Full Skull & Bone Cleaning and Bleaching",
      "Anti-Bacterial Skin Treatment",
      "Compliant with International Import Regulations",
    ],
    image: "/images/029577_b33402f874b4491bb8d0373ee046a314mv2.jpg",
    customGallery: [
      "/images/dip1.jpg",
      "/images/dip2.jpg",
    ]
  },
  "leatherworks": {
    title: "Leather Worx",
    subtitle: "Handcrafted leather goods for the outdoorsman",
    description: [
      "Our Leather Worx collection offers premium, bespoke leather goods handcrafted by our skilled leather-craftswoman. Each piece is individually made to order, tailored to your specifications, and designed to stand the test of time.",
      "Turn your hides into luxury leather goods. From custom rifle slings, gun bags, and gun straps to decorative leather panels and display pieces, we create distinctive leather accessories that complement your trophies and reflect the spirit of the hunt. Our range also includes bespoke safari accessories, as well as beautifully crafted handbags, wallets, and other leather essentials.",
      "Using only the finest hides and traditional leatherworking techniques, every item is crafted with precision, character, and durability — embodying the quality and craftsmanship that the Wild Clone name represents.",
    ],
    highlights: [
      "Custom Rifle Slings, Gun Bags & Gun Straps",
      "Bespoke Safari Accessories",
      "Custom Handbags, Wallets & Leather Accessories",
      "Decorative Leather Panels & Display Pieces",
      "Finest Quality Hides & Materials",
      "Handcrafted, Made-to-Order Designs",
    ],
    customGallery: [
      "/LEATHERWORX/LEATHER WORX.png",
      "/LEATHERWORX/LEATHER WORX (1).png",
      "/LEATHERWORX/LEATHER WORX (2).png",
      "/LEATHERWORX/LEATHER WORX (3).png",
      "/LEATHERWORX/LEATHER WORX (4).png",
      "/LEATHERWORX/LEATHER WORX (5).png",
      "/LEATHERWORX/LEATHER WORX (6).png",
      "/LEATHERWORX/LEATHER WORX (7).png",
    ]
  },
  "wyldecraft": {
    title: "Wylde Craft",
    subtitle: "Custom woodcraft to showcase your trophies",
    description: [
      "Wylde Craft is Wild Clone's bespoke woodworking division — dedicated to handcrafting distinctive furniture and display pieces that bring the spirit of the African wild into your home, lodge, or boardroom.",
      "Each piece is individually crafted to order by our master woodworkers, using carefully selected local and imported hardwoods. From bespoke poker and dining tables featuring genuine kudu and giraffe bone inlays to elegant glass-top coffee tables, side tables, slatted shelving, and bedside pieces, every design is created with purpose and finished to exceptional standards.",
      "Wylde Craft creations are more than furniture — they are statement pieces. Designed to spark conversation and built to last for generations, each piece reflects a lifestyle defined by adventure, craftsmanship, and a deep connection to the wild.",
    ],
    highlights: [
      "Bespoke Poker & Dining Tables (6 and 8-Seater Configurations)",
      "Signature Giraffe & Kudu Bone Inlay Designs",
      "Glass-Top Coffee Tables & Side Tables",
      "Bedside Tables & Decorative Slatted Shelving",
      "Custom Statement Pieces for Homes, Lodges & Boardrooms",
      "Built to Order Using Premium Hardwoods",
    ],
    leftImage: "/images/wyldecraft/giraffe_table.png",
    rightImage: "/images/wyldecraft/kudu_table.png",
    customGallery: [
      "/images/wyldecraft/6 Seater poker table.png",
      "/images/wyldecraft/6 seater poker table top cover.png",
      "/images/wyldecraft/6 seater poker table top.png",
      "/images/wyldecraft/8 seater Poker table 2.png",
      "/images/wyldecraft/8 seater Poker table.png",
      "/images/wyldecraft/Bedside table.png",
      "/images/wyldecraft/Glass top coffee table 2.png",
      "/images/wyldecraft/Glass top coffee table.png",
      "/images/wyldecraft/Kudo horn side table.png",
      "/images/wyldecraft/Slatted shelf 1.png",
      "/images/wyldecraft/Slatted shelf 2.png",
    ]
  },
};



const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // Build lightbox image array from customGallery
  const lightboxImages = (service?.customGallery ?? []).map((src, i) => ({
    src,
    alt: `${service?.title ?? ""} gallery image ${i + 1}`,
  }));

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Link to="/services" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <Link to="/services" className="inline-block font-body text-xs text-muted-foreground hover:text-foreground transition-colors mb-8 uppercase tracking-wider">
              ← Back to Services
            </Link>
            {slug === "wyldecraft" ? (
              <div className="flex justify-center mb-8">
                <img
                  src="/images/wyldecraft/Wylde Craft Logo round Black SVG.svg"
                  alt="Wylde Craft Logo"
                  className="h-32 w-32 md:h-40 md:w-40 object-contain invert"
                />
              </div>
            ) : (
              <div className="flex justify-center mb-8">
                <img
                  src="/modernised logo bgless.jpeg"
                  alt="Wild Clone Taxidermy Logo"
                  className="h-24 w-auto md:h-32 object-contain"
                />
              </div>
            )}
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-4">
              {service.title}
            </h1>
            <p className="font-body text-lg text-gray-light max-w-xl mx-auto">
              {service.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 lg:pb-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
            <AnimatedSection direction="left">
              <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-6">
                {service.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right">
              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">Key Highlights</h3>
                <div className="space-y-4">
                  {service.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-foreground mt-1.5 shrink-0" />
                      <p className="font-body text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {slug === "professional-communication" && service.image && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 aspect-video border border-border rounded-xl overflow-hidden"
                >
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </motion.div>
              )}
            </AnimatedSection>
          </div>

          {/* Custom Gallery Rendering */}
          {service.customGallery && service.customGallery.length > 0 && (
            <div className={`mt-12 ${["wyldecraft", "leatherworks"].includes(slug || "") ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6" : ["tanning", "dip-pack", "global-shipping"].includes(slug || "") ? `grid grid-cols-1 sm:grid-cols-2 ${service.customGallery.length === 3 ? "lg:grid-cols-3" : service.customGallery.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-4"} gap-6` : "flex flex-col gap-8"}`}>
              {service.customGallery.map((src, i) => (
                <AnimatedSection key={i} delay={i * 0.1} scale className={["wyldecraft", "leatherworks"].includes(slug || "") ? "break-inside-avoid" : "h-full"}>
                  <img
                    src={src}
                    onClick={() => openLightbox(i)}
                    className={`w-full ${["wyldecraft", "leatherworks"].includes(slug || "") ? "h-auto object-contain" : "h-full aspect-[4/3] object-cover"} rounded-xl border border-border cursor-zoom-in hover:opacity-90 transition-opacity duration-200`}
                    alt={`${service.title} gallery image ${i + 1}`}
                  />
                </AnimatedSection>
              ))}
            </div>
          )}

          <Lightbox
            images={lightboxImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNavigate={setLightboxIndex}
          />
        </div>
      </section>





      {/* Wyldecraft Catalog - Hidden for now
      {slug === "wyldecraft" && (
        <section className="pt-16 pb-24 lg:pb-32 bg-background border-t border-border/40">
...
        </section>
      )}
      */}

      {/* Professional Communication Portal Diagrams */}
      {slug === "professional-communication" && (
        <section className="pt-16 pb-24 lg:pb-32 bg-background border-t border-border/40">
          <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Wild Clone Outfitters Portal</h2>
                <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto">Providing outfitters and clients with full visibility and real-time tracking of their trophies.</p>
              </div>
            </AnimatedSection>

            <div className="space-y-16">
              <AnimatedSection delay={0.1}>
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.4 }} className="rounded-2xl overflow-hidden border border-border bg-[#0a0a0a]">
                  <img src="/images/portal_status.png" alt="Live Status Updates" className="w-full h-auto object-contain [image-rendering:-webkit-optimize-contrast]" />
                </motion.div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.4 }} className="rounded-2xl overflow-hidden border border-border bg-[#0a0a0a]">
                  <img src="/images/portal_photos.png" alt="Stage-by-Stage Photos" className="w-full h-auto object-contain [image-rendering:-webkit-optimize-contrast]" />
                </motion.div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.4 }} className="rounded-2xl overflow-hidden border border-border bg-[#0a0a0a]">
                  <img src="/images/portal_visibility.png" alt="Visibility and Client Documentation" className="w-full h-auto object-contain [image-rendering:-webkit-optimize-contrast]" />
                </motion.div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.4}>
              <div className="text-center mt-16">
                <Link to="/contact" className="font-body text-sm px-8 py-4 bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground rounded transition-all duration-300">
                  Get a Quote
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      <CTABanner />
      <Footer />
    </div>
  );
};

export default ServiceDetail;
