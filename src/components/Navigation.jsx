import React from "react";
import { useTrail, useSpring, animated } from "@react-spring/web";
import { NavLink } from "react-router-dom";

// const links = ["Home", "About", "Products", "Contact"];

    const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
    ];

export default function Navigation() {
  // Animate nav links in sequence
  const trail = useTrail(links.length, {
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 200, friction: 25 },
  });

  // Animate the Sign In button separately
  const buttonSpring = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    delay: 800,
    config: { tension: 180, friction: 14 },
  });

  return (
    <nav
      style={{
        padding: "16px 32px",
        background: "#032353ff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <div style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>
        React Animations
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: "24px" }}>
        {trail.map((style, i) => (
          <animated.div key={i} style={style}>
            <NavLink
              to={links[i].path}
              style={({ isActive }) => ({
                color: isActive ? "#ffd700" : "white",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "500",
              })}
            >
              {links[i].name}
            </NavLink>
          </animated.div>
        ))}
      </div>

      {/* Sign In Button */}
       <animated.div style={buttonSpring}>
        <NavLink
          to="/signin"
          style={{
            background: "white",
            color: "#0d6efd",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Sign In
        </NavLink>
      </animated.div>
    </nav>
  );
}
