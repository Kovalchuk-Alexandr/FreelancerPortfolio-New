/* Initialize Swiper */
const swiper = new Swiper(".swiper", {
    // Optional parameters
    // direction: "vertical",
    // spaceBetween: 30,
    // loop: true,
    // slidesPerView: auto,
    // freeMode: true,
    // grabCursor: true,
    // effect: "fade",
    // lazy: true,
    speed: 1000, //Скорость прокрутки
    /* Autoplay */
    // centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        // reverseDirection: true, //обратное направление
    },
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    effect: "coverflow",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
    breakpoints: {
        510: {
            loop: false
        },
        // 768: {
            // effect: "coverflow",
            // effect: "fade",
            // lazy: true,
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            // },
            //     slidesPerView: "auto",
            //     spaceBetween: 33,
        // },
        // 1160: {
        //     slidesPerView: 'auto',
        //     spaceBetween: 33,
        // },
    },

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    // scrollbar: {
    //     el: ".swiper-scrollbar",
    // },
});
