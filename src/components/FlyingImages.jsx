import { useEffect, useState } from "react";
import { useSprings, animated } from "@react-spring/web";

export default function FlyingImages() {
  const images = [
    "https://placekitten.com/120/120",
    "https://placebear.com/120/120",
    "https://picsum.photos/120?1",
    "https://picsum.photos/120?2",
  ];

  const [start, setStart] = useState(false);

  // Trigger animation 2s after page load
  useEffect(() => {
    const timer = setTimeout(() => setStart(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Define springs for each image
  const springs = useSprings(
    images.length,
    images.map((_, i) => ({
      from: { x: 0, y: 0, scale: 0.6, opacity: 0 },
      to: start
        ? {
            // Spread images around the center randomly
            x: window.innerWidth / 2 - 60 + (i % 2 === 0 ? i * 40 : -i * 40),
            y: window.innerHeight / 2 - 60 + (i % 2 === 0 ? -i * 30 : i * 30),
            scale: 1,
            opacity: 1,
          }
        : { x: 0, y: 0, scale: 0.6, opacity: 0 },
      config: { tension: 170, friction: 20 },
      delay: i * 200, // staggered effect
    }))
  );

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        width: 120,
        height: 120,
      }}
    >
      {springs.map((style, i) => (
        <animated.img
          key={i}
          src={images[i]}
          alt=""
          style={{
            position: "absolute",
            width: 80,
            height: 80,
            borderRadius: 12,
            opacity: style.opacity,
            transform: style.x.to(
              (x) => `translate(${x}px, ${style.y.get()}px) scale(${style.scale.get()})`
            ),
          }}
        />
      ))}
    </div>
  );
}
