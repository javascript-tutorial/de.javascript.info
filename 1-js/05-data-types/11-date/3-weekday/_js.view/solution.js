function getLocalDay(date) {

  let day = date.getDay();

  if (day == 0) { // Wochentag 0 (Sonntag) ist 7 im europäischen Format
    day = 7;
  }

  return day;
}
