let dataAnswer = {};

let bascket = [];

function items() {

	//GET server information
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/product');
    xhr.onload = function() {

        if(xhr.status === 200) {
        	setTimeout(
        		function() {
        			document.querySelector("#preloader").style.display = "none";
        		},2000
        	);

            console.log('GET Items List 200 OK');

            let data = xhr.responseText;
            dataAnswer = JSON.parse(data);
        }

        let categoryArr = []; // Array of all server category

        let itemsInfo = document.querySelector('#items-list');

        let itemsContent = '';

        for (let i = 0; i < dataAnswer.products.length; i++) {

        	//Create Items
            let itemsTemplate = `<div class="col-lg-3 col-md-6 col-sm-12 my-3 filter all ${dataAnswer.products[i].category}">
														<div class="item mx-1 pb-3 shadow position-relative">
															<div>
																<img src="${dataAnswer.products[i].imgurl}" alt="${dataAnswer.products[i].name} Image">
															</div>
															<div class="text-center pt-3">
																<small>PRICE:</small> <span class="text-danger font-weight-bold align-middle">${dataAnswer.products[i].price}<sup><small>€</small></sup></span>
															</div>
															<div class="item-name-container text-center">
																<div class="item-name-content">
																	<h4>${dataAnswer.products[i].name}</h4>
																	<button type="button" data-id="${dataAnswer.products[i].id}" data-name="${dataAnswer.products[i].name}" data-img-url="${dataAnswer.products[i].imgurl}" data-price="${dataAnswer.products[i].price}" data-quantity="1" class="buy btn btn-primary m-1 fa fa-suitcase"  title="Add to the Bag"></button>
																	<button type="button" data-toggle="modal" data-target="#view-${dataAnswer.products[i].id}" class="btn btn-primary m-1 fa fa-eye"  title="Quick View"></button>
																</div>
															</div>
														</div>
													  </div>`;

            //Create modals
			let modalTemplate = `<div class="modal fade" id="view-${dataAnswer.products[i].id}" tabindex="-1" role="dialog" aria-labelledby="modal-${dataAnswer.products[i].id}-Title" aria-hidden="true">
  															<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    															<div class="modal-content">
      																<div class="modal-header">
        																<button type="button" class="close" data-dismiss="modal" aria-label="Close">
          																	<span aria-hidden="true">&times;</span>
        																</button>
      																</div>
      																<div class="modal-body">
      																	<div class="row">
																			<div class="col-lg-4">
																				<img src="${dataAnswer.products[i].imgurl}" alt="${dataAnswer.products[i].name} Image">
																			</div>
																			<div class="col-lg-8 m-auto">
																				<h1>${dataAnswer.products[i].name}</h1>
																				<p>${dataAnswer.products[i].description}</p>
																				<p>Price: <span class="text-danger h5 align-middle font-weight-bold">${dataAnswer.products[i].price}<sup><small>€</small></sup></span></p>
																				<p class="quantity-box">Quantity: <input type="number"  id="${dataAnswer.products[i].id}" min="1" max="10" value="1"> <button type="button" data-id="${dataAnswer.products[i].id}" data-name="${dataAnswer.products[i].name}" data-img-url="${dataAnswer.products[i].imgurl}" data-price="${dataAnswer.products[i].price}" class="buyfew btn btn-primary py-2"><i class="fa fa-suitcase" aria-hidden="true"></i> Buy</button></p>
																			</div>
																		</div>
      																</div>
    															</div>
  															</div>
													   </div>`;

			itemsContent += modalTemplate+itemsTemplate;

			//Push all category to Array
			let productsCategoryAll = dataAnswer.products[i].category;
			categoryArr.push(productsCategoryAll);

        }

        //itemsContent = modalTemplate+itemsTemplate;
        itemsInfo.innerHTML = itemsContent;

        //Create menu category buttons
        let categoryInfo = document.querySelector('#navbarCategory');
        let menuBtns = '';
        let btnCategory = '';
        let btnAll = `<button class="btn btn-link text-uppercase filter-button js-scroll-trigger" data-filter="all">All</button>`;
		for(let i=0; i < categoryArr.unique().length; i++){
			btnCategory += `<button class="btn btn-link text-uppercase filter-button js-scroll-trigger" data-filter="${categoryArr.unique()[i]}">${categoryArr.unique()[i]}</button>`;
			menuBtns = btnAll+btnCategory;
		}
		categoryInfo.innerHTML = menuBtns;

        // CLICK TO ADD TO THE CART
        document.addEventListener('click', function (event) {
            if (event.target.matches('.buy')) {
                let dataId = event.target.dataset.id;
                let dataName = event.target.dataset.name;
                let dataPrice = event.target.dataset.price;
                let dataImgUrl = event.target.dataset.imgUrl;
                let dataQuantity = event.target.dataset.quantity;
                let key = true;

                for (let index = 0; index < bascket.length; index++) {
                  if(bascket[index].productids === dataId){
                    bascket[index].quantity = Number(bascket[index].quantity)+1;
                    bascket[index].price += bascket[index].price;
                    key = false;
                  }
                }
                if(key == true){
                  bascket.push({
                      productids: dataId,
                      name: dataName,
                      price: dataPrice*dataQuantity,
                      imgurl: dataImgUrl,
                      quantity: dataQuantity
                  });
                }

                localStorage.setItem('shoppingBag', JSON.stringify(bascket));
                getBack();
            }
        }, false);

        // CLICK TO ADD TO THE CART MORE THAN 1
        document.addEventListener('click', function (event) {
          if(event.target.matches('.buyfew')){
            let dataId = event.target.dataset.id;
            let dataName = event.target.dataset.name;
            let dataPrice = event.target.dataset.price;
            let dataImgUrl = event.target.dataset.imgUrl;
            let dataQuantity = document.getElementById(dataId).value;
            let key = true;

            for (let index = 0; index < bascket.length; index++) {
              if(bascket[index].productids === dataId){
                bascket[index].quantity = Number(bascket[index].quantity)+Number(dataQuantity);
                bascket[index].price = parseFloat(bascket[index].price)+(parseFloat(dataPrice)*Number(dataQuantity));
                key = false;
              }
            }
            if(key == true){
              bascket.push({
                  productids: dataId,
                  name: dataName,
                  price: dataPrice*dataQuantity,
                  imgurl: dataImgUrl,
                  quantity: dataQuantity
              });
            }


        localStorage.setItem('shoppingBag', JSON.stringify(bascket));
        getBack();


          }
        }, false);


        //DELETE CART ITEMS
        document.addEventListener('click', function (event) {
            if (event.target.matches('.delete')) {
                let dataId = event.target.dataset.id;
                for(let index=0; index < bascket.length; index++){
                    if(bascket[index].productids === dataId){
                        bascket.splice(index,1);
                    }
                }

                localStorage.setItem('shoppingBag', JSON.stringify(bascket));
                getBack();
            }
        }, false);


        //Checkout button
        document.querySelector('#btnCheckout').addEventListener('click', function(){
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:3000/order');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                if(xhr.status === 200) {
                    console.log('POST Checkout 200 OK');
                    alert('Thank you for your purchase!');
                }
            }

            let data = {
                productids: bascket
            };

            xhr.send(JSON.stringify(data));

            localStorage.clear('shoppingBag');
            getBack();
        },false);


    }
    xhr.send();
}
items();

