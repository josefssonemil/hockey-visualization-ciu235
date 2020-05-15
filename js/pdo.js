let chart;
let currentData;
let allSeasons = [];
const SH_KEY = "SH%";
const SV_KEY = "SV%";
const TEAM_KEY = "Team";
const PPG_KEY = "Points";
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

    const chartData = organizeData();

    const options = {
        //pointRadius: 200,
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
                    var i = tooltipItem.index;
                    label = currentData[i][TEAM_KEY] + ": " + "PDO: " + currentData[i][PDO_KEY]; 
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
              "Shot percentage and Save percentage for all NHL teams. PDO is calculated by adding both numbers. Bigger bubble equals more wins.",
              fontColor: "white"

          },
        scales:{
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    fontSize: 15,
                    fontColor: 'white',
                    labelString: 'Save Percentage (% of shots saved)'
                  },
                
                ticks: {
                  fontColor: 'white',
                  callback: function(value, index, values) {
                    return value + '%';
                }
              },
              pointLabels: {
                fontColor: 'white' // labels around the edge like 'Running'
              },

            },
            

            ],
            
            xAxes: [
                {
                    display: true,
                    scaleLabel: {
                        display: true,
                        fontSize: 15,
                        fontColor: 'white',
                        labelString: 'Shot Percentage (% of shots scored)'
                      },
                    ticks: {
                      fontColor: 'white',
                      callback: function(value, index, values) {
                        return value + '%';
                    }
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
        var sv = currentData[i][SV_KEY];
        var sh = currentData[i][SH_KEY];
        var pdo = currentData[i][PDO_KEY]
        var points = currentData[i][PPG_KEY];

        var elem = {
            Team: team,
            SV: sv,
            SH: sh,
            PDO: pdo,
            Points: points
        }
        
        slicedData.push(elem);
    
    }



    var bubbleData = [];

    for (var i = 0; i < slicedData.length; i++){
        var elem = 
        {
            x: slicedData[i]["SH"],
            y: slicedData[i]["SV"],
            r: slicedData[i]["Points"] / 10
        }

        bubbleData.push(elem);
    }

    const chartData = {
        datasets: [{
            label: 'Team',
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


    chart.data = organizeData();

    chart.update();
}


function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}




const bindCardText = data => {
    var cardOne = document.getElementById("card-1-pdo");
    var cardOneSubText = document.getElementById("team-name-pdo-highest");

    var cardTwo = document.getElementById("card-2-pdo");
    var cardTwoSubText = document.getElementById("team-name-pdo-lowest");

    var cardThree = document.getElementById("card-3-pdo");
    var cardThreeSubText = document.getElementById("card-3-pdo-subtext");

    var cardFour = document.getElementById("card-4-pdo");
    var cardFourSubText = document.getElementById("card-4-pdo-subtext");



    const highestPDOTeam = data.reduce((prev, current) => (prev.PDO > current.PDO) ? prev : current);

    const lowestPDOTeam = data.reduce((prev, current) => (prev.PDO < current.PDO) ? prev : current);


    cardOne.innerHTML = highestPDOTeam.PDO;
    cardOneSubText.innerHTML = highestPDOTeam.Team;

    cardTwo.innerHTML = lowestPDOTeam.PDO;
    cardTwoSubText.innerHTML = lowestPDOTeam.Team;

    cardThree.innerHTML = highestPDOTeam.W;
    cardThreeSubText.innerHTML = "Wins: " + highestPDOTeam.Team;
    cardFour.innerHTML = lowestPDOTeam.W;
    cardFourSubText.innerHTML = "Wins: " + lowestPDOTeam.Team;
}

function toggleSeason(season_id) {
    currentData = allSeasons[season_id];

    updateDataSet();

    bindCardText(currentData);
}


$(document).ready(function(){

    $('#seasonTogglePDO .btn').click( function () {
        let season_id = $(this).find('input').val();
        toggleSeason(season_id);
    });
})

export const init = async () => {

    var seasonOneData = await get1819RegData();
    var seasonTwoData = await get1718RegData();
    var seasonThreeData = await get1617RegData();
    var seasonFourData = await get1516RegData();

    allSeasons = [seasonOneData, seasonTwoData, seasonThreeData, seasonFourData];

    currentData = allSeasons[0];

    /* Default */
    drawPDOChart(currentData);
    bindCardText(currentData);

};