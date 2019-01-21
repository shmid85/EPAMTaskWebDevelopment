var productTableId = "productsTable";

function isInteger(num){
    return (num ^ 0) === num;
}

function Product(name, count, price){
    if("string" !== typeof(name))
        throw new TypeError("name isn't string")

    if(!isInteger(count))
        throw new TypeError("count isn't interger")

    if("number" !== typeof(price))
        throw new TypeError("price isn't number")

    this.name = name;
    this.count = count;
    this.price = price;
}

Product.prototype = {
    constructor : Product
}

function createProductList(){
    return [
        new Product("melon", 4, 620),
        new Product("watermelon", 6, 400),
        new Product("ham", 3, 950)
    ]
}

function addBtnClickHendler() {

}

function onLoadHandler() {
    var productList = createProductList();
    addProductElementToTable(productList[0].name, productList[0]["count"], productList[0]["price"] );
    var addBtnElement = document.getElementById("addBtn");
    addBtnElement.addEventListener("click", addBtnClickHendler);
}
window.onload = onLoadHandler;

function addProductElementToTable(name, count, price){
    var table, tableItem, tableItemDiv, tableTextName, tableItemDivCount, tableItemDivCountDiv,
        tableTextItemDivCountDiv, tableItemDivPrice, tableTextItemDivPrice;
    table = document.getElementById(productTableId);
    tableItem = document.createElement("div");
    tableItemDiv = document.createElement("div");
    tableTextName = document.createTextNode(name);
    tableItemDivCount = document.createElement("div");
    tableItemDivCountDiv = document.createElement("div");
    tableTextItemDivCountDiv = document.createTextNode(count);
    tableItemDivPrice = document.createElement("div");
    tableTextItemDivPrice = document.createTextNode(price);

    tableItem.className = "item";
    tableItemDivCount.className = "count";
    tableItemDivPrice.className = "price";

    tableItemDivPrice.appendChild(tableTextItemDivPrice);
    tableItemDivCountDiv.appendChild(tableTextItemDivCountDiv);
    tableItemDivCount.appendChild(tableItemDivCountDiv);
    tableItemDivCountDiv.appendChild(tableTextItemDivCountDiv);
    tableItemDiv.appendChild(tableTextName);
    tableItemDiv.appendChild(tableItemDivCount);
    tableItem.appendChild(tableItemDiv);
    tableItem.appendChild(tableItemDivPrice);
    table.appendChild(tableItem);
}
