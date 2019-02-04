var productTableId = "productsTable", productList, currentAddPriceNotFiltred, currentID=0, currentIdDeletedOnUpdate=-1;
window.onload = onLoadHandler;

/*Конструктор продукта*/
function Product(name, count, price, id){
    if("string" !== typeof(name))
        throw new TypeError("name isn't string");

    if(!isInteger(count))
        throw new TypeError("count isn't interger");

    if("number" !== typeof(price))
        throw new TypeError("price isn't number");
    if(!isInteger(id))
        throw new TypeError("id isn't interger");

    this.name = name;
    this.count = count;
    this.price = price;
    this.id = id;
}

/*Прототип продукта*/
Product.prototype = {
    constructor : Product
};

/*Создание продуктов по умолчанию*/
function createProductList(){
    return [
        new Product("Melon", 4, 620000, currentIDIncrease()),
        new Product("Watermelon", 6, 400000, currentIDIncrease()),
        new Product("Ham", 3, 9500000, currentIDIncrease())
    ]
}

/*Увеличение текущего ID продукта*/
function currentIDIncrease(){
    return ++currentID;
}

function editBtnClickHandler(){
    var id = this.id.replace("edit", ''), pattern = /^[\s]+$/;
    document.getElementById("addBtn").innerHTML="Update";
    addItemToItemAdd(id);
    currentIdDeletedOnUpdate=id;
}

/*Добавление товара в поле add*/
function addItemToItemAdd(id){
    var name, count, price;
    name = document.getElementById("nameAdd");
    count = document.getElementById("countAdd");
    price = document.getElementById("priceAdd");
    name.value = productList[findInArray(productList, id)].name;
    count.value = productList[findInArray(productList, id)].count;
    price.value = productList[findInArray(productList, id)].price;
}

/*Кнопка удалить элемент*/
function deleteBtnClickHandler(){
    var id = (this.id.replace("delete", ''));
    var index = findInArray(productList, id);
    if(confirm("Do you realy want to delete "+ productList[index].name +"?"))
        deleteProductElementFromTableAndArray(id);

    // if(confirm("Do you realy want to delete the item?"))
    //     deleteProductElementFromTableAndArray(this.id.replace("delete", ''));
}

/*Потеря фокуса поля name*/
function addNameInputHandlerBlur(){
    checkDataName(document.getElementById("nameAdd").value);
}

/*Ввод в поле Count*/
function addCountInputHandler(){
    this.value = formatInput(this.value, "count");
}

/*Ввод в поле Price*/
function addPriceInputHandler(){
    this.value = formatInput(this.value,"price");
}

/*Потеря фокуса полем Price*/
function addPriceInputHandlerBlur(){
    this.value = formatInput(this.value, "priceBlur");
}

/*Нажатие кнопки Add*/
function addUpdateBtnClickHandler() {
    var name, count, price;
    name = document.getElementById("nameAdd").value;
    count = +(document.getElementById("countAdd").value);
    price = document.getElementById("priceAdd").value;

    if(this.innerHTML === "Update"){
        updateProductToProductListAndTable(name, count, formatInput(price, "priceBlur"));
    }else{
        addProductToProductListAndTable(name, count, formatInput(price, "priceBlur"));
    }
    addNewBtnClickHandler();
}

/*Кнопка поиска*/
function searchBtnClickHandler(){
    var filtredProductList, subString = document.getElementById("searchInput").value, pattern = /^[\s]+$/, i;
    if((subString !== "")&&(!pattern.test(subString))){
        filtredProductList = filtArray(productList, subString);
        for (i = 0; i < productList.length; i++){
            deleteProductElementFromTable(productList[i].id)
            }
        for (i = 0; i < filtredProductList.length; i++){
            addProductElementToTable(filtredProductList[i].name, filtredProductList[i].count, formatInput(filtredProductList[i].price.toString(), "priceBlur"), filtredProductList[i].id);
        }
    }else{
        for (i = 0; i < productList.length; i++){
            deleteProductElementFromTable(productList[i].id)
        }
        for (i = 0; i < productList.length; i++){
            addProductElementToTable(productList[i].name, productList[i].count, formatInput(productList[i].price.toString(), "priceBlur"), productList[i].id);
        }
    }
}

/*Треугольник сортировки Name*/
function triangleNameClickHandler(){
    var triangleName = document.getElementById("triangleName");
    if(triangleName.className == "triangleDown"){
        triangleName.className="triangleUp";
        sortArrayOfName("up");
    }else{
        triangleName.className="triangleDown";
        sortArrayOfName("down");
    }
}

