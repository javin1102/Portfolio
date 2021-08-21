const header = document.querySelector(".header");
const nav = document.querySelector(".nav");

const headerObsCb = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const headerObsOpt = {
  root: null,
  threshold: 0.4,
  rootMargin: "",
};
const headerObserver = new IntersectionObserver(headerObsCb, headerObsOpt);
headerObserver.observe(header);
const allSection = document.querySelectorAll("section");
const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("hidden");
});

$(".nav__link").on("click", function (event) {
  event.preventDefault();
});

$(".x").on("click", function (event) {
  hash = $(this).find(".nav__link").attr("href");
  if (hash === "#") return;

  event.preventDefault();
  window.location.hash = hash;

  const off = () => {
    if (hash === "#projects") return 150;
    else if (hash === "#about") return 0;
    else if (hash === "#contact") return 100;
    return 0;
  };
  $("html, body").animate(
    {
      scrollTop: hash === "#header" ? 0 : $(hash).offset().top - off(),
    },
    50,
    "swing"
  );
});
