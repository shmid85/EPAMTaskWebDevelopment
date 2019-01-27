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

function showProductList(){
     for(var i =0; i < productList.length; i++){
     alert(productList[i].name +" "+ productList[i].count+ " " + productList[i].price + " " + productList[i].id );
     }
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

/*Сортировка массива по имени*/
function sortArrayName(array){
    return array.sort(compareNumericName);
}
/*Сортировка массива по цене*/
function sortArrayPrice(array){
    return array.sort(compareNumericPrice);
}

/*Предикат для сортировки имени*/
function compareNumericName(productA, productB) {
    if (productA.name.toLowerCase() > productB.name.toLowerCase()) return 1;
    if (productA.name.toLowerCase() < productB.name.toLowerCase()) return -1;
}

/*Предикат для сортировки цены*/
function compareNumericPrice(productA, productB) {
    if (productA.price > productB.price) return 1;
    if (productA.price < productB.price) return -1;
}

/*Фильтрация массива (название товара)*/
function filtArray(array, substringName){
    array.filter(function(product){
            if(!product.name.indexOf(substringName) !== -1)
                return true;
            return false;
        }
    )
}
