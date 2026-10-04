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
}
document.querySelector("#heartBtn").addEventListener("click",()=>{
  burst();
  document.querySelector("#loveMessage").textContent="وأنا لسه هختارك… كل يوم، من جديد. ❤️";
});
