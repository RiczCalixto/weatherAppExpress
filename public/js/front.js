console.log("Client side javascript !");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = searchElement.value;
  fetch(`http://localhost:3000/weather?address='${location}'`).then(
    response => {
      response.json().then(data => {
        if (data.error) {
          return console.log("Address not found");
        }
        console.log(data.placeName);
        console.log(data.forecastData);
        console.log(data.address);
      });
    }
  );
});
