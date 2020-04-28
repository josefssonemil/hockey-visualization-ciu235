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

let chart;
let currentData;

const get1819RegData = async () => d3.csv("/./data/nhl/nhl-18-19-reg.csv");
const get1819PlayoffsData = async () => d3.csv("/./data/nhl/nhl-18-19-playoffs.csv");

const get1718RegData = async () => d3.csv("/./data/nhl/nhl-17-18-reg.csv");
const get1718PlayoffsData = async () => d3.csv("/./data/nhl/nhl-17-18-playoffs.csv");

const get1617RegData = async () => d3.csv("/./data/nhl/nhl-16-17-reg.csv");
const get1617PlayoffsData = async () => d3.csv("/./data/nhl/nhl-16-17-playoffs.csv");

const get1516RegData = async () => d3.csv("/./data/nhl/nhl-15-16-reg.csv");
const get1516PlayoffsData = async () => d3.csv("/./data/nhl/nhl-15-16-playoffs.csv");


const drawChart = data => {

    const chartData = {
        
    }
}

const updateData = newData => {

}

const parseData = () => {

}

const init = async () => {

    const dataFile = await get1819RegData();

    console.log(dataFile);
    currentData = dataFile;

    drawChart(data);
   /* const foodData = await getFoodData();
    originalData = foodData;
    drawFoodChart(foodData);*/


  };


  window.onload = init;