console.log('Hello buddy!'); //greeting

document.querySelectorAll('video').forEach(v => { v.setAttribute('pip', 'false'); }); //Yandex-Browser pip-off

//Burger popup
const burgerButton = document.getElementById('burger-button');
const popUp = document.querySelector('.pop-up');
const burgerIconAbove = document.getElementById('above');
const burgerIconBelow = document.getElementById('below');
const burgerLinks = document.querySelectorAll('.collapse-burger');
const fromBurgerToCross = (event) => {
        burgerIconAbove.classList.toggle('to-cross-above');
        burgerIconBelow.classList.toggle('to-cross-below');
        popUp.classList.toggle('pop-up__visible');
}
burgerButton.addEventListener('click', (fromBurgerToCross));
burgerLinks.forEach(item => {
    item.addEventListener('click', (fromBurgerToCross))
});

//Slider
const sliderLine = document.querySelector('.slide');
const sliderBox = document.querySelector('.slider');
const slideCard = document.querySelector('.slider-1');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const controlIndicators = document.querySelectorAll('.control-animate');
const carouselWindow = document.querySelector('.row-slider');
let position = 0;
let controlIndex = 0;
let cardWidth = slideCard.offsetWidth;
const slideLeft = () => {
    controlIndicators[controlIndex].classList.toggle('control-animate-after');
        if (sliderLine.style.left === '' || sliderLine.style.left === '0px') {
        position -= 2 * cardWidth;
        controlIndex += 2;
    } else {
        position += cardWidth;
        controlIndex -= 1;
    }
    sliderLine.style.left = position + 'px';
    controlIndicators[controlIndex].classList.toggle('control-animate-after');
}
const slideRight = () => {
    controlIndicators[controlIndex].classList.toggle('control-animate-after');
        if (sliderLine.style.left === -2 * cardWidth + 'px') {
        position += 2 * cardWidth;
        controlIndex -= 2;
    } else {
        position -= cardWidth;
        controlIndex += 1;
    }
    sliderLine.style.left = position + 'px';
    controlIndicators[controlIndex].classList.toggle('control-animate-after');
}

let touchstartX = 0;
let touchstartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const typeGesture = () => {
    const deltaX = touchstartX - touchEndX;
    const deltaY = touchstartY - touchEndY;
    if ((Math.abs(deltaX) > Math.abs(deltaY)) && touchstartX > touchEndX) slideRight();
    if ((Math.abs(deltaX) > Math.abs(deltaY)) && touchstartX < touchEndX) slideLeft();
}

sliderBox.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

sliderBox.addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    typeGesture();
}, false);

let indicatorComputedStyle;
let positionLeft;
let startAnimate = Date.now(); // 0
let timerID = setTimeout(function tick () {
    slideRight();
    timerID = setTimeout(tick, 5120);
    }, 5120);
let animationDuration = 0;

const stopInterval = () => {
    animationDuration = (Date.now() - startAnimate) % 5120;
    clearTimeout(timerID);
    indicatorComputedStyle = window.getComputedStyle(controlIndicators[controlIndex]);
    positionLeft = indicatorComputedStyle.getPropertyValue('left');
    controlIndicators[controlIndex].style.left = positionLeft;
    controlIndicators[controlIndex].classList.remove('control-animate-after');
}



const runInterval = () => {
    startAnimate = Date.now() - animationDuration;
    animationDuration = 5120 - animationDuration;
    timerID = setTimeout(function tick2 () {
        slideRight();
        timerID = setTimeout(tick2, 5120);
    }, (animationDuration));
    controlIndicators[controlIndex].classList.add('control-animate-after');
    controlIndicators[controlIndex].style.left = '-100%';
}

function handler(event) {
    event = event || window.event;

    if (event.stopPropagation)
        event.stopPropagation();

    event.cancelBubble = true;
    return false;
}

carouselWindow.addEventListener('mouseover', (stopInterval));
carouselWindow.addEventListener('touchstart', (stopInterval));
carouselWindow.addEventListener('mouseout', (runInterval));
carouselWindow.addEventListener('touchend', (runInterval));

leftButton.addEventListener('click', (slideLeft));
rightButton.addEventListener('click', (slideRight));










