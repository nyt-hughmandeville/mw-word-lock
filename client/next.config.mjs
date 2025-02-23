/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/mw-word-lock' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mw-word-lock/' : '',
}

export default nextConfig
