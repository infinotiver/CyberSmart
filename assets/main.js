let isScrolling = false;

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            isScrolling = false; // Enable new scroll events after the animation
        }
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

function handleScroll(event) {
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

window.addEventListener('wheel', handleScroll);


function applyRotationOnScroll() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        document.getElementById('circle1').style.transform = `rotate(${scrolled}deg)`;
    });
}

applyRotationOnScroll();
function rotateText() {
    const rotatingText = document.querySelector('.rotating-text');
    const words = [
        "Secure Your Digital Life",
        "Stay Safe in the Online World",
        "Defend Against Cyber Threats",
        "Unlock Your Cyber IQ",
        "Explore the World of Cybersecurity",
        "Guard Your Digital Identity",
        "Navigate the Web Safely",
        "Master Cyber Hygiene",
        "Discover Cybersecurity Best Practices"
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

document.addEventListener("DOMContentLoaded", rotateText);

// JavaScript for responsive navigation menu
const menuIcon = document.querySelector(".menu-icon");
const navList = document.querySelector(".nav-bar ul");

menuIcon.addEventListener("click", () => {
  navList.classList.toggle("active");
});
