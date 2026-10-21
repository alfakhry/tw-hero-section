import { defineConfig } from "vite";
import path from "node:path";
import {
  sallaTransformPlugin,
  sallaBuildPlugin,
  sallaDemoPlugin,
} from "@salla.sa/twilight-bundles/vite-plugins";

const SHARED_DIR = path.resolve(__dirname, "src/shared");
const COMPONENT_RE = /[\\/]src[\\/]components[\\/]([^\\/]+)[\\/]/;
const ENTRY_QUERY_RE = /\?entry=([\w-]+)$/;

/**
 * Salla loads every component of a bundle as its own standalone file
 * (dist/<component>.js). Rollup would normally move code shared by several
 * components (src/shared/*) into a separate chunk file. This plugin gives each
 * component its own copy of the shared modules instead, so every dist file
 * stays self-contained and loads with a single request.
 */
function selfContainedComponents() {
  return {
    name: "self-contained-components",
    enforce: "pre",
    async resolveId(source, importer) {
      if (!importer || !source.startsWith(".")) return null;
      const cleanImporter = importer.replace(ENTRY_QUERY_RE, "");
      const entry =
        importer.match(ENTRY_QUERY_RE)?.[1] || cleanImporter.match(COMPONENT_RE)?.[1];
      if (!entry) return null;
      const resolved = await this.resolve(source, cleanImporter, { skipSelf: true });
      if (!resolved || !resolved.id.startsWith(SHARED_DIR)) return null;
      return `${resolved.id}?entry=${entry}`;
    },
  };
}

export default defineConfig({
  plugins: [
    selfContainedComponents(),
    sallaTransformPlugin(),
    sallaBuildPlugin(),
    sallaDemoPlugin(),
  ],
});
