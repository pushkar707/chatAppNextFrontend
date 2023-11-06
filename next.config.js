/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'static.vecteezy.com'
          },
        ],
      },
      env: {
        
    },
}

module.exports = nextConfig
