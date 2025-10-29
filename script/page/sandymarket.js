import { Cart } from "../../data/carts.js";

import { products } from "../../data/products.js";

import { currentFormat } from "../../utils/money.js";

const cart = new Cart('bd');


// affichage des produits 

function renderProduct(){

    let cartHTML = '';
     products.forEach((product) =>{
      
      const cart = ` <div class="product-container">
        
        <!-- container d'image du produit -->

        <div class="product-image-container">
          <img src="${product.image}" class="product-image">
        </div>

        <!-- container de datails -->

        <div class="details-container">

          <!-- nom de produit -->

          <div class="product-name">${product.name}</div>

          <!-- prix de produit -->

          <div class="product-price">$${currentFormat(product.priceCents)}</div>

          <!-- avis des consommateurs  -->

          <div class="product-rating-container">
            <img src="/images/ratings/rating-${product.rating.stars *10}.png" class="rating-stars">
            <div class="rating-count">${product.rating.count}</div>
          </div>
        </div>

          <!-- selecteur de quantity -->

        <div class="selector-container">
          <select name="product-quantity-selector-${product.id}" class="product-quantity-options js-selector-${product.id}">
          <option value="1" class="quantity-option">1</option>
          <option value="2" class="quantity-option">2</option>
          <option value="3" class="quantity-option">3</option>
          <option value="4" class="quantity-option">4</option>
          <option value="5" class="quantity-option">5</option>
          <option value="6" class="quantity-option">6</option>
          <option value="7" class="quantity-option">7</option>
          <option value="8" class="quantity-option">8</option>
          <option value="9" class="quantity-option">9</option>
          <option value="10" class="quantity-option">10</option>
        </select>
        </div>

        <!-- container d'espacement  -->

        <div class="spacing-container"></div>

        <!-- container d'effet d'ajout de produit au panier -->

        <div class="adding-effet js-adding-effet-${product.id}">
          <div class="add-text">Add</div>
          <img src="/images/icons/checkmark.png" class="add-icon">
        </div>

        <button class="add-btn js-add-btn" data-productid="${product.id}"
        >Add to Cart</button>
      </div>`

      cartHTML += cart;

    });
    
    return cartHTML;
  }




















document.querySelector('.js-sandymarket').innerHTML = renderProduct();


cart.addToCart();

cart.removeFromStorage();