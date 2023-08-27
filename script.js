// Time
const time = document.querySelector('#time');
function updateTime() {
  time.textContent = (new Date()).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}
updateTime();
setInterval(updateTime, 1000);

// Date
const date = document.querySelector('#date');
function updateDate() {
  const d = new Date();
  const weekday = d.toLocaleDateString([], {weekday: 'short'}).toUpperCase();
  const day = d.toLocaleDateString([], {day: '2-digit'});
  const month = d.toLocaleDateString([], {month: 'short'}).toUpperCase();
  date.textContent = `${weekday} ${day} ${month}`;
}
updateDate();
setInterval(updateDate, 1000);

// Background

// Fade in on load
const opacityMax = 0.8;
const background = document.querySelector('#background');
background.addEventListener('load', () => {
  background.animate([
    {opacity: 0},
    {opacity: opacityMax}
  ], 500);
  background.style.opacity = opacityMax;
});
// Fetch background
const collection = 1053828;
const url = 'https://chronometer-api.deno.dev/photos/random?';
const params = new URLSearchParams([
  ['collections', collection]
]);
fetch(url + params)
  .then(response => response.json())
  .then(data => {
    background.src = data.urls.raw + `&w=${screen.width}&h=${screen.height}&fit=crop`;
  })
  .catch(error => console.error(error));
