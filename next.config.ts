/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // TODO удалить
    },
    typescript: {
        ignoreBuildErrors: true, // TODO удалить
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.dodostatic.net",
                pathname: "/**"
            },
        ],
    },
}

module.exports = nextConfig