/*Треугольник сортировки Price*/
function trianglePriceClickHandler(){
    var trianglePrice = document.getElementById("trianglePrice");
    if(trianglePrice.className == "triangleDown"){
        trianglePrice.className="triangleUp";
        sortArrayOfPrice("up");
    }else{
        trianglePrice.className="triangleDown";
        sortArrayOfPrice("down");
    }
}

/*Сортировка по имени*/
function sortArrayOfName(sortDirection){
    var sortedProductList, i;
    if( sortDirection == "down")
        sortedProductList = sortArrayNameDown(productList);
    else
        sortedProductList = sortArrayNameUp(productList);

    for (i = 0; i < productList.length; i++){
        deleteProductElementFromTable(productList[i].id)
    }
    for (i = 0; i < sortedProductList.length; i++){
        addProductElementToTable(sortedProductList[i].name, sortedProductList[i].count, formatInput(sortedProductList[i].price.toString(), "priceBlur"), sortedProductList[i].id);
    }
}
/*Сортировка по цене*/
function sortArrayOfPrice(sortDirection){
    var sortedProductList, i;
    if( sortDirection == "down")
        sortedProductList = sortArrayPriceDown(productList);
    else
        sortedProductList = sortArrayPriceUp(productList);

    for (i = 0; i < productList.length; i++){
        deleteProductElementFromTable(productList[i].id)
    }
    for (i = 0; i < sortedProductList.length; i++){
        addProductElementToTable(sortedProductList[i].name, sortedProductList[i].count, formatInput(sortedProductList[i].price.toString(), "priceBlur"), sortedProductList[i].id);
    }
}

/*Добавление товара в таблицу и массив продуктов*/
function addProductToProductListAndTable(name, count, price){
    if(checkDataName(name)&&(checkDataCount(count))&&(checkDataPrice(currentAddPriceNotFiltred))){
        addDataToProductList(name, count, currentAddPriceNotFiltred);
        addProductElementToTable(name, count, price, currentID);
    }
}

function changeProductInProductList(name, count, price) {
    if(checkDataName(name)&&(checkDataCount(count))&&(checkDataPrice(currentAddPriceNotFiltred))){
        // productTableId[findInArray(productList, currentIdDeletedOnUpdate)].name = name;
        // productTableId[findInArray(productList, currentIdDeletedOnUpdate)].count = count;
        // productTableId[findInArray(productList, currentIdDeletedOnUpdate)].price = price;
        productList[findInArray(productList, currentIdDeletedOnUpdate)].name = name;
        productList[findInArray(productList, currentIdDeletedOnUpdate)].count = count;
        productList[findInArray(productList, currentIdDeletedOnUpdate)].price = price;
    }
}

/*Добавление продукта в массив товаров*/
function addDataToProductList(name, count , price){
    currentIDIncrease();
    productList.push(new Product(name, count, price, currentID));
}

/*Проверка занчения введеного в поле Name*/
function checkDataName(name){
    var pattern = /^[\s]+$/, alert = document.getElementById("alertName"),
        nameAdd = document.getElementById("nameAdd");
    if ((name === "")||(pattern.test(name))){
        alert.innerHTML="The field can't be empty";
        nameAdd.style.border="1px solid red";
        nameAdd.style.color = "red";
        return false;
    }
    if (name.length>15){
        alert.innerHTML="Lenght of the field can't be more than 15 letters";
        nameAdd.style.border="1px solid red";
        nameAdd.style.color = "red";
        return false;
    }
    alert.innerHTML="";
    nameAdd.style.border="1px solid #999";
    nameAdd.style.color = "black";
    return true;
}

/*Проверка значения в поле Count*/
function checkDataCount(count){
    if( count !== "")
        return true;
    return false;
}

/*Проверка значения в поле Price*/
function checkDataPrice(price){
    if(price !== "")
        return true;
    return false;
}

/*Функция очистки полей Add при нажатии кнопки AddNew*/
function addNewBtnClickHandler(){
    document.getElementById("nameAdd").value="";
    document.getElementById("countAdd").value="";
    document.getElementById("priceAdd").value="";
    document.getElementById("addBtn").innerHTML="Add";
}

/*Запуск функции при запуске*/
function onLoadHandler() {
    var i;
    productList = createProductList();

    for(i=0; i< productList.length; i++) {
        addProductElementToTable(productList[i].name, productList[i]["count"], formatInput(productList[i]["price"].toString(), "priceBlur"), productList[i].id);
    }
    AddEventListenersToElements();
}

