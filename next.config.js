/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
  
    // /en/__ecom/checkout を内部で /__ecom/checkout に差し替える
    async rewrites() {
      return [
        { source: '/en/__ecom/checkout', destination: '/__ecom/checkout' },
      ];
    },
  };
  
  module.exports = nextConfig;
  