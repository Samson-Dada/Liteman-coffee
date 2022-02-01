"use strict";
const header = document.querySelector(".header");
const backBtn = document.querySelector(".back-to-top");
const sectionHero = document.querySelector(".section__hero");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const sectionCustomer = document.querySelector(".customer");
const nav = document.querySelector(".nav");
const closeModalBtn = document.querySelector(".btn--close-modal");
const openModal = document.querySelector(".btn--open-modal");
const modalForm = document.querySelector(".modal__form");
const modalBtn = modalForm.lastElementChild;
const modalInput = modalForm.querySelectorAll("input");
const inputError = modalForm.querySelectorAll(".modal__error");

const elementId = id => document.querySelector(id);
const firstName = elementId(".firstname");
const lastName = elementId(".lastname");
const email = elementId(".email");

// STICKY NAVIGATION

const clientHieght = nav.getBoundingClientRect().height;
const stickyNav = function (entries, observer) {
  entries.forEach(entry => {
    [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  });
};

const homeObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${clientHieght}px`,
  // rootMargin: "90px",
});

homeObserver.observe(sectionHero);
// observer.unobserve(entry.target);

// HEADER TOGGLE//
const navView = document.querySelector(".header__expand");

function toggle() {
  const navList = document.querySelector(".nav__list");
  navList.classList.toggle("nav-toggle");
}
navView.addEventListener("click", function (e) {
  toggle();
});

// // // SECTION LOADING
const allSection = document.querySelectorAll(".section");
const sectionLoad = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(sectionLoad, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

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

// // // MODAL

const openHandler = function () {
  modal.classList.remove("modal--hidden");
  overlay.classList.remove("modal--hidden");
};
const closeHandler = function (e) {
  modal.classList.add("modal--hidden");
  overlay.classList.add("modal--hidden");
};

openModal.addEventListener("click", function (e) {
  e.preventDefault();
  openHandler();
});

overlay.addEventListener("click", closeHandler);

closeModalBtn.addEventListener("click", closeHandler);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("modal--hidden")) {
    closeHandler();
  }
});

//MODAL BASIC FORM VALIDATION

const validateInput = (id, index, message) => {
  if (id.value.trim() === "") {
    inputError[index].innerHTML = message;
    id.style.borderLeft = "5px solid red";
  }
  if (id.value.trim()) {
    inputError[index].innerHTML = "";
    id.style.borderLeft = "";
  }
  if (modalBtn) return (id.value = ""), modalForm;
};

modalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  validateInput(firstName, 0, "First name cannot be blank");
  validateInput(lastName, 1, "Last name cannot be blank");
  validateInput(email, 2, "Email name cannot be blank");
});

// validateInput(firstName, 0, "First name cannot be blank");
// validateInput(lastName, 1, "Last name cannot be blank");
// validateInput(email, 2, "Email name cannot be blank");
//  if (!elementId.value.trim()) {
//     elementId.style.borderLeft = " 5px solid red";
//     inputError[index].innerHTML = message;
//   }

//   if (elementId.value.trim()) {
//     elementId.style.borderLeft = " 5px solid red";
//     inputError[index].style.display = "none";
//     elementId.style.borderLeft = "";
//   }
// // // FAQSSS
