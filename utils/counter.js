export function QuantitySum(cartIem){

  let quantitySum = 0;
  if(cartIem){

    cartIem.forEach((cart) => {

    const quantity = cart.productQuantity;

    quantitySum += quantity;

  });

  return quantitySum;

  } else{

    return quantitySum;
  }
  

  
}