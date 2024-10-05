// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select header, about, and contact sections
    const sections = document.querySelectorAll("header, .about, .contact");
    // Select navigation links
    const navLinks = document.querySelectorAll("nav ul li a");

    // Intersection Observer options
    const options = {
        root: null, // Use the viewport as the root
        rootMargin: "0px",
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    // Function to animate sections when they are in view
    const animateSections = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes when the section is in view
                if (entry.target.classList.contains("about")) {
                    entry.target.classList.add("slideInLeft", "shake");
                } else if (entry.target.classList.contains("contact")) {
                    entry.target.classList.add("slideInRight", "shake");
                }
                // Stop observing once the animation has been applied
                observer.unobserve(entry.target);
            }
        });
    };

    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(animateSections, options);

    // Start observing each section
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default anchor behavior
            const targetId = this.getAttribute("href"); // Get target section id
            const targetSection = document.querySelector(targetId); // Select the target section
            
            // Scroll smoothly to the target section
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start" // Aligns the top of the target section with the top of the viewport
            });
        });
    });
});
