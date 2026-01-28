import { SITE_CONFIG, SITE_URL } from "@/constants/general";

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.author.name,
    url: SITE_URL,
    image: `${SITE_URL}/profile.jpg`,
    jobTitle: "Lead Frontend Developer",
    worksFor: {
      "@type": "Organization",
      name: "OSF Digital",
    },
    sameAs: [
      SITE_CONFIG.author.twitterUrl,
      SITE_CONFIG.author.github,
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_URL,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
    },
    description: SITE_CONFIG.description,
  };
}

interface ArticleSchemaParams {
  title: string;
  description?: string;
  url: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function getArticleSchema(params: ArticleSchemaParams) {
  const { title, description, url, image, publishedTime, modifiedTime } = params;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    image: image ? [image] : undefined,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
