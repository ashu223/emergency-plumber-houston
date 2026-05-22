import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode !== "development" &&
      prerender({
        routes: [
          "/",
          "/about",
          "/services",
          "/service-areas",
          "/faq",
          "/contact",
          "/privacy-policy",
          "/terms-of-service",
        ],
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          renderAfterDocumentEvent: "prerender-ready",
          maxConcurrentRoutes: 2,
          launchOptions: {
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          },
        },
        postProcess(renderedRoute: { html: string; route: string }) {
          // Ensure asset paths are absolute
          renderedRoute.html = renderedRoute.html.replace(
            /href="\.\//g,
            'href="/'
          ).replace(/src="\.\//g, 'src="/');
          return renderedRoute;
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
