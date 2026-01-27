/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slashes for cleaner URLs
  trailingSlash: true,
  
  // Compression
  compress: true,
  
  // Experimental features (if needed)
  experimental: {
    // Enable if using App Router features
    // appDir: true,
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirects (if needed)
  async redirects() {
    return [];
  },
  
  // Rewrites (if needed)
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
