# Bloggen

![Bloggen App Main Page](https://github.com/user-attachments/assets/a1690f89-f70e-4702-b3c1-5085b819ff32)

## Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## About

Bloggen is an AI-powered blog post generator and publisher designed to streamline the content creation process for developers and tech enthusiasts. With Bloggen, you can quickly generate high-quality blog posts and publish them directly to dev.to, all from a single, intuitive interface.

## Features

- 🤖 AI-powered blog post generation
- ✏️ Rich text editor for post refinement
- 👁️ Real-time preview of your blog post
- 🚀 One-click publishing to dev.to
- 💾 Local draft saving
- 🌓 Dark mode support

## Tech Stack

Bloggen is built with modern web technologies to ensure a smooth, responsive, and efficient user experience:

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- [Hugging Face API](https://huggingface.co/docs/api-inference/en/index) - For AI-powered content generation
- [dev.to API](https://developers.forem.com/api) - For publishing posts directly to dev.to
- [Unsplash API](https://unsplash.com/developers) - For fetching images

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

You'll also need:
- A Hugging Face API key
- A dev.to API key
- An Unsplash API key

### Installation

1. Clone the repositories:
   ```bash
   git clone https://github.com/10234567Z/Bloggen.git
   git clone https://github.com/10234567Z/Bloggen-API.git
   ```

2. Install backend dependencies:
   ```bash
   cd Bloggen-API
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your API keys:
   ```
   UNSPLASH_KEY=your_unsplash_api_key
   HF_KEY=your_huggingface_api_key
   ```

4. Build and start the backend:
   ```bash
   npm run build
   npm start
   ```

5. Install frontend dependencies:
   ```bash
   cd .. && cd Bloggen
   npm install
   ```

6. Create a `.env.local` file in the frontend root directory:
   ```
   NEXT_PUBLIC_DOMAIN=http://localhost:3000
   ```

7. Start the frontend development server:
   ```bash
   npm run dev
   ```

8. Open [http://localhost:3001](http://localhost:3001) in your browser to see the application.

## Usage

1. Enter a topic or idea for your blog post in the prompt field.
2. Click "Generate Blog" to create AI-generated content.
3. Use the "Edit" tab to refine the generated content.
4. Switch to the "Preview" tab to see how your post will look on dev.to.
5. Click "Publish to dev.to" when you're satisfied with your post.

## Configuration

You can customize various aspects of Bloggen by modifying the following files:
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `components/ui/theme-provider.tsx` - Theme configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

