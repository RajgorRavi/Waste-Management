let bagItems;
onLoadIndex();

// let itemsContainerElement = document.querySelector('.items-conatiner');


function onLoadIndex() {
    
    
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr): [];
    displayItemsOnHomePage();
    
    displayBagIcon();
    
    // bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
    // localStorage.setItem('bagItems',JSON.stringify(bagItems));
   
    

}

function addToBag(itemId){
    bagItems.push(itemId);
     displayBagIcon();
     localStorage.setItem('bagItems',JSON.stringify(bagItems));
}


function displayItemsOnHomePage(){ 
let itemsContainerElement = document.querySelector('.items-conatiner');

    if(!itemsContainerElement){
    return;
}

    let innerHTML = '';

    items.forEach(travelForEach => {
    
        innerHTML+=  `
        <div class="item-container">
        <img src="${travelForEach.image}" class="item-image" alt="">
            <div class="rating">
                ${travelForEach.rating.Material} | ${travelForEach.rating.type}
            </div>
        <div class="company-name">
            ${travelForEach.company}
        </div>
        <div class="item-name">
             ${travelForEach.item_name}</div>
        <div class="price">
            <span class="current-price"> 
            ${travelForEach.current_price}
            </span>
           
            <span class="discount">
                    (per Kg)
            </span>
        </div>
        <button class="btn-add-bag" onclick= "addToBag(${travelForEach.id})">Add to Bag</button>
    </div>`
    
    })
    
    
    itemsContainerElement.innerHTML = innerHTML;
}

function displayBagIcon(){
    let bagItemCountElement = document.querySelector('.bag-item-count');
    if(bagItems.length>0){
        
        bagItemCountElement.innerText = bagItems.length;
        bagItemCountElement.style.visibility = 'visible';
    } else{
        bagItemCountElement.style.visibility = 'hidden';
    }

    
}
       


