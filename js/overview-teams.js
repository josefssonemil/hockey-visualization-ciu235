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

var currentData;

var activeTeam;


const CF_KEY = "CF";
const CA_KEY = "CA";
const CF_PERCENT_KEY = "CF%";
const TEAM_KEY = "Team";
const TOI_KEY = "TOI";
const PPG_KEY = "Points";

const XGF_KEY = "xGF";
const XGA_KEY = "xGA";
const XG_PERCENT_KEY= "xGF%";
const HDCF_PERCENT_KEY = "HDCF%";

const SH_KEY = "SH%";
const SV_KEY = "SV%";
const PDO_KEY = "PDO";

const PP_KEY = "PP%";
const BP_KEY = "BP%";



function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}


const bindCardText = (teamObj) => {

    let teamString = document.getElementById("teamString");

    let cardOne = document.getElementById("card-1-pp");
    let cardOneSubText = document.getElementById("card-1-pp-subtext");

    let cardTwo = document.getElementById("card-2-bp");
    let cardTwoSubText = document.getElementById("card-2-bp-subtext");

    let cardThree = document.getElementById("card-3-plusminus");
    let cardThreeSubText = document.getElementById("card-3-plusminus-subtext");

    let cardFour = document.getElementById("card-4-winrate");
    let cardFourSubText = document.getElementById("card-4-winrate-subtext");

    let cardFive = document.getElementById("card-5-xg");
    let cardFiveSubText = document.getElementById("card-5-xg-subtext");

    let cardSix = document.getElementById("card-6-hdcf");
    let cardSixSubText = document.getElementById("card-6-hdcf-subtext");

    let cardSeven = document.getElementById("card-7-pdo");
    let cardSevenSubText = document.getElementById("card-7-pdo-subtext");

    let cardEight = document.getElementById("card-8-cf");
    let cardEightSubText = document.getElementById("card-8-cf-subtext");

    console.log(teamObj);

    let team = teamObj.Team;
    let wins = teamObj.W;
    let losses = teamObj.GP - teamObj.W;
    let points = teamObj.Points;
    
    //var sortedbyrank = currentData.sort(function(a,b) { return parseFloat(b.Points) - parseFloat(a.Points) } );
    //console.log(sortedbyrank);
    var sortedbypdo = currentData.sort(function(a,b) { return parseFloat(b.Points) - parseFloat(a.Points) } );
    var pdoRank = findWithAttr(currentData, "PDO", teamObj.PDO) + 1;

    var sortedbywins = currentData.sort(function(a,b) { return parseFloat(b.Points) - parseFloat(a.Points) } );
    var winRank = findWithAttr(currentData, "W", teamObj.W) + 1;

    
    var sortedbyCF = currentData.sort(function(a,b) { return parseFloat(b.CF_PERCENT_KEY) - parseFloat(a.CF_PERCENT_KEY) } );
    var cfRank = findWithAttr(currentData, CF_PERCENT_KEY, teamObj.CF_PERCENT_KEY) + 1;

    console.log(sortedbyCF);
    console.log(cfRank);



    var rank = findWithAttr(currentData,"Team", teamObj.Team) + 1;
   
        $("#teamString").html(
            "TEAM " + "<strong>" + team + "</strong>"+
            " WINS " + "<strong>" + wins + "</strong>"+
            " LOSSES " + "<strong>" + losses + "</strong>"+
            " POINTS " + "<strong>" + points + "</strong>" +
            " RANK " + "<strong>" + rank + "</strong>"
            );


    cardOne.innerHTML = teamObj.PP_KEY;


    cardFour.innerHTML = (wins / teamObj["GP"]).toFixed(2) * 100 + "%";

    cardFive.innerHTML = teamObj[XG_PERCENT_KEY] + "%";

    cardSix.innerHTML = teamObj[HDCF_PERCENT_KEY] + "%";

    cardSeven.innerHTML = teamObj[PDO_KEY];

    cardEight.innerHTML = teamObj[CF_PERCENT_KEY] + "%";



 }


 const toggleSeason = (id) => {
     currentData = allSeasons[id];
 }
 
$(document).ready(function(){

    $('#seasonToggleLast .btn').click( function () {
        let season_id = $(this).find('input').val();
        toggleSeason(season_id);
    });





});

/*<h2 class="display" id="teamString">TEAM <strong>NASHVILLE PREDATORS</strong>   <i class="fas fa-angle-double-right"></i> RANK <strong>#1</strong> 
<i class="fas fa-angle-double-right"></i> WINS <strong>256</strong> 
<i class="fas fa-angle-double-right"></i> LOSSES <strong>256</strong> 
<i class="fas fa-angle-double-right"></i> POINTS <strong>+256</strong> 

</h2>*/

export const init = async () => {
    var seasonOneData = await get1819RegData();
    var seasonTwoData = await get1718RegData();
    var seasonThreeData = await get1617RegData();
    var seasonFourData = await get1516RegData();
    var seasonFiveData = await get1415RegData();
    var seasonSixData = await get1314RegData();



    allSeasons = [seasonOneData, seasonTwoData, seasonThreeData, seasonFourData, seasonFiveData, seasonSixData];


    currentData = allSeasons[0];
    currentData.sort(function(a,b) { return parseFloat(b.Points) - parseFloat(a.Points) } );

    activeTeam = currentData[0];
    /* Default */
    bindCardText(activeTeam);

};