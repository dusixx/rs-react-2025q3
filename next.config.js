/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  distDir: './dist',
  sassOptions: {
    prependData: `@use "/src/styles/utils/placeholders" as *; @use "/src/styles/utils/vars" as *;`,
  },
  images: {
    domains: ['rickandmortyapi.com'],
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
