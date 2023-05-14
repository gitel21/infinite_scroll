const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photoArray = [];

let isInitialLoad = true;
let initialCount = 5;
const apiKey = 'n7KNM2zYUcH3zCrG2qBKHZ5Dc-XQgDPqa4jNX1mWL9c';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`

const subsequentCount = (count) => {
   apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
}

const imageLoaded = () => {
   imagesLoaded ++;
   console.log(imagesLoaded)
   if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
   }
}

const setAttributes = (element, attributes) => {
   for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
   }
}

const displayPhotos = () => {
   
   imagesLoaded = 0;

   totalImages = photoArray.length;
   console.log('total images', totalImages);

   photoArray.forEach((photo) => {
      const item = document.createElement('a');
   
      setAttributes(item, {
         href: photo.links.html,
         target: '_blank',
      })

      const img = document.createElement('img');
      setAttributes (img, {
         src: photo.urls.regular,
         alt: photo.alt_description,
         title: photo.alt_description
      })

      img.addEventListener('load', imageLoaded);

      item.appendChild(img);
      imageContainer.appendChild(item);
   });
}

const getPhotos = async() => {
   try {
      const response = await fetch(apiUrl);
      photoArray = await response.json();
      displayPhotos();
      if(isInitialLoad) {
         subsequentCount(30);
         isInitialLoad = false;
      }
   } catch (error) {
      console.log(error);
   }
}

window.addEventListener('scroll', () => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      ready = false;
      getPhotos()
   }
})

getPhotos();