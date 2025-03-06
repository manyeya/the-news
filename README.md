# The News 📰

A modern, feature-rich news application built with Next.js, React, and Convex that delivers a seamless news reading experience.

## ✨ Features

### 📱 Core Features
- **Responsive Design**: Fully responsive layout that works beautifully across all devices
- **Dark/Light Mode** 🌓: Toggle between dark and light themes for comfortable reading
- **Offline Support** 💾: Save articles for offline reading
- **Real-time Updates** ⚡: Live content updates powered by Convex backend

### 📰 News Content
- **Featured Articles** 🌟: Highlighted important stories at the top
- **Category Navigation** 🗂️: Browse news by different categories
- **Quick Bites** ⚡: Short, digestible news summaries
- **Video News** 🎥: Dedicated section for video content
- **Article Grid** 📑: Clean, organized presentation of articles

### 💫 Interactive Features
- **Search Functionality** 🔍: Powerful search to find specific articles
- **Article Interactions** ❤️: 
  - Like articles
  - Save for later reading
  - Share with others
- **Real-time Engagement** 👥: See article popularity and interactions

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
- Convex
- TypeScript
- Tailwind CSS

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
CONVEX_DEPLOYMENT=dev:fleet-bear-54 # team: manyeya, project: the-news
NEXT_PUBLIC_CONVEX_URL=https://fleet-bear-54.convex.cloud

CLERK_SECRET_KEY=sk_test_Rsf7r0kxq8x1BRVQWCHhUs3mwr0sVarYkyIVV3HBhg
NEWS_API_KEY=50e8a80acb5a4aec93ed7dbfebe84737
3. **Set up environment variables**
   - Copy `.env.local.example` to `.env.local`
   - Fill in the required environment variables:
     - `NEWS_API_KEY`: Get from [News API](https://newsapi.org)
     - `NEXT_PUBLIC_CONVEX_URL`: Get from [Convex Dashboard](https://dashboard.convex.dev)
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: for Clerk authentication
     - `CLERK_SECRET_KEY`: For clerk authentication§


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
