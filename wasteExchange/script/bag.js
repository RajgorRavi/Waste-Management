let bagItemObjects;

function CONVENIENCE_FEES( ){
    if(bagItems.length ==0){
        return 0;
    } else{
        return 99;
    }
}

onLoadBag();

function onLoadBag() {
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}


function loadBagItemObjects() {
        //we know that in bagItems objects are stored  id in the form of array and we want to convert that id into another array which will contain all the details about that item id 
        // so we will use map becz map will convert array of one type into another type

        bagItemObjects =  bagItems.map(itemId => {
            for(let i = 0; i< items.length ; i++) {
                if(itemId == items[i].id){
                    return items[i];
                }
            }
        })

            // console.log(bagItemObjects);
}


 function displayBagItems() {

    // console.log(bagItems);

    let containerElement = document.querySelector('.bag-items-container');
    let innerHTML ='';
    bagItemObjects.forEach(goOnEach => {
        innerHTML += generateItemHTML(goOnEach);
    });

    if(bagItems.length == 0 ){
        containerElement.innerHTML = `<h1> Your Cart Is Empty! </h1>`;
    }else{
        containerElement.innerHTML = innerHTML;
    }
    

}

function removeFromBag(itemId){
    bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
    // after every change update the local storage 
    localStorage.setItem('bagItems', JSON.stringify(bagItems));

    loadBagItemObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
}

function generateItemHTML(item) {
    return `<div class="bag-item-container">
        <div class="item-left-part">
        <img class="bag-item-img" src="../${item.image}">
        </div>
        <div class="item-right-part">
        <div class="company">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
            <span class="current-price">Rs ${item.current_price}</span>
            <span class="original-price">Rs ${item.original_price}</span>
            <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
        </div>
        <div class="return-period">
            <span class="return-period-days">${item.return_period} days</span> return available
        </div>
        <div class="delivery-details">
            Delivery by
            <span class="delivery-details-days">${item.delivery_date}</span>
        </div>
        </div>

        <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>`

}

////////////////////////////////////////////////////////////////////////////////////////////// 

function displayBagSummary() {
    let bagSummaryElement = document.querySelector('.bag-summary');
    let totalItem = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;
  
    bagItemObjects.forEach(bagItem => {
      totalMRP += bagItem.original_price;
      totalDiscount += bagItem.original_price - bagItem.current_price;
    });
  
    let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES();
    
  
    bagSummaryElement.innerHTML = `
      <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">₹${totalMRP}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">${CONVENIENCE_FEES()}</span>
      </div>
      <hr>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">₹${finalPayment}</span>
      </div>
    </div>
    <button class="btn-place-order">
      <div class="css-xjhrni">PLACE ORDER</div>
    </button>
    `;
  }


