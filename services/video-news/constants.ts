export const NEWS_SOURCES = {
  // International News
  REUTERS: "https://www.youtube.com/feeds/videos.xml?channel_id=UChqUTb7kYRX8-EiaN3XFrSQ",
  AP: "https://www.youtube.com/feeds/videos.xml?channel_id=UC52X5wxOL_s5yw0dQk7NtgA",
  // Technology
  CNET: "https://www.youtube.com/feeds/videos.xml?channel_id=UCOmcA3f_RrH6b9NmcNa4tdg",
  TECH_RADAR: "https://www.youtube.com/feeds/videos.xml?channel_id=UCAY_M9HyJb8oMKPV1utQQyA",
  // Business
  BLOOMBERG: "https://www.youtube.com/feeds/videos.xml?channel_id=UCUMZ7gohGI9HcU9VNsr2FJQ",
  CNBC: "https://www.youtube.com/feeds/videos.xml?channel_id=UCvJJ_dzjViJCoLf5uKUTwoA",
  // Sports
  ESPN: "https://www.youtube.com/feeds/videos.xml?channel_id=UCiWLfSweyRNmLpgEHekhoAg",
  SKY_SPORTS: "https://www.youtube.com/feeds/videos.xml?channel_id=UCNAf1k0yIjyGu3k9BwAg3lg",
  // South African News
  SABC_NEWS: "https://www.youtube.com/feeds/videos.xml?channel_id=UC8yH-uI81UUtEMDsowQyx1g",
  ENCA: "https://www.youtube.com/feeds/videos.xml?channel_id=UCI3RT5PGmdi1KVp9FG_CneA",
  NEWS24: "https://www.youtube.com/feeds/videos.xml?channel_id=UC_vRepQuzI527GtEP1pGYZw",
  NEWSROOM_AFRIKA: "https://www.youtube.com/feeds/videos.xml?channel_id=UCQMML3hAsx-Mz9j9ZN0tThQ"
} as const;

export const CATEGORIES = {
  ALL: 'ALL',
  INTERNATIONAL: 'INTERNATIONAL',
  TECHNOLOGY: 'TECHNOLOGY',
  BUSINESS: 'BUSINESS',
  SPORTS: 'SPORTS',
  SOUTH_AFRICAN: 'SOUTH_AFRICAN'
} as const;

// Source to category mapping
export const SOURCE_CATEGORIES = {
  REUTERS: CATEGORIES.INTERNATIONAL,
  AP: CATEGORIES.INTERNATIONAL,
  CNET: CATEGORIES.TECHNOLOGY,
  TECH_RADAR: CATEGORIES.TECHNOLOGY,
  BLOOMBERG: CATEGORIES.BUSINESS,
  CNBC: CATEGORIES.BUSINESS,
  ESPN: CATEGORIES.SPORTS,
  SKY_SPORTS: CATEGORIES.SPORTS,
  SABC_NEWS: CATEGORIES.SOUTH_AFRICAN,
  ENCA: CATEGORIES.SOUTH_AFRICAN,
  NEWS24: CATEGORIES.SOUTH_AFRICAN,
  NEWSROOM_AFRIKA: CATEGORIES.SOUTH_AFRICAN
} as const;
