module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  safelist: [
    { pattern: /^bg-/ },
    { pattern: /^text-/ },
    { pattern: /^hover:bg-/ },
    { pattern: /^sm:/ },
    { pattern: /^lg:/ },
    { pattern: /^p-/ },
    { pattern: /^rounded/ },
    { pattern: /^shadow/ },
    { pattern: /^opacity-/ },
    { pattern: /^cursor-/ },
    { pattern: /^border-/ }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
