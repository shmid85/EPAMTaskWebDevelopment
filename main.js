var productTableId = "productsTable";
window.onload = onLoadHandler;

function isInteger(num){
    return (num ^ 0) === num;
}

function Product(name, count, price){
    if("string" !== typeof(name))
        throw new TypeError("name isn't string");

    if(!isInteger(count))
        throw new TypeError("count isn't interger");

    if("number" !== typeof(price))
        throw new TypeError("price isn't number");

    this.name = name;
    this.count = count;
    this.price = price;
}

Product.prototype = {
    constructor : Product
};

function createProductList(){
    return [
        new Product("melon", 4, 620),
        new Product("watermelon", 6, 400),
        new Product("ham", 3, 950)
    ]
}

function addBtnClickHendler() {
    var addData =  addDataToTable();
    addProductElementToTable(addData[0], addData[1], addData[2]);
}

function editBtnClickHendler(){

}

function deleteBtnClickHendler(){

}


function addCountInputHendler(){
    this.value = this.value.replace(/[^0-9]+$/, '');
}

function addPriceInputHendler(){
    this.value = this.value.replace(/[^\d.]*/g, '').replace(/([.])[.]+/g, '$1').replace(/^[^\d]*(\d+([.]\d{0,2})?).*$/g, '$1');
}

function addPriceInputHendlerBlur(){
    this.value = '$'+ this.value.replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1"+',');
}


function addDataToTable() {
    var addData = [3];
    var name = document.getElementById("nameAdd").value;
    var count = document.getElementById("countAdd").value;
    var price = document.getElementById("priceAdd").value;
    addData[0] = checkDataName(name);
    addData[1] = count;
    addData[2] = price;
    return addData;
}

function checkDataName(name){
    var pattern = /^[\s]+$/;
    if((name !== "") && (name.length<16) && (!pattern.test(name))){
        return name;
    }else {
        alert("ФОКУС НА НЕВЕРНОЕ");
    }
}

function checkDataCount(name){
}

function checkDataPrice(name){

};

function onLoadHandler() {
    var productList, addBtnElement, editBtnElement, deleteBtnElement, addCountInput, addPriceInput;
    productList = createProductList();
    addProductElementToTable(productList[0].name, productList[0]["count"], productList[0]["price"] );

    addBtnElement = document.getElementById("addBtn");
    editBtnElement = document.getElementById("edit");
    deleteBtnElement = document.getElementById("delete");
    addCountInput = document.getElementById("countAdd");
    addPriceInput = document.getElementById("priceAdd");

    addBtnElement.addEventListener("click", addBtnClickHendler);
    editBtnElement.addEventListener("click", editBtnClickHendler);
    deleteBtnElement.addEventListener("click", deleteBtnClickHendler);
    addCountInput.addEventListener("keyup", addCountInputHendler);
    addPriceInput.addEventListener("keyup", addPriceInputHendler);
    addPriceInput.addEventListener("blur", addPriceInputHendlerBlur);
}

function addProductElementToTable(name, count, price){
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
    tableItemDivCount.className = "count";
    tableItemDivPrice.className = "price";
    tableItemActionDiv.className = "actiondiv";
    tableItemActionDivButtonEdit.id = "edit";
    tableItemActionDivButtonDelete.id = "delete";

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
}
