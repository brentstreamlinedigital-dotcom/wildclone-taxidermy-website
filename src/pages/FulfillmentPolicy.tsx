import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import AnimatedSection from "@/components/AnimatedSection";

const policyItems = [
  "Work will commence upon receipt of a 50% deposit and completed mounting instructions. Mounting instructions are discussed and confirmed on an onboarding call. The client relationship begins once the deposit has been received."
];

const FulfillmentPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center">
          <AnimatedSection>
            <div className="flex justify-center mb-8">
              <img src="/modernised logo bgless.jpeg" alt="Wild Clone Taxidermy Logo" className="h-24 w-auto md:h-32 object-contain" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-foreground tracking-tight mb-8">
              Fulfilment Policy
            </h1>
            <p className="font-body text-base md:text-lg text-gray-light max-w-2xl mx-auto mb-8">
              Please read through our policies regarding taxidermy work and global shipping.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 lg:pb-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <AnimatedSection delay={0.2}>
            <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 hover:border-gray-medium transition-colors duration-500">
              <ul className="space-y-6">
                {policyItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="font-heading text-xl text-foreground mt-0.5 shrink-0 w-6">
                      •
                    </span>
                    <p className="font-body text-base text-muted-foreground leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
};

export default FulfillmentPolicy;
