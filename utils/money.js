export function currentFormat(priceCents){

  const roundPrice = Math.round(priceCents);

  return (roundPrice / 100).toFixed(2);

}


export function itemSumPrice(cartitem){

  let sumPrice = 0;

  cartitem.forEach((cart) => {

    const itemSumPrice = cart.productPrice * cart.productQuantity;

    sumPrice += itemSumPrice
  });

  return sumPrice;
}


export function totalHT(shippingPrice, subTotal){

  const priceHT = shippingPrice + subTotal;

  return priceHT;
}