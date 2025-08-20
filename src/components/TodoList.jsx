import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";

export default function TodoList() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // Animated transitions for items
  const transitions = useTransition(items, {
    from: { opacity: 0, y: -20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 20 },
    keys: (item) => item,
  });

  // Add new todo
  const addItem = () => {
    if (input.trim()) {
      setItems((prev) => [...prev, input.trim()]);
      setInput(""); // clear after adding
    }
  };

  // Remove one item
  const removeItem = (itemToRemove) => {
    setItems((prev) => prev.filter((item) => item !== itemToRemove));
  };

  return (
    <div style={{ maxWidth: 320, margin: "2rem auto", textAlign: "center" }}>
      <h2>✅ Animated Todo List</h2>

      {/* Input + Add Button */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
        <button onClick={addItem} style={{ padding: "8px 12px" }}>
          Add
        </button>
      </div>

      {/* Animated List */}
      <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
        {transitions((style, item) => (
          <animated.div
            key={item}
            style={{
              ...style,
              transform: style.y.to((v) => `translateY(${v}px)`),
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#287610ff",
              padding: "8px 12px",
              borderRadius: 6,
            }}
          >
            <span>{item}</span>
            <button
              onClick={() => removeItem(item)}
              style={{
                background: "none",
                color: "white",
                border: "none",
                borderRadius: 4,
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              ❌
            </button>
          </animated.div>
        ))}
      </div>
    </div>
  );
}
