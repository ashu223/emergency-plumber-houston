import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Signal to prerender plugin that the app is ready
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.dispatchEvent(new Event("prerender-ready"));
  });
});
