let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    setTimeout(() => {
        animateSlide(index);
    }, 100);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

function animateCounter(element, target, duration = 1500, decimals = 0) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = decimals > 0 ? target.toFixed(decimals) : Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
        }
    }, 16);
}

function animateProgressBars(container) {
    const progressBars = container.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 100);
    });
}

function animateSlide(index) {
    const slide = slides[index];
    
    const counters = slide.querySelectorAll('[data-target], [data-count]');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target') || counter.getAttribute('data-count'));
        const decimals = counter.getAttribute('data-count') && counter.getAttribute('data-count').includes('.') ? 1 : 0;
        animateCounter(counter, target, 1500, decimals);
    });
    
    animateProgressBars(slide);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
    } else if (e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        goToSlide(parseInt(e.key) - 1);
    }
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        previousSlide();
    }
}

window.addEventListener('load', () => {
    animateSlide(0);
});

document.addEventListener('DOMContentLoaded', () => {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});
