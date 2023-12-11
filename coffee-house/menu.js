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

//Categories

let category = 'coffee';
let keyTitle = 'name';
let keyDescription = 'description';
let keyPrice = 'price';

const boxProductImages = document.querySelectorAll('.box');
const boxProductImagesVisible = document.querySelectorAll('.always-visible');
const tabItems = document.querySelectorAll('.category-selector');
const coffeeCardsContent = document.querySelectorAll('.coffee');
const teaCardsContent = document.querySelectorAll('.tea');
const dessertCardsContent = document.querySelectorAll('.dessert');
const hiddenCards = document.querySelectorAll('.visible');
const refreshBox = document.querySelector('.hidden');
const refreshButton = document.querySelector('.refresh');
const productTitles = document.querySelectorAll('.product-title');
const productDescriptions = document.querySelectorAll('.descr');
const productPrices = document.querySelectorAll('.price');
const productCards = document.querySelectorAll('.preview');

const showHiddenCards = () => {
    hiddenCards.forEach(card => card.classList.remove('visible'));
    refreshBox.classList.remove('hidden');
    refreshBox.classList.add('no-display');
}

const hideVisibleCards = () => {
    hiddenCards.forEach(card => card.classList.add('visible'));
    refreshBox.classList.add('hidden');
    refreshBox.classList.remove('no-display');
}

const setValues = async (category) => {
    const obj = await fetch('products.json');
    const fullArray = await obj.json();
    const filteredResult = fullArray.filter((element) => element['category'] === category);
    productTitles.forEach((title, index) => title.innerHTML = filteredResult[index][keyTitle]);
    productDescriptions.forEach((description, index) => description.innerHTML = filteredResult[index][keyDescription]);
    productPrices.forEach((prices, index) => prices.innerHTML = filteredResult[index][keyPrice]);
  };


const setTeaFilter = () => {
    hiddenCards.forEach(card => card.classList.add('no-display'));
    refreshBox.classList.add('no-display');
    refreshBox.classList.remove('hidden');
    category = 'tea';
    productCards.forEach(element => {
        element.classList.remove('dessert');
        element.classList.remove('coffee');
        element.classList.add(category);
    });
    hideVisibleCards();
    boxProductImagesVisible.forEach((box, index) => box.innerHTML = '<img class ="' + category + '" src="./images/' + category + '-' + (index + 1) + '.png" alt ="' + category + index + '">');
    setValues(category);
    showHiddenCards();
}

const setDessertFilter = () => {
    hiddenCards.forEach(card => card.classList.remove('no-display'));
    refreshBox.classList.remove('no-display');
    refreshBox.classList.add('hidden');
    category = 'dessert';
    productCards.forEach(element => {
        element.classList.remove('tea');
        element.classList.remove('coffee');
        element.classList.add(category);
    });
    hideVisibleCards();
    boxProductImages.forEach((box, index) => box.innerHTML = '<img class ="' + category + '" src="./images/' + category + '-' + (index + 1) + '.png" alt ="' + category + index + '">');
    setValues(category);
}

const setCoffeeFilter = () => {
    hiddenCards.forEach(card => card.classList.remove('no-display'));
    refreshBox.classList.remove('no-display');
    refreshBox.classList.add('hidden');
    category = 'coffee';
    productCards.forEach(element => {
        element.classList.remove('tea');
        element.classList.remove('dessert');
        element.classList.add(category);
    });
    hideVisibleCards();
    boxProductImages.forEach((box, index) => box.innerHTML = '<img class ="' + category + '" src="./images/' + category + '-' + (index + 1) + '.png" alt ="' + category + index + '">');
    setValues(category);
}

setCoffeeFilter();

const toggleItem = () => {
        if (!event.currentTarget.classList.contains('active')) {
    tabItems.forEach(tabItem => {
        tabItem.removeAttribute('id');
        tabItem.classList.remove('active');
        tabItem.firstElementChild.classList.remove('active');
        tabItem.lastElementChild.classList.remove('active');
    });
    event.currentTarget.id = 'active';
    event.currentTarget.classList.add('active');
    event.currentTarget.firstElementChild.classList.add('active');
    event.currentTarget.lastElementChild.classList.add('active');
    }
}

