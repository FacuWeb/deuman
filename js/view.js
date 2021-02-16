var elem = document.querySelector('.esk-flickity-slider');
var flktySlider = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  wrapAround: true,
  autoPlay: 4000,
  prevNextButtons: false,
  imagesLoaded: true,
  pauseAutoPlayOnHover: false,
//  draggable: false,
  resize: true,
  setGallerySize: false,
//  pageDots: false,
});

window.onresize = function(event) {
    flktySlider.resize()
};

