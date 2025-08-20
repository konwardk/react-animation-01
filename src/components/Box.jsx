// src/Box.jsx
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

export default function Box() {

  const [open, setOpen] = useState(false);

  const styles = useSpring({
    to: { transform: open ? "scale(1) rotate(0deg)" : "scale(0.9) rotate(-3deg)", opacity: open ? 1 : 0.6 },
    from: { transform: "scale(0.9) rotate(-3deg)", opacity: 0.6 },
    config: { tension: 170, friction: 20 } // defaults feel natural; tweak later
  });


    // const styles = useSpring({
    // from: { opacity: 0, y: 10 },
    // to: async (next) => {
    //     await next({ opacity: 1, y: 0 });
    //     await next({ opacity: 1, y: -4 });
    //     await next({ opacity: 1, y: 0 });
    // }
    // });

  return (
    <div style={{ display: "grid", placeItems: "center", height: 240 }}>
      <animated.div
        style={{ ...styles, width: 140, height: 140, borderRadius: 16, background: "#6C8DFF", cursor: "pointer" }}
        onClick={() => setOpen(v => !v)}
      />
    </div>
  );
}
