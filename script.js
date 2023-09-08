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


// Photo

// Photo view

const photoViewContainer = document.querySelector('#photo-view-container');
const photoViews = photoViewContainer.querySelectorAll('.photo-view');

// Initialize photo views
photoViews.forEach((photoView, i) => {
  photoView.addEventListener('load', () => {
    photoViews[i ? 0 : 1].classList.remove('active');
    photoView.classList.add('transition');
    photoView.classList.add('active');
  });
});

function setPhotoView(src) {
  photoViewContainer.querySelector(':not(.active)').src = src;
}

function setBrightness(brightness) {
  photoViewContainer.style.setProperty('--brightness', brightness);
}

function setTransitionDuration(transitionDuration) {
  photoViewContainer.style.setProperty('--transition-duration', transitionDuration + 'ms');
}

// Photo attribution
const utm = '?utm_source=Chronometer&utm_medium=referral&utm_campaign=api-credit';
const attributionPhoto = document.querySelector('#attribution-photo');
const attributionUser = document.querySelector('#attribution-user');
const attributionUnsplash = document.querySelector('#attribution-unsplash');
function setAttribution(photo) {
  attributionPhoto.href = photo.link + utm;
  attributionUser.href = photo.userLink + utm;
  attributionUser.textContent = photo.userName;
  attributionUnsplash.href = 'https://unsplash.com/' + utm;
}

// Photo location
const photoLocation = document.querySelector('#photo-location');
const photoLocationPosition = document.querySelector('#photo-location-position');
function setPhotoLocation(locationData) {
  const name = locationData.name;
  photoLocation.textContent = name;
  photoLocation.href = name ? 'https://www.google.com/search?q=' + encodeURIComponent(name) : '';
  const [latitude, longitude] = [locationData.position.latitude, locationData.position.longitude];
  const validPosition = latitude && longitude;
  photoLocationPosition.href = validPosition ? `https://www.google.com/maps/place/${latitude}%2C${longitude}` : '';
  photoLocationPosition.classList.toggle('hidden', !validPosition);
}

function setPhoto(photo) {
  setPhotoView(photo.src + `&w=${screen.width}&h=${screen.height}&fit=crop`);
  setAttribution(photo);
  setPhotoLocation(photo.location);
}

// API parameters
const collection = 1053828;
const url = 'https://chronometer-api.deno.dev/photos/random?';
const params = new URLSearchParams([
  ['collections', collection]
]);

function fetchPhoto() {
  fetch(url + params)
    .then(response => response.json())
    .then(data => {
      return {
        src: data.urls.raw,
        link: data.links.html,
        userLink: data.user.links.html,
        userName: data.user.name,
        location: {
          name: data.location.name,
          position: data.location.position
        }
      };
    })
    .then(photo => setPhoto(photo))
    .catch(error => console.error(error));
}
fetchPhoto();
// Fetch new photo when refresh button clicked
const refreshButton = document.querySelector('#refresh-button');
refreshButton.addEventListener('click', fetchPhoto);
// Fetch new photo when space key pressed
document.addEventListener('keydown', (event) => {
  if (event.key == ' ') fetchPhoto();
});


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
