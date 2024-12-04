/* Initialize Swiper */
const swiper = new Swiper(".swiper", {
    // Optional parameters
    // direction: "vertical",
    // spaceBetween: 30,
    loop: true,
    // slidesPerView: auto,
    // freeMode: true,
    // grabCursor: true,
    // effect: "fade",
    // lazy: true,
    speed: 1000, //Скорость прокрутки
    /* Autoplay */
    // centeredSlides: true,
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    //     reverseDirection: true, //обратное направление
    // },
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 1,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    breakpoints: {
        // 510: {
        //     slidesPerView: 'auto',
        //     spaceBetween: 26,
        // },
        768: {
            slidesPerView: "auto",
            // spaceBetween: 33,
        },
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
