// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 1000);
    }
});

// Scroll to Top Button
const scrollTopBtn = document.createElement('div');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '↑';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animated Counter for TOEIC Scores
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Animate table cells when they come into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cells = entry.target.querySelectorAll('td');
            cells.forEach(cell => {
                if (!isNaN(cell.textContent)) {
                    const value = parseInt(cell.textContent);
                    animateValue(cell, 0, value, 2000);
                }
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.goals-table').forEach(table => {
    observer.observe(table);
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effect to study guide items
document.querySelectorAll('.study-guide li').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});

// Add parallax effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    header.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Add typing effect to slogan
const slogan = document.querySelector('.slogan');
if (slogan) {
    const text = slogan.textContent;
    slogan.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            slogan.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect when element is in view
    const sloganObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                sloganObserver.unobserve(entry.target);
            }
        });
    });
    
    sloganObserver.observe(slogan);
}

// Add floating plane animation
const createFloatingPlane = () => {
    const plane = document.createElement('div');
    plane.className = 'floating-plane';
    document.body.appendChild(plane);
    
    // Random starting position
    plane.style.left = Math.random() * 100 + 'vw';
    plane.style.top = Math.random() * 100 + 'vh';
};

// Create multiple floating planes
for (let i = 0; i < 3; i++) {
    createFloatingPlane();
}

// Add print functionality
const printButton = document.createElement('button');
printButton.textContent = 'In trang';
printButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    padding: 10px 20px;
    background: var(--sky-blue);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 100;
`;

printButton.addEventListener('click', () => {
    window.print();
});

document.body.appendChild(printButton); 