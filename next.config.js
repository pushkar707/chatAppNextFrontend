/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.imgur.com',
          },
        ],
      },
      env: {
        
    },
}

module.exports = nextConfig
