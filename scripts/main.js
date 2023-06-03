document.addEventListener("DOMContentLoaded", function () {
  // header button search

  const searchActive = document.querySelector(
    ".header__rowOne__search__active"
  );
  const activeInput = document.querySelector(
    ".header__rowOne__search__active_input"
  );

  document
    .querySelector(".header__rowOne__search")
    .addEventListener("click", function () {
      searchActive.style.opacity = "1";
      searchActive.style.visibility = "initial";
      activeInput.focus();
    });
  document
    .querySelector(".header__rowOne__search__active_btn")
    .addEventListener("click", function () {
      searchActive.style.opacity = "0";
      searchActive.style.visibility = "hidden";
    });

  window.addEventListener("click", (event) => {
    // при клике в любом месте окна браузера
    const target = event.target; // находим элемент, на котором был клик
    if (
      !target.closest(".header__rowOne__search__active") &&
      !target.closest(".header__rowOne__search")
    ) {
      // если этот элемент или его родительские элементы не окно навигации и не кнопка
      searchActive.style.opacity = "0";
      searchActive.style.visibility = "hidden";
    }
  });
  searchActive.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      searchActive.style.opacity = "0";
      searchActive.style.visibility = "hidden";
    }
  });

  // podcasts article more podcasts

  morePodcasts = document.querySelectorAll(".more-podcasts-toggle");

  document
    .querySelector(".podcasts__btn")
    .addEventListener("click", function () {
      morePodcasts.forEach((n) => {
        n.classList.toggle("more-podcasts");
        if (document.body.clientWidth <= 320) {
          n.style.display = n.style.display === "inline" ? "" : "inline";
        }
      });
    });

  // broadcasts select

  const element = document.querySelector(".select");
  const choices = new Choices(element, {
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: "",
  });

  element.addEventListener(
    "addItem",
    function (event) {
      choices.config.choices.forEach((d) => {
        const itemClosed = d.value;
        document.getElementById(itemClosed).classList.add("closed"); // скрываем передачи авторов
      });
      const item = event.detail.value;
      document.getElementById(item).classList.remove("closed"); //показываем передачи выбранного автора
    },
    false
  );

  // guests accordion

  const header = document.querySelectorAll(".accordion__item");

  function itemShowDel(el) {
    // удалим все классы accordion__item_show
    el.forEach((d) => {
      d.classList.remove("accordion__item_show");
    });
  }

  function itemShowToggle(el) {
    const elHeader = el.target.closest(".accordion__header"); // получим элемент .accordion__header
    if (!elHeader) return; // если такой элемент не найден, то прекращаем выполнение функции
    itemShowDel(header);
    elHeader.parentElement.classList.toggle("accordion__item_show"); // переключим класс accordion__item_show элемента .accordion__header
    document.querySelectorAll(".guests__cards").forEach((d) => {
      // закроем все карточки
      d.classList.add("closed");
    });
    document
      .querySelector(".guests__cards__default")
      .classList.remove("closed");
  }

  function cardOpen(el) {
    // открытие карточки по ID
    let id = el.target.dataset.toggleId;
    if (!id) return;
    let elem = document.getElementById(id);
    elem.classList.remove("closed");
    return id;
  }

  header.forEach((n) => {
    n.addEventListener("keydown", (event) => {
      // нажатие на enter
      if (event.key === "Enter") {
        document.querySelectorAll(".guests__cards").forEach((d) => {
          d.classList.add("closed");
        });
        document
          .querySelector(".guests__cards__default")
          .classList.add("closed");
        itemShowToggle(event);
        cardOpen(event);
      }
    });
    n.addEventListener("click", (event) => {
      // нажатие на кнопку мыши
      document.querySelectorAll(".guests__cards").forEach((d) => {
        d.classList.add("closed");
      });
      document.querySelector(".guests__cards__default").classList.add("closed");
      itemShowToggle(event);
      cardOpen(event);
    });
  });

  // playlists radio

  const playlistsRadio = this.querySelectorAll(".playlists__radio__input");

  if (document.body.clientWidth <= 320) {
    this.querySelector(".playlists__radio").classList.add("swiper-wrapper");
  }

  playlistsRadio.forEach((n) => {
    n.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.querySelectorAll(".playlists__cards").forEach((d) => {
          d.classList.add("closed");
        });
        cardOpen(event);
      }
    });
  });
  playlistsRadio.forEach((n) => {
    n.addEventListener("click", (event) => {
      this.querySelectorAll(".playlists__cards").forEach((d) => {
        d.classList.add("closed");
      });
      cardOpen(event);
      if (document.body.clientWidth <= 320) {
        playlistsRadio.forEach((d) => {
          d.style.backgroundColor = "inherit";
          d.style.color = "#6D31EE";
        });
        n.style.backgroundColor = "#6D31EE";
        n.style.color = "#FFFFFF";
      }
    });
  });

  // playlists swiper

  const swiperPlaylists = new Swiper(".swiper-playlists", {
    // Optional parameters
    direction: "horizontal",
    // loop: true,
    slidesPerView: 2,
    spaceBetween: 10,
  });

  // about swiper

  const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    slidesPerView: 2,
    spaceBetween: 20,

    breakpoints: {
      // when window width is >= 769px
      769: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // when window width is >= 1280px
      1280: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },

    navigation: {
      nextEl: ".about__swiperNext",
      prevEl: ".about__swiperPrev",
    },
  });

  // about form validation

  const validation = new JustValidate("#about__form");

  validation
    .addField("#about__form__text", [
      {
        rule: "required",
        errorMessage: "Введите минимум 2 символа",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Введите минимум 2 символа",
      },
    ])
    .addField("#about__form_name", [
      {
        rule: "required",
        errorMessage: "Введите имя",
      },
      {
        rule: "customRegexp",
        value: /^[\p{L} ,.'-]+$/u,
        errorMessage: "Введите имя из букв",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Введите минимум 2 символа",
      },
      {
        rule: "maxLength",
        value: 30,
        errorMessage: "Максимум 30 символов",
      },
    ])
    .addField("#about__form_email", [
      {
        rule: "required",
        errorMessage: "Введите email",
      },
      {
        rule: "email",
        errorMessage: "Введите корректный email",
      },
    ]);

  // Open modal

  const FOCUSABLE_SELECTORS =
    "input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
  const openModalBtn = document.querySelector(".open__modal");
  const closeModalBtn = document.querySelector(".close__modal");
  const modal = document.querySelector(".modal");
  const main = document.querySelector("main");

  function openModal() {
    modal.style.display = "flex";
    modal.classList.remove("Out");

    modal.querySelector(FOCUSABLE_SELECTORS).focus();
    const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
    focusableElements.forEach((el) => el.setAttribute("tabindex", "-1"));
    modal.removeAttribute("aria-hidden");
    main.setAttribute("aria-hidden", "true");
  }

  function closeModal() {
    modal.classList.add("Out");
    // modal.style.display = 'none';

    const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
    focusableElements.forEach((el) => el.removeAttribute("tabindex"));
    modal.setAttribute("aria-hidden", "true");
    main.removeAttribute("aria-hidden");
    openModalBtn.focus();
  }

  openModalBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);
  modal.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Modal form validation

  const validationModal = new JustValidate("#modal__form");

  validationModal.addField("#modal__form_name", [
    {
      rule: "required",
      errorMessage: "Введите имя",
    },
    {
      rule: "customRegexp",
      value: /^[\p{L} ,.'-]+$/u,
      errorMessage: "Введите имя из букв",
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Введите минимум 2 символа",
    },
    {
      rule: "maxLength",
      value: 30,
      errorMessage: "Максимум 30 символов",
    },
  ]);

  const openBurgerBtn = document.querySelector(".burger-open");
  const closeBurgerBtn = document.querySelectorAll(".burger-close");
  const burgerModal = document.querySelector(".burger-modal");

  function openBurger() {
    burgerModal.style.display = "flex";
    burgerModal.classList.remove("scaleOut");

    burgerModal.querySelector("li").focus();
    const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
    focusableElements.forEach((el) => el.setAttribute("tabindex", "-1"));
    burgerModal.removeAttribute("aria-hidden");
    main.setAttribute("aria-hidden", "true");
  }

  function closeBurger() {
    // burgerModal.style.display = 'none';
    burgerModal.classList.add("scaleOut");
    const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
    focusableElements.forEach((el) => el.removeAttribute("tabindex"));
    burgerModal.setAttribute("aria-hidden", "true");
    main.removeAttribute("aria-hidden");
    openBurgerBtn.focus();
  }

  openBurgerBtn.addEventListener("click", openBurger);
  closeBurgerBtn.forEach((el) => el.addEventListener("click", closeBurger));
  burgerModal.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeBurger();
    }
  });

  const openEtherBtn = document.querySelector(".header__rowFour");
  const closeEtherBtn = document.querySelectorAll(".ether__inner");
  const etherModal = document.querySelector(".ether-modal");

  function openether() {
    etherModal.style.display = "inline";
    etherModal.classList.remove("scaleOut");

    etherModal.querySelector("li").focus();
    const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
    focusableElements.forEach((el) => el.setAttribute("tabindex", "-1"));
    etherModal.removeAttribute("aria-hidden");
    main.setAttribute("aria-hidden", "true");
  }

  function closeether() {
    // etherModal.style.display = 'none';
    etherModal.classList.add("scaleOut");
    const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
    focusableElements.forEach((el) => el.removeAttribute("tabindex"));
    etherModal.setAttribute("aria-hidden", "true");
    main.removeAttribute("aria-hidden");
    openEtherBtn.focus();
  }

  openEtherBtn.addEventListener("click", openether);
  closeEtherBtn.forEach((el) => el.addEventListener("click", closeether));
  etherModal.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeether();
    }
  });
});
