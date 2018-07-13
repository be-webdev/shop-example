//ADD USER
let btnAddItem = document.querySelector('#addItem');
let btnAddCategory = document.querySelector('#addCategory');

btnAddItem.onclick = function(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/product');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if(xhr.status === 200) {
            console.log('POST User Info 200 OK');
        }
    }

    let addNameBox = document.querySelector('#itemName');
    let addDescriptionBox = document.querySelector('#itemDescription');
    let addPriceBox = document.querySelector('#itemPrice');
    let addImgUrlBox = document.querySelector('#itemImgUrl');
    let location = '..//images/'
    let addCategoryBox = document.querySelector('#itemCategory');

    let addName = addNameBox.value;
    let addDescription = addDescriptionBox.value;
    let addPrice = addPriceBox.value;
    let addImgUrl = addImgUrlBox.value;
    let addCategory = addCategoryBox.value;

    let products = {
        name: addName,
        description: addDescription,
        price: addPrice,
        imgurl: location+addImgUrl,
        category: addCategory
    };

    addNameBox.value = '';
    addDescriptionBox.value = '';
    addPriceBox.value = '';
    addImgUrlBox.value = '';
    xhr.send(JSON.stringify(products));
}

btnAddCategory.onclick = function(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/category');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if(xhr.status === 200) {
            console.log('POST User Info 200 OK');
        }
    }

    let addNameCategory = document.querySelector('#addCategoryName');

    let addCategory = addNameCategory.value;


    let categoriesids = {
        name: addCategory
    };

    addNameCategory.value = '';

    xhr.send(JSON.stringify(categoriesids));
}
