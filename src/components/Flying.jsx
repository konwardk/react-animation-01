import { useEffect, useState } from "react";
import { useSprings, animated } from "@react-spring/web";

export default function FlyingImages() {
  const images = [
    "https://placebear.com/120/120",
    "https://placebear.com/120/120",
    "https://placebear.com/120/120",
    "https://picsum.photos/120?1",
    "https://picsum.photos/120?2",
    "https://picsum.photos/120?3",
  ];

  const [start, setStart] = useState(false);
  const [targetPositions, setTargetPositions] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setStart(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Update target positions relative to screen size
  useEffect(() => {
    function updatePositions() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const positions = [
        { x: width * 0.25, y: -height * 0.15 },
        { x: width * 0.18, y: -height * 0.08 },
        { x: width * 0.35, y: -height * 0.12 },
        { x: width * 0.10, y: -height * 0.18 },
        { x: width * 0.20, y: -height * 0.15 },
        { x: width * 0.18, y: -height * 0.25 },
      ];
      setTargetPositions(positions);
    }

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  const springs = useSprings(
    images.length,
    images.map((_, i) => ({
      from: { x: 0, y: 0, scale: 0.8, opacity: 1 },
      to:
        start && targetPositions[i]
          ? {
              x: targetPositions[i].x,
              y: targetPositions[i].y,
              scale: 1,
              opacity: 1,
            }
          : { x: 0, y: 0, scale: 0.8, opacity: 1 },
      config: { tension: 20, friction: 40 },
      delay: i * 400,
    }))
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh", // full screen
        display: "flex",
        alignItems: "center", // ⬅️ vertical center
        justifyContent: "flex-start", // ⬅️ keep left side
        paddingLeft: "5vw", // little gap from the left
      }}
    >
      {/* Box */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "clamp(60px, 12vw, 120px)",
          height: "clamp(60px, 12vw, 120px)",
          background: "#ddd",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(10px, 2vw, 14px)",
          fontWeight: "bold",
        }}
      >
        📦 Box
      </div>

      {/* Flying images */}
      {springs.map((style, i) => (
        <animated.img
          key={i}
          src={images[i]}
          alt=""
          style={{
            position: "absolute",
            left: "5vw", // align with box
            // 👇 vertical center: match the container center
            top: "50%",
            transform: style.x.to(
              (x) =>
                `translate(${x}px, calc(${style.y.get()}px - 50%)) scale(${style.scale.get()})`
            ),
            width: "clamp(40px, 8vw, 80px)",
            height: "clamp(40px, 8vw, 80px)",
            borderRadius: 12,
            opacity: style.opacity,
          }}
        />
      ))}
    </div>
  );
}
