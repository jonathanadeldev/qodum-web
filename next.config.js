/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 's3.ap-south-1.amazonaws.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'qodum.s3.us-east-1.amazonaws.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'static.vecteezy.com',
                port: ''
            }
        ]
    }
}

module.exports = nextConfig;