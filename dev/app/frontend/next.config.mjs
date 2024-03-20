/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
        {
            source: '/api/:path*',
            destination: 'http://host.docker.internal:4000/api/:path*',
        },
        ]
    },
};

export default nextConfig;
