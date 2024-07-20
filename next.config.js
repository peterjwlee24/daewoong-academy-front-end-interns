/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hackercrunch-demo.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/*',
      },
    ],
    domains: ['upload.wikimedia.org', 'cdn.dribbble.com', 'www.insightintodiversity.com', 'palace-images.s3.us-east-2.amazonaws.com'],
  },
}

module.exports = nextConfig
