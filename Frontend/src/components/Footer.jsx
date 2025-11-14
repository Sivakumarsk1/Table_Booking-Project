import { motion } from 'framer-motion';

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-secondary py-8"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-primary font-bold text-lg mb-4">Contact Us</h3>
            <p className="text-gray-400">123 Dining Street</p>
            <p className="text-gray-400">New York, NY 10001</p>
            <p className="text-gray-400">Phone: (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-primary font-bold text-lg mb-4">Hours</h3>
            <p className="text-gray-400">Monday - Thursday: 5pm - 10pm</p>
            <p className="text-gray-400">Friday - Saturday: 5pm - 11pm</p>
            <p className="text-gray-400">Sunday: 5pm - 9pm</p>
          </div>
          <div>
            <h3 className="text-primary font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-primary transition">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-primary transition">Twitter</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Candlelight Dinners. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
