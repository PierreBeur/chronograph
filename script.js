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

const brightness = 0.8;
const transitionDuration = 500;
const background = document.querySelector('#background');
background.style.transition = `opacity ${transitionDuration}ms linear`;
background.style.filter = `brightness(${brightness})`;

function load(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', resolve);
    image.addEventListener('error', reject);
    image.src = src;
  });
}

async function setBackground(src) {
  await load(src);
  background.src = src;
  background.classList.add('opaque');
}

// API parameters
const collection = 1053828;
const url = 'https://chronometer-api.deno.dev/photos/random?';
const params = new URLSearchParams([
  ['collections', collection]
]);

// Attribution
const utm = '?utm_source=Chronometer&utm_medium=referral&utm_campaign=api-credit';
const attributionPhoto = document.querySelector('#attribution-photo');
const attributionUser = document.querySelector('#attribution-user');
const attributionUnsplash = document.querySelector('#attribution-unsplash');
const attributionLocation = document.querySelector('#attribution-location');
const attributionLocationPosition = document.querySelector('#attribution-location-position');

function setAttributionLocation(locationData) {
  const name = locationData.name;
  attributionLocation.textContent = name;
  attributionLocation.href = name ? 'https://www.google.com/search?q=' + encodeURIComponent(name) : '';
  const [latitude, longitude] = [locationData.position.latitude, locationData.position.longitude];
  const validPosition = latitude && longitude;
  attributionLocationPosition.href = validPosition ? `https://www.google.com/maps/place/${latitude}%2C${longitude}` : '';
  attributionLocationPosition.classList.toggle('hidden', !validPosition);
}

function fetchBackground() {
  fetch(url + params)
    .then(response => response.json())
    .then(data => {
      setBackground(data.urls.raw + `&w=${screen.width}&h=${screen.height}&fit=crop`);
      attributionPhoto.href = data.links.html + utm;
      attributionUser.href = data.user.links.html + utm;
      attributionUser.textContent = data.user.name;
      attributionUnsplash.href = 'https://unsplash.com/' + utm;
      setAttributionLocation(data.location);
    })
    .catch(error => console.error(error));
}
fetchBackground();

// Menu

const menuWrapper = document.querySelector('#menu-wrapper');
const menuButton = document.querySelector('#menu-button');
function toggleMenu() {
  menuWrapper.classList.toggle('menu-open');
}
// Toggle menu when menu button clicked
menuButton.addEventListener('click', toggleMenu);
// Toggle menu when escape key pressed
document.addEventListener('keydown', (event) => {
  if (event.key == 'Escape') toggleMenu();
});
