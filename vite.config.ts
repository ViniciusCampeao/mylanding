import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (SSR error wrapper).
    server: { entry: "server" },
  },
  // Força o Nitro a buildar (fora da infra do Lovable ele é pulado por padrão).
  // Combinado com NITRO_PRESET=node-server no Dockerfile, gera servidor Node real.
  nitro: true,
});
