// Fetch Background Image
try {
  const response = await fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`);
    if(!response.ok) {
      throw new Error("Couldn't fetch background image")
    }
  const data = await response.json()
  document.body.style.backgroundImage = `url(${data.urls.full})`;
  document.getElementById("author").textContent = `By: ${data.user.first_name} ${data.user.last_name}`
} catch(err) {
  console.error(err)
  document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1447958374760-1ce70cf11ee3?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njc1MDU3NzF8&ixlib=rb-4.1.0&q=85)`
  document.getElementById("author").textContent = `By: Andrew Coelho`
}

// Fetch Crypto Data
fetch(`https://api.coingecko.com/api/v3/coins/dogecoin`)
  .then(response => {
    if(!response.ok) {
      throw Error("Error getting coin data")
    }
    return response.json()
  })
  .then(data => {
    document.getElementById("crypto-coin").innerHTML = `
      <img src=${data.image.small} alt="dogecoin symbol" />
      <span>${data.name}</span>
    `
    
    document.getElementById("crypto-price").innerHTML = `
      <p>💰 ${data.market_data.current_price.usd}</p>
      <p>⬆️ ${data.market_data.high_24h.usd}</p>
      <p>⬇️ ${data.market_data.low_24h.usd}</p>
    `
  })
  .catch(err => {
    console.error(`Error: ${err}`);
    const dogecoinImgSmall = `https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png?1696501409`
    document.getElementById("crypto-coin").innerHTML = `
      <img src=${dogecoinImgSmall} alt="dogecoin symbol" />
      <span>Dogecoin</span>
    `
  })

// Get Current Time
const currentTime = () => {
  document.getElementById("time").textContent = 
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hourCycle: "h12",
      minute: "numeric",
    }).format(new Date());
}

// Get current weather using OpenWeather API
navigator.geolocation.getCurrentPosition(async (position) => {
  try {
    const response = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`);
      if(!response.ok) {
        throw new Error("Error get weather data")
      }
    const data = await response.json();
      document.getElementById("weather").innerHTML = `
      <img src=https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png />
      <p id="weather-temp">${Number(data.main.temp).toFixed(0)}&deg;</p>
      <p id="weather-city">${data.name}</p>
      `
  } catch(err) {
    console.error(err);
  }
})

// Functions
currentTime();
setInterval(currentTime, 1000);