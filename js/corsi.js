let chart;
let currentData;

const CF_KEY = "CF";
const CA_KEY = "CA";
const CF_PERCENT_KEY = "CF%";
const TEAM_KEY = "Team";
const TOI_KEY = "TOI";
const PPG_KEY = "Points %";

const DOT_COLOR = "rgb(249,131,20)";

const get1819RegData = async () => d3.csv("/./data/nhl/nhl-18-19-reg.csv");
const get1819PlayoffsData = async () => d3.csv("/./data/nhl/nhl-18-19-playoffs.csv");

const get1718RegData = async () => d3.csv("/./data/nhl/nhl-17-18-reg.csv");
const get1718PlayoffsData = async () => d3.csv("/./data/nhl/nhl-17-18-playoffs.csv");

const get1617RegData = async () => d3.csv("/./data/nhl/nhl-16-17-reg.csv");
const get1617PlayoffsData = async () => d3.csv("/./data/nhl/nhl-16-17-playoffs.csv");

const get1516RegData = async () => d3.csv("/./data/nhl/nhl-15-16-reg.csv");
const get1516PlayoffsData = async () => d3.csv("/./data/nhl/nhl-15-16-playoffs.csv");


var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(86, 197, 151)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)',
    white: 'rgb(255,255,255)'



};

var color = Chart.helpers.color;


/* Strips of unnecessary data points and keeping (Team, CF, CA) before passing it to the draw function*/
const drawCorsiChart = originalData => {

    let slicedData = [];

    for (var i = 0; i < originalData.length; i++){

        var team = originalData[i][TEAM_KEY];
        var cf = originalData[i][CF_KEY];
        var ca = originalData[i][CA_KEY];
        var cfp = originalData[i][CF_PERCENT_KEY];

        var elem = {
            Team: team,
            CF: cf,
            CA: ca,
            CFPercent: cfp
        }
        
        slicedData.push(elem);
    
    }

    console.log(slicedData);

    var scatterData = [];

    for (var i = 0; i < slicedData.length; i++){
        var elem = 
        {
            x: slicedData[i][CF_KEY] * 60 / (originalData[i][TOI_KEY])  ,
            y: slicedData[i][CA_KEY] * 60 / (originalData[i][TOI_KEY])
        }

        scatterData.push(elem);
    }



    console.log(scatterData);

    const chartData = {
        datasets: [{
            label: 'Team',
            data: scatterData,
            backgroundColor: chartColors.green,
            borderColor: 'black',
            pointRadius: 10,
            pointHitRadius: 10,
            pointHoverRadius: 15,
            pointHoverBackgroundColor: chartColors.orange 
           
        }]
    }

    

    const options = {
        //pointRadius: 200,
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
                    var i = tooltipItem.index;
                    label = slicedData[i][TEAM_KEY] + ": " + "CF60: " + (slicedData[i][CF_KEY] / (originalData[i][TOI_KEY] / 60)).toFixed(2) + "\n CA60: " + (slicedData[i][CA_KEY] / (originalData[i][TOI_KEY] / 60)).toFixed(2);
                 
                    return label;
                }
            }
        },
        legend: {
            labels: {
                 fontColor: 'white'
                }
             },
        title: {
            display: true,
            text: "Corsi For per 60 (CF60) and Corsi Against per 60 (CA60) for all NHL teams",
            fontColor: "white"

          },
        scales: {
            yAxes: [{
                display: true,
                labelString: "CA60",
                fontColor: chartColors.white,

                ticks: {
                  fontColor: chartColors.white,
                  reverse: true
              }
            
            },
            

            ],
            
            xAxes: [
                {
                    display: true,
                    labelString: "CF60",
                    fontColor: chartColors.white,
                    ticks: {
                      fontColor: chartColors.white,
                  },
                }
            ],

            gridLines: {
                color: chartColors.white,
                display: true

            }
        }
    }


    const plugins = {
       
            annotation: {
                // Defines when the annotations are drawn.
                // This allows positioning of the annotation relative to the other
                // elements of the graph.
                //
                // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
                // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
                drawTime: 'afterDatasetsDraw', // (default)
    
                // Mouse events to enable on each annotation.
                // Should be an array of one or more browser-supported mouse events
                // See https://developer.mozilla.org/en-US/docs/Web/Events
                events: ['click'],
    
                // Double-click speed in ms used to distinguish single-clicks from
                // double-clicks whenever you need to capture both. When listening for
                // both click and dblclick, click events will be delayed by this
                // amount.
                dblClickSpeed: 350, // ms (default)
    
                // Array of annotation configuration objects
                // See below for detailed descriptions of the annotation options
                annotations: [{
                    drawTime: 'afterDraw', // overrides annotation.drawTime if set
                    id: 'a-line-1', // optional
                    type: 'line',
                    mode: 'horizontal',
                    scaleID: 'y-axis-0',
                    value: '25',
                    borderColor: 'red',
                    borderWidth: 2,
    
                    // Fires when the user clicks this annotation on the chart
                    // (be sure to enable the event in the events array below).
                    onClick: function(e) {
                        // `this` is bound to the annotation element
                    }
                }]
            }
        }
    




    var ctx = document.getElementById("corsiChart").getContext("2d");

    chart = new Chart(ctx, {
        type: 'scatter',
        data: chartData,
        options: options,
        plugins: plugins
    });
}











export const init = async () => {

    const dataFile = await get1819RegData();

    //console.log(dataFile);
    currentData = dataFile;

    drawCorsiChart(currentData);
   /* const foodData = await getFoodData();
    originalData = foodData;
    drawFoodChart(foodData);*/


  };