// to delay navigation between pages
/*
function delay(URL) {
  setTimeout(function () {
    window.location = URL;
  }, 200);
} 
*/
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = document.querySelector("input").value;

  //"http://localhost:3000/weather?location=" -> for local host
  fetch("/weather?location=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        document.querySelector(
          "body > div > form > div.dataShown > table > tbody > tr:nth-child(1) > td"
        ).innerHTML = data.location.country;
        document.querySelector(
          "body > div > form > div.dataShown > table > tbody > tr:nth-child(2) > td"
        ).innerHTML = data.current.temperature + " Celsius";
        document.querySelector(
          "body > div > form > div.dataShown > table > tbody > tr:nth-child(3) > td"
        ).innerHTML = data.current.feelslike + " Celsius";
        document.querySelector(
          "body > div > form > div.dataShown > table > tbody > tr:nth-child(4) > td"
        ).innerHTML = data.current.humidity + " %";
        document.querySelector(
          "body > div > form > div.dataShown > table > tbody > tr:nth-child(5) > td"
        ).innerHTML = data.current.wind_speed + " km/h";
      }
    });
  });
});
