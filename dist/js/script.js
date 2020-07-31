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