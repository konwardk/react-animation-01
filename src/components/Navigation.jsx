import React, { useState } from "react";
import { useTrail, useSpring, animated } from "@react-spring/web";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Contact", path: "/contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Animate nav links (desktop)
  const trail = useTrail(links.length, {
    from: { opacity: 0, transform: "translateY(-15px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 220, friction: 25 },
  });

  // Animate Sign In button
  const buttonSpring = useSpring({
    from: { opacity: 0, transform: "scale(0.9)" },
    to: { opacity: 1, transform: "scale(1)" },
    delay: 600,
    config: { tension: 180, friction: 16 },
  });

  // Animate mobile dropdown
  const mobileMenuSpring = useSpring({
    height: menuOpen ? "auto" : 0,
    opacity: menuOpen ? 1 : 0,
    transform: menuOpen ? "translateY(0px)" : "translateY(-10px)",
    config: { tension: 220, friction: 24 },
  });

  return (
    <nav className="w-full flex justify-between items-center relative"
      style={{ padding: "16px 32px", background: "#032353ff", color: "white" }}
    >
      {/* Logo */}
      <div className="text-white font-bold text-xl">React Animations</div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center">
        {trail.map((style, i) => (
          <animated.div key={i} style={style}>
            <NavLink
              to={links[i].path}
              // className={({ isActive }) =>
              //   `text-base font-medium transition-colors ${
              //     isActive ? "text-yellow-400" : "text-white"
              //   }`
              // }
              style={({ isActive }) => ({ color: isActive ? "#ffd700" : "white", textDecoration: "none", fontSize: "16px", fontWeight: "500", })}
            >
              {links[i].name}
            </NavLink>
          </animated.div>
        ))}

        {/* Sign In Button */}
        <animated.div style={buttonSpring}>
          <NavLink
            to="/signin"
            className="bg-white text-blue-600 rounded-lg font-semibold"
            style={{ padding: "8px 16px" }}
          >
            Sign In
          </NavLink>
        </animated.div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="md:hidden text-white"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      <animated.div
        style={mobileMenuSpring}
        className="absolute top-16 left-0 w-full bg-[#032353] flex flex-col gap-4 p-6 md:hidden overflow-hidden shadow-lg"
      >
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            className={({ isActive }) =>
              `block text-base font-medium ${
                isActive ? "text-yellow-400" : "text-white"
              }` 
            }
            onClick={() => setMenuOpen(false)}
            style={{ marginLeft: "10px", textDecoration: "none", fontSize: "16px", fontWeight: "500", display: "flex", justifyContent: "center" }}
          >
            {link.name}
          </NavLink>
        ))}

        <NavLink
          to="/signin"
          className="bg-white text-blue-600 rounded-lg font-semibold w-max" style={{ padding: "8px 16px", margin: "10px 10px", display: "flex", justifyContent: "center"  }}
          onClick={() => setMenuOpen(false)}
        >
          Sign In
        </NavLink>
      </animated.div>
    </nav>
  );
}
