console.log('Hello buddy!');
document.querySelectorAll('video').forEach(v => { v.setAttribute('pip', 'false'); }); //Yandex-Browser pip-off
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