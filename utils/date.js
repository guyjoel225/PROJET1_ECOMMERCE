export function dateTime(dayNumber){

  const days = dayjs();

  const dateTime = days.add(dayNumber, 'days');

  const dateString = dateTime.format('dddd, MMMM D');

  return dateString;

}