//this prototype delete duplicated category
Array.prototype.unique = function() {
    return Array.from(new Set(this));
}

function getBack() {

    bascket = JSON.parse(localStorage.getItem('shoppingBag'));

    let shoppingBagContent = document.querySelector('#minicart-content');
    let bascketTotal = 0;
	  let bascketQuantity = 0;

    if(bascket === null || bascket == 0){
    	bascket = [];
      bascketQuantity = '-';
      bascketTotal = 0;
    	shoppingBagContent.innerHTML = `<div id="empty-bag" class="empty-bag">
    										                <h4>Shopping Bag is empty</h4>
    									                </div>`;
    }
    if(bascket.length > 0){
    	let newCart = '';
        for(let i=0; i<bascket.length; i++){
        	newCart += `<div class="row m-2 position-relative py-2 border">
							<div class="col-4 m-auto">
								<img src="${bascket[i].imgurl}" alt="${bascket[i].name} Image">
							</div>
							<div class="col-8 text-center m-auto">
								<p>${bascket[i].name}</p>
								<p><small>Quantity:</small> ${bascket[i].quantity}</p>
								<p><small>Price:</small>  <span class="text-danger">${bascket[i].price}<sup><small>€</small></sup></span></p>
							</div>
							<div class="delete-cart-item">
								<button type="button" data-id="${bascket[i].productids}" class="delete btn btn-danger fa fa-trash"></button>
							</div>
					   </div>`;

            bascketQuantity += parseFloat(bascket[i].quantity);
            bascketTotal += parseFloat(bascket[i].price);
        }

        shoppingBagContent.innerHTML = newCart;
    }

    document.querySelector('#bag').textContent = bascketQuantity;
    document.querySelector('#bascketTotal').textContent = bascketTotal;
}
getBack();
