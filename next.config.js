require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  staticPageGenerationTimeout: 1000,
  images: {
    domains: ['drive.google.com', 'localhost'],
  },
  devIndicators: {},
  publicRuntimeConfig: {
    theme: 'DEFAULT',
    currency: 'THB',
  },
  env: {
    BUILD: process.env.BUILD,
    ESLINT_NO_DEV_ERRORS: process.env.ESLINT_NO_DEV_ERRORS,
    DISABLE_ESLINT_PLUGIN: process.env.DISABLE_ESLINT_PLUGIN,
    APP_API_PROD: process.env.APP_API_PROD,
    APP_API_DEV: process.env.APP_API_DEV,
    APP_API_PROD_PRIVATE: process.env.APP_API_PROD_PRIVATE,
    APP_API_DEV_PRIVATE: process.env.APP_API_DEV_PRIVATE,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKE,
    SECRET_KEY_ENCRYPT: process.env.SECRET_KEY_ENCRYPT,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
