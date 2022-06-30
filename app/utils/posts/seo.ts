export function getSocialMetas({
    url,
    title = 'Code with Christian',
    description = 'Learn new things and build cool projects along side me.',
    image = 'https://www.christianbarlow.com/me_at_the_plaza.png',
    keywords = '',
  }: {
    image?: string
    url: string
    title?: string
    description?: string
    keywords?: string
  }) {
    return {
      title,
      description,
      keywords,
      image,
      'og:url': url,
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'twitter:card': image ? 'summary_large_image' : 'summary',
      'twitter:creator': '@TheRealBarlow_',
      'twitter:site': '@TheRealBarlow_',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:alt': title,
    }
  }