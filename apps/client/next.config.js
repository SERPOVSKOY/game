/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: false
  },
  transpilePackages: ['@game/graphql', 'lodash-es'],
  pageExtensions: ['page.mdx', 'page.md', 'page.jsx', 'page.js', 'page.tsx', 'page.ts'],
  publicRuntimeConfig: Object.keys(dotenv.parsed).reduce((acc, key) => {
    if (key.startsWith('NEXT_PUBLIC')) {
      acc[key] = dotenv.parsed[key];
    }
    return acc;
  }, {})
};

module.exports = nextConfig;
