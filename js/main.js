import * as corsiChart from "./corsi.js";
import * as pdoChart from "./pdo.js";
import * as xgChart from "./xg-hdcf.js";
import * as overview from "./overview-teams.js";



var pageable = new Pageable("#container", {
  childSelector: "[data-anchor]", // CSS3 selector string for the pages
  anchors: [], // define the page anchors
  pips: true, // display the pips
  animation: 300, // the duration in ms of the scroll animation
  delay: 0, // the delay in ms before the scroll animation starts
  throttle: 50, // the interval in ms that the resize callback is fired
  orientation: "vertical", // or horizontal
  swipeThreshold: 50, // swipe / mouse drag distance (px) before firing the page change event
  freeScroll: false, // allow manual scrolling when dragging instead of automatically moving to next page
  navPrevEl: false, // define an element to use to scroll to the previous page (CSS3 selector string or Element reference)
  navNextEl: false, // define an element to use to scroll to the next page (CSS3 selector string or Element reference)
  infinite: false, // enable infinite scrolling (from 0.4.0)
  events: {
      wheel: true, // enable / disable mousewheel scrolling
      mouse: true, // enable / disable mouse drag scrolling
      touch: true, // enable / disable touch / swipe scrolling
      keydown: true, // enable / disable keyboard navigation
  },
  easing: function(currentTime, startPos, endPos, interval) {
      // the easing function used for the scroll animation
      return -endPos * (currentTime /= interval) * (currentTime - 2) + startPos;
  },
  onInit: function() {
      // do something when the instance is ready
  },
  onUpdate: function() {
      // do something when the instance updates
  },    
  onBeforeStart: function() {
      // do something before scrolling begins
  },
  onStart: function() {
      // do something when scrolling begins
  },
  onScroll: function() {
      // do something during scroll
  },
  onFinish: function() {
      // do something when scrolling ends
  },
});



//import * as diabetesGeneralChart from "./diabetesGeneral.js";

const init = async () => {
  corsiChart.init();
  pdoChart.init();
  xgChart.init();
  overview.init();
  

};


window.onload = init;


