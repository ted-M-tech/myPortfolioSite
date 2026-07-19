/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Cloudflare Workers には sharp が無いため next/image の最適化は素通りになる。
    // 画像は public/ に WebP で事前最適化して置く方針。
    unoptimized: true,
  },
}

export default nextConfig