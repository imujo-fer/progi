// /* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import tailwind from "tailwindcss";
import { copyFileSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";

function copyDir(src, dest) {
  try {
    mkdirSync(dest, { recursive: true });
    const entries = readdirSync(src);

    for (const entry of entries) {
      const srcPath = join(src, entry);
      const destPath = join(dest, entry);

      const stat = statSync(srcPath);
      if (stat.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        copyFileSync(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error("Error copying directory:", err);
  }
}

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [
      react(),
      checker({
        typescript: true,
      }),
      tailwind(),
      {
        name: "copy-public",
        closeBundle() {
          const publicDir = resolve(__dirname, "frontend/public");
          const targetDir = resolve(
            __dirname,
            "src/main/resources/static/public"
          );
          copyDir(publicDir, targetDir);
        },
      },
    ],
    build: {
      outDir: `src/main/resources/static/`,
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
