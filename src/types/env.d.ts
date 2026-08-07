declare namespace NodeJS {
  interface ProcessEnv {
    /** Optional contact form POST endpoint. When unset, the form uses mailto. */
    NEXT_PUBLIC_CONTACT_ENDPOINT?: string;
    /** Server-only public site origin for metadata, robots.txt, and sitemap.xml. */
    SITE_URL?: string;
  }
}
