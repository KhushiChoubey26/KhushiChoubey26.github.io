'use strict';

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const clickedBtnText = this.innerHTML.toLowerCase();
    
    for (let j = 0; j < pages.length; j++) {
      if (clickedBtnText === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  console.log("Navigation initialized");
  console.log("Navigation links:", navigationLinks.length);
  console.log("Pages:", pages.length);
}); 