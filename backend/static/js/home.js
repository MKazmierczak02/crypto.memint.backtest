document.addEventListener("DOMContentLoaded", function () {
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
});

const howItWorksContainer = document.querySelector(".how-it-works-container");
observer.observe(howItWorksContainer);
});