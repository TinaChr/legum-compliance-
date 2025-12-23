import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small delay to ensure the DOM is ready
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const navbarHeight = 100; // Account for fixed navbar height
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Scroll to top when navigating to a page without hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash, pathname]);
};
