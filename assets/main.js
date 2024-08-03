
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
    const scrolled = window.scrollY / 360;
    console.log(scrolled);
    document.getElementById('circle1').style.transform = `rotate(${scrolled}deg)`;
  });
}

applyRotationOnScroll();
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

document.addEventListener('DOMContentLoaded', () => {
  const statsElement = document.querySelector('.middle-text .stats');
  let isVisible = false;

  const handleScroll = () => {
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

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check in case the element is already in view
});

document.addEventListener('scroll', function() {
  const navBar = document.querySelector('.nav-bar');
  
  if (window.scrollY > 0) {
    navBar.classList.add('scrolled');
  } else {
    navBar.classList.remove('scrolled');
  }
});
