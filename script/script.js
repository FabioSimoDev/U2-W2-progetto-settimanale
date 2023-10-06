const carousels = document.querySelectorAll(".carousel");

carousels.forEach((carousel) => {
  const carouselInner = carousel.querySelector(".carousel-inner");
  const cardWidth = carouselInner.querySelector(".carousel-item").offsetWidth;
  const carouselWidth = carouselInner.scrollWidth;
  let scrollPosition = 0;

  const carouselInstance = new bootstrap.Carousel(carousel, {
    interval: false,
    wrap: false
  });

  carousel
    .querySelector(".carousel-control-next")
    .addEventListener("click", function () {
      if (scrollPosition < carouselWidth - cardWidth * 4) {
        scrollPosition += cardWidth;
        carouselInner.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    });

  carousel
    .querySelector(".carousel-control-prev")
    .addEventListener("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        carouselInner.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    });
});
