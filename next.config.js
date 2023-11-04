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
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
      encoding: "commonjs encoding",
    });
    return config;
  },
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;
