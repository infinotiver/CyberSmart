document.addEventListener('DOMContentLoaded', () => {
  // Handle smooth scrolling
  function handleSmoothScroll(event) {
    if (isScrolling) return; // Prevent new scroll events during animation

    isScrolling = true;
    const viewportHeight = window.innerHeight;
    const currentPosition = window.scrollY;
    const scrollDirection = event.deltaY > 0 ? 1 : -1;
    const targetPosition = currentPosition + (viewportHeight * scrollDirection);

    // Ensure targetPosition is within the document bounds
    const maxScrollPosition = document.body.scrollHeight - viewportHeight;
    const finalPosition = Math.max(0, Math.min(targetPosition, maxScrollPosition));

    smoothScrollTo(finalPosition, 500); // Smooth scroll to the target position in 500ms
  }

  // Apply rotation on scroll
  function applyRotationOnScroll() {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY / 360;
      document.getElementById('circle1').style.transform = `rotate(${scrolled}deg)`;
    });
  }

  // Rotate text
  function rotateText() {
    const rotatingText = document.querySelector('.rotating-text');
    const words = [
      "offers the latest cybersecurity news.",
      "provides in-depth cybersecurity blogs.",
      "promotes cybersecurity awareness.",
      "delivers tips on protecting personal data.",
      "keeps you updated on cyber threats.",
      "educates about online safety practices.",
      "curates resources for digital security.",
    ];
    let index = 0;
    let letterIndex = 0;
    let intervalId = null;

    const typeLetter = () => {
      rotatingText.textContent += words[index][letterIndex];
      letterIndex++;
      if (letterIndex === words[index].length) {
        clearInterval(intervalId);
        setTimeout(() => {
          intervalId = setInterval(eraseLetter, 50);
        }, 1000);
      }
    };

    const eraseLetter = () => {
      rotatingText.textContent = rotatingText.textContent.slice(0, -1);
      if (rotatingText.textContent === "") {
        clearInterval(intervalId);
        index = (index + 1) % words.length;
        letterIndex = 0;
        setTimeout(() => {
          intervalId = setInterval(typeLetter, 100);
        }, 500);
      }
    };

    intervalId = setInterval(typeLetter, 100);
  }

  // Handle visibility of stats element on scroll
  function handleStatsVisibility() {
    const statsElement = document.querySelector('.middle-text .stats');
    let isVisible = false;

    const checkVisibility = () => {
      const rect = statsElement.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight && !isVisible) {
        statsElement.classList.remove('hidden');
        statsElement.classList.add('visible');
        isVisible = true;
      } else if ((rect.top < 0 || rect.bottom > window.innerHeight) && isVisible) {
        statsElement.classList.remove('visible');
        statsElement.classList.add('hidden');
        isVisible = false;
      }
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check in case the element is already in view
  }

  // Handle responsive navigation menu
  function handleResponsiveMenu() {
    const menuIcon = document.querySelector(".menu-icon");
    const navList = document.querySelector(".nav-bar ul");

    menuIcon.addEventListener("click", () => {
      navList.classList.toggle("active");
    });
  }

  // Handle navbar scroll effect for large screens
  function handleNavBarScroll() {
    document.addEventListener('scroll', () => {
      const navBar = document.querySelector('.nav-bar');
      const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches; // Check for large screens

      if (isLargeScreen) {
        if (window.scrollY > 0) {
          navBar.classList.add('scrolled');
        } else {
          navBar.classList.remove('scrolled');
        }
      } else {
        navBar.classList.remove('scrolled');
      }
    });
  }

  // Initialise all functionalities
  function init() {
    applyRotationOnScroll();
    rotateText();
    handleStatsVisibility();
    handleResponsiveMenu();
    handleNavBarScroll();
  }

  // Initialise on DOMContentLoaded
  init();
});
