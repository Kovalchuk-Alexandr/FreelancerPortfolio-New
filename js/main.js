// https://ru.stackoverflow.com/questions/1047732/%D1%84%D0%B8%D0%BB%D1%8C%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B0-%D0%B4%D1%80%D1%83%D0%B3%D0%B8%D0%BC-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%BE%D0%BC

const btnDarkMode = document.querySelectorAll(".dark-mode-btn");
var projectsAll = document.querySelector("main .projects");
var selectedWorks = document.querySelector(".works__grid");

// Выборка избранных работ для показа
let selectedTags = [0, 1, 2, 3, 5, 7];
let selectedWorksData = projects.filter((item) =>
    selectedTags.includes(item.id)
);

// console.log("-------------");
// console.log("selected Works: ");
// console.log(selectedWorksData);

// Проверка темной темы по приоритетам

// 1. Проверка темной темы на уровне системных настроек
// window.matchMedia - проверяем есть ли возможность делать запросы к windows
// window.matchMedia("(prefers-color-scheme: dark").matches - запрос к windows на наличие темной темы

if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark").matches
) {
    btnDarkMode.forEach((el) => {
        el.classList.add("dark-mode-btn--active");
    });
    // btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
}

// Если меняются системные настройки (если автоматически в течении дня система
// переключается с одной темы на другую) - меняем  тему

window
    .matchMedia("(prefers-color-scheme: dark")
    .addEventListener("change", (event) => {
        const newColorScheme = event.matches ? "dark" : "light";

        // alert("Theme had been changed!!!");

        if (newColorScheme === "dark") {
            btnDarkMode.classList.add("dark-mode-btn--active");
            document.body.classList.add("dark");
            localStorage.setItem("darkMode", "dark");
        } else {
            btnDarkMode.classList.remove("dark-mode-btn--active");
            document.body.classList.remove("dark");
            localStorage.setItem("darkMode", "light");
        }
    });

// ===============  Работа с блоком 'Theme' - переключение темы  =================================
// Проверка темной темы в localStorage
if (localStorage.getItem("darkMode") === "dark") {
    btnDarkMode.forEach((el) => {
        el.classList.add("dark-mode-btn--active");
    });
    // btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
} else if (localStorage.getItem("darkMode") === "light") {
    btnDarkMode.forEach((el) => {
        el.classList.remove("dark-mode-btn--active");
    });
    // btnDarkMode.classList.remove("dark-mode-btn--active");
    document.body.classList.remove("dark");
}

// Включение ночного режима по кнопке
btnDarkMode.forEach((el) => {
    el.onclick = () => {
        el.classList.toggle("dark-mode-btn--active");

        // Определяем, какой режим включен
        const isDark = document.body.classList.toggle("dark");

        // Сохраняем режим в localStorage
        if (isDark) {
            localStorage.setItem("darkMode", "dark");
        } else {
            localStorage.setItem("darkMode", "light");
        }
    };
});

// btnDarkMode.onclick = () => {
//     btnDarkMode.classList.toggle("dark-mode-btn--active");

//     // Определяем, какой режим включен
//     const isDark = document.body.classList.toggle("dark");

//     // Сохраняем режим в localStorage
//     if (isDark) {
//         localStorage.setItem("darkMode", "dark");
//     } else {
//         localStorage.setItem("darkMode", "light");
//     }
// };

//   =======================  Работа с блоком 'lang' - переключение языка  ==============================
// var langActive = document.querySelector(".lang__item--active");
// var langActiveName = langActive.innerHTML;
var langActiveName;

// Если есть на localStorage сохраненный язык - устанавливаем
if (localStorage.getItem("lang") != undefined) {
    // Устанавливаем активный язык из хранилища
    langActiveName = localStorage.getItem("lang");
} else {
    // Устанавливаем язык по-умолчанию 'RU'
    langActiveName = "EN";
    localStorage.setItem("lang", langActiveName);
}

// console.log(`langActiveName: ${langActiveName}`);

const lang = document.querySelectorAll(".lang__item");

// Инициализация всех элементов
init();

// Инициализация выбора языка при первой загрузке и проверка клика
lang.forEach((el) => {
    // Проверяем клик
    el.addEventListener("click", () => {
        langActiveName = el.innerHTML;

        init();
    });
});

// Рендеринг всех элементов после смены языка
function init() {
    setLang();
    changeLang();

    // Показываем проекты
    setProjects();
    setSelectedWorks();
}

