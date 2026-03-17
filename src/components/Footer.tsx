
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {

  return (
    <motion.footer className="bg-[#1a1a1a] border-t border-border">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo + PHASA */}
          <div className="flex flex-col items-center md:items-start gap-6 lg:col-span-1">
            <img src="/images/Wild Clone.png" alt="Wild Clone Taxidermy" className="h-16 w-auto" />
            <img src="/images/S2yplh1DbUFF3qfoWSukRnpP6u8.png" alt="PHASA Member Badge" className="h-20 w-auto object-contain" />
          </div>

          {/* Pages */}
          <div className="text-center justify-self-center">
            <h4 className="font-heading text-lg font-semibold text-foreground mb-6">Pages</h4>
            {["Home", "About", "Mounting", "Mounting Direction", "Gallery", "Services", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : item === "Mounting Direction" ? "/mounting-direction" : `/${item.toLowerCase()}`}
                className="block font-body text-sm text-gray-light hover:text-foreground transition-colors mb-3"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="text-center justify-self-center">
            <h4 className="font-heading text-lg font-semibold text-foreground mb-6">Socials</h4>
            <a href="#" className="block font-body text-sm text-gray-light hover:text-foreground transition-colors mb-3">Instagram</a>
            <a href="#" className="block font-body text-sm text-gray-light hover:text-foreground transition-colors mb-3">Facebook</a>
            <a href="#" className="block font-body text-sm text-gray-light hover:text-foreground transition-colors mb-3">Youtube</a>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col">
            <h4 className="font-heading text-lg font-semibold text-foreground mb-6">Subscribe to our newsletter!</h4>
            <div className="flex max-w-xs mb-6">
              <input
                type="email"
                placeholder="Enter Your Email...."
                className="min-w-0 flex-1 bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-gray-medium focus:outline-none focus:border-gray-light rounded-l"
              />
              <button className="bg-foreground text-background font-body text-sm px-6 py-3 hover:bg-foreground/90 rounded-r transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>

            <Link to="/fulfilment-policy" className="font-body text-sm text-gray-light hover:text-foreground transition-colors underline decoration-border hover:decoration-gray-medium underline-offset-4 w-fit">
              Read our Fulfilment Policy
            </Link>
          </div>
        </div>
      </div>



      <div className="border-t border-border py-6">
        <p className="text-center font-body text-xs text-gray-medium">
          © 2025 Wild Clone Taxidermy. All rights reserved. Built by Streamline Digital Solutions.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
