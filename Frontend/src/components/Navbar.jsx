import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/images/logo.png";
import { Button, Menu, MenuItem, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authAction";

function Navbar() {
  const token = useSelector((state) => state.auth.token);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled ? "bg-black shadow-lg" : "bg-secondary/90"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="relative h-20 w-32 md:w-48">
            <Link to="/" className="text-2xl font-bold text-primary ">
              <motion.img
                src={Logo}
                alt="Logo"
                className="absolute inset-0 w-full h-full object-contain"
                animate={{ scale: scrolled ? 0.9 : 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6 naves">
            <Link to="/" className="text-white hover:text-primary transition text_url">
              Home
            </Link>
            <Link
              to="/table-booking"
              className="text-white hover:text-primary transition"
            >
              Book a Table
            </Link>
            {token && token !== 'undefined' ? (
              <>
              <Link to="/" className="text-white hover:text-primary transition">
              Old booking
            </Link>
            <Link
              to="/table-booking"
              className="text-white hover:text-primary transition"
            >
              Offers
            </Link>
              </>
            ) : (
              <></>
            )}


            {/* Dropdown with down arrow */}
            <div>
              <IconButton
                aria-controls={open ? "menu-dropdown" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleMenuOpen}
                color="inherit"
              >
                <ArrowDropDownIcon className="text-white" />
              </IconButton>
              <Menu
                id="menu-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{ "aria-labelledby": "menu-button" }}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/signup">
                    <span style={{ color: "#d4af37", fontWeight: "600" }}>
                      Sign Up
                    </span>
                  </Link>
                </MenuItem>
                {token && token !== 'undefined' ?(
                  <MenuItem onClick={handleMenuClose}>
                  <span onClick={()=> dispatch(logout())}  style={{ color: "#d4af37", fontWeight: "600" }}>
                    Logout
                  </span>
                </MenuItem>
                ):(
                  <MenuItem onClick={handleMenuClose}>
                  <Link to="/signin">
                    <span style={{ color: "#d4af37", fontWeight: "600" }}>
                      Login
                    </span>
                  </Link>
                </MenuItem>
                )}

              </Menu>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
