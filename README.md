# The News 📰

A modern, feature-rich news application built with Next.js, React, and Convex that delivers a seamless news reading experience.

## ✨ Features

### 📱 Core Features
- **Responsive Design**: Fully responsive layout that works beautifully across all devices
- **Dark/Light Mode** 🌓: Toggle between dark and light themes for comfortable reading
- **Offline Support** 💾: Save articles for offline reading
- **Real-time Updates** ⚡: Live content updates powered by Convex backend
- **User Authentication** 🔐: Secure authentication via Clerk

### 📰 News Content
- **Featured Articles** 🌟: Highlighted important stories at the top
- **Category Navigation** 🗂️: Browse news by different categories
- **Quick Bites** ⚡: Short, digestible news summaries
- **Video News** 🎥: 
  - Dedicated section for video content
  - RSS feed integration for XML video sources
- **Article Grid** 📑: Clean, organized presentation of articles

### 💫 Interactive Features
- **Search Functionality** 🔍: Powerful search to find specific articles
- **Article Interactions** ❤️: 
  - Like articles (requires authentication)
  - Save for later reading
  - Share with others
- **Real-time Engagement** 👥: See article popularity and interactions
- **User Profiles** 👤: Personalized user experience with Clerk

### 🚀 Technical Features
- **Progressive Web App (PWA)** 📱: Install as a native app
- **Service Worker** 🔄: Enhanced offline capabilities
- **Server-Side Rendering** ⚡: Optimized performance and SEO
- **Dynamic Loading** 🔄: Smooth loading states and transitions
- **Real-time Database** 📊: Powered by Convex for live updates

### 🎨 UI/UX Features
- **Modern Interface**: Clean and intuitive design
- **Smooth Transitions** ✨: Polished animations and loading states
- **Skeleton Loading** ⌛: Enhanced perceived performance
- **Responsive Images** 🖼️: Optimized image loading and display
- **News Marquee** 📺: Rolling headlines for quick updates

## 🛠️ Built With
- Next.js
- React
- Convex - Backend and real-time features
- Clerk - User authentication and management
- TypeScript
- Tailwind CSS

## 🔐 Authentication
This project uses Clerk for secure user authentication and management:
- Social login providers (Google, GitHub, etc.)
- Email/password authentication
- JWT token handling
- User profile management
- Role-based access control
- Seamless integration with Convex

## 🌐 Browser Support
- Chrome
- Firefox
- Safari
- Edge

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git

### Local Development
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd the-news
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Copy `.env.local.example` to `.env.local` and configure:

   Required variables:
   - `NEWS_API_KEY`: Get from [News API](https://newsapi.org)
   - `NEXT_PUBLIC_CONVEX_URL`: Get from [Convex Dashboard](https://dashboard.convex.dev)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Get from [Clerk Dashboard](https://dashboard.clerk.dev)
   - `CLERK_SECRET_KEY`: Get from [Clerk Dashboard](https://dashboard.clerk.dev)

   Optional variables:
   - `NEXT_PUBLIC_ANALYTICS_ID`: For analytics integration
   - `NEXT_PUBLIC_SITE_URL`: For social sharing features

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Start Convex backend**
   ```bash
   npx convex dev
   ```

Your app should now be running on [http://localhost:3000](http://localhost:3000) 🎉

### Build for Production
```bash
npm run build
npm start
# or
yarn build
yarn start
```

---

© 2024 The News. All rights reserved. 📰
