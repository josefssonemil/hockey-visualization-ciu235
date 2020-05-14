let chart;
let currentData;
let allSeasons = [];

const XGF_KEY = "xGF";
const XGA_KEY = "xGA";
const XG_PERCENT_KEY= "xGF%";
const HDCF_PERCENT_KEY = "HDCF%";
const TEAM_KEY = "Team";
const PPG_KEY = "Points";
const TOI_KEY = "TOI";

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


const drawXGChart = originalData => {



    const chartData = organizeData();

    const options = {
        //pointRadius: 200,
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
                    var i = tooltipItem.index;
                    label = currentData[i][TEAM_KEY] + " - Points: " + currentData[i][PPG_KEY];
                 
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
    




    var ctx = document.getElementById("xgChart").getContext("2d");

    chart = new Chart(ctx, {
        type: 'bubble',
        data: chartData,
        options: options,
        plugins: plugins
    });
}


const organizeData = () => {
    let slicedData = [];

    for (var i = 0; i < currentData.length; i++){

        var team = currentData[i][TEAM_KEY];
        var xgf = currentData[i][XGF_KEY];
        var xga = currentData[i][XGF_KEY];
        var xgp = currentData[i][XG_PERCENT_KEY];
        var hdcf = currentData[i][HDCF_PERCENT_KEY];
        var points = currentData[i][PPG_KEY];
        var toi = currentData[i][TOI_KEY];
        var elem = {
            Team: team,
            XGF: xgf,
            XGA: xga,
            XGPercent: xgp,
            HDCFPercent: hdcf,
            Points: points,
            TOI: toi
        }
        
        slicedData.push(elem);
    
    }


    var bubbleData = [];

    for (var i = 0; i < slicedData.length; i++){
        var elem = 
        {
            x: slicedData[i]["XGPercent"]  ,
            y: slicedData[i]["HDCFPercent"]  ,
            r: slicedData[i]["Points"] / 10
        }

        bubbleData.push(elem);
    }



    const chartData = {
        datasets: [{
            label: 'Expected goals (for and against) for NHL teams)',
            data: bubbleData,
            backgroundColor: chartColors.green,
            borderColor: 'black',
            pointRadius: 10,
            pointHitRadius: 10,
            pointHoverRadius: 15,
            pointHoverBackgroundColor: chartColors.orange 
           
        }]
    };

    return chartData;
}

const updateDataSet = () => {




    const chartData = organizeData();

    chart.data = chartData;

    chart.update();
}


const bindCardText = data => {
    var cardOne = document.getElementById("card-1-xg");
    var cardOneSubText = document.getElementById("card-1-xg-subtext");

    var cardTwo = document.getElementById("card-2-xg");
    var cardTwoSubText = document.getElementById("card-2-xg-subtext");

    var cardThree = document.getElementById("card-3-xg");
    var cardThreeSubText = document.getElementById("card-3-xg-subtext");

    var cardFour = document.getElementById("card-4-xg");
    var cardFourSubText = document.getElementById("card-4-xg-subtext");


    let slicedData = [];

    for (var i = 0; i < currentData.length; i++){

        var team = currentData[i][TEAM_KEY];
        var xgf = currentData[i][XGF_KEY];
        var xga = currentData[i][XGF_KEY];
        var xgp = currentData[i][XG_PERCENT_KEY];
        var hdcf = currentData[i][HDCF_PERCENT_KEY];
        var points = currentData[i][PPG_KEY];
        var toi = currentData[i][TOI_KEY];
        var w = currentData[i]["W"];
        var elem = {
            Team: team,
            XGF: xgf,
            XGA: xga,
            XGPercent: xgp,
            HDCFPercent: hdcf,
            Points: points,
            TOI: toi,
            W: w
        }
        
        slicedData.push(elem);
    
    }



    const highestXGTeam = slicedData.reduce((prev, current) => (prev.XGPercent > current.XGPercent) ? prev : current);


    const lowestXGTeam = slicedData.reduce((prev, current) => (prev.XGPercent < current.XGPercent) ? prev : current);

    const highestHDCFTeam = slicedData.reduce((prev, current) => (prev.HDCFPercent > current.HDCFPercent) ? prev : current);
    const lowestHDCFTeam = slicedData.reduce((prev, current) => (prev.HDCFPercent < current.HDCFPercent) ? prev : current);

    

    cardOne.innerHTML = highestHDCFTeam.W;
    cardOneSubText.innerHTML = highestHDCFTeam.Team;

    cardTwo.innerHTML = lowestHDCFTeam.W;
    cardTwoSubText.innerHTML = lowestHDCFTeam.Team;


    cardThree.innerHTML = highestXGTeam.W;
    cardThreeSubText.innerHTML = highestXGTeam.Team;

    cardFour.innerHTML = lowestXGTeam.W;
    cardFourSubText.innerHTML = lowestXGTeam.Team;

}

function toggleSeason(season_id) {
    currentData = allSeasons[season_id];

    updateDataSet();

    bindCardText(currentData);
}


$(document).ready(function(){

    $('#seasonToggleXG .btn').click( function () {
        let season_id = $(this).find('input').val();
        toggleSeason(season_id);
        console.log("toggle xg")
    });
})




export const init = async () => {

    var seasonOneData = await get1819RegData();
    var seasonTwoData = await get1718RegData();
    var seasonThreeData = await get1617RegData();
    var seasonFourData = await get1516RegData();

    allSeasons = [seasonOneData, seasonTwoData, seasonThreeData, seasonFourData];

    currentData = allSeasons[0];


    drawXGChart(currentData);

    bindCardText(currentData);


  };