/*Добавление блока Add*/
function AddEventListenersToElements(){
    var addCountInput, addPriceInput, addNewBtn, addNameInput, addBtnElement ,searchBtn,
        trianglePrice, triangleName;
    searchBtn = document.getElementById("searchBtn");
    triangleName = document.getElementById("triangleName");
    trianglePrice = document.getElementById("trianglePrice");
    addBtnElement = document.getElementById("addBtn");
    addCountInput = document.getElementById("countAdd");
    addPriceInput = document.getElementById("priceAdd");
    addNewBtn = document.getElementById("addnewBtn");
    addNameInput = document.getElementById("nameAdd");
    addNameInput.addEventListener("blur", addNameInputHandlerBlur);
    addCountInput.addEventListener("keyup", addCountInputHandler);
    addCountInput.addEventListener("keyup", addCountInputHandler);
    addPriceInput.addEventListener("keyup", addPriceInputHandler);
    addPriceInput.addEventListener("blur", addPriceInputHandlerBlur);
    addNewBtn.addEventListener("click", addNewBtnClickHandler);
    addBtnElement.addEventListener("click", addUpdateBtnClickHandler);
    searchBtn.addEventListener("click", searchBtnClickHandler);
    triangleName.addEventListener("click", triangleNameClickHandler);
    trianglePrice.addEventListener("click", trianglePriceClickHandler);
}

/*Добавление элемента в таблицу с товаром*/
function addProductElementToTable(name, count, price, productID){
    var table, tableItem, tableItemDiv, tableTextName, tableItemDivCount, tableItemDivCountDiv,
        tableTextItemDivCountDiv, tableItemDivPrice, tableTextItemDivPrice, tableItemActionDivButtonEdit,
        tableItemActionDiv, tableItemActionDivButtonDelete, tableItemActionDivButtonEditText,
        tableItemActionDivButtonDeleteText;
    table = document.getElementById(productTableId);
    tableItem = document.createElement("div");
    tableItemDiv = document.createElement("div");
    tableTextName = document.createTextNode(name);
    tableItemDivCount = document.createElement("div");
    tableItemDivCountDiv = document.createElement("div");
    tableTextItemDivCountDiv = document.createTextNode(count);
    tableItemDivPrice = document.createElement("div");
    tableTextItemDivPrice = document.createTextNode(price);
    tableItemActionDiv = document.createElement("div");
    tableItemActionDivButtonEdit = document.createElement("button");
    tableItemActionDivButtonDelete = document.createElement("button");
    tableItemActionDivButtonEditText = document.createTextNode("Edit");
    tableItemActionDivButtonDeleteText = document.createTextNode("Delete");

    tableItem.className = "item";
    tableItem.id = "item" + productID;
    tableItemDiv.className = "itemName";
    tableItemDivCount.className = "count";
    tableItemDivPrice.className = "price";
    tableItemActionDiv.className = "actiondiv";
    tableItemActionDivButtonEdit.id = "edit" + productID;
    tableItemActionDivButtonDelete.id = "delete"+productID;

    tableItemDivPrice.appendChild(tableTextItemDivPrice);
    tableItemDivCountDiv.appendChild(tableTextItemDivCountDiv);
    tableItemDivCount.appendChild(tableItemDivCountDiv);
    tableItemDivCountDiv.appendChild(tableTextItemDivCountDiv);
    tableItemActionDivButtonEdit.appendChild(tableItemActionDivButtonEditText);
    tableItemActionDivButtonDelete.appendChild(tableItemActionDivButtonDeleteText);

    tableItemActionDiv.appendChild(tableItemActionDivButtonEdit);
    tableItemActionDiv.appendChild(tableItemActionDivButtonDelete);

    tableItemDiv.appendChild(tableTextName);
    tableItemDiv.appendChild(tableItemDivCount);
    tableItem.appendChild(tableItemDiv);
    tableItem.appendChild(tableItemDivPrice);
    tableItem.appendChild(tableItemActionDiv);
    table.appendChild(tableItem);

    tableItemActionDivButtonEdit.addEventListener("click", editBtnClickHandler);
    tableItemActionDivButtonDelete.addEventListener("click", deleteBtnClickHandler);
}

/*Удаление товара с таблицы и массива*/
function deleteProductElementFromTableAndArray(productID){
    deleteProductElementFromTable(productID);
    deleteProductElementFromArray(productID);
}

/*Удаление товара с таблицы*/
function deleteProductElementFromTable(productID){
    var tableItem;
    tableItem = document.getElementById("item" + productID);
    if(tableItem !== undefined && tableItem !== null)
        tableItem.parentNode.removeChild(tableItem);
}

/*Удаление товара из массива*/
function deleteProductElementFromArray(productID){
    productList.splice(findInArray(productList, productID), 1);
}

/*Обновление товара в массиве и таблице*/
function updateProductToProductListAndTable(name, count, price){
    changeProductInProductList(name, count, price);
    deleteProductElementFromTable(currentIdDeletedOnUpdate);
    addProductElementToTable(name, count, price, currentIdDeletedOnUpdate);
}