// Изменение надписей в соответствии с выбранным языком
function changeLang() {
    // Если есть 'header' - заполняем его
    let header = document.querySelector(".header__wrapper");

    if (header) {
        let greating = globalTexts["greating"][langActiveName.toLowerCase()];
        let name = globalTexts["name"][langActiveName.toLowerCase()];
        let aboutme = globalTexts["aboutme"][langActiveName.toLowerCase()];
        let about = globalTexts["about"][langActiveName.toLowerCase()];
        let slogan = globalTexts["slogan"][langActiveName.toLowerCase()];
        // let btnLoad = globalTexts["btn-load"][langActiveName.toLowerCase()];

        // header.innerHTML = `<h1 class="header__title">
        //         ${aboutme}
        //     </h1>
        //     <div class="header__text">
        //         <p >${slogan}</p>
        //     </div>`;
        // <a href="${resumeURL}" class="btn" target='_blank' download>${btnLoad}</a>`;
        // <a href="${resumeURL}" class="btn" download='resume.jpg' target='_blank'>${btnLoad} </a>`
    }

    // Заполняем все статические надписи
    for (const key in globalTexts) {
        let elem = document.querySelectorAll(`[data-lang=${key}]`);
        if (elem) {
            // Если несколько подобных надписей, проходим по всем
            elem.forEach((element) => {
                let text = globalTexts[key][langActiveName.toLowerCase()];

                if (key == "projects") {
                    let text1 =
                        globalTexts[key]["span"][langActiveName.toLowerCase()];
                    text += ` <span>${text1}</span>`;
                } else if (key == "slogan1") {
                    let text1 =
                        globalTexts[key]["span"][langActiveName.toLowerCase()];
                    text += ` <span>${text1}</span>`;
                }

                element.innerHTML = text;
            });
        }
    }

    // Рендер кнопки загрузки CV
    function setBtnCV() {
        let btnCV = document.querySelector(".about__social");

        if (btnCV) {
            let btnLoad = globalTexts["download"][langActiveName.toLowerCase()];

            let resumeURLru =
                "https://docs.google.com/document/d/1FzAwcvophhSVuI0UmclNiKF93rQxTkB2/edit?usp=sharing&ouid=117206839528032799965&rtpof=true&sd=true";
            let resumeURLen =
                "https://drive.google.com/file/d/1jgGv2ob1dJjdbdyreH7NugUhO-YHBnJU/view?usp=sharing";

            // let resumeURL = "https://itproger.com/img/courses/1637133308.jpg";

            let resumeURL = "";

            switch (langActiveName.toLowerCase()) {
                case "en":
                    resumeURL = resumeURLen;
                    break;
                case "ru":
                    resumeURL = resumeURLru;
                    break;

                default:
                    resumeURL = resumeURLru;
                    break;
            }

            btnCV.innerHTML = `<a href="${resumeURL}" class="btn " target='_blank' download>${btnLoad}</a>`;
        }
    }

    setBtnCV();

    // Если на странице 'projectDetailes' - заполняем ее
    const projectDetailes = document.querySelector(".project-detailes");

    if (projectDetailes) {
        let projectId = localStorage.getItem("projectId");

        // Находим в (БД) индекс кликнутого элемента по переданному индексу
        const itemIndex = projects.findIndex(function (element) {
            if (element.id == projectId) {
                return true;
            }
        }); // [ {i:1}, {i:2}, {i:3}, {i:4},]

        // console.log("itemIndex: " + itemIndex);
        // const item = projects[itemIndex];
        // console.log(item);

        if (itemIndex != -1) {
            renderProjectDetailes(itemIndex);
        }
    }

    function renderProjectDetailes(id) {
        const item = projects[id];

        let title = item["title"][langActiveName.toLowerCase()];
        let desc = item["desc"][langActiveName.toLowerCase()];
        let skills = item.skills;
        let img = item.imgBig;
        let site = item.site;
        let siteTitle = item.siteTitle;
        let gitTitle = item.gitTitle;
        let gitRef = item.gitRef;
        let siteTitlePrompt = "";
        let skillsPrompt = "";
        let demo = item.demo;

        switch (langActiveName.toLowerCase()) {
            case "ru":
                siteTitlePrompt = "Адрес сайта: ";
                skillsPrompt = "Технологии: ";
                break;
            case "en":
                siteTitlePrompt = "Website address: ";
                skillsPrompt = "Skills: ";
                break;

            default:
                siteTitlePrompt = "Адрес сайта: ";
                skillsPrompt = "Технологии: ";
                break;
        }

        // Рисуем заголовок и картинку
        document.querySelector(".project-detailes .h1").innerHTML = title;
        document
            .querySelector(".project-detailes__cover")
            .setAttribute("src", `./img/projects/${img}.webp`);

        const video = document.querySelector(".video__link");

        if (demo) {
            video.classList.add("active");
            video.setAttribute("href", `${demo}`);
            const attr = document.createAttribute("data-youtubeLightbox");
            video.setAttributeNode(attr);
        }

        // Выводим описание
        let textEnd = "</div>";
        let text = `<p>${desc}</p>`;
        // let text = `<div class="project-detailes__desc"><p>${desc}</p>`;
        // `<div class="project-description"><p class="desc"> ${desc}</p>`

        if (site != "") {
            text += `<p class="site-ref">${siteTitlePrompt} <a href=${site} target="_blank">${siteTitle}</a> </p>`;
        }

        if (skills != "") {
            text += `<p class="skills"><strong><big>${skillsPrompt} </big> ${skills}</strong></p>`;
        }

        if (gitRef != "") {
            document.querySelector(".btn").setAttribute("href", `${gitRef}`);
            document.querySelector(".btn").setAttribute("target", "_blank");

            gitTitle =
                siteTitle == "E-Shop"
                    ? "Для варианта с хранением Mongo-DB"
                    : gitTitle;
            // text += `<p class="github">Github: <a href=${gitRef} target="_blank">${gitTitle}</a> </p>`
        }

        // text += textEnd;
        document.querySelector(".project-detailes__desc").innerHTML = text;
    }
}

