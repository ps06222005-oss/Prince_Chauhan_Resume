import fs from "fs";
import path from "path";

async function generateStaticHtml() {
  const distDir = path.resolve("dist");
  if (!fs.existsSync(distDir)) {
    console.error("dist directory does not exist! Running build first...");
    process.exit(1);
  }

  const serverEntryPath = path.resolve("dist/server/index.mjs");
  if (!fs.existsSync(serverEntryPath)) {
    console.error("dist/server/index.mjs does not exist!");
    process.exit(1);
  }

  console.log("Generating static HTML from production server entry...");

  // Polyfill React 19 jsxDEV in production bundle if needed
  const reactMjsPath = path.resolve("dist/server/_libs/react.mjs");
  if (fs.existsSync(reactMjsPath)) {
    let content = fs.readFileSync(reactMjsPath, "utf-8");
    if (content.includes("exports.jsxDEV = void 0;")) {
      content = content
        .split("exports.jsxDEV = void 0;")
        .join(
          'const __REACT_ELEM = Symbol.for("react.transitional.element"); exports.jsxDEV = (type, props, key) => { const obj = { type, key: key !== void 0 ? "" + key : null, props: props || {}, _owner: null, _store: {} }; obj["$$" + "typeof"] = __REACT_ELEM; return obj; };',
        );
      fs.writeFileSync(reactMjsPath, content, "utf-8");
    }
  }

  // Fix any Rollup-elided jsxDEV named imports in routes-*.mjs chunks
  const ssrDir = path.resolve("dist/server/_ssr");
  if (fs.existsSync(ssrDir)) {
    const routeFiles = fs
      .readdirSync(ssrDir)
      .filter((f) => f.startsWith("routes-") && f.endsWith(".mjs"));
    for (const file of routeFiles) {
      const filePath = path.join(ssrDir, file);
      let content = fs.readFileSync(filePath, "utf-8");
      if (content.includes("(void 0)(")) {
        content = content.split("(void 0)(").join("(0, import_jsx_dev_runtime.jsxDEV)(");
        fs.writeFileSync(filePath, content, "utf-8");
      }
    }
  }

  const mod = await import(serverEntryPath);

  const ctx = {
    waitUntil: () => {},
    passThroughOnException: () => {},
    context: {
      waitUntil: () => {},
      passThroughOnException: () => {},
    },
  };
  const env = {};

  const routes = ["/"];

  for (const route of routes) {
    try {
      const req = new Request(`http://localhost${route}`);
      const res = await mod.default.fetch(req, env, ctx);
      if (res.status === 200) {
        const html = await res.text();
        const targetFile =
          route === "/"
            ? path.join(distDir, "index.html")
            : path.join(distDir, route.replace(/^\//, ""), "index.html");
        fs.mkdirSync(path.dirname(targetFile), { recursive: true });
        fs.writeFileSync(targetFile, html, "utf-8");
        console.log(`[static-html] Generated ${route} -> ${targetFile} (${html.length} bytes)`);
      } else {
        console.warn(`[static-html] Route ${route} returned status ${res.status}`);
      }
    } catch (err) {
      console.error(`[static-html] Failed to prerender route ${route}:`, err);
    }
  }

  // Ensure index.html exists in dist
  const distIndex = path.join(distDir, "index.html");
  if (!fs.existsSync(distIndex)) {
    console.error("FATAL: dist/index.html was not generated!");
    process.exit(1);
  }

  // Ensure resume.pdf is in dist
  const publicResume = path.resolve("public/resume.pdf");
  const distResume = path.resolve("dist/resume.pdf");
  if (fs.existsSync(publicResume) && !fs.existsSync(distResume)) {
    fs.copyFileSync(publicResume, distResume);
    console.log("[static-html] Copied resume.pdf to dist/resume.pdf");
  }

  console.log("[static-html] Static HTML generation complete. Build artifacts are ready in dist/");
}

generateStaticHtml().catch((err) => {
  console.error("Error in generateStaticHtml:", err);
  process.exit(1);
});
