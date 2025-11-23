/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'notion-bg': 'var(--notion-bg)',
                'notion-sidebar': 'var(--notion-sidebar)',
                'notion-text': 'var(--notion-text)',
                'notion-gray': 'var(--notion-gray)',
                'notion-border': 'var(--notion-border)',
                'notion-hover': 'var(--notion-hover)',
                'notion-red': 'var(--notion-red)',
                'notion-blue': 'var(--notion-blue)',
                'notion-green': 'var(--notion-green)',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
                serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
            },
            boxShadow: {
                'notion-card': 'rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px',
                'notion-sm': 'rgba(15, 15, 15, 0.1) 0px 1px 2px',
            }
        },
    },
    plugins: [],
}
