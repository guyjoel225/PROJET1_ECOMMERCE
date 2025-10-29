import { products } from "./products.js";
import{ currentFormat } from "../utils/money.js";
export class Cart{

  cartItem = this.loadFromStorage() || [];

  
  #localStorageKey;
  constructor(localStoragekey){

    this.#localStorageKey = localStoragekey;

   
  };

  addToCart(){

    console.log(this.cartItem);
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

        console.log(this.cartItem);
        this.saveFromStorage();
      });

    });

  
  };

  getPrivateKey(){

    return this.#localStorageKey;
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
  }
}