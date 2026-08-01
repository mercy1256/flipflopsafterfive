/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    // The experiences articles live in src/content/articles/experiences/**, which the
    // /blog/[...slug] catch-all already serves. These routes used to render the same
    // markdown a second time at /experiences/<group>/<slug> with no canonical tag,
    // so every experiences article existed at two indexable URLs. The /blog/ version
    // is the one in the sitemap and the only one that emits metadata, so send the
    // bare /experiences/ URLs there permanently.
    return [
      {
        source: '/experiences/hiking/:slug',
        destination: '/blog/experiences/hiking/:slug',
        permanent: true,
      },
      {
        source: '/experiences/cities/:slug',
        destination: '/blog/experiences/cities/:slug',
        permanent: true,
      },
      {
        source: '/experiences/road-trips/:slug',
        destination: '/blog/experiences/road-trips/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
