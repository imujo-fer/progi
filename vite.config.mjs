// /* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import tailwind from "tailwindcss";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [
      react(),
      checker({
        typescript: true,
      }),
      tailwind(),
    ],
    build: {
      outDir: `./frontend/dist`,
      rollupOptions: {
        input: {
          index: `./frontend/src/index.tsx`,
        },
        output: {
          entryFileNames: isProduction ? `[name].js` : `[name].js`,
          chunkFileNames: isProduction ? `[name].js` : `[name].js`,
          assetFileNames: ({ name }) => {
            if (/\.png$|\.jpg$|\.jpeg$|\.svg$|\.gif$/.test(name ?? "")) {
              return isProduction
                ? "images/[name].[ext]"
                : "images/[name].[ext]";
            }
            if (/\.woff$|\.woff2$|\.eot$|\.ttf$|\.otf$/.test(name ?? "")) {
              return isProduction ? "fonts/[name].[ext]" : "fonts/[name].[ext]";
            }

            return isProduction ? `[name].[ext]` : `[name].[ext]`;
          },
        },
      },
      assetsInlineLimit: 0,
    },
    resolve: {
      alias: {
        "@": "/frontend/src",
      },
    },
    server: {
      port: 5171,
    },
  };
});
