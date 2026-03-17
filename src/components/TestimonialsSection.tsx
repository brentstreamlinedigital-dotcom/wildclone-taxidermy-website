import { Star } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const testimonials = [
  {
    name: "Nyko Blanchet",
    text: '"Awesome work, the trophies literally look alive. Customer service is impeccable, they send pictures as it progresses to ensure everything is right before they ship and answered any question I had. The trophies arrived, all neatly packed and without damage. 5 star service. Highly recommend."',
  },
  {
    name: "Ben Pruitt",
    text: "Was about as easy as it gets! Communicated with me throughout the entire process. Mounts showed up crated well and was notified in advance of the shipment. Just remember to pull the mothballs out when you open the crate or it will take a few weeks to air out. Will use them again on my next trip.",
  },
  {
    name: "Thomas Comisky",
    text: '"The mounts turned out amazing. Clinton was good about communicating every step of the way. Looking forward to using your services in the future. Thank you very much."',
  },
  {
    name: "David Lee",
    text: '"As an outfitter, I need a taxidermist I can trust with my clients\' trophies. Wild Clone consistently delivers exceptional quality and their outfitter portal makes tracking every mount effortless."',
  },
];

const StarRating = () => (
  <div className="flex gap-1 mb-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
    ))}
  </div>
);

const TestimonialsSection = () => (
  <section className="py-24 lg:py-32 bg-gray-dark">
    <div className="container mx-auto px-6 lg:px-12">
      <AnimatedSection>
        <div className="bg-card border border-border rounded-2xl p-12 lg:p-16">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto">
              about Wild Clone's Excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1} scale>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="bg-secondary border border-border rounded-xl p-8 h-full flex flex-col hover:border-gray-medium transition-colors duration-500"
                >
                  <StarRating />
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {t.text}
                  </p>
                  <p className="font-body text-sm font-semibold text-foreground">{t.name}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.3} scale>
            <div className="mt-6 max-w-md mx-auto">
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="bg-secondary border border-border rounded-xl p-8 hover:border-gray-medium transition-colors duration-500"
              >
                <StarRating />
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                  {testimonials[3].text}
                </p>
                <p className="font-body text-sm font-semibold text-foreground">{testimonials[3].name}</p>
              </motion.div>
            </div>
          </AnimatedSection>

        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default TestimonialsSection;
