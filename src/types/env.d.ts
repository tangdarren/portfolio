declare namespace NodeJS {
  interface ProcessEnv {
    /** Optional contact form POST endpoint. When unset, the form uses mailto. */
    NEXT_PUBLIC_CONTACT_ENDPOINT?: string;
    /**
     * Server-only public site origin for metadata, robots.txt, and sitemap.xml.
     * Prefer this over NEXT_PUBLIC_SITE_URL.
     */
    SITE_URL?: string;
    /** @deprecated Prefer SITE_URL. Kept temporarily for local env compatibility. */
    NEXT_PUBLIC_SITE_URL?: string;
  }
}
