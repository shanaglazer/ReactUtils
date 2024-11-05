import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
build: {
lib: {
entry: path.resolve(__dirname, 'src/index.ts'), 
name: 'package name',
formats: ['es', 'umd'], 
fileName: (format) => `index.${format}.js`
},
rollupOptions: {
external: ['react', 'react-dom'],
output: {
globals: {
react: 'React',
'react-dom': 'ReactDOM'
}
}
}
},
plugins: [react()]
});
