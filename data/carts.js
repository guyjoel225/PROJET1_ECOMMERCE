import { currentFormat, itemSumPrice, totalHT } from "../utils/money.js";
import { deliveryOption, deliveryPrice } from "./delivery-option.js";
import { products } from "./products.js";
import { dateTime } from "../../utils/date.js";
import { QuantitySum } from "../utils/counter.js";


export class Cart{

  cartItem = this.loadFromStorage() || [];
  subTotal = 0;
  deliveryPriceValue = 0;
  subtotalHt = 0;
  counterQuantity = document.querySelector('.js-counter');
  orderItemquantiy = document.querySelector('.js-quantity');
  orderItemTotal = document.querySelector('.js-item-total');
  #localStorageKey;
  constructor(localStoragekey){

    this.#localStorageKey = localStoragekey;

   
  };

  addToCart(){

    
    const addElementLists = document.querySelectorAll('.js-add-btn');

    this.counterQuantity.innerHTML = QuantitySum(this.cartItem);
    
    addElementLists.forEach((addBtn) =>{

      const productId = addBtn.dataset.productid;

      addBtn.addEventListener('click', () =>{

        const matchingItem = products.find(item => item.id === productId);

        const quantity = document.querySelector(`.js-selector-${productId}`).value;

        const addEffet = document.querySelector(`.js-adding-effet-${productId}`);
        addEffet.classList.add('show-effet');
        setTimeout(() =>{

        addEffet.classList.remove('show-effet');
        }, 2000);

        if(matchingItem){

          const addingCart = {
            productId: matchingItem.id,
            productName: matchingItem.name,
            productImage: matchingItem.image,
            productPrice: matchingItem.priceCents,
            productQuantity: Number(quantity)
          }
          
         
          const exisCart = this.cartItem.find(cart => cart.productId === productId);

          if(exisCart){

            exisCart.productQuantity += Number(quantity);

          } else{

            this.cartItem.push(addingCart)
          }

          
          

          
        }

         this.counterQuantity.innerHTML = QuantitySum(this.cartItem);
        this.saveFromStorage();
      });

    });

  
  };




  getPrivateKey(){

    return this.#localStorageKey;
  }

  renderCartProduct(){

    this.loadFromStorage();
    let cartHTML = '';

    this.orderItemquantiy.innerHTML = QuantitySum(this.cartItem);
    this.orderItemTotal.innerHTML = QuantitySum(this.cartItem);
    this.cartItem.forEach((cart) =>{

      const itemToCat = `<div class="product-container">
            <div class="date-for-delivery">Your Delivery date: <span class="date js-date-${cart.productId}">Oct, Thus 30</span></div>

            <div class="product-grid">
              <div class="prodcut-detail-grid">

              <img src="${cart.productImage}" class="product-image">
              <div class="product-detail">
                <div class="detail">
                  <div class="productname">${cart.productName}</div>
                  <div class="product-price">$${currentFormat(cart.productPrice)}</div>
                  <div class="product-quantity">Quantity: <span class="quantity-value">${cart.productQuantity}</span></div>
                  <div class="update-quantity">
                    <span class="update">Update</span>
                    <span class="delete js-delete-item" data-itemid="${cart.productId}">Delete</span>
                  </div>
                </div>
              </div>
            </div>

            
            <div class="delivery-options">
              <div class="delivery-title">Choose your delivery option:</div>
              ${deliveryOption(cart.productId)}
            </div>
            </div>

          </div>`
      cartHTML += itemToCat;
    })

    document.querySelector('.js-cart-content').innerHTML = cartHTML
    document.querySelector('.js-shipping').innerHTML = `$${currentFormat(deliveryPrice("1"))}`;
    this.subTotalCalculate();
    this.totalTtc();
  }

  chooseDeliveryDate(){

    
    const inputElementList = document.querySelectorAll('.js-input-radio');

    inputElementList.forEach((radio) => {

      const daynber = radio.dataset.daynumber;

      const itemId = radio.dataset.cartid;
      const deliveryId = radio.dataset.dayid;

      document.querySelector(`.js-date-${itemId}`).innerHTML = dateTime(7);
      document.querySelector('.js-shipping').innerHTML = `$${currentFormat(deliveryPrice("1"))}`;
      this.deliveryPriceValue = deliveryPrice("1");
      this.subTotalCalculate();
      this.totalTtc();
      radio.addEventListener('click', ()=>{

        document.querySelector(`.js-date-${itemId}`).innerHTML = dateTime(daynber);

        document.querySelector('.js-shipping').innerHTML = `$${currentFormat(deliveryPrice(deliveryId))}`;
        this.deliveryPriceValue = deliveryPrice(deliveryId);
        this.subTotalCalculate();
        this.totalTtc();
      })
    })

  }

  deleteFromCart(){
    
    const deleteElement = document.querySelectorAll('.js-delete-item');
    deleteElement.forEach((deleted) =>{
      
      const itemId = deleted.dataset.itemid

      deleted.addEventListener('click', () => {

          this.renderAfterDeleted(itemId)
          this.chooseDeliveryDate();
        });

    })
  }

  renderAfterDeleted(itemId){

    


      const newCartItem = [];

      this.cartItem.forEach((article) =>{

        if(article.productId !== itemId){

          newCartItem.push(article);

        }

        this.cartItem = newCartItem;

        
        this.counterSum();
        this.renderCartProduct();
        

        this.saveFromStorage();

      });
      
      this.deleteFromCart();
  }

  subTotalCalculate(){
    this.subtotalHt = totalHT(this.deliveryPriceValue, itemSumPrice(this.cartItem));
    const subtatlPriceHt =totalHT(this.deliveryPriceValue, itemSumPrice(this.cartItem));
    document.querySelector(".js-priceht").innerHTML = `$${currentFormat(subtatlPriceHt)}`;
   
  }

  totalTtc(){

    const tax =  10;

    const taxPiceValue = this.subtotalHt * 0.1;

    const totalTTC = this.subtotalHt + taxPiceValue;

    
    document.querySelector('.js-tax-value').innerHTML = `$${currentFormat(taxPiceValue)}`;
    document.querySelector('.js-total-ttc').innerHTML = `$${currentFormat(totalTTC)}`;
  }

  counterSum(){

    document.querySelector('.js-item-money').innerHTML = `$${currentFormat(itemSumPrice(this.cartItem))}`;
    
  }
  saveFromStorage(){

    const stringFyData = JSON.stringify(this.cartItem);

    localStorage.setItem(this.getPrivateKey, stringFyData);
  }


  loadFromStorage(){

    const stringFyData = localStorage.getItem(this.getPrivateKey);

    const objetData = JSON.parse(stringFyData);

    return objetData;
  }

  removeFromStorage(){

    localStorage.removeItem(this.getPrivateKey);
  };

}