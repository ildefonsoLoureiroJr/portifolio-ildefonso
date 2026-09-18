/* ============================================================
   ELEMENTOS
============================================================ */

const menuToggle =
    document.getElementById("menu-toggle");

const menu =
    document.getElementById("main-menu");

const themeToggle =
    document.getElementById("theme-toggle");

const dropdownItems =
    document.querySelectorAll(
        ".has-dropdown"
    );

const dropdownTriggers =
    document.querySelectorAll(
        ".dropdown-trigger"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-menu > .nav-item > .nav-link:not(.dropdown-trigger)"
    );


/* ============================================================
   VERIFICAR MOBILE
============================================================ */

function isMobile() {

    return window.innerWidth <= 700;

}


/* ============================================================
   MENU MOBILE
============================================================ */

function openMenu() {

    menu.classList.add(
        "active"
    );


    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Fechar menu"
    );


    const icon =
        menuToggle.querySelector("i");


    icon.classList.remove(
        "fa-bars"
    );


    icon.classList.add(
        "fa-xmark"
    );

}


function closeMenu() {

    menu.classList.remove(
        "active"
    );


    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Abrir menu"
    );


    const icon =
        menuToggle.querySelector("i");


    icon.classList.remove(
        "fa-xmark"
    );


    icon.classList.add(
        "fa-bars"
    );


    closeAllDropdowns();

}


menuToggle.addEventListener(
    "click",
    () => {

        if (
            menu.classList.contains(
                "active"
            )
        ) {

            closeMenu();

        } else {

            openMenu();

        }

    }
);


/* ============================================================
   DROPDOWNS
============================================================ */

function closeAllDropdowns(
    except = null
) {

    dropdownItems.forEach(
        item => {

            if (
                item === except
            ) {

                return;

            }


            item.classList.remove(
                "dropdown-open"
            );


            const trigger =
                item.querySelector(
                    ".dropdown-trigger"
                );


            if (trigger) {

                trigger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}


function toggleDropdown(item) {

    const isOpen =
        item.classList.contains(
            "dropdown-open"
        );


    closeAllDropdowns(
        item
    );


    if (isOpen) {

        item.classList.remove(
            "dropdown-open"
        );

    } else {

        item.classList.add(
            "dropdown-open"
        );

    }


    const trigger =
        item.querySelector(
            ".dropdown-trigger"
        );


    if (trigger) {

        trigger.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

    }

}


/* ============================================================
   DROPDOWN — MOBILE
============================================================ */

dropdownTriggers.forEach(
    trigger => {

        trigger.addEventListener(
            "click",
            event => {

                if (
                    !isMobile()
                ) {

                    return;

                }


                event.preventDefault();


                const item =
                    trigger.closest(
                        ".has-dropdown"
                    );


                toggleDropdown(
                    item
                );

            }
        );

    }
);


/* ============================================================
   LINKS NORMAIS
============================================================ */

navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );


                if (
                    isMobile()
                ) {

                    closeMenu();

                }

            }
        );

    }
);


/* ============================================================
   LINKS DOS MEGA MENUS
============================================================ */

document
    .querySelectorAll(
        ".mega-card"
    )
    .forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    if (
                        isMobile()
                    ) {

                        closeMenu();

                    }

                }
            );

        }
    );


/* ============================================================
   CLIQUE FORA DO MENU — MOBILE
============================================================ */

document.addEventListener(
    "click",
    event => {

        if (
            !isMobile()
        ) {

            return;

        }


        if (
            !event.target.closest(
                ".navbar"
            )
        ) {

            closeMenu();

        }

    }
);


/* ============================================================
   ESC FECHA MENU
============================================================ */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        closeMenu();


        if (
            isMobile()
        ) {

            menuToggle.focus();

        }

    }
);


/* ============================================================
   TEMA
============================================================ */

function updateTheme() {

    const icon =
        themeToggle.querySelector(
            "i"
        );


    const darkMode =
        document.body.classList.contains(
            "dark"
        );


    if (darkMode) {

        icon.classList.remove(
            "fa-moon"
        );


        icon.classList.add(
            "fa-sun"
        );


        themeToggle.setAttribute(
            "aria-label",
            "Ativar modo claro"
        );


        themeToggle.setAttribute(
            "title",
            "Ativar modo claro"
        );

    } else {

        icon.classList.remove(
            "fa-sun"
        );


        icon.classList.add(
            "fa-moon"
        );


        themeToggle.setAttribute(
            "aria-label",
            "Ativar modo escuro"
        );


        themeToggle.setAttribute(
            "title",
            "Ativar modo escuro"
        );

    }

}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        updateTheme();

    }
);


/* ============================================================
   ACTIVE LINK POR SEÇÃO
============================================================ */

const sections =
    document.querySelectorAll(
        "main section"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const id =
                        entry.target.id;


                    navLinks.forEach(
                        link => {

                            link.classList.remove(
                                "active"
                            );

                        }
                    );


                    dropdownTriggers.forEach(
                        trigger => {

                            trigger.classList.remove(
                                "active"
                            );

                        }
                    );


                    /* HOME */

                    if (
                        id === "home"
                    ) {

                        const link =
                            document.querySelector(
                                '.nav-link[href="#home"]'
                            );


                        if (link) {

                            link.classList.add(
                                "active"
                            );

                        }

                    }


                    /* SOBRE */

                    if (
                        id === "sobre-mim"
                    ) {

                        const link =
                            document.querySelector(
                                '.nav-link[href="#sobre-mim"]'
                            );


                        if (link) {

                            link.classList.add(
                                "active"
                            );

                        }

                    }


                    /* PROJETOS */

                    if (
                        id === "projetos"
                    ) {

                        const trigger =
                            document.querySelector(
                                ".projects-menu"
                            )
                            ?.closest(
                                ".has-dropdown"
                            )
                            ?.querySelector(
                                ".dropdown-trigger"
                            );


                        if (trigger) {

                            trigger.classList.add(
                                "active"
                            );

                        }

                    }


                    /* CONTATO */

                    if (
                        id === "contatos"
                    ) {

                        const trigger =
                            document.querySelector(
                                ".contact-menu"
                            )
                            ?.closest(
                                ".has-dropdown"
                            )
                            ?.querySelector(
                                ".dropdown-trigger"
                            );


                        if (trigger) {

                            trigger.classList.add(
                                "active"
                            );

                        }

                    }

                }
            );

        },
        {
            root: null,

            rootMargin:
                "-40% 0px -50% 0px",

            threshold: 0
        }
    );


sections.forEach(
    section => {

        sectionObserver.observe(
            section
        );

    }
);


/* ============================================================
   RESIZE
============================================================ */

window.addEventListener(
    "resize",
    () => {

        if (
            !isMobile()
        ) {

            closeMenu();

        }

    }
);


/* ============================================================
   INICIALIZAÇÃO
============================================================ */

updateTheme();