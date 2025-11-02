import { dateTime } from "../utils/date.js";
import { currentFormat } from "../utils/money.js";

const optionForDelivery = [{
  id: '1',
  days:'7',
  deliveryPriceCents: 0
},
{
  id: '2',
  days: '3',
  deliveryPriceCents: 499
},
{
  id: '3',
  days: '1',
  deliveryPriceCents: 999
}
]



export function deliveryOption(cartId){

 
  let deliveryDetails = '';
  let delivery = '';
  optionForDelivery.forEach((option) =>{

    const priceString =  option.deliveryPriceCents === 0 ? 'FREE' : `$${currentFormat(option.deliveryPriceCents)}`
    
    if(option.id === "1"){

       delivery = `<div class="delivery-option">
                <input type="radio" checked name="option-${cartId}" data-daynumber="${option.days}"  data-cartid="${cartId}" class="js-input-radio" data-dayid="${option.id}">
                <div class="delivery-detail">
                  <div class="delivery-date">${dateTime(option.days)}</div>
                  <div class="delivery-price">${priceString} - Shipping</div>
                </div>
                
              </div>`

    } else {

       delivery = `<div class="delivery-option">
       <input type="radio" name="option-${cartId}" data-daynumber="${option.days}"  data-cartid="${cartId}" class="js-input-radio" data-dayid="${option.id}">

                <div class="delivery-detail">
                  <div class="delivery-date">${dateTime(option.days)}</div>
                  <div class="delivery-price">${priceString} - Shipping</div>
                </div>
                
              </div>`
    }
    

    deliveryDetails += delivery
  });


  return deliveryDetails;
}

export function deliveryPrice(deliveryId){

  let deliveryMoney = 0;

  optionForDelivery.forEach((optDelivery) =>{

    if(optDelivery.id === deliveryId){

      deliveryMoney =  optDelivery.deliveryPriceCents
     
    }

  });

  return deliveryMoney
}