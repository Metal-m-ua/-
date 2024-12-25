const galleryImages = document.querySelectorAll('.gallery img');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-btn');
const prevButtons = document.querySelectorAll('.prev-btn');
const nextButtons = document.querySelectorAll('.next-btn');

let currentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let initialDistance = null;
let scale = 1;
let modalImage = null;

// 🎯 Відкрити модальне вікно
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        modals[index].style.display = 'flex';
        document.body.classList.add('modal-open');
        currentImageIndex = 0;
        showImage(modals[index], currentImageIndex);
        modalImage = modals[index].querySelector('img');
    });
});

// 🎯 Закрити модальне вікно при кліку на кнопку закриття
closeButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        closeModal(modals[index]);
    });
});

// 🎯 Закрити модальне вікно при кліку на порожню область
modals.forEach((modal) => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
});

// 🎯 Закрити модальне вікно
function closeModal(modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    resetZoom();
}

// 🎯 Показати зображення в модальному вікні
function showImage(modal, index) {
    const images = modal.querySelectorAll('img');
    images.forEach((img, i) => {
        img.classList.toggle('hidden', i !== index);
    });
    modalImage = modal.querySelector('img:not(.hidden)');
    resetZoom();
}

// 🎯 Наступне зображення
nextButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const images = modals[index].querySelectorAll('img');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(modals[index], currentImageIndex);
    });
});

// 🎯 Попереднє зображення
prevButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const images = modals[index].querySelectorAll('img');
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(modals[index], currentImageIndex);
    });
});

// 📲 🎯 Swipe події для сенсорних пристроїв
modals.forEach((modal, index) => {
    modal.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
        }
    });

    modal.addEventListener('touchend', (e) => {
        if (e.changedTouches.length === 1) {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe(modal, index);
        }
    });
});

// 🎯 Обробка свайпу
function handleSwipe(modal, index) {
    const SWIPE_THRESHOLD = 200; // Мінімальна відстань для свайпу

    if (touchStartX - touchEndX > SWIPE_THRESHOLD) {
        // Свайп вліво (наступне зображення)
        const images = modal.querySelectorAll('img');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(modal, currentImageIndex);
    } else if (touchEndX - touchStartX > SWIPE_THRESHOLD) {
        // Свайп вправо (попереднє зображення)
        const images = modal.querySelectorAll('img');
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(modal, currentImageIndex);
    }
}

// 🎯 Зум за допомогою колеса миші
modals.forEach((modal) => {
    modal.addEventListener('wheel', (e) => {
        e.preventDefault();
        scale += e.deltaY * -0.001;
        scale = Math.min(Math.max(1, scale), 3); // Обмеження масштабу від 1 до 3
        setZoom(scale);
    });
});

// 🎯 Встановлення масштабу
function setZoom(zoomLevel) {
    if (modalImage) {
        modalImage.style.transform = `scale(${zoomLevel})`;
    }
}

// 🎯 Скидання масштабу
function resetZoom() {
    scale = 1;
    if (modalImage) {
        modalImage.style.transform = 'scale(1)';
    }
}
