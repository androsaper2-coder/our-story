// =========================
// عدّل التاريخ هنا فقط
// YYYY, MM-1, DD, HH, MM
// مثال: 2025, 8, 10, 0, 0
// =========================
const START_DATE = new Date("10/10/2024");

const pad = n => String(n).padStart(2,"0");
function updateCounter(){
  let diff = Date.now() - START_DATE.getTime();
  if(diff < 0) diff = 0;
  const totalSeconds = Math.floor(diff/1000);
  const days = Math.floor(totalSeconds/86400);
  const hours = Math.floor((totalSeconds%86400)/3600);
  const minutes = Math.floor((totalSeconds%3600)/60);
  const seconds = totalSeconds%60;
  document.querySelector("#days").textContent = days.toLocaleString("ar-EG");
  document.querySelector("#hours").textContent = pad(hours);
  document.querySelector("#minutes").textContent = pad(minutes);
  document.querySelector("#seconds").textContent = pad(seconds);
}
updateCounter();
setInterval(updateCounter,1000);

const song = document.getElementById("loveSong");

document.querySelector("#startBtn").addEventListener("click",()=>{
  song.volume = 0.65;

  song.play().catch(error => {
    console.log("Audio could not start:", error);
  });

  document.querySelector("#story").scrollIntoView({
    behavior:"smooth"
  });
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("show"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

function burst(){
  const wrap=document.querySelector(".hearts");
  for(let i=0;i<24;i++){
    const h=document.createElement("span");
    h.className="heart";
    h.textContent=["♥","❤","♡"][Math.floor(Math.random()*3)];
    h.style.left=Math.random()*100+"vw";
    h.style.animationDuration=(2.5+Math.random()*2.5)+"s";
    h.style.fontSize=(14+Math.random()*20)+"px";
    wrap.appendChild(h);
    setTimeout(()=>h.remove(),5500);
  }
}/* =========================
   HEART GALLERY LIGHTBOX
========================= */

const memories = Array.from(
  document.querySelectorAll(".heart-photo")
);

const lightbox = document.getElementById("photoLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxDate = document.getElementById("lightboxDate");
const lightboxCaption = document.getElementById("lightboxCaption");

const closeLightbox = document.getElementById("lightboxClose");
const nextButton = document.getElementById("nextPhoto");
const prevButton = document.getElementById("prevPhoto");

let currentPhoto = 0;


/* فتح الصورة */

function openPhoto(index) {

  currentPhoto = index;

  const photo = memories[currentPhoto];

  lightboxImage.src = photo.dataset.image;

  lightboxDate.textContent = photo.dataset.date;

  lightboxCaption.textContent = photo.dataset.caption;

  lightbox.classList.add("active");

  document.body.style.overflow = "hidden";
}


/* قفل الصورة */

function closePhoto() {

  lightbox.classList.remove("active");

  document.body.style.overflow = "";
}


/* الصورة التالية */

function nextPhoto() {

  currentPhoto++;

  if (currentPhoto >= memories.length) {
    currentPhoto = 0;
  }

  openPhoto(currentPhoto);
}


/* الصورة السابقة */

function previousPhoto() {

  currentPhoto--;

  if (currentPhoto < 0) {
    currentPhoto = memories.length - 1;
  }

  openPhoto(currentPhoto);
}


/* الضغط على الصور */

memories.forEach((photo, index) => {

  photo.addEventListener("click", () => {
    openPhoto(index);
  });

});


/* الأزرار */

closeLightbox.addEventListener("click", closePhoto);

nextButton.addEventListener("click", nextPhoto);

prevButton.addEventListener("click", previousPhoto);


/* الضغط خارج الصورة يقفلها */

lightbox.addEventListener("click", (event) => {

  if (event.target === lightbox) {
    closePhoto();
  }

});


/* الكيبورد */

document.addEventListener("keydown", (event) => {

  if (!lightbox.classList.contains("active")) return;

  if (event.key === "Escape") {
    closePhoto();
  }

  if (event.key === "ArrowRight") {
    nextPhoto();
  }

  if (event.key === "ArrowLeft") {
    previousPhoto();
  }

});
document.querySelector("#heartBtn").addEventListener("click",()=>{
  burst();
  document.querySelector("#loveMessage").textContent="وأنا لسه هختارك… كل يوم، من جديد. ❤️";
});
