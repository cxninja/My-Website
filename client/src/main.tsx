import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;

// Check if the page was server-rendered (has initial content)
if (container.hasChildNodes()) {
  // Hydrate the server-rendered content
  hydrateRoot(container, <App />);
} else {
  // Fall back to client-side rendering if no SSR content
  createRoot(container).render(<App />);
}
