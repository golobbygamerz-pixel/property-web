/* =========================================
   VÉRA — FUTURISTIC PROPERTY WEBSITE
========================================= */


/* LOADER */

window.addEventListener("load", () => {

  setTimeout(() => {
    document.querySelector(".loader").classList.add("hide");
  }, 1200);

});


/* =========================================
   360° VILLA ROTATION
========================================= */

const villa = document.querySelector(".villa-placeholder");
const container = document.querySelector("#villa-container");

let rotationY = -25;
let rotationX = 0;

let dragging = false;
let startX = 0;
let startY = 0;

let velocity = 0;
let previousX = 0;


/* Mouse */

container.addEventListener("mousedown", (e) => {

  dragging = true;

  startX = e.clientX;
  startY = e.clientY;

  previousX = e.clientX;

  velocity = 0;

});


window.addEventListener("mousemove", (e) => {

  if (!dragging) return;

  const difference = e.clientX - previousX;

  rotationY += difference * 0.5;

  velocity = difference * 0.5;

  previousX = e.clientX;

  updateVilla();

});


window.addEventListener("mouseup", () => {

  dragging = false;

});


/* Touch */

container.addEventListener("touchstart", (e) => {

  dragging = true;

  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;

  previousX = startX;

});


container.addEventListener("touchmove", (e) => {

  if (!dragging) return;

  const currentX = e.touches[0].clientX;

  const difference = currentX - previousX;

  rotationY += difference * 0.5;

  previousX = currentX;

  updateVilla();

});


container.addEventListener("touchend", () => {

  dragging = false;

});


/* Smooth inertia */

function inertia() {

  if (!dragging && Math.abs(velocity) > 0.05) {

    rotationY += velocity;

    velocity *= 0.94;

    updateVilla();

  }

  requestAnimationFrame(inertia);

}

inertia();


function updateVilla() {

  villa.style.transform =
    `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;

}


/* =========================================
   ZOOM
========================================= */

let scale = 1;

const zoomIn = document.querySelector("#zoomIn");
const zoomOut = document.querySelector("#zoomOut");
const resetView = document.querySelector("#resetView");


zoomIn.addEventListener("click", () => {

  scale += 0.1;

  scale = Math.min(scale, 1.5);

  updateScale();

});


zoomOut.addEventListener("click", () => {

  scale -= 0.1;

  scale = Math.max(scale, 0.7);

  updateScale();

});


resetView.addEventListener("click", () => {

  rotationY = -25;
  rotationX = 0;
  scale = 1;
  velocity = 0;

  updateScale();

});


function updateScale() {

  villa.style.transform =
    `scale(${scale}) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;

}


/* =========================================
   DAY / NIGHT
========================================= */

const dayNight = document.querySelector("#dayNight");

dayNight.addEventListener("click", () => {

  document.body.classList.toggle("night-mode");

});


/* =========================================
   SCROLL REVEAL
========================================= */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("active");

      }

    });

  },

  {
    threshold: 0.12
  }

);


reveals.forEach(element => {

  observer.observe(element);

});


/* =========================================
   PARALLAX
========================================= */

window.addEventListener("scroll", () => {

  const scroll = window.scrollY;

  const glow = document.querySelector(".stage-glow");

  if (glow && scroll < window.innerHeight) {

    glow.style.transform =
      `translateY(${scroll * 0.12}px)`;

  }

});


/* =========================================
   CONTACT FORM
========================================= */

const form = document.querySelector("#contactForm");
const message = document.querySelector("#formMessage");


form.addEventListener("submit", (e) => {

  e.preventDefault();

  message.classList.add("show");

  form.reset();

});


/* =========================================
   HOTSPOTS
========================================= */

document.querySelectorAll(".hotspot > button").forEach(button => {

  button.addEventListener("click", () => {

    const parent = button.parentElement;

    parent.classList.toggle("open");

  });

});


/* =========================================
   MAGNETIC BUTTON EFFECT
========================================= */

document.querySelectorAll(".primary-btn").forEach(button => {

  button.addEventListener("mousemove", (e) => {

    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform =
      `translate(${x * 0.08}px, ${y * 0.08}px)`;

  });


  button.addEventListener("mouseleave", () => {

    button.style.transform = "";

  });

});


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.querySelector("#menuBtn");

menuBtn.addEventListener("click", () => {

  document.querySelector(".navbar nav").classList.toggle("mobile-open");

});


/* =========================================
   INITIAL VILLA
========================================= */

updateVilla();