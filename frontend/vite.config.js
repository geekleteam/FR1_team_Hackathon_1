import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [TanStackRouterVite(), react(), tsconfigPaths()],
    define: {
      _BACKEND_URL_: JSON.stringify(env.BACKEND_URL),
    },
  };
});
