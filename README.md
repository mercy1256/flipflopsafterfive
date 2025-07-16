# My Blog

A modern blog built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern and responsive design
- Markdown support for blog posts
- SEO optimized
- Fast and performant
- Easy to deploy

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Adding Blog Posts

1. Create a new markdown file in the `src/content/posts` directory
2. Add frontmatter to your markdown file:
   ```markdown
   ---
   title: Your Post Title
   date: YYYY-MM-DD
   description: A brief description of your post
   ---
   ```
3. Write your content in markdown format

## Deployment

This blog can be deployed to any hosting service that supports Next.js. Some popular options include:

- Vercel (recommended)
- Netlify
- AWS Amplify
- DigitalOcean App Platform

### Deploying to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your project in Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

## License

MIT 