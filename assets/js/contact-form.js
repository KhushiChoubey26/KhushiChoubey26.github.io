// Contact form handling with EmailJS
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector("[data-form]");
    const formBtn = document.querySelector("[data-form-btn]");
    const formStatus = document.querySelector(".form-status-container");
    const formInputs = document.querySelectorAll("[data-form-input]");
    
    console.log("Contact form script loaded");
    
    // Check if form elements exist
    if (!form) {
      console.error("Contact form not found");
      return;
    }
    
    if (!formBtn) {
      console.error("Form button not found");
      return;
    }
    
    // Enable form button when all fields are filled
    formInputs.forEach(input => {
      input.addEventListener('input', function() {
        let allFilled = true;
        formInputs.forEach(field => {
          if (!field.value.trim()) {
            allFilled = false;
          }
        });
        
        // Enable the button if all fields are filled
        formBtn.disabled = !allFilled;
        console.log("Form validation state:", allFilled ? "valid" : "invalid");
      });
    });
    
    // For testing purposes - enable this to test form without EmailJS
    const testMode = true;
    
    // Initialize EmailJS with your user ID
    // To set up EmailJS:
    // 1. Create an account at https://www.emailjs.com/
    // 2. Create an Email Service (e.g., Gmail, Outlook)
    // 3. Create an Email Template with template variables: {{from_name}}, {{from_email}}, and {{message}}
    // 4. Replace the user ID, service ID, and template ID below with your actual IDs
    (function() {
      try {
        // Replace with your actual EmailJS user ID from Account > API Keys
        emailjs.init("YOUR_USER_ID");
        console.log("EmailJS initialized");
      } catch (error) {
        console.error("EmailJS initialization error:", error);
      }
    })();
  
    // Add submit event to form
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      console.log("Form submitted");
      
      // Validate form again
      let isValid = true;
      formInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
        }
      });
      
      if (!isValid) {
        formStatus.innerHTML = '<div class="form-status error">Please fill in all fields.</div>';
        return;
      }
      
      // Show sending status
      formBtn.disabled = true;
      formBtn.querySelector('span').textContent = 'Sending...';
      formStatus.innerHTML = '<div class="form-status sending">Sending your message...</div>';
      
      // Get form data
      const templateParams = {
        from_name: form.querySelector('input[name="fullname"]').value,
        from_email: form.querySelector('input[name="email"]').value,
        message: form.querySelector('textarea[name="message"]').value
      };
      
      console.log("Form data:", templateParams);
      
      // For testing purposes - simulate successful submission
      if (testMode) {
        console.log("Test mode active - simulating successful submission");
        setTimeout(() => {
          // Success message
          formStatus.innerHTML = '<div class="form-status success">Test mode: Your message would be sent in production mode.</div>';
          
          // Reset form
          form.reset();
          formBtn.disabled = true;
          formBtn.querySelector('span').textContent = 'Send Message';
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            formStatus.innerHTML = '';
          }, 5000);
        }, 1500);
        return;
      }
      
      // Send email using EmailJS
      // Replace with your actual EmailJS service ID and template ID
      // Service ID is found in Email Services
      // Template ID is found in Email Templates
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          
          // Success message
          formStatus.innerHTML = '<div class="form-status success">Thank you! Your message has been sent successfully.</div>';
          
          // Reset form
          form.reset();
          formBtn.disabled = true;
          formBtn.querySelector('span').textContent = 'Send Message';
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            formStatus.innerHTML = '';
          }, 5000);
        }, function(error) {
          console.log('FAILED...', error);
          
          // Error message
          formStatus.innerHTML = '<div class="form-status error">Oops! Something went wrong. Please try again later.</div>';
          
          // Reset button
          formBtn.disabled = false;
          formBtn.querySelector('span').textContent = 'Send Message';
        });
    });
  }); 