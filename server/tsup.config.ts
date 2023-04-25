import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: '../build/server',
  tsconfig: 'tsconfig.json',
  format: 'cjs',
  minify: true,
  shims: true,
  // legacyOutput: true,
});
