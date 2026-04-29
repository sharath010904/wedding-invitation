// ✅ WAIT UNTIL PAGE LOADS (VERY IMPORTANT)
window.addEventListener("DOMContentLoaded", () => {

    // 🔒 Disable scroll initially
    document.body.classList.add("no-scroll");

    // 🎯 ELEMENTS
    const video = document.getElementById("bgVideo");
    const btn = document.getElementById("btnContainer");
    const arrow = document.querySelector(".scroll-indicator");
    const bgMusic = document.getElementById("bgMusic");
    const teaserVideo = document.getElementById("teaserVideo");

    // ▶️ Play video on click
    window.playVideo = function () {

        video.muted = true;
        video.play();

        // ✨ remove button
        btn.style.opacity = "0";
        setTimeout(() => {
            btn.style.display = "none";
        }, 500);

        // ⬇️ show arrow
        if (arrow) arrow.style.opacity = "1";

        // 🔊 start music
        if (bgMusic) {
            bgMusic.play().catch(() => {});
        }

        // 🔓 enable scroll
        document.body.classList.remove("no-scroll");
    };

    // 🎬 Auto scroll after video ends
    if (video) {
        video.addEventListener("ended", () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth"
            });
        });
    }

    // ❤️ HEARTS (MAIN)
    function createHearts(containerSelector, speed = 300) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        setInterval(() => {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.innerHTML = "❤";

            heart.style.left = Math.random() * 100 + "vw";
            heart.style.fontSize = (12 + Math.random() * 20) + "px";
            heart.style.animationDuration = (3 + Math.random() * 3) + "s";

            container.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }, speed);
    }

    createHearts("#hearts");
    createHearts(".couple-section .hearts-container", 400);
    createHearts(".events-section .hearts-container", 400);
    createHearts(".venue-section .hearts-container", 400);
    createHearts(".love-section .hearts-container", 400);
    createHearts(".teaser-section .hearts-container", 400);
    createHearts(".final-section .hearts-container", 400);

    // ⏳ COUNTDOWN
    const targetDate = new Date("May 1, 2026 00:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((diff / (1000 * 60 * 60)) % 24);
        document.getElementById("minutes").innerText = Math.floor((diff / (1000 * 60)) % 60);
        document.getElementById("seconds").innerText = Math.floor((diff / 1000) % 60);
    }, 1000);

    // ✨ SCRATCH EFFECT
// ✨ SCRATCH EFFECT (FIXED FOR MOBILE)
const canvas = document.getElementById("scratchCanvas");

if (canvas) {
    const ctx = canvas.getContext("2d");

    canvas.width = 220;
    canvas.height = 60;

    ctx.fillStyle = "#d4af37";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let drawing = false;

    // 🖱️ MOUSE
    canvas.addEventListener("mousedown", () => drawing = true);
    canvas.addEventListener("mouseup", () => drawing = false);
    canvas.addEventListener("mousemove", scratch);

    // 📱 TOUCH (FIXED)
    canvas.addEventListener("touchstart", (e) => {
        drawing = true;
        e.preventDefault(); // 🔥 STOP SCROLL
    }, { passive: false });

    canvas.addEventListener("touchend", () => drawing = false);

    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault(); // 🔥 STOP SCROLL
        scratch(e);
    }, { passive: false });

    function scratch(e) {
        if (!drawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();

        const scratchText = document.querySelector(".scratch-text");
        if (scratchText) scratchText.style.opacity = "0";
    }
}

    // 🎯 COUPLE ANIMATION
    const groomCard = document.querySelector(".groom-card");
    const brideCard = document.querySelector(".bride-card");

    window.addEventListener("scroll", () => {
        const section = document.querySelector(".couple-section");
        if (!section) return;

        const sectionTop = section.offsetTop;
        const scrollPos = window.scrollY + window.innerHeight;

        if (scrollPos > sectionTop + 100) {
            groomCard?.classList.add("show-card");
            brideCard?.classList.add("show-card");
        }
    });

    // 🎬 TEASER MUSIC CONTROL (FIXED)
    if (teaserVideo) {
        teaserVideo.addEventListener("play", () => bgMusic?.pause());
        teaserVideo.addEventListener("pause", () => bgMusic?.play().catch(() => {}));
        teaserVideo.addEventListener("ended", () => bgMusic?.play().catch(() => {}));
    }

});
// 🎞️ GALLERY SCROLL FUNCTION (FIX)
window.scrollGallery = function(direction) {
    const gallery = document.getElementById("gallery");

    if (!gallery) return;

    const scrollAmount = 520; // width of one image

    gallery.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth"
    });
};
