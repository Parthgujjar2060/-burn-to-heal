/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: '',
          pathname: '/v0/b/unknown-breath-vibes.appspot.com/o/**',
        },
      ],
      dangerouslyAllowSVG: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig;
  