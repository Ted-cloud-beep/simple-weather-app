// function log() {
//   console.log("aha");
//   setTimeout(() => {
//     console.log("I am out.1s");
//   }, 1000);
//   setTimeout(() => {
//     console.log("I am out.2s");
//   }, 2000);
//   console.log("got it");
// }
// log();

// const getIds = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve([21, 22, 23, 24]);
//   }, 1500);
// });

// const getReceipe = (recId) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(
//       (Id) => {
//         const receipe = { title: "Fresh tomato", publisher: "Htet" };
//         resolve(`${Id}:${receipe.title}`);
//       },
//       1500,
//       recId
//     );
//   });
// };
// const getRelate = (publisher) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(
//       (name) => {
//         const receipe = { title: "Italian Pizza", publisher: "Htet" };
//         resolve(`${name}:${receipe.title}`);
//       },
//       1500,
//       publisher
//     );
//   });
// };
// getIds
//   .then((Ids) => {
//     console.log(Ids);
//     return getReceipe(Ids[2]);
//   })
//   .then((receipe) => {
//     console.log(receipe);
//     return getRelate("Htet");
//   })
//   .then((pub) => {
//     console.log(pub);
//   })
//   .catch((error) => {
//     console.log("error!!!");
//   });

// async function getReceipeAW() {
//   const getID = await getIds;
//   console.log(getID);
//   const receipe = await getReceipe(getID[2]);
//   console.log(receipe);
//   const pub = await getRelate("Htet");
//   console.log(pub);
//   return receipe;
// }
// getReceipeAW().then((rec) => console.log(`This ${rec} is the best.`));
// const svg = document.getElementById("svg");
// function getWeather(num) {
//   fetch(`https://www.metaweather.com/api/location/${num}/`)
//     .then((data) => {
//       const result = data.json();
//       return result;
//     })
//     .then((res) => {
//       const today = res.consolidated_weather[0];
//       console.log(today);
//       console.log(
//         `The temperature in ${res.title} stays between ${
//           today.min_temp
//         } and ${today.max_temp.toFixed(2)}.`
//       );
//     })
//     .catch((error) => {
//       console.log("error!!");
//     });
// }
// getWeather(2487956);
// getWeather(44418);
// async function getWeatherAW(num) {
//   try {
//     const data = await fetch(
//       `https://www.metaweather.com/api/location/${num}/`
//     );

//     const res = await data.json();
//     const today = res.consolidated_weather[0];
//     const abbr = today.weather_state_abbr;
//     svg.src = `https://www.metaweather.com/static/img/weather/${abbr}.svg`;
//     // const svg = await fetch(
//     //   `https://www.metaweather.com/api/static/img/weather/${today.weather_state_abbr}`
//     // );

//     console.log(
//       `The temperatur in ${res.title} stays between ${
//         today.min_temp
//       } and ${today.max_temp.toFixed(2)}`
//     );
//     return res;
//   } catch (error) {
//     alert(error);
//   }
// }
// let result;
// getWeatherAW(2487956).then((data) => {
//   result = data;
//   console.log(result);
// });
const btn = document.querySelector("button");
const date = document.querySelector("h1");
const pri = document.querySelector(".list");
const deg = document.createElement("li");
const loadingImage = document.querySelector("#loadingImage");
//const degree = document.querySelector(".list h2");
function setName() {
  clear();

  const input = document.querySelector("#ID").value;
  console.log(input);

  if (isNaN(input)) {
    console.log(input.trim());
    title(input.trim());
  } else {
    alert("invalid input");
    return;
  }
}
async function title(name) {
  try {
    loadingImage.style.display = "inline-block";
    const data = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${name}`
    );
    const result = await data.json();
    const id = result[0].woeid;
    console.log(id);

    const reqData = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`
    );
    const res = await reqData.json();
    loadingImage.style.display = "none";
    const today = res.consolidated_weather[0];
    const todayDate = today.applicable_date;

    deg.innerHTML = `<h2>Weather State: ${today.weather_state_name}</h2>
    <h2>Average tempearture: ${today.the_temp.toFixed(2)}&#8451;</h2>`;
    pri.append(deg);

    console.log(todayDate);

    date.textContent = `Date:${todayDate}`;
    const abbr = today.weather_state_abbr;
    svg.src = `https://www.metaweather.com/static/img/weather/${abbr}.svg`;
    console.log(
      `The temperatur in ${res.title} stays between ${
        today.min_temp
      } and ${today.max_temp.toFixed(2)}`
    );
  } catch (error) {
    alert("Sorry, can't find this city.");
  }
}
const clear = () => {
  date.textContent = "";
  svg.src = "";
  deg.remove();
};
btn.addEventListener("click", setName);
//title("London");
//getWeatherAW(44418);
// .then(
//   (data) => {
//     console.log(data);
//   }
// );
