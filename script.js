/* =========================================
   WAIT FOR DOM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       LOADING SCREEN
    ====================================== */

    document.body.classList.add("loading");

    window.addEventListener("load", () => {

        setTimeout(() => {

            const loader = document.getElementById("loader");

            if (loader) {
                loader.classList.add("hide");
            }

            document.body.classList.remove("loading");

        }, 1800);

    });


    /* =====================================
       NAVBAR
    ====================================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* =====================================
       MOBILE MENU
    ====================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("open");

        });

    }


    /* =====================================
       CLOSE MOBILE MENU
    ====================================== */

    const navLinks =
        document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

        });

    });


    /* =====================================
       ACTIVE NAVIGATION
    ====================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const observerNav =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        navLinks.forEach((link) => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${entry.target.id}`
                            ) {
                                link.classList.add("active");
                            }

                        });

                    }

                });

            },
            {
                threshold: 0.35
            }
        );

    sections.forEach((section) => {

        observerNav.observe(section);

    });


    /* =====================================
       TYPING EFFECT
    ====================================== */

    const typingElement =
        document.getElementById("typingText");

    const words = [
        "Creative Person",
        "Web Developer",
        "Designer",
        "Content Creator",
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typingElement) return;

        const currentWord =
            words[wordIndex];

        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(
                    0,
                    charIndex + 1
                );

            charIndex++;

            if (charIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;

            }

        } else {

            typingElement.textContent =
                currentWord.substring(
                    0,
                    charIndex - 1
                );

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) %
                    words.length;

            }

        }

        const speed = deleting ? 50 : 90;

        setTimeout(typeEffect, speed);

    }

    typeEffect();


    /* =====================================
       SCROLL REVEAL
    ====================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================
       PARTICLE CANVAS
    ====================================== */

    const canvas =
        document.getElementById("particleCanvas");

    const ctx =
        canvas.getContext("2d");

    let particles = [];

    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    class Particle {

        constructor() {

            this.x =
                Math.random() *
                canvas.width;

            this.y =
                Math.random() *
                canvas.height;

            this.size =
                Math.random() * 1.8 + 0.4;

            this.speedX =
                (Math.random() - 0.5) *
                0.3;

            this.speedY =
                (Math.random() - 0.5) *
                0.3;

            this.opacity =
                Math.random() * 0.5 + 0.1;

        }

        update() {

            this.x += this.speedX;

            this.y += this.speedY;

            if (this.x < 0) {
                this.x = canvas.width;
            }

            if (this.x > canvas.width) {
                this.x = 0;
            }

            if (this.y < 0) {
                this.y = canvas.height;
            }

            if (this.y > canvas.height) {
                this.y = 0;
            }

        }

        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255,110,199,${this.opacity})`;

            ctx.fill();

        }

    }


    function createParticles() {

        particles = [];

        const amount =
            Math.min(
                100,
                Math.floor(
                    window.innerWidth / 12
                )
            );

        for (let i = 0; i < amount; i++) {

            particles.push(
                new Particle()
            );

        }

    }

    createParticles();

    window.addEventListener(
        "resize",
        createParticles
    );


    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach((particle) => {

            particle.update();

            particle.draw();

        });

        requestAnimationFrame(
            animateParticles
        );

    }

    animateParticles();


    /* =====================================
       VIDEO PLAYER
    ====================================== */

    const videoCards =
        document.querySelectorAll(
            ".video-card"
        );

    videoCards.forEach((card) => {

        const video =
            card.querySelector(
                ".project-video"
            );

        const playButton =
            card.querySelector(
                ".video-play"
            );

        const progressTrack =
            card.querySelector(
                ".progress-track"
            );

        const progress =
            card.querySelector(
                ".progress-track span"
            );

        const currentTime =
            card.querySelector(
                ".current-time"
            );

        const duration =
            card.querySelector(
                ".duration"
            );


        /* PLAY / PAUSE */

        playButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                if (video.paused) {

                    video.play();

                    card.classList.add(
                        "playing"
                    );

                } else {

                    video.pause();

                    card.classList.remove(
                        "playing"
                    );

                }

            }
        );


        /* VIDEO PLAY */

        video.addEventListener(
            "play",
            () => {

                card.classList.add(
                    "playing"
                );

            }
        );


        /* VIDEO PAUSE */

        video.addEventListener(
            "pause",
            () => {

                card.classList.remove(
                    "playing"
                );

            }
        );


        /* DURATION */

        video.addEventListener(
            "loadedmetadata",
            () => {

                duration.textContent =
                    formatTime(
                        video.duration
                    );

            }
        );


        /* PROGRESS */

        video.addEventListener(
            "timeupdate",
            () => {

                if (!video.duration) return;

                const percentage =
                    (video.currentTime /
                        video.duration) *
                    100;

                progress.style.width =
                    `${percentage}%`;

                currentTime.textContent =
                    formatTime(
                        video.currentTime
                    );

            }
        );


        /* CLICK PROGRESS BAR */

        progressTrack.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                if (!video.duration) return;

                const rect =
                    progressTrack.getBoundingClientRect();

                const clickPosition =
                    event.clientX -
                    rect.left;

                const percentage =
                    clickPosition /
                    rect.width;

                video.currentTime =
                    percentage *
                    video.duration;

            }
        );


        /* CLICK VIDEO */

        video.addEventListener(
            "click",
            () => {

                if (video.paused) {

                    video.play();

                } else {

                    video.pause();

                }

            }
        );

    });


    function formatTime(seconds) {

        if (
            !seconds ||
            Number.isNaN(seconds)
        ) {
            return "0:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            Math.floor(seconds % 60);

        return `${minutes}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;

    }


    /* =====================================
       CLICK ANIMATION
    ====================================== */

    document.addEventListener(
        "click",
        (event) => {

            const effect =
                document.createElement(
                    "span"
                );

            effect.className =
                "click-effect";

            effect.style.left =
                `${event.clientX - 5}px`;

            effect.style.top =
                `${event.clientY - 5}px`;

            document.body.appendChild(
                effect
            );

            setTimeout(() => {

                effect.remove();

            }, 600);

        }
    );


    /* =====================================
       PROJECT CLICK EFFECT
    ====================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );

    projectCards.forEach((card) => {

        card.addEventListener(
            "click",
            () => {

                card.animate(
                    [
                        {
                            transform:
                                "scale(1)"
                        },
                        {
                            transform:
                                "scale(0.97)"
                        },
                        {
                            transform:
                                "scale(1)"
                        }
                    ],
                    {
                        duration: 300
                    }
                );

            }
        );

    });


    /* =====================================
       PHOTO GALLERY PREVIEW
    ====================================== */

    const photoPreview = document.getElementById("photoPreview");
    const photoPreviewImage = document.getElementById("photoPreviewImage");
    const photoPreviewCaption = document.getElementById("photoPreviewCaption");
    const photoPreviewClose = document.getElementById("photoPreviewClose");

    function openPhotoPreview(image) {
        if (!photoPreview || !photoPreviewImage || !image) return;

        photoPreviewImage.src = image.currentSrc || image.src;
        photoPreviewImage.alt = image.alt || "Pratinjau foto galeri";
        photoPreviewCaption.textContent = image.alt || "Foto galeri";
        photoPreview.classList.add("show");
        photoPreview.setAttribute("aria-hidden", "false");
        document.body.classList.add("preview-open");

        if (photoPreviewClose) photoPreviewClose.focus();
    }

    function closePhotoPreview() {
        if (!photoPreview || !photoPreviewImage) return;

        photoPreview.classList.remove("show");
        photoPreview.setAttribute("aria-hidden", "true");
        document.body.classList.remove("preview-open");
        photoPreviewImage.src = "";
    }

    document.querySelectorAll(".project-card").forEach((card) => {
        const image = card.querySelector(".project-media img");
        const viewButton = card.querySelector(".view-project");

        if (image) {
            image.style.cursor = "zoom-in";
            image.addEventListener("click", () => openPhotoPreview(image));
        }

        if (viewButton && image) {
            viewButton.addEventListener("click", () => openPhotoPreview(image));
        }
    });

    if (photoPreviewClose) {
        photoPreviewClose.addEventListener("click", closePhotoPreview);
    }

    if (photoPreview) {
        photoPreview.addEventListener("click", (event) => {
            if (event.target === photoPreview) closePhotoPreview();
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && photoPreview?.classList.contains("show")) {
            closePhotoPreview();
        }
    });


    /* =====================================
       CURRENT YEAR
    ====================================== */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});