document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.querySelector('.header__button');
    const nav = document.querySelector('.header__menu');

    navButton.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    const title = document.title;
    const sites = nav.querySelectorAll('.header__menu-link');

    if (title == "Bistro Milano") {
        sites[0].classList.add("current");
    } else {
        sites.forEach(site => {
            if (title.indexOf(site.textContent) > -1) site.classList.add('current');
        });
    }
});