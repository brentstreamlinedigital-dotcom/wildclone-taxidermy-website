import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Mounting Direction", path: "/mounting-direction" },
  { label: "Gallery", path: "/gallery" },
  { 
    label: "Services", 
    path: "/services",
    subLinks: [
      { label: "Mounting", path: "/mounts" },
      { label: "Tanning", path: "/services/tanning" },
      { label: "Dip & Pack", path: "/services/dip-pack" },
      { label: "Leather Worx", path: "/services/leatherworks" },
      { label: "Wylde Craft", path: "/services/wyldecraft" },
    ]
  },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
          }`}
      >
        <div className={`container mx-auto px-6 lg:px-12 flex items-center justify-between transition-all duration-500 relative ${scrolled ? "h-16" : "h-24"
          }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 relative z-10">
            <div className="flex flex-col items-center">
              <img
                src="/images/Wild Clone.png"
                alt="Wild Clone Taxidermy"
                className={`w-auto transition-all duration-500 ${scrolled ? "h-10" : "h-14"}`}
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden xl:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out w-max ${scrolled ? "gap-6" : "gap-10 2xl:gap-14"}`}>
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                <Link
                  to={link.path}
                  className={`font-body text-sm text-foreground/80 hover:text-foreground transition-colors duration-300 whitespace-nowrap ${location.pathname === link.path ? "text-foreground" : ""
                    }`}
                >
                  {link.label}
                </Link>
                {link.subLinks && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-48">
                    <div className="bg-card border border-border rounded-xl shadow-lg p-2 flex flex-col gap-1">
                      {link.subLinks.map(subLink => (
                        <Link
                          key={subLink.path}
                          to={subLink.path}
                          className="font-body text-sm text-muted-foreground hover:text-foreground hover:bg-secondary px-4 py-2 rounded-lg transition-all duration-200"
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="https://portal.wildclone.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-block font-body text-sm px-6 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background rounded transition-all duration-300"
            >
              Outfitters Portal
            </a>

            <button
              onClick={() => setMobileOpen(true)}
              className="xl:hidden text-foreground hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20">
              <Link to="/" onClick={() => setMobileOpen(false)}>
                <img src="/images/Wild Clone.png" alt="Wild Clone Taxidermy" className="h-10 w-auto" />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-foreground" aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <Link to={link.path} onClick={() => setMobileOpen(false)} className="font-heading text-4xl text-foreground hover:opacity-60 transition-opacity">
                    {link.label}
                  </Link>
                  {link.subLinks && (
                    <div className="mt-4 flex flex-col items-center gap-3">
                      {link.subLinks.map((subLink) => (
                        <Link key={subLink.path} to={subLink.path} onClick={() => setMobileOpen(false)} className="font-heading text-xl text-muted-foreground hover:text-foreground transition-colors">
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.a
                href="https://portal.wildclone.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-4 font-body text-sm px-8 py-4 bg-foreground text-background rounded"
              >
                Outfitters Portal
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
