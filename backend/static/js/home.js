const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target)
    } else {
      entry.target.classList.remove('visible');
    }
  })
})

const hiddenElements = document.querySelectorAll(".hidden");

console.log(hiddenElements);
hiddenElements.forEach(el => observer.observe(el))
