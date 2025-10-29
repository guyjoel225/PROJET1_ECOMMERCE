export function currentFormat(priceCents){

  const roundPrice = Math.round(priceCents);

  return (roundPrice / 100).toFixed(2);

}