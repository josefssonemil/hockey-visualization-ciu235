let chart;
let currentData;

const CF_KEY = "CF/60";
const CA_KEY = "CA/60";
const CF_PERCENT_KEY = "CF%";
const TEAM_KEY = "Team";
const TOI_KEY = "TOI";
const PPG_KEY = "Points";

const DOT_COLOR = "rgb(249,131,20)";

const get1819RegData = async () => d3.csv("/./data/nhl/nhl-18-19-reg.csv");
const get1819PlayoffsData = async () => d3.csv("/./data/nhl/nhl-18-19-playoffs.csv");

const get1718RegData = async () => d3.csv("/./data/nhl/nhl-17-18-reg.csv");
const get1718PlayoffsData = async () => d3.csv("/./data/nhl/nhl-17-18-playoffs.csv");

const get1617RegData = async () => d3.csv("/./data/nhl/nhl-16-17-reg.csv");
const get1617PlayoffsData = async () => d3.csv("/./data/nhl/nhl-16-17-playoffs.csv");

const get1516RegData = async () => d3.csv("/./data/nhl/nhl-15-16-reg.csv");
const get1516PlayoffsData = async () => d3.csv("/./data/nhl/nhl-15-16-playoffs.csv");


const get1415RegData = async () => d3.csv("/./data/nhl/nhl-14-15-reg.csv");
const get1314RegData = async () => d3.csv("/./data/nhl/nhl-13-14-reg.csv");



var allSeasons = [];

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
var ctx = document.getElementById("corsiChart").getContext("2d");


/* Strips of unnecessary data points and keeping (Team, CF, CA) before passing it to the draw function*/
const drawCorsiChart = originalData => {







    const chartData = organizeData();


    const options = {


        animation: {
            easing: "easeInOutQuad"
          },
        //pointRadius: 200,
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
                    var i = tooltipItem.index;
                    label = currentData[i][TEAM_KEY] + ": " + "CF60: " + (currentData[i][CF_KEY] / (currentData[i][TOI_KEY] / 60)).toFixed(2) + "\n CA60: " + (currentData[i][CA_KEY] / (currentData[i][TOI_KEY] / 60)).toFixed(2);

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
            text: "Corsi For per 60 (CF60) and Corsi Against per 60 (CA60) for all NHL teams. Bubble size represents wins. Score and Venue adjusted.",
            fontColor: "white"

        },
        scales: {
            yAxes: [{
                    display: true,
                  
                    scaleLabel: {
                        display: true,
                        fontSize: 15,
                        fontColor: 'white',
                        labelString: 'Corsi Against per 60 minutes played'
                      },

                    ticks: {
                        fontColor: chartColors.white,
                        reverse: true
                  
                    }

                },


            ],

            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    fontSize: 15,
                    fontColor: 'white',
                    labelString: 'Corsi For per 60 minutes played'
                  },
                ticks: {
                    fontColor: chartColors.white,
                },
            }],

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
                onClick: function (e) {
                    // `this` is bound to the annotation element
                }
            }]
        }
    }








    chart = new Chart(ctx, {
        type: 'bubble',
        data: chartData,
        options: options,
        plugins: plugins
    });
}



const organizeData = () => {
    let slicedData = [];

    for (var i = 0; i < currentData.length; i++) {

        var team = currentData[i][TEAM_KEY];
        var cf = currentData[i][CF_KEY];
        var ca = currentData[i][CA_KEY];
        var cfp = currentData[i][CF_PERCENT_KEY];
        var points = currentData[i][PPG_KEY];

        var elem = {
            Team: team,
            CF: cf,
            CA: ca,
            CFPercent: cfp,
            Points: points
        }

        slicedData.push(elem);

    }


    var bubbleData = [];

    for (var i = 0; i < slicedData.length; i++){
        var elem = 
        {
            x: slicedData[i][CF_KEY],
            y: slicedData[i][CA_KEY],
            r: slicedData[i]["Points"] / 10
        }

        bubbleData.push(elem);
    }



    const chartData = {
        datasets: [{
            label: 'Team',
            data: bubbleData,
            backgroundColor: chartColors.orange,
            borderColor: 'black',
            pointRadius: 10,
            pointHitRadius: 10,
            pointHoverRadius: 15,
            pointHoverBackgroundColor: chartColors.orange

        }]
    };

    return chartData;
}


const bindCardText = data => {
    var topcf = document.getElementById("top-cf");
    var botcf = document.getElementById("bot-cf");
    var topp = document.getElementById("top-p");
    var botp = document.getElementById("bot-p");

    var slicedData = [];

    for (var i = 0; i < data.length; i++) {
        var elem = {
            Points: data[i][PPG_KEY],
            CFPercent: data[i][CF_PERCENT_KEY].replace("%", '')
        }

        slicedData.push(elem);
    }

    /* Fetch top 10 CF% */

    // sort by value
    var sortedCF = slicedData.sort(function (a, b) {
        return a.CFPercent - b.CFPercent;
    });




    let cf_top = 0;
    let p_top = 0;
    for (var i = sortedCF.length - 1; i > 20; i--) {

        cf_top = cf_top + parseFloat(sortedCF[i]["CFPercent"]);
        p_top = p_top + parseInt(sortedCF[i]["Points"], 10);
    }
    p_top = p_top / 10;
    cf_top = cf_top / 10;
    topcf.innerHTML = cf_top.toFixed(2).toString() + "%";
    topp.innerHTML = p_top.toFixed(1);


    /* Fetch bot 10 CF%*/


    let cf_bot = 0;
    let p_bot = 0;
    for (var i = 0; i < 10; i++) {

        cf_bot = cf_bot + parseFloat(sortedCF[i]["CFPercent"]);
        p_bot = p_bot + parseInt(sortedCF[i]["Points"], 10);
    }

    cf_bot = cf_bot / 10;
    p_bot = p_bot / 10;
    botcf.innerHTML = cf_bot.toFixed(2).toString() + "%";
    botp.innerHTML = p_bot.toFixed(1);
}


const updateDataSet = () => {

    const chartData = organizeData();
    chart.data = chartData;

    chart.update();
}



function toggleSeason(season_id) {
    console.log("toggling season:" + season_id);
    currentData = allSeasons[season_id];

    updateDataSet();

    bindCardText(currentData);
}


$(document).ready(function(){

    $('#seasonToggle .btn').click( function () {
        let season_id = $(this).find('input').val();
        toggleSeason(season_id);
    });
})

export const init = async () => {

    var seasonOneData = await get1819RegData();
    var seasonTwoData = await get1718RegData();
    var seasonThreeData = await get1617RegData();
    var seasonFourData = await get1516RegData();
    var seasonFiveData = await get1415RegData();
    var seasonSixData = await get1314RegData();



    allSeasons = [seasonOneData, seasonTwoData, seasonThreeData, seasonFourData, seasonFiveData, seasonSixData];

    currentData = allSeasons[0];

    /* Default */
    drawCorsiChart(currentData);
    bindCardText(currentData);
   // bindEventListeners();

};