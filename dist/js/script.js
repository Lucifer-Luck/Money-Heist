const bgTrack = document.querySelector('.img__track');
const bgItems = bgTrack.children;
const totalItems = bgItems.length;
const bgPrev = document.querySelector('.bg__controller.prev');
const bgNext = document.querySelector('.bg__controller.next');

let bgIndex = 1;
const bgSize = bgItems[0].clientWidth;

updating();

// Start Function Here
function updating() {
    bgTrack.style.transform = 'translateX(' + (-bgSize * bgIndex) + 'px)';
}

function nextSlide() {
    if (bgIndex >= totalItems - 1) return;

    bgTrack.style.transition = 'transform .4s ease-in-out';
    bgIndex++;
    updating();
}

function prevSlide() {
    if (bgIndex <= 0) return;

    bgTrack.style.transition = 'transform .4s ease-in-out';
    bgIndex--;
    updating();
}


// Start Auto Slide
let timer = setInterval(autoSlide, 2000);

function autoSlide() {
    nextSlide();
}

function resetSlide() {
    clearInterval(timer);
    timer = setInterval(autoSlide, 2000);
}
// End Auto Slide

// End Function Here



bgNext.addEventListener('click', () => {
    nextSlide();
    resetSlide();
});

bgPrev.addEventListener('click', () => {
    prevSlide();
    resetSlide();
});

bgTrack.addEventListener('transitionend', () => {
    if (bgItems[bgIndex].id === "last-clone") {
        bgTrack.style.transition = 'none';
        bgIndex = totalItems - 2;
        updating();
    }
        else if (bgItems[bgIndex].id === "first-clone") {
            bgTrack.style.transition = 'none';
            bgIndex = totalItems - bgIndex;
            updating();
        }
})





// Start Scrolling
window.addEventListener('scroll', () => {
    let navBar = document.querySelector('.navigation');
    let navLogo = document.querySelector('.logo');
    let navText = document.querySelectorAll('.nav__link');

    let windowPosition = window.scrollY > 100;

    navBar.classList.toggle("scroll__active", windowPosition);
    navLogo.classList.toggle("scroll__active", windowPosition);
    navText.forEach(navLink => navLink.classList.toggle("scroll__active", windowPosition));


    // Parallax
    let parallax = document.querySelector('#parallaxMe');
    let scrollPosition = window.pageYOffset;

    parallax.style.transform = 'translateY(' + scrollPosition * .4 + 'px)';


    // Start Filter
    let navItems = document.querySelectorAll('.nav__items');
    const docScrollTop = document.documentElement.scrollTop;
    
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("active__link");

        if (docScrollTop < 520) {
            document.querySelector(".nav__items.home").classList.add("active__link");
        }
            else if (docScrollTop < 1090) {
                document.querySelector(".nav__items.about").classList.add("active__link");
            }
                else if (docScrollTop > 1090) {
                    document.querySelector(".nav__items.char").classList.add("active__link");
                }
    }
});
// End Scrolling





// Start Characters Slider
const slideContainer = document.querySelector('.slide__container');
const slideTrack = document.querySelector('.slide__track');
const prevChar = document.querySelector('.char__ctrl#prev');
const nextChar = document.querySelector('.char__ctrl#next');

let slideWidth = slideContainer.offsetWidth;
let slideIndex = 0;

// window.addEventListener('resize', () => {
//     slideWidth = document.querySelector('.slide__container').offsetWidth;
// });

// Start Function
function updateChar() {
    slideTrack.style.transition = 'transform .5s ease-in-out';
    slideTrack.style.transform = 'translatex(' + (-slideWidth * slideIndex) + 'px)';
}

function hideMe() {
    if (slideIndex === 0) {
        prevChar.classList.add("hide__ctrl");
        nextChar.classList.remove("hide__ctrl");
    }
        else if (slideTrack.offsetWidth - (slideWidth * slideIndex) <= slideWidth) {
            prevChar.classList.remove("hide__ctrl");
            nextChar.classList.add("hide__ctrl");
        }
            else {
                prevChar.classList.remove("hide__ctrl");
                nextChar.classList.remove("hide__ctrl");
            }
}
// End Function

prevChar.addEventListener('click', () => {
    slideIndex--;

    updateChar();
    hideMe();
});

nextChar.addEventListener('click', () => {
    slideIndex++;

    updateChar();
    hideMe();
});
// End Characters Slider





// Start Theme
const btnTheme = document.querySelector('.bg__theme');
const circle = btnTheme.querySelector('.circle');
const body = document.querySelector('body');

let currentTheme = localStorage.getItem('currentTheme');

if (currentTheme) {
    body.classList.add('dark_theme');
    circle.classList.add('active__circle');
}

btnTheme.addEventListener('click', () => {
    body.classList.toggle('dark_theme');
    circle.classList.toggle('active__circle');

    if (body.classList.contains('dark_theme') || circle.classList.contains('active__circle')) {
        localStorage.setItem('currentTheme', 'themeActive');
    }
        else {
            localStorage.removeItem('currentTheme');
        }
})
// End Theme





// Start Burger
const burger = document.querySelector('.burger');
const navList = document.querySelector('.nav__list');

burger.addEventListener('click', () => {
    burger.classList.toggle("show");
    navList.classList.toggle("active__nav");
})
// End Burger