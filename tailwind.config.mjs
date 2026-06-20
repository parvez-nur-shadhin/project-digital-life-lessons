import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    // Scans your entire app router directory
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Scans your custom Component directory (Matches the capital 'C' in your image)
    "./src/Component/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
