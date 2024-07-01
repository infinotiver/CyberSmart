let isScrolling = false;

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
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
    const currentPosition = window.pageYOffset;
    const scrollDirection = event.deltaY > 0 ? 1 : -1;
    const targetPosition = currentPosition + (viewportHeight * scrollDirection);

    // Ensure targetPosition is within the document bounds
    const maxScrollPosition = document.body.scrollHeight - viewportHeight;
    const finalPosition = Math.max(0, Math.min(targetPosition, maxScrollPosition));

    smoothScrollTo(finalPosition, 1000); // Smooth scroll to the target position in 1000ms
}

window.addEventListener('wheel', handleScroll);