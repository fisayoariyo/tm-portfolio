export const site = {
  name: "Timi Adeyemi",
  greeting: {
    salutation: "Hi,",
    intro: "I am Timi Adeyemi.",
  },
  /** Large hero H1 */
  headline: "Details aren't just details. They make the design.",
  heroHeadline: {
    line1: "Details aren't just details.",
    line2: "They make the design",
  },
  /** Muted line under the headline */
  subhead:
    "I help forward-thinking teams build calm, enduring brand systems and interfaces that people actually remember.",
  location: "London & Lagos (Worldwide)",
  phone: "+44 (0) 20 7946 0192",
  email: "hello@example.com",
  bookingUrl: "",
  about: {
    title: "A little about the work",
    body: "I help people turn messy ideas into clear, useful things — websites, brands, and products that feel intentional. Drop your story here when you're ready.",
  },

  otherThings: [
    { title: "Brand systems", note: "Naming, type, color, and how it all holds together." },
    { title: "Product UI", note: "Screens that stay calm under real use." },
    { title: "Art direction", note: "Campaigns, decks, and visual language." },
  ],
} as const;

export function bookingHref() {
  return site.bookingUrl.trim() || "#contact";
}
