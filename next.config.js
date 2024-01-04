const UnoCSS = require("@unocss/webpack").default;

const withMDX = require("@next/mdx")({
  options: {},
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

  images: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "invidious.projectsegfau.lt",
      },
    ],
  },

  webpack: (config) => {
    config.plugins.push(UnoCSS());
    config.cache = false;
    return config;
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // HACK: Webpack doesn't want to comply.
    ignoreBuildErrors: true,
  },
};

module.exports = withBundleAnalyzer(withMDX(nextConfig));
