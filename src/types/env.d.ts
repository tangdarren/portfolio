declare namespace NodeJS {
  interface ProcessEnv {
    /** Optional contact form POST endpoint. When unset, the form uses mailto. */
    NEXT_PUBLIC_CONTACT_ENDPOINT?: string;
    /** Public canonical origin for SEO tags, Open Graph URLs, and sitemap. */
    NEXT_PUBLIC_SITE_URL?: string;
  }
}
