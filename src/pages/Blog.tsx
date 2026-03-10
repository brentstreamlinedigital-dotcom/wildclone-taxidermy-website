import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import CTABanner from "@/components/CTABanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogData";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-4">
              Our Blog
            </h1>
            <p className="font-body text-base md:text-lg text-gray-light max-w-2xl mx-auto mb-8">
              News, updates, and insights from the team at Wild Clone Taxidermy.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 lg:pb-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, i) => (
                <AnimatedSection key={post.id} delay={i * 0.1} scale>
                  <Link to={`/blog/${post.slug}`} className="block h-full group">
                    <motion.div
                      whileHover={{ y: -6, transition: { duration: 0.3 } }}
                      className="bg-card border border-border rounded-xl h-full flex flex-col hover:border-gray-medium transition-colors duration-500 overflow-hidden"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out saturate-100" 
                        />
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-3">{post.date}</p>
                        <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">{post.title}</h3>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="mt-6 font-body text-sm font-semibold text-foreground uppercase tracking-wider group-hover:underline underline-offset-4 decoration-1">
                          Read More
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <h2 className="font-heading text-3xl text-muted-foreground">No posts found</h2>
              <p className="font-body text-sm text-gray-light mt-4">Check back later for news and updates.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
};

export default Blog;
