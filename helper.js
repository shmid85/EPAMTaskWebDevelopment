/**
 * Created by SHMID on 26.01.2019.
 */
/*Ищет в массиве arr значение value */
function findInArray(array, value) {
    var i;
    for (i = 0; i < array.length; i++) {
        if (array[i].id == value) return i;
    }
    return -1;
}

function isInteger(num){
    return (num ^ 0) === num;
}

/*Форматирование текста в поле ввода*/
function formatInput(inputString, input){
    if(input === "priceBlur"){
        inputString = inputString.replace(/[^\d.]*/g, '').replace(/([.])[.]+/g, '$1').replace(/^[^\d]*(\d+([.]\d{0,2})?).*$/g, '$1');
        if(inputString !== "")
            inputString = '$'+ inputString.replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1"+',');
    }

    if(input === "price"){
        inputString = inputString.replace(/[^\d.]*/g, '').replace(/([.])[.]+/g, '$1').replace(/^[^\d]*(\d+([.]\d{0,2})?).*$/g, '$1');
        currentAddPriceNotFiltred = +(inputString);
    }

    if(input === "count")
        inputString = inputString.replace(/[^0-9]+$/, '');
    return inputString;
}

/*Сортировка массива по имени вверх*/
function sortArrayNameUp(array){
    return array.sort(compareNumericNameUp);
}
/*Сортировка массива по цене вверх*/
function sortArrayPriceUp(array){
    return array.sort(compareNumericPriceUp);
}

/*Сортировка массива по имени вниз*/
function sortArrayNameDown(array){
    return array.sort(compareNumericNameDown);
}
/*Сортировка массива по цене вниз*/
function sortArrayPriceDown(array){
    return array.sort(compareNumericPriceDown);
}

/*Предикат для сортировки имени вверх*/
function compareNumericNameUp(productA, productB) {
    if (productA.name.toLowerCase() > productB.name.toLowerCase()) return 1;
    if (productA.name.toLowerCase() < productB.name.toLowerCase()) return -1;
}

/*Предикат для сортировки цены вверх*/
function compareNumericPriceUp(productA, productB) {
    if (productA.price > productB.price) return 1;
    if (productA.price < productB.price) return -1;
}

/*Предикат для сортировки имени вверх*/
function compareNumericNameDown(productA, productB) {
    if (productA.name.toLowerCase() > productB.name.toLowerCase()) return -1;
    if (productA.name.toLowerCase() < productB.name.toLowerCase()) return 1;
}

/*Предикат для сортировки цены вверх*/
function compareNumericPriceDown(productA, productB) {
    if (productA.price > productB.price) return -1;
    if (productA.price < productB.price) return 1;
}
/*Фильтрация массива (название товара)*/
function filtArray(array, substringName){
    var pattern = /^[\s]+$/;
    if((substringName === "")||(pattern.test(substringName)))
        return [];
    return array.filter(function(product){
            if(product.name.toLowerCase().indexOf(substringName.toLowerCase()) !== -1)
                return true;

            return false;
        }
    )
}
