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

    // menu restauracyjne
    const foodMenuOption = document.querySelectorAll('.restaurant-menu__menu-link');
    const foodType = document.querySelectorAll('.menu-food__type');
    const sideBar = document.querySelector(".restaurant-menu__sidebar");
    let maxHeightOption = foodType[0].parentElement.offsetHeight;

    foodMenuOption[0].classList.add("restaurant-menu__menu-link--active");

    foodType[0].parentElement.classList.add("menu-food--active");
    foodType.forEach(type => {
        type.parentElement.style.display = "block";
        if(type.parentElement.offsetHeight > maxHeightOption) {
            maxHeightOption = type.parentElement.offsetHeight;
        }
        type.parentElement.style.removeProperty('display');
    });
    sideBar.style.height = `${maxHeightOption}px`;

    foodMenuOption.forEach((option, i, theArray) => {
        option.addEventListener('click', (e) => {
            if (window.screen.width > 768) {
                e.preventDefault();
            }
            const typeName = option.textContent;
            theArray.forEach(option => option.classList.remove('restaurant-menu__menu-link--active'));
            option.classList.add('restaurant-menu__menu-link--active');

            foodType.forEach(type => {
                type.parentElement.classList.remove("menu-food--active");
            })
            foodType.forEach(type => {
                if (typeName == type.textContent) {
                    type.parentElement.classList.add("menu-food--active");
                }
            });
        });
    });
});