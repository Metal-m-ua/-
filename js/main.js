const menuBtn = document.querySelector(".menu__btn");
const menuList = document.querySelector(".menu__list");
const menuLinks = document.querySelectorAll(".menu__list a"); // Отримуємо всі посилання в меню
const menuBtnk = document.querySelector(".menu-item1"); // Доданий елемент

menuBtn.addEventListener("click", (event) => {
    menuList.classList.toggle("menu--open");
    event.stopPropagation(); // Запобігаємо спливу події
});

document.addEventListener("click", (event) => {
    if (!menuList.contains(event.target) && !menuBtn.contains(event.target) && !menuBtnk.contains(event.target)) {
        menuList.classList.remove("menu--open");
    }
});

// Додаємо обробник подій для кожного посилання
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        menuList.classList.remove("menu--open"); // Закриваємо меню
    });
});

// Додаємо обробник подій для додаткового елемента
if (menuBtnk) {
    menuBtnk.addEventListener("click", (event) => {
        menuList.classList.toggle("menu--open");
        event.stopPropagation();
    });
}

// Закриваємо меню при прокручуванні сторінки вниз
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        menuList.classList.remove("menu--open");
    }
    lastScrollTop = scrollTop;
});


  
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

 



document.addEventListener("DOMContentLoaded", function () {
    // Отримуємо хеш із URL
    const hash = window.location.hash;

    if (hash.startsWith("#modal-")) {
        setTimeout(() => {
            const modalId = hash.substring(1); // Видаляємо "#"
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.style.display = "flex"; // Відкриваємо модальне вікно
            }
        }, 100); // Затримка 100 мс для коректного застосування стилів
    }
});




  const galleryImages = document.querySelectorAll('.gallery img');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.close-btn');
  const prevButtons = document.querySelectorAll('.prev-btn');
  const nextButtons = document.querySelectorAll('.next-btn');
  
  let currentMediaIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let scale = 1;
  let modalMedia = null;
  
  // 🎯 Відкрити модальне вікно
  galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => {
          modals[index].style.display = 'flex';
          document.body.classList.add('modal-open');
          currentMediaIndex = 0;
          showMedia(modals[index], currentMediaIndex);
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
      resetMedia(modal);
  }
  
  // 🎯 Показати зображення або відео
  function showMedia(modal, index) {
      const mediaElements = modal.querySelectorAll('img, video');
      mediaElements.forEach((media, i) => {
          media.classList.toggle('hidden', i !== index);
          if (media.tagName === 'VIDEO') {
              if (i === index) {
                  media.play(); // Запуск відео при відкритті
              } else {
                  media.pause();
                  media.currentTime = 0;
              }
          }
      });
  
      modalMedia = modal.querySelector('img:not(.hidden), video:not(.hidden)');
      resetZoom();
  }
  
  // 🎯 Наступне зображення або відео
  nextButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
          const mediaElements = modals[index].querySelectorAll('img, video');
          currentMediaIndex = (currentMediaIndex + 1) % mediaElements.length;
          showMedia(modals[index], currentMediaIndex);
      });
  });
  
  // 🎯 Попереднє зображення або відео
  prevButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
          const mediaElements = modals[index].querySelectorAll('img, video');
          currentMediaIndex = (currentMediaIndex - 1 + mediaElements.length) % mediaElements.length;
          showMedia(modals[index], currentMediaIndex);
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
      const SWIPE_THRESHOLD = 100;
  
      if (touchStartX - touchEndX > SWIPE_THRESHOLD) {
          const mediaElements = modal.querySelectorAll('img, video');
          currentMediaIndex = (currentMediaIndex + 1) % mediaElements.length;
          showMedia(modal, currentMediaIndex);
      } else if (touchEndX - touchStartX > SWIPE_THRESHOLD) {
          const mediaElements = modal.querySelectorAll('img, video');
          currentMediaIndex = (currentMediaIndex - 1 + mediaElements.length) % mediaElements.length;
          showMedia(modal, currentMediaIndex);
      }
  }
  
  // 🎯 Зум за допомогою колеса миші
  modals.forEach((modal) => {
      modal.addEventListener('wheel', (e) => {
          e.preventDefault();
          scale += e.deltaY * -0.001;
          scale = Math.min(Math.max(1, scale), 3);
          setZoom(scale);
      });
  });
  
  // 🎯 Встановлення масштабу
  function setZoom(zoomLevel) {
      if (modalMedia && modalMedia.tagName === 'IMG') {
          modalMedia.style.transform = `scale(${zoomLevel})`;
      }
  }
  
  // 🎯 Скидання масштабу
  function resetZoom() {
      scale = 1;
      if (modalMedia && modalMedia.tagName === 'IMG') {
          modalMedia.style.transform = 'scale(1)';
      }
  }
  
  // 🎯 Скидання стану медіа при закритті модального вікна
  function resetMedia(modal) {
      const mediaElements = modal.querySelectorAll('video');
      mediaElements.forEach((video) => {
          video.pause();
          video.currentTime = 0;
      });
  }
  function showMedia(modal, index) {
    const mediaElements = modal.querySelectorAll('img, video');

    // Ховаємо всі елементи перед показом нового
    mediaElements.forEach((media) => {
        media.style.display = 'none'; // Замість класу hidden, бо можливо він не працює
        if (media.tagName === 'VIDEO') {
            media.pause();
            media.currentTime = 0; // Скидаємо відео
        }
    });

    // Показуємо тільки потрібний медіа-елемент
    const activeMedia = mediaElements[index];
    activeMedia.style.display = 'block';

    if (activeMedia.tagName === 'VIDEO') {
        activeMedia.play(); // Автовідтворення відео
    }

    modalMedia = activeMedia;
    resetZoom();
}



// Функція для відкриття/закриття модального вікна
function toggleModal() {
    const modal = document.getElementById('modal');
    modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
}

// Відстеження прокрутки для анімації прозорості та закриття модального вікна
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

    // Закриття модального вікна при невеликій прокрутці (наприклад, 20px)
    if (window.scrollY > 50) {
        modal.style.display = 'none';
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