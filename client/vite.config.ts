import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    assetsInclude: ['**/*.glb', '**/*.gltf'],
    base: mode === 'production' ? '/Todo/' : '/',
    server: {
      hmr: {
        overlay: true, // Show overlay on browser for HMR errors
      },
      // docker
      host: true,
    },
  })
}

