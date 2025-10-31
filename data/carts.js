import { currentFormat } from "../utils/money.js";
import { deliveryOption } from "./delivery-option.js";
import { products } from "./products.js";
import { dateTime } from "../../utils/date.js";


export class Cart{

  cartItem = this.loadFromStorage() || [];

  
  #localStorageKey;
  constructor(localStoragekey){

    this.#localStorageKey = localStoragekey;

   
  };

  addToCart(){

    
    const addElementLists = document.querySelectorAll('.js-add-btn');
    
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

        
        this.saveFromStorage();
      });

    });

  
  };


  deleteFromCart(){

    const newCart = [];
    const deleteBtnLists = document.querySelectorAll('.js-delete-btn');

    deleteBtnLists.forEach((deleteBtn) => {

      const cartId = deleteBtn.dataset.cartid;

      this.cartItem.forEach((item) =>{

        if(cartId !== item.productId){

          newCart.push(item)
        }
      })

      this.cartItem = newCart;

    });
    
  }


  displayToCart(){

    let cart
  }
  getPrivateKey(){

    return this.#localStorageKey;
  }

  renderCartProduct(){

    let cartHTML = '';

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
                    <span class="delete">Delete</span>
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
  }

  chooseDeliveryDate(){

    
    const inputElementList = document.querySelectorAll('.js-input-radio');

    inputElementList.forEach((radio) => {

      const daynber = radio.dataset.daynumber;

      const itemId = radio.dataset.cartid;

      radio.addEventListener('click', ()=>{

        document.querySelector(`.js-date-${itemId}`).innerHTML = dateTime(daynber);
      })
    })

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