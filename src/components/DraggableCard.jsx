import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export default function DraggableCard() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
//   const bind = useDrag(({ down, movement: [mx, my] }) =>
//     api.start({ x: down ? mx : 0, y: down ? my : 0 })
//   );
  const bind = useDrag(({offset:[onauxclick, oy]}) => api.start({x: onauxclick, y: oy}));

  return (
    <animated.div {...bind()} style={{ x, y, width: 160, height: 100, borderRadius: 12, background: "#FFD46C" }} />
  );
}
