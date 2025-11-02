import { Cart } from "../../data/carts.js";


const card = new Cart('bd');


card.renderCartProduct();


card.chooseDeliveryDate();

card.deleteFromCart();

card.counterSum();