tabItems.forEach(tabItem => {
tabItem.addEventListener('click', (toggleItem));
});
tabItems[1].addEventListener('click', (setTeaFilter));
tabItems[0].addEventListener('click', (setCoffeeFilter));
tabItems[2].addEventListener('click', (setDessertFilter));
refreshButton.addEventListener('click', (showHiddenCards));


//Modals

const modalBackground = document.querySelector('.modal-background');
const closeButton = document.querySelector('.button-secondary');
const sizeSelectors = document.querySelectorAll('.size-selector');
const additivesSelectors = document.querySelectorAll('.additives-selector');
const buyingCost = document.querySelector('.sum');
const htmlElement = document.getElementsByTagName( 'html' )[0];
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const modalVolumes = document.querySelectorAll('.modal-volumes');
const modalAdditives = document.querySelectorAll('.modal-additive');
const modalBoxImage = document.querySelector('.box2');


const setModalValues = async (category, selectedNumber) => {
    const obj = await fetch('products.json');
    const fullArray = await obj.json();
    const filteredResult = fullArray.filter((element) => element['category'] === category);
    modalVolumes[0].innerHTML = filteredResult[selectedNumber - 1]['sizes']['s']['size'];
    modalVolumes[1].innerHTML = filteredResult[selectedNumber - 1]['sizes']['m']['size'];
    modalVolumes[2].innerHTML = filteredResult[selectedNumber - 1]['sizes']['l']['size'];
    modalAdditives.forEach((element, index) => element.innerHTML = filteredResult[selectedNumber - 1]['additives'][index]['name']);
    buyingCost.innerHTML = '$' + filteredResult[selectedNumber - 1]['price'];
  };

const disableScroll = () => {
    htmlElement.classList.add('scroll-disable');
}

const enableScroll = () => {
    htmlElement.classList.remove('scroll-disable');
}

let selectedNumber = 0;
let selectedSize = 's';
let selectedFirstAdditive = 0;
let selectedSecondAdditive = 0;
let selectedThirdAdditive = 0;


const openModal = () => {
    selectedFirstAdditive = 0;
    selectedSecondAdditive = 0;
    selectedThirdAdditive = 0;
    disableScroll();
    modalBackground.classList.remove('no-display');
    sizeSelectors.forEach(selector => {
        selector.classList.remove('active');
        selector.firstElementChild.classList.remove('active');
        selector.lastElementChild.classList.remove('active');
       });
    sizeSelectors[0].classList.add('active');
    sizeSelectors[0].firstElementChild.classList.add('active');
    sizeSelectors[0].lastElementChild.classList.add('active');
    additivesSelectors.forEach(selector => {
        selector.classList.remove('active');
        selector.firstElementChild.classList.remove('active');
        selector.lastElementChild.classList.remove('active');
       });
        if (event.currentTarget.classList.contains('one')) selectedNumber = 1;
        if (event.currentTarget.classList.contains('two')) selectedNumber = 2;
        if (event.currentTarget.classList.contains('three')) selectedNumber = 3;
        if (event.currentTarget.classList.contains('four')) selectedNumber = 4;
        if (event.currentTarget.classList.contains('five')) selectedNumber = 5;
        if (event.currentTarget.classList.contains('six')) selectedNumber = 6;
        if (event.currentTarget.classList.contains('seven')) selectedNumber = 7;
        if (event.currentTarget.classList.contains('eight')) selectedNumber = 8;
        if (event.currentTarget.classList.contains('coffee')) category = 'coffee';
        if (event.currentTarget.classList.contains('tea')) category = 'tea';
        if (event.currentTarget.classList.contains('dessert')) category = 'dessert';
       setModalValues(category, selectedNumber);
    additionValue();
       modalBoxImage.innerHTML = '<img class ="' + category + '" src="./images/' + category + '-' + selectedNumber + '.png" alt ="' + category + selectedNumber + '">';
    }


    const additionValue = async () => {
        let overPriceForSize = 0;
        let overPriceForFirstAdd = 0;
        let overPriceForSecondAdd = 0;
        let overPriceForThirdAdd = 0;
        let sum = 0;
        
        const obj = await fetch('products.json');
        const fullArray = await obj.json();
        const filteredResult = fullArray.filter((element) => element['category'] === category);
        sum = Number(filteredResult[selectedNumber - 1]['price']);
        overPriceForSize = Number(filteredResult[selectedNumber - 1]['sizes'][selectedSize]['add-price']);
        //  console.log(selectedFirstAdditive, selectedSecondAdditive, selectedThirdAdditive);
        overPriceForFirstAdd = (selectedFirstAdditive === 0) ? 0 : Number(filteredResult[selectedNumber - 1]['additives'][0]['add-price']);
        overPriceForSecondAdd = (selectedSecondAdditive === 0) ? 0 : Number(filteredResult[selectedNumber - 1]['additives'][1]['add-price']);
        overPriceForThirdAdd = (selectedThirdAdditive === 0) ? 0 : Number(filteredResult[selectedNumber - 1]['additives'][2]['add-price']);
        let sumRemade = Number.parseFloat(sum + overPriceForFirstAdd + overPriceForSecondAdd + overPriceForThirdAdd + overPriceForSize).toFixed(2);
    buyingCost.innerHTML = '$' + sumRemade;
      };

