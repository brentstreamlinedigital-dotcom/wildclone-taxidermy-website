import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import CTABanner from "@/components/CTABanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogData";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center">
          <AnimatedSection>
            <Link to="/blog" className="inline-block font-body text-xs text-muted-foreground hover:text-foreground transition-colors mb-8 uppercase tracking-wider">
              ← Back to Blog
            </Link>
            <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-4">
              {post.date}
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-foreground tracking-tight mb-8">
              {post.title}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <AnimatedSection>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full aspect-video border border-border rounded-xl flex items-center justify-center bg-card overflow-hidden"
            >
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover saturate-100" />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 lg:pb-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <AnimatedSection delay={0.3}>
            <div 
              className="prose prose-invert prose-lg max-w-none text-muted-foreground font-body leading-relaxed prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground prose-h2:text-3xl prose-h3:text-2xl prose-a:text-white hover:prose-a:text-gray-medium prose-strong:text-foreground prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
};

export default BlogPost;
