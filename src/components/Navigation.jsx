import React from "react";
import { useTrail, useSpring, animated } from "@react-spring/web";

const links = ["Home", "About", "Products", "Contact"];

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
        MyLogo
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: "24px" }}>
        {trail.map((style, i) => (
          <animated.a
            key={links[i]}
            href={"#" + links[i].toLowerCase()}
            style={{
              ...style, // ✅ apply full style object directly
              color: "white",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {links[i]}
          </animated.a>
        ))}
      </div>

      {/* Sign In Button */}
      <animated.button
        style={{
          ...buttonSpring,
          background: "white",
          color: "#0d6efd",
          border: "none",
          borderRadius: "8px",
          padding: "8px 16px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Sign In
      </animated.button>
    </nav>
  );
}