const closeModal = () => {
    if (event.target === modalBackground || event.target === closeButton) modalBackground.classList.add('no-display');
    enableScroll();
}

const sizeToggle = () => {
    sizeSelectors.forEach(selector => {
    selector.classList.remove('active');
    selector.firstElementChild.classList.remove('active');
    selector.lastElementChild.classList.remove('active');
    });
event.currentTarget.classList.add('active');
event.currentTarget.firstElementChild.classList.add('active');
event.currentTarget.lastElementChild.classList.add('active');
if (event.currentTarget.classList.contains('one')) selectedSize = 's';
if (event.currentTarget.classList.contains('two')) selectedSize = 'm';
if (event.currentTarget.classList.contains('three')) selectedSize = 'l';
additionValue();
}

const firstAdditivesToggle = () => {
    event.currentTarget.classList.toggle('active');
    event.currentTarget.firstElementChild.classList.toggle('active');
    event.currentTarget.lastElementChild.classList.toggle('active');
    if (selectedFirstAdditive === 0 && event.currentTarget.classList.contains('one')) {selectedFirstAdditive = 1} else {selectedFirstAdditive = 0};
    additionValue();
}

const secondAdditivesToggle = () => {
    event.currentTarget.classList.toggle('active');
    event.currentTarget.firstElementChild.classList.toggle('active');
    event.currentTarget.lastElementChild.classList.toggle('active');
    if (selectedSecondAdditive === 0 && event.currentTarget.classList.contains('two')) {selectedSecondAdditive = 1} else {selectedSecondAdditive = 0};
    additionValue();
}

const thirdAdditivesToggle = () => {
    event.currentTarget.classList.toggle('active');
    event.currentTarget.firstElementChild.classList.toggle('active');
    event.currentTarget.lastElementChild.classList.toggle('active');
    if (selectedThirdAdditive === 0 && event.currentTarget.classList.contains('three')) {selectedThirdAdditive = 1} else {selectedThirdAdditive = 0};
    additionValue();
}

modalBackground.addEventListener('click', (closeModal));
closeButton.addEventListener('click', (closeModal));
productCards.forEach(card => card.addEventListener('click', (openModal)));
sizeSelectors.forEach(selector => selector.addEventListener('click', (sizeToggle)));
additivesSelectors[0].addEventListener('click', (firstAdditivesToggle));
additivesSelectors[1].addEventListener('click', (secondAdditivesToggle));
additivesSelectors[2].addEventListener('click', (thirdAdditivesToggle));
