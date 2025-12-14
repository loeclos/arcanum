import type { Variants } from "motion";

// Variants for the UL container (The Full Screen Overlay)
export const fullScreenVariants: Variants = {
  closed: { 
    opacity: 0, 
    transition: {
      when: "afterChildren", // Wait for children items to fade out
      duration: 0.3,
    } 
  },
  open: {
    opacity: 1,
    transition: {
      when: "beforeChildren", // Fade in the container before the items appear
      duration: 0.4,
      // You can add staggerChildren here if needed, but since the
      // actual item animation seems to be inside <Component>,
      // we'll focus on the container fade.
    },
  },
};

// Your original navigation items
export const navigationItems = [
  { name: "Home", href: "/", description: "[0]" },
  { name: "Components", href: "/components", description: "[1]" },
  { name: "Pricing", href: "/pricing", description: "[2]" },
  { name: "How to use", href: "/docs/quick-start", description: "[3]" },
  { name: "Account", href: "/user", description: "[4]" },
  { name: "Login", href: "/login", description: "[7]" },
];