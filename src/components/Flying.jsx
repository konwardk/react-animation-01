import { useEffect, useState } from "react";
import { useSprings, animated } from "@react-spring/web";
import '../css/Flying.css'

export default function FlyingImages() {
  const images = [
    // "https://placekitten.com/120/120",
    "https://placebear.com/120/120",
    "https://placebear.com/120/120",
    "https://placebear.com/120/120",
    "https://picsum.photos/120?1",
    "https://picsum.photos/120?2",
    "https://picsum.photos/120?3",
  
  ];

  const [start, setStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStart(true), 2000); // 2s delay
    return () => clearTimeout(timer);
  }, []);

  // Target offsets (relative to the box)
  const targetPositions = [
    { x: 300, y: -250 },
    { x: 140, y: -60 },
    { x: 350, y: -140 },
    { x: 100, y: -220 },
    { x: 200, y: -150 },
    { x: 150, y: -350 },
  ];

  const springs = useSprings(
    images.length,
    images.map((_, i) => ({
      from: { x: 0, y: 0, scale: 0.8, opacity: 1 }, // inside box
      to: start
        ? {
            x: targetPositions[i].x,
            y: targetPositions[i].y,
            scale: 1,
            opacity: 1,
          }
        : { x: 0, y: 0, scale: 0.8, opacity: 1 },
      config: { tension: 20, friction: 40 },
      delay: i * 800,
    }))
  );

  return (
    <>
      {/* Box (container for animation start) */}
      <div
        style={{
          zIndex: 1,
          position: "fixed",
          bottom: 20,
          left: 20,
          width: 120,
          height: 120,
          background: "#ddd",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontWeight: "bold",
          overflow: "visible",
        }}
      >
        📦 Box
        
      </div>
      <div className="images">
        {/* Animated images relative to this box */}
        {springs.map((style, i) => (
          <animated.img
            key={i}
            src={images[i]}
            alt=""
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              width: 80,
              height: 80,
              borderRadius: 12,
              opacity: style.opacity,
              transform: style.x.to(
                (x) =>
                  `translate(${x}px, ${style.y.get()}px) scale(${style.scale.get()})`
              ),
            }}
          />
        ))}
      </div>
    </>
  );
}