// changeLang();

// Ф. установки языка при переключении и сохранение результата на localStorage
function setLang() {
    // Если "RU", устанавливаем в 'body class="ru"'
    if (langActiveName === "RU") {
        document.body.classList.add("ru");
    } else {
        document.body.classList.remove("ru");
    }

    // Очищаем активный модификатор
    lang.forEach((el) => {
        el.classList.remove("lang__item--active");
    });

    // Устанавливаем активный модификатор для соответствующего языка
    lang.forEach((el) => {
        if (el.innerHTML == langActiveName) {
            // и добавляем к выбранному
            el.classList.add("lang__item--active");

            // Сохраняем режим в localStorage
            localStorage.setItem("lang", langActiveName);
        }
    });

    // const isRU = document.body.classList.toggle("ru")

    // Если, существующий язык и выбранный не совпадают, меняем активный
    // if (!el.classList.contains("lang__item--active")) {
    //     langActive = document.querySelectorAll(".lang__item--active");
    //     // Удаляем класс ".active" у существующего элемента
    //     langActive.forEach((activeLang) => {
    //         activeLang.classList.remove("lang__item--active");
    //     });

    //     // и добавляем к выбранному
    //     el.classList.add("lang__item--active");

    //     // Сохраняем режим в localStorage
    //     localStorage.setItem("lang", langActiveName);
    // }
    // }
    // else {
    //     el.classList.remove("lang__item--active");
    // }
}

// lang.onclick = (el) => {
//     demo.innerHTML = "Click!!! from lang";
//     let langActive = el.target;
// btnDarkMode.classList.toggle("dark-mode-btn--active");

// Определяем, какой режим включен
// const isDark = document.body.classList.toggle("dark");

// Сохраняем режим в localStorage
// if (isDark) {
//     localStorage.setItem('darkMode', 'dark');
// } else {
//     localStorage.setItem('darkMode', 'light');

// }
// }

// Изменение языка у текстов

// Вывод избранных работ
function setSelectedWorks() {
    // Если на главной и есть такая необходимость, показываем проекты
    if (selectedWorks) {
        let videoIcon = "";

        // Очищаем содержиимое всех проектов
        selectedWorks.innerHTML = "";

        // Заполняем все проекты из базы (projects.js)
        selectedWorksData.forEach((item) => {
            // Проверяем, есть ли ссылка на демо-видео youtube
            if (item.demo) {
                videoIcon = `<img src="./img/video/movie_camera_icon.svg" alt="Demo available">`;
            } else videoIcon = "";

            // Шаблон карточки проекта
            let text = `<li class="work swiper-slide" onclick="projectDetails(${
                item.id
            })">
                <a class="work-link" href="./project-page.html">
                    <div class="work__img-wrapper">
                        <picture>
                            <source srcset="./img/projects/${
                                item.imgBig
                            }.webp " type="image/webp">
                            <source srcset="./img/projects/${
                                item.imgBig
                            }.jpg " type="image/jpeg">
                            <img src="./img/projects/${
                                item.imgBig
                            }.jpg" alt="Project img" class="work__img">
                        </picture>
                    </div>
                    <div class="work__icon">${videoIcon}</div>
                    <h3 class="work__title">${
                        item["title"][langActiveName.toLowerCase()]
                    }</h3>
                </a>
            </li`;

            selectedWorks.innerHTML += text;
        });
    }
}

function setProjects() {
    // Если на главной и есть такая необходимость, показываем проекты
    if (projectsAll) {
        let videoIcon = "";

        // Очищаем содержиимое всех проектов
        projectsAll.innerHTML = "";

        // Заполняем все проекты из базы (projects.js)
        projects.forEach((item) => {
            // Проверяем, есть ли ссылка на демо-видео youtube
            if (item.demo) {
                videoIcon = `<img src="./img/video/movie_camera_icon.svg" alt="Demo available">`;
            } else videoIcon = "";

            // Шаблон карточки проекта
            let text = `<li class="project" onclick="projectDetails(${
                item.id
            })">
                <a href="./project-page.html">
                        <div class="project__img-wrapper">
                            <picture>
                                <source srcset="./img/projects/${
                                    item.img
                                }.webp " type="image/webp">
                                <source srcset="./img/projects/${
                                    item.img
                                }.jpg " type="image/jpeg">
                                <img src="./img/projects/${
                                    item.img
                                }.jpg" alt="Project img" class="project__img">
                            </picture>
                        </div>
                        <h3 class="project__title">${
                            item["title"][langActiveName.toLowerCase()]
                        }</h3>
                        <div class="project__icon">${videoIcon}</div>
                    </a>
                </li`;

            projectsAll.innerHTML += text;
        });
    }
}

// Показываем проекты
// setProjects();

// Сохраняем 'id' выбранного проекта, для последующего использования в "подробно"
function projectDetails(id) {
    localStorage.setItem("projectId", id);
}
