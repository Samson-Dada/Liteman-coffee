"use strict";
const nav = document.querySelector(".nav");
const price = document.querySelector(".price");
const priceObs = document.querySelector(".price-observe");
const navView = document.querySelector(".header__expand");
const backBtn = document.querySelector(".back-to-top");

// HEADER TOGGLE//

function toggle() {
  const navList = document.querySelector(".nav__list");
  navList.classList.toggle("nav-toggle");
}
navView.addEventListener("click", function (e) {
  toggle();
});

const priceClientHieght = nav.getBoundingClientRect().height;
const stickyPriceNav = function (entries, observer) {
  entries.forEach(entry => {
    [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  });
};

const priceObserve = new IntersectionObserver(stickyPriceNav, {
  root: null,
  threshold: 0,
  rootMargin: `${priceClientHieght}px`,
});

priceObserve.observe(priceObs);

// SCROLL TO TOP
function backToTopHandler() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}
backBtn.addEventListener("click", function (e) {
  backToTopHandler();
});

function scrollHandler() {
  if (window.scrollY > 300) {
    backBtn.style.display = "block";
    backBtn.classList.add("back-to-top");
  } else {
    backBtn.classList.remove("back-to-top");
  }
}
window.addEventListener("scroll", scrollHandler);
