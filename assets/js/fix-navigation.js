document.addEventListener('DOMContentLoaded', function() {
  console.log("Fix navigation script loaded");
  
  // Get all navigation links and pages
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");
  
  console.log("Navigation links found:", navigationLinks.length);
  console.log("Pages found:", pages.length);
  
  // Log all navigation links and pages for debugging
  navigationLinks.forEach((link, index) => {
    console.log(`Navigation link ${index}:`, link.innerHTML);
  });
  
  pages.forEach((page, index) => {
    console.log(`Page ${index}:`, page.dataset.page);
  });
  
  // Add click event listeners to all navigation links
  navigationLinks.forEach((link, i) => {
    link.addEventListener('click', function() {
      const clickedText = this.innerHTML.toLowerCase().trim();
      console.log("Navigation link clicked:", clickedText);
      
      // Remove active class from all navigation links and pages
      navigationLinks.forEach(navLink => {
        navLink.classList.remove("active");
      });
      
      pages.forEach(page => {
        page.classList.remove("active");
      });
      
      // Add active class to the clicked navigation link
      this.classList.add("active");
      
      // Find and activate the corresponding page
      pages.forEach(page => {
        if (page.dataset.page === clickedText) {
          page.classList.add("active");
          console.log("Activated page:", page.dataset.page);
        }
      });
      
      // Scroll to top
      window.scrollTo(0, 0);
    });
  });
}); 