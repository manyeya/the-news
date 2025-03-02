export const NEWS_PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjQwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIGltYWdlIGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';

export const NEWS_CATEGORIES = {
  featured: {
    title: 'Featured Stories',
    description: 'Top curated stories from our editors',
  },
  top: {
    title: 'Top Stories',
    description: 'Breaking news and major headlines',
  },
  entertainment: {
    title: 'Entertainment Headlines',
    description: 'Latest from the world of entertainment',
  },
  world: {
    title: 'World News Coverage',
    description: 'Global news and international coverage',
  },
  popular: {
    title: 'Most Popular Articles',
    description: 'Trending and widely-read stories',
  },
} as const;

export const ARTICLE_PAGE_SIZE = 12;