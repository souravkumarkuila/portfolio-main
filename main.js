import "./style.css";
import Lenis from "lenis";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis();

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const preloaderText = document.getElementById("preloader-text");
  const header = document.getElementById("header");
  const heroSection = document.getElementById("hero-section");

  if (!preloader || !preloaderText || !header || !heroSection) {
    console.error("One or more elements are missing:", {
      preloader,
      preloaderText,
      header,
      heroSection,
    });
    return;
  }

  const texts = ["Hello", "नमस्ते", "ನಮಸ್ಕಾರ"];
  let index = 0;

  const shuffleText = () => {
    preloaderText.textContent = texts[index];
    index = (index + 1) % texts.length;
  };

  const textInterval = setInterval(shuffleText, 200);

  const tl = gsap.timeline({
    onComplete: () => {
      clearInterval(textInterval);
    },
  });

  tl.to(preloaderText, {
    y: "-100%",
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    delay: 2, 
  }).to(preloader, {
    y: "100%",
    duration: 1.5,
    ease: "power2.inOut",
    onComplete: () => {
      preloader.style.display = "none";
    },
  }).fromTo(
    header,
    {
      opacity: 0,
      y: -50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
    },
    "-=0.5"
  ).fromTo(
    heroSection,
    {
      opacity: 0,
      y:50
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
    },
    "-=0.6"
  );
});


const text = new SplitType("#para", { types: "chars,lines,words" });

gsap.fromTo(
  text.chars,
  { opacity: 0.3 },
  {
    opacity: 1,
    scrollTrigger: {
      trigger: "#aboutme",
      start: "top center",
      end: () => "+=" + text.chars.length * 5,
      scrub: true,
      pinSpacing: true,
      toggleActions: "play none none none",
      markers: false,
    },
    stagger: 0.05,
    ease: "none",
  }
);

gsap.fromTo(
  "#skills h2",
  {
    opacity: 0,
    y: 60,
  },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#skills",
      start: "top center",
      toggleActions: "play none none reverse",
      markers: false,
    },
  }
);

gsap.fromTo(
  "#skills div > div",
  {
    opacity: 0,
    y: 20,
  },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.06,
    scrollTrigger: {
      trigger: "#skills",
      start: "top center",
      toggleActions: "play none none reverse",
      markers: false,
    },
  }
);

const skillsContainer = document.getElementById("skills-container");

skillsContainer.addEventListener("mouseover", function (event) {
  const target = event.target.closest(".skill-item");
  if (target) {
    const img = target.querySelector("img");
    if (img) {
      img.classList.remove("grayscale");
    }
  }
});

skillsContainer.addEventListener("mouseout", function (event) {
  const target = event.target.closest(".skill-item");
  if (target) {
    const img = target.querySelector("img");
    if (img) {
      img.classList.add("grayscale");
    }
  }
});

const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

if (!isMobile()) {
  const overlay = document.querySelector(".overlay");

  window.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const x = Math.round((clientX / window.innerWidth) * 100);
    const y = Math.round((clientY / window.innerHeight) * 100);

    const isTextElement = e.target.matches("h1, span, a");
    const clipSize = isTextElement ? "120px" : "10px";

    gsap.to(overlay, {
      "--x": `${x}%`,
      "--y": `${y}%`,
      "--clip-size": clipSize,
      duration: 0.3,
      ease: "sine.out",
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const hamburgerContainer = document.getElementById("hamburger-container");
  const menu = document.getElementById("menu");
  const menuItems = document.querySelectorAll(".menu-item");

  // Initial setup
  gsap.set(menu, { y: "-100%" });
  menu.classList.remove("hidden");

  let isMenuOpen = false;
  let isAnimating = false; 

  const closeMenu = () => {
    if (isAnimating) return;
    isAnimating = true;

    gsap.to(menu, {
      duration: 0.5,
      y: "-100%",
      ease: "power2.in",
      onComplete: () => {
        isAnimating = false;
        isMenuOpen = false;
      },
    });

    gsap.to([line1, line2], {
      duration: 0.3,
      y: 0,
      rotation: 0,
      ease: "power2.inOut",
    });
  };

  const openMenu = () => {
    if (isAnimating) return;
    isAnimating = true;

    gsap.to(menu, {
      duration: 0.5,
      y: 0,
      ease: "power2.out",
      onComplete: () => {
        isAnimating = false;
        isMenuOpen = true;
      },
    });

    gsap.to(line1, {
      duration: 0.3,
      y: 4,
      rotation: 45,
      transformOrigin: "center center",
      ease: "power2.out",
    });

    gsap.to(line2, {
      duration: 0.3,
      y: -4,
      rotation: -45,
      transformOrigin: "center center",
      ease: "power2.out",
    });
  };

  hamburgerContainer.addEventListener("click", () => {
    if (!isMenuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        closeMenu();
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    });
  });
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
