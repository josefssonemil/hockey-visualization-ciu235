let chart;
let currentData;

const SH_KEY = "SH%";
const SV_KEY = "SV%";
const TEAM_KEY = "Team";
const PPG_KEY = "Points %";
const PDO_KEY = "PDO";


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
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(231,233,237)'
};

var color = Chart.helpers.color;


/* Strips of unnecessary data points and keeping (Team, CF, CA) before passing it to the draw function*/
const drawPDOChart = originalData => {

    let slicedData = [];

    for (var i = 0; i < originalData.length; i++){

        var team = originalData[i][TEAM_KEY];
        var sv = originalData[i][SV_KEY];
        var sh = originalData[i][SH_KEY];
        var pdo = originalData[i][PDO_KEY]
        var points = originalData[i][PPG_KEY];

        var elem = {
            Team: team,
            SV: sv,
            SH: sh,
            PDO: pdo,
            Points: points
        }
        
        slicedData.push(elem);
    
    }


    var scatterData = [];

    for (var i = 0; i < slicedData.length; i++){
        var elem = 
        {
            x: slicedData[i]["SH"] ,
            y: slicedData[i]["SV"]
        }

        scatterData.push(elem);
    }


    console.log(scatterData);

    const chartData = {
        datasets: [{
            label: 'PDO',
            data: scatterData,
            backgroundColor: DOT_COLOR,
            borderColor: DOT_COLOR,
           
        }]
    }

    const options = {
        //pointRadius: 200,
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
                    var i = tooltipItem.index;
                    label = slicedData[i][TEAM_KEY] + ": " + "PDO: " + slicedData[i][PDO_KEY]; 
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
            text:
              "Hej",
              fontColor: "white"

          },
        scales:{
            yAxes: [{
                display: true,
                labelString: "CA60",
                fontColor: "white",

                ticks: {
                  fontColor: 'white',
              },
              pointLabels: {
                fontColor: 'white' // labels around the edge like 'Running'
              },

            },
            

            ],
            
            xAxes: [
                {
                    display: true,
                    labelString: "CF60",
                    fontColor: "white",
                    ticks: {
                      fontColor: 'white'
                  },
                }
            ],

            gridLines: {
                color: 'rgba(255, 255, 255, 0.2)'
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
    




    var ctx = document.getElementById("PDOChart").getContext("2d");

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

    drawPDOChart(currentData);
   /* const foodData = await getFoodData();
    originalData = foodData;
    drawFoodChart(foodData);*/


  };