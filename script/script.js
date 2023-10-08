// devo informarmi su una soluzione:
// se la dimensione dello schermo (e quindi quella delle card) cambia senza ricaricare il sito,
// lo scroll non funzionerà correttamente. basterebbe re-impostare le variabili se la dimensione dello schermo cambia,
// ma non so se esistono eventi del genere. potrei anche dichiarare le variabi ad ogni click, forse è la soluzione migliore.
// un caso in cui il problema si potrebbe presentare sarebbe su un telefono messo in landscape.

const carousels = document.querySelectorAll(".carousel");
console.log("carousels:", carousels);

carousels.forEach((carousel) => {
  const carouselInner = carousel.querySelector(".carousel-inner");
  console.log(carouselInner.offsetWidth);
  const cardWidth = carouselInner.querySelector(".carousel-item").offsetWidth;
  const carouselWidth = carouselInner.scrollWidth;
  let scrollPosition = 0;

  // resetta i caroselli ad ogni reload della pagina, per evitare bug visivi.
  carouselInner.scrollTo({ left: 0, behavior: "smooth" });

  const carouselInstance = new bootstrap.Carousel(carousel, {
    interval: false,
    wrap: false
  });

  console.log(
    `carouselInner: ${carouselInner} cardWidth: ${cardWidth}, carouselWidth: ${carouselWidth} scrollPosition: ${scrollPosition}`
  );

  carousel
    .querySelector(".carousel-control-next")
    .addEventListener("click", function () {
      const totalScroll = carouselWidth - carouselInner.offsetWidth;
      if (
        scrollPosition < totalScroll &&
        !(scrollPosition + cardWidth > totalScroll)
      ) {
        scrollPosition += cardWidth;
        carouselInner.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
      console.log(
        `carouselInner: ${carouselInner} cardWidth: ${cardWidth}, carouselWidth: ${carouselWidth} scrollPosition: ${scrollPosition}`
      );
    });

  carousel
    .querySelector(".carousel-control-prev")
    .addEventListener("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        carouselInner.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
      console.log(
        `carouselInner: ${carouselInner} cardWidth: ${cardWidth}, carouselWidth: ${carouselWidth} scrollPosition: ${scrollPosition}`
      );
    });
});

// profile-image-load
const loadProfilePic = () => {
  const img =
    localStorage.getItem("profile-pic") === undefined
      ? undefined
      : localStorage.getItem("profile-pic");
  if (img) {
    document.querySelector(".profile-dropdown img").src = img;
  }
};

loadProfilePic();

// log-in / log-out
const dropdownProfile = document.querySelector(".profile-dropdown");
const profileButton = dropdownProfile.querySelector(".profile-dropdown-item");
const dropdownPButton = dropdownProfile.querySelector("button");
let isLoggedIn = true; // di default, l'utente sarà loggato (senza credenziali). non ho fatto un sistema di login quindi questo è il modo migliore.
// devo aggiungerla al local storage per far rimanere il log-out anche dopo che si è ricaricata la pagina.
const logInAndOutLi = dropdownProfile.getElementsByClassName("log-out-btn")[0];

const logInAndOutFunction = () => {
  if (isLoggedIn) {
    dropdownPButton.querySelector("img").remove();
    profileButton.style.display = "none";
    dropdownPButton.classList.add("me-2");
    dropdownPButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle me-1" viewBox="0 0 16 16">
                                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>`;
    logInAndOutLi.innerText = "Log-in";
    logInAndOutLi.classList.add("log-in-btn"); //aggiungo la classe solo per scopi di possibili stili in futuro, al momento non la uso.
    isLoggedIn = false;
  } else {
    dropdownPButton.innerHTML = `<img
                                    src="/Netflix-assets/Netflix-assets/assets/avatar.png"
                                    width="40px"
                                    height="40px"
                                    alt="Icona Dropdown"
                                  />`;
    // ricordati di modificarlo, non serve ricreare l'immagine basta usare display none.
    profileButton.style.display = "block";
    isLoggedIn = true;
    logInAndOutLi.innerText = "Log-Out";
    logInAndOutLi.classList.add("log-out-btn");
  }
};

logInAndOutLi.addEventListener("click", () => {
  logInAndOutFunction();
});
