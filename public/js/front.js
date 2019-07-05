console.log("Client side javascript !");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const result = document.querySelector("#locationInfo");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = searchElement.value;

  result.textContent = "Loading..";

  fetch(`/weather?address='${location}'`).then(response => {
    response.json().then(data => {
      if (data.error) {
        return (result.textContent = data.error);
      }
      result.innerHTML = `Location: ${data.placeName} <br/> Forecast: ${
        data.forecastData
      } <br/> Address typed: ${data.address} `;
    });
  });
});
