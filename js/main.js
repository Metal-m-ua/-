const menuBtn = document.querySelector(".menu__btn");
const menuList = document.querySelector(".menu__list"); 

menuBtn.addEventListener("click", () => {
    menuList.classList.toggle("menu--open");
})


const menuBtnk = document.querySelector(".menu-item1");

menuBtnk.addEventListener("click", () => {
    menuList.classList.toggle("menu--open");
})


  
  const swiperContainer = document.querySelector('.mySwiper');
  if (swiperContainer) {
      // Код для Swiper.js
      var swiper = new Swiper(".mySwiper", {
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: 150,
          pagination: {
              el: ".swiper-pagination",
              dynamicBullets: true,
              clickable: true,
          },
      });
  }






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
    const SWIPE_THRESHOLD = 100; // Мінімальна відстань для свайпу

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



// Функція для відкриття/закриття модального вікна
function toggleModal() {
    const modal = document.getElementById('modal');
    modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
  }
  
  // Відстеження прокрутки для анімації прозорості
  window.addEventListener('scroll', () => {
    const headertop = document.querySelector('.headertop');
    const modal = document.getElementById('modal');
    
    // Перевіряємо, наскільки сторінка прокручена
    if (window.scrollY > 50) {
        headertop.classList.add('scrolled');
      modal.classList.add('scrolled');
    } else {
        headertop.classList.remove('scrolled');
      modal.classList.remove('scrolled');
    }
  });
  
// Функція для відкриття/закриття модального вікна "на сторінках Категорії"
  function toggleModalk() {
    const modal = document.getElementById('modalk');
    modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
  }







  document.addEventListener('DOMContentLoaded', () => {
    // Мінімальний час показу прелоадера (в мілісекундах)
    const minPreloaderTime = 1000; // 2 секунди
    const startTime = new Date().getTime();

    // Обробка посилань із плавним переходом
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            if (link.href && link.target !== '_blank' && !link.href.includes('#')) {
                event.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = link.href;
                }, 500); // Час fade-out повинен відповідати CSS-тривалості
            }
        });
    });

    // Подія завершення завантаження сторінки
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        const endTime = new Date().getTime();
        const elapsedTime = endTime - startTime;

        const remainingTime = Math.max(0, minPreloaderTime - elapsedTime);

        // Мінімальний час очікування
        setTimeout(() => {
            preloader.classList.add('hidden'); // Плавне зникнення прелоадера
            setTimeout(() => {
                preloader.style.display = 'none';
                document.getElementById('content').style.display = 'block'; // Показуємо контент
                document.body.style.overflow = 'auto'; // Дозволяємо прокручування сторінки
            }, 800); // Час, що відповідає transition у CSS
        }, remainingTime);
    });
});