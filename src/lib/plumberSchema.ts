import { siteConfig } from "./city.config";

export const plumberSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Plumber",

  name: `${siteConfig.primaryKeyword} – ${siteConfig.brand}`,

  url: siteConfig.domain,
  telephone: siteConfig.phone.tel,
  priceRange: "$$",

  description: `${siteConfig.primaryKeyword}. ${siteConfig.serviceDescription}`,

  areaServed: {
    "@type": "City",
    name: siteConfig.city,
    addressRegion: siteConfig.state,
    addressCountry: "US"
  },

  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.city,
    addressRegion: siteConfig.state,
    addressCountry: "US"
  },

  openingHours: "Mo-Su 00:00-23:59"
});
