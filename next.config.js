/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true, // this is for static export only - we can remove this for builds
  },
  publicRuntimeConfig: {
    basePath: "",
  },
  i18n: {
    locales: ["en"],

    defaultLocale: "en",
    localeDetection: true,
  },
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;
