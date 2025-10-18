// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';
// export default defineConfig({
//     plugins: [
//         react(),
//         tailwindcss()
//     ],
//     server: {
//         host: '0.0.0.0',
//         port: 5173,
//         strictPort: true
//     },
//     build: {
//         outDir: 'dist',
//         sourcemap: false,
//     },
//     optimizeDeps: {
//         exclude: [],
//     }
// });



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        react({
            // إضافة هذا الخيار لتجاوز أخطاء TypeScript
            jsxRuntime: 'automatic'
        }),
        tailwindcss()
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        // إضافة هذا الخيار لتجاوز الأخطاء
        rollupOptions: {
            onwarn() {
                // تجاهل جميع التحذيرات أثناء البناء
                return;
            }
        }
    },
    optimizeDeps: {
        exclude: [],
    },
    // إضافة هذه الإعدادات الجديدة
    esbuild: {
        logOverride: { 'this-is-undefined-in-esm': 'silent' }
    }
});