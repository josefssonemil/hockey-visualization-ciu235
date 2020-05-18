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
    

    var sortedbypdo = currentData.sort(function(a,b) { return parseFloat(b["PDO"]) - parseFloat(a["PDO"]) } );
    var pdoRank = findWithAttr(sortedbypdo, "PDO", teamObj["PDO"]) + 1;

    var sortedbywins = currentData.sort(function(a,b) { return parseFloat(b["W"]) - parseFloat(a["W"]) } );
    var winRank = findWithAttr(sortedbywins, "W", teamObj["W"]) + 1;

    
    var sortedbyCF = currentData.sort(function(a,b) { return parseFloat(b[CF_PERCENT_KEY]) - parseFloat(a[CF_PERCENT_KEY]) } );
    var cfRank = findWithAttr(sortedbyCF, CF_PERCENT_KEY, teamObj[CF_PERCENT_KEY]) + 1;

    var sortedbyGF = currentData.sort(function(a,b) { return parseFloat(b["GF/60"]) - parseFloat(a["GF/60"]) } );
    var gfRank = findWithAttr(sortedbyGF, "GF/60", teamObj["GF/60"]) + 1;

    var sortedbyGA = currentData.sort(function(a,b) { return parseFloat(b["GA/60"]) - parseFloat(a["GA/60"]) } );
    var gaRank = findWithAttr(sortedbyGA, "GA/60", teamObj["GA/60"]) + 1;

    var sortedbySF = currentData.sort(function(a,b) { return parseFloat(b["SF/60"]) - parseFloat(a["SF/60"]) } );
    var sfRank = findWithAttr(sortedbySF, "SF/60", teamObj["SF/60"]) + 1;

    var sortedbySF = currentData.sort(function(a,b) { return parseFloat(b["SF/60"]) - parseFloat(a["SF/60"]) } );
    var sfRank = findWithAttr(sortedbySF, "SF/60", teamObj["SF/60"]) + 1;

    var sortedbyXG = currentData.sort(function(a,b) { return parseFloat(b["XG%"]) - parseFloat(a["XG%"]) } );
    var xgRank = findWithAttr(sortedbyXG, "XG%", teamObj["XG%"]) + 1;

    var sortedbyHDCF = currentData.sort(function(a,b) { return parseFloat(b["HDCF%"]) - parseFloat(a["HDCF%"]) } );
    var hdcfRank = findWithAttr(sortedbyHDCF, "HDCF%", teamObj["HDCF%"]) + 1;
   
   
   
    var sortedbyrank = currentData.sort(function(a,b) { return parseFloat(b["Points"]) - parseFloat(a["Points"]) } );
    var rank = findWithAttr(sortedbyrank,"Team", teamObj.Team) + 1;
   
        $("#teamString").html(
            "TEAM " + "<strong>" + team + "</strong>"+
            " | WINS " + "<strong>" + wins + "</strong>"+
            " | LOSSES " + "<strong>" + losses + "</strong>"+
            " | POINTS " + "<strong>" + points + "</strong>" +
            " | RANK " + "<strong>" + rank + "</strong>"
            );


    cardOne.innerHTML = teamObj["GF/60"];
    cardOneSubText.innerHTML = "Stat rank | " + gfRank ;

    cardTwo.innerHTML = teamObj["GA/60"];
    cardTwoSubText.innerHTML = "Stat rank | " + (30 - gaRank)  ;

    cardThree.innerHTML = teamObj["SF/60"];
    cardThreeSubText.innerHTML = "Stat rank | " + sfRank ;

    cardFour.innerHTML = ((wins / teamObj["GP"]) * 100).toFixed(2) + "%";

    cardFive.innerHTML = teamObj[XG_PERCENT_KEY] + "%";
    cardFiveSubText.innerHTML = "Stat rank | " + xgRank;

    cardSix.innerHTML = teamObj[HDCF_PERCENT_KEY] + "%";
    cardSixSubText.innerHTML = "Stat rank | " + hdcfRank;

    cardSeven.innerHTML = teamObj[PDO_KEY];
    cardSevenSubText.innerHTML = "Stat rank | " + pdoRank;

    cardEight.innerHTML = teamObj[CF_PERCENT_KEY] + "%";
    cardEightSubText.innerHTML = "Stat rank | " + cfRank;

 }


 const toggleSeason = (id) => {
     currentData = allSeasons[id];

    let teamName = activeTeam.Team;
    let index = findWithAttr(currentData,"Team", teamName);
   
    console.log(index);

    activeTeam = currentData[index];

   console.log(activeTeam);


   bindCardText(activeTeam);
 }
 
$(document).ready(function(){

    $('#seasonToggleLast .btn').click( function () {
        let season_id = $(this).find('input').val();
        toggleSeason(season_id);
    });




});

const addToDom = () => {
    var listElements = "";

    for (var i = 0; i < currentData.length; i++){
        listElements += '<button class="dropdown-item" type="button" value=' + currentData[i]["Team"].replace(/\s/g, '') + '>' + currentData[i]["Team"] + '</button>';
    }


    $('.dropdown #dropdownMenu').append(listElements);


    $('.dropdown #dropdownMenu button').click( function () {
        let team = $(this).val();
        team = team.replace(/([A-Z])/g, ' $1').trim();
        switchTeam(team);
    });
}

const switchTeam = (newTeam) => {
    let index = findWithAttr(currentData,"Team", newTeam);
    activeTeam = currentData[index];
    bindCardText(activeTeam);

}



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
   
    //currentData.sort(function(a,b) { return parseFloat(b["Team"]) - parseFloat(a["Team"]) } );
    addToDom();

};