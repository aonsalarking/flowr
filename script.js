/* ==========================
   Bloom Haven - script.js
========================== */

/* --------------------------
   Expand / Collapse Cards
--------------------------- */

const cards = document.querySelectorAll(".flower-card");

cards.forEach(card => {
    const button = card.querySelector(".learn-btn");

    button.addEventListener("click", (e) => {
        e.stopPropagation();

        // Close all other cards
        cards.forEach(c => {
            if (c !== card) c.classList.remove("active");
        });

        // Toggle this one
        card.classList.toggle("active");

        button.textContent = card.classList.contains("active")
            ? "Close"
            : "Learn More";

        // Reset other buttons
        cards.forEach(c => {
            if (c !== card) {
                c.querySelector(".learn-btn").textContent = "Learn More";
            }
        });
    });
});

/* --------------------------
   Floating Particles
--------------------------- */

const particleContainer = document.getElementById("particles");

function createParticle() {

    const particle = document.createElement("div");

    particle.className = "particle";

    const size = Math.random() * 5 + 2;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration =
        (Math.random() * 10 + 8) + "s";

    particle.style.opacity =
        Math.random() * 0.6;

    particle.style.background =
        Math.random() > .5
            ? "#9c6cff"
            : "#59d7ff";

    particleContainer.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 18000);
}

for(let i=0;i<50;i++){

    setTimeout(createParticle,i*150);

}

setInterval(createParticle,350);

/* --------------------------
   Mouse Glow
--------------------------- */

const glow = document.createElement("div");

glow.id = "mouse-glow";

document.body.appendChild(glow);

Object.assign(glow.style,{
    position:"fixed",
    width:"300px",
    height:"300px",
    borderRadius:"50%",
    pointerEvents:"none",
    background:
    "radial-gradient(circle, rgba(122,80,255,.25), transparent 70%)",
    transform:"translate(-50%,-50%)",
    zIndex:"-1",
    transition:"transform .08s linear"
});

document.addEventListener("mousemove",(e)=>{

    glow.style.left=e.clientX+"px";
    glow.style.top=e.clientY+"px";

});

/* --------------------------
   Fade In Animation
--------------------------- */

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

cards.forEach(card=>{

card.classList.add("hidden");

observer.observe(card);

});

/* --------------------------
   Tilt Effect
--------------------------- */

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

const rotateY=((x/rect.width)-0.5)*10;
const rotateX=((y/rect.height)-0.5)*-10;

card.style.transform=
`
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)
`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

/* --------------------------
   Scroll Progress Bar
--------------------------- */

const progress=document.createElement("div");

progress.id="progress";

Object.assign(progress.style,{

position:"fixed",
top:"0",
left:"0",
height:"4px",
width:"0%",
background:
"linear-gradient(90deg,#a855f7,#3b82f6)",
zIndex:"9999"

});

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const scroll=
window.scrollY;

const height=
document.body.scrollHeight-
window.innerHeight;

const percent=
(scroll/height)*100;

progress.style.width=
percent+"%";

});

/* --------------------------
   Random Glow on Cards
--------------------------- */

setInterval(()=>{

cards.forEach(card=>{

card.style.boxShadow="";

});

const random=
cards[Math.floor(Math.random()*cards.length)];

random.style.boxShadow=
"0 0 35px rgba(130,80,255,.8)";

},3000);
