
/////// Function Section ///////

function imageExists(image_url){
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    if (http.status != 404){
        return image_url;
    }
    else{
        return "./SoundingNotFound.jpg";
    }
}

// Function goToMesoanalysis() -- redirects to the sounding website
function goToMesoanalysis() {
  location.replace("Mesoanalysis2.html")
}


// Function getSounding(source) -- adds the sounding to the right of the map from the source URL (source)
function getSounding(source) {
  document.getElementById('sounding').src=source;
}


/////// Map Section ///////
// You will need to change the lat/lon coordinates to match your CWA/location.

var MapLat = 35.925;
var MapLon = -97.032;
var Zoom = 4;

var mymap = L.map('mapid').setView([MapLat, MapLon], Zoom);


// These control the height and width of the image and pop up box.
// "Height" will control the height of both the image and the pop up box.
// Make sure that "Width" and "popUpWidth" match to make it look nice.
var Height      = "800";
var Width       = "950";
var popUpWidth  = "950";

//'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
//'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

///////////////////////////

//// DATE TIME SECTION ////
// NOTE: still need to fix changing between months/years
var today = new Date();
var year = String(today.getUTCFullYear());
var month = (today.getUTCMonth()+1);
var day = today.getUTCDate();
var hour = today.getUTCHours();


if ((hour <= 13) && (hour >= 1)){
    hour = "00";
}
else if (hour == 0){
    hour = "12";
	day = day - 1;
}
else{ hour = "12"; }

if (day < 10){
    day = "0"+String(day);
    }
else{ day = String(day);}

if (month < 10){
    month = "0"+String(month);
    }
else{ month = String(month);}

var date = year+month+day+hour
var date = date.substring(2, date.length);

//// LOGO SECTION /////////
// Adding NWS/NOAA logo overlay onto map
NWSsrc    = "\\S:\\SnowPlumes\\StaticImages\\NWS_logo_noback.png";
NOAAsrc   = "\\S:\\SnowPlumes\\StaticImages\\NOAA_logo.png";


// Add the Logos

var Logos = L.control({position: 'topright'});

//Logos.onAdd = function (map) {

//    var div = L.DomUtil.create('div', 'info legend'),
//        grades = ["", ""],
//        labels = [NWSsrc,NOAAsrc];
//
    // loop through our density intervals and generate a label with a colored square for each interval
//    for (var i = 0; i < grades.length; i++) {
//        div.innerHTML +=
//            grades[i] + (" <img src="+ labels[i] +" height='70' width='70'>") +'<br>';
//    }

//   return div;
//};

//Logos.addTo(mymap);
///////////////////////////



//// IMAGE SOURCES SECION ////

// Snow Plume Image Sources - make sure these URLs point to the
// right location for your server configuration!

// Florida
var KEYsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/KEY.gif");
var MFLsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/MFL.gif");
var TBWsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/TBW.gif");
var XMRsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/MXR.gif");
var JAXsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/JAX.gif");
var TLHsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/TLH.gif");

// Louisianna
var LCHsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/LCH.gif");
var LIXsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/LIX.gif");
var SHVsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/SHV.gif");

// Texas
var BROsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/BRO.gif");
var CRPsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/CRP.gif");
var DRTsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/DRT.gif");
var EPZsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/EPZ.gif");
var FWDsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/FWD.gif");
var AMAsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/AMA.gif");
var MAFsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/MAF.gif");

// Mississippi
var JANsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/JAN.gif");

// Alabama
var BMXsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/BMX.gif");

// Georgia
var FFCsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/FFC.gif");

// South Carolina
var CHSsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/CHS.gif");

// North Carolina
var MHXsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/MHX.gif");
var GSOsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/GSO.gif");

// Tennessee
var BNAsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/BNA.gif");

// Virginia
var RNKsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/RNK.gif");

// Maryland
var IADsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/IAD.gif");
var WALsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/WAL.gif");

// Generic Northeast States
var OKXsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/OKX.gif");
var CHHsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/CHH.gif");
var GYXsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/GYX.gif");
var YQIsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/YQI.gif");
var CARsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/CAR.gif");
var ALBsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/ALB.gif");
var BUFsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/BUF.gif");
var WMWsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/WMW.gif");
var PITsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/PIT.gif");

// Michigan
var DTXsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/DTX.gif");
var APXsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/APX.gif");

// Ohio
var ILNsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/ILN.gif");

// Missouri
var SFGsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/SGF.gif");

// Arkansas
var LZKsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/LZK.gif");

// Illinois/Iowa
var DVNsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/DVN.gif");
var ILXsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/ILX.gif");

// Wisonsin
var GRBsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/GRB.gif");

// Minnesota
var INLsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/INL.gif");
var MPXsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/MPX.gif");

// North Dakota
var BISsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/BIS.gif");

// South Dakota
var ABRsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/ABR.gif");
var UNRsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/UNR.gif");

// Nebraska
var OAXsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/OAX.gif");
var LBFsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/LBF.gif");

// Kansas
var TOPsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/TOP.gif");
var DDCsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/DDC.gif");

// Oklahoma
var OUNsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/last.gif");
var LMNsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/LMN.gif");

// Montana
var GGWsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/GGW.gif");
var TFXsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/TFX.gif");

// Wyoming
var RIWsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/RIW.gif");

// Colorado
var DNRsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/DNR.gif");
var GJTsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/GJT.gif");

// New Mexico
var ABQsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/ABQ.gif");

// Arizona
var TUSsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/TUS.gif");
var FGZsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/FGZ.gif");

// Utah
var SLCsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/SLC.gif");

// Idaho
var BOIsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/BOI.gif");

// Nevada
var LKNsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/LKN.gif");
var REVsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/REV.gif");
var VEFsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/VEF.gif");

// California
var NKXsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/NKX.gif");
var VBGsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/VBG.gif");
var OAKsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/OAK.gif");

// Oregon
var MFRsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/MFR.gif");
var SLEsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/SLE.gif");

// Washington
var UILsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/UIL.gif");
var OTXsrc = imageExists("https://www.spc.noaa.gov/exper/soundings/"+date+"_OBS/OTX.gif");

///////////////////////////



//// MARKER SECTION //////

// Markers and pop up windows.

// Florida
var KEY = L.marker([24.553, -81.788], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=KEYsrc)}).addTo(mymap);

var MFL = L.marker([25.753, -80.383], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=MFLsrc)}).addTo(mymap);;

var TBW = L.marker([27.705, -82.401], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=TBWsrc)}).addTo(mymap);

var XMR = L.marker([28.483, -80.566], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=XMRsrc)}).addTo(mymap);

var TLH = L.marker([30.430, -84.278], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=TLHsrc)}).addTo(mymap);

var JAX = L.marker([30.346, -81.668], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=JAXsrc)}).addTo(mymap);

// South Carolina
var CHS = L.marker([32.816, -79.974], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=CHSsrc)}).addTo(mymap);

// North Carolina
var MHX = L.marker([34.219, -77.872], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=MHXsrc)}).addTo(mymap);

var GSO = L.marker([36.083, -79.792], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=GSOsrc)}).addTo(mymap);

// Virginia
var RNK = L.marker([37.264, -79.942], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=RNKsrc)}).addTo(mymap);

var IAD = L.marker([38.851, -77.036], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=IADsrc)}).addTo(mymap);

var WAL = L.marker([38.348, -75.594], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=WALsrc)}).addTo(mymap);

// Generic Northeast States
var OKX = L.marker([40.863, -72.863], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=OKXsrc)}).addTo(mymap);

var CHH = L.marker([41.956, -71.139], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=CHHsrc)}).addTo(mymap);

var ALB = L.marker([42.647, -73.763], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=ALBsrc)}).addTo(mymap);

var GYX = L.marker([43.882, -70.331], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=GYXsrc)}).addTo(mymap);

var YQI = L.marker([43.829, -66.112], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=YQIsrc)}).addTo(mymap);

var CAR = L.marker([46.873, -68.020], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=CARsrc)}).addTo(mymap);

var BUF = L.marker([42.876, -78.871], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=BUFsrc)}).addTo(mymap);

var PIT = L.marker([40.426, -79.992], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=PITsrc)}).addTo(mymap);

// Ohio
var ILN = L.marker([39.436, -83.827], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=ILNsrc)}).addTo(mymap);

// Michigan
var DTX = L.marker([42.343, -83.448], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=DTXsrc)}).addTo(mymap);

// Wisconsin
var GRB = L.marker([44.496, -88.031], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=GRBsrc)}).addTo(mymap);

// Illinois/Iowa
var DVN = L.marker([41.515, -90.548], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=DVNsrc)}).addTo(mymap);

var ILX = L.marker([40.139, -89.375], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=ILXsrc)}).addTo(mymap);

// Tennesse
var BNA = L.marker([36.046, -86.787], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=BNAsrc)}).addTo(mymap);

// Georgia
var FFC = L.marker([33.751, -84.366], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=FFCsrc)}).addTo(mymap);

// Alabama
var BMX = L.marker([33.495, -86.840], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=BMXsrc)}).addTo(mymap);

// Mississippi
var JAN = L.marker([32.269, -90.183], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=JANsrc)}).addTo(mymap);

// Louisianna
var LIX = L.marker([30.276, -89.805], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=LIXsrc)}).addTo(mymap);

var LCH = L.marker([30.209, -93.230], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=LCHsrc)}).addTo(mymap);

var SHV = L.marker([32.495, -93.667], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=SHVsrc)}).addTo(mymap);

// Arkansas
var LZK = L.marker([34.773, -92.275], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=LZKsrc)}).addTo(mymap);

// Missouri
var SFG = L.marker([37.191, -93.310], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=SFGsrc)}).addTo(mymap);

// Minnesota
var MPX = L.marker([45.021, -93.269], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=MPXsrc)}).addTo(mymap);

var INL = L.marker([48.583, -93.408], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=INLsrc)}).addTo(mymap);

// North Dakota
var BIS = L.marker([46.771, -100.756], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=BISsrc)}).addTo(mymap);

// South Dakota
var ABR = L.marker([45.455, -98.411], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=ABRsrc)}).addTo(mymap);

var UNR = L.marker([44.071, -103.219], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=UNRsrc)}).addTo(mymap);

// Nebraska
var LBF = L.marker([41.135, -100.770], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=LBFsrc)}).addTo(mymap);

var OAX = L.marker([41.247, -95.924], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=OAXsrc)}).addTo(mymap);

// Kansas
var TOP = L.marker([39.063, -95.6308], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=TOPsrc)}).addTo(mymap);

var DDC = L.marker([37.753, -99.969], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=DDCsrc)}).addTo(mymap);

// Oklahoma
var OUN = L.marker([35.180, -97.438], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=OUNsrc)}).addTo(mymap);

var LMN = L.marker([36.688, -97.554], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=LMNsrc)}).addTo(mymap);

// Texas
var FWD = L.marker([32.834, -97.288], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=FWDsrc)}).addTo(mymap);

var CRP = L.marker([27.782, -97.505], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=CRPsrc)}).addTo(mymap);

var BRO = L.marker([25.899, -97.432], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=BROsrc)}).addTo(mymap);

var MAF = L.marker([32.025, -102.107], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=MAFsrc)}).addTo(mymap);

var DRT = L.marker([29.366, -100.813], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=DRTsrc)}).addTo(mymap);

var EPZ = L.marker([31.799, -106.365], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=EPZsrc)}).addTo(mymap);

var AMA = L.marker([35.217, -101.842], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=AMAsrc)}).addTo(mymap);

// New Mexico
var ABQ = L.marker([35.068, -106.647], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=ABQsrc)}).addTo(mymap);

// Colorado
var GJT = L.marker([39.068, -108.533], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=GJTsrc)}).addTo(mymap);

var DNR = L.marker([39.838, -104.693], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=DNRsrc)}).addTo(mymap);

// Wyoming
var RIW = L.marker([43.019, -108.385], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=RIWsrc)}).addTo(mymap);

// Montana
var GGW = L.marker([48.210, -106.619], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=GGWsrc)}).addTo(mymap);

var TFX = L.marker([47.483, -111.351], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=TFXsrc)}).addTo(mymap);

// Idaho
var BOI = L.marker([43.587, -116.211], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=BOIsrc)}).addTo(mymap);

// Idaho
var SLC = L.marker([40.780, -111.965], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=SLCsrc)}).addTo(mymap);

// Arizona
var FGZ = L.marker([35.202, -111.662], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=FGZsrc)}).addTo(mymap);

var TUS = L.marker([32.212, -110.997], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=TUSsrc)}).addTo(mymap);

// Nevada
var VEF = L.marker([36.085, -115.173], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=VEFsrc)}).addTo(mymap);

var REV = L.marker([39.516, -119.801], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=REVsrc)}).addTo(mymap);

var VEF = L.marker([40.827, -115.766], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=VEFsrc)}).addTo(mymap);

// California
var NKX = L.marker([33.022, -117.083], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=NKXsrc)}).addTo(mymap);

var VBG = L.marker([35.425, -119.056], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=VGBsrc)}).addTo(mymap);

var OAK = L.marker([37.792, -122.265], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=OAKsrc)}).addTo(mymap);

// Oregon
var MFR = L.marker([43.367, -122.876], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=MFRsrc)}).addTo(mymap);

var SLE = L.marker([45.496, -122.701], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=SLEsrc)}).addTo(mymap);

// Washington
var OTX = L.marker([47.644, -117.432], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=OTXsrc)}).addTo(mymap);

var UIL = L.marker([47.786, -122.268], {
    color:'black',
}).on('click', function() {(document.getElementById('sounding').src=UILsrc)}).addTo(mymap);

///////////////////////////

/////// Function Calls Section ///////

getSounding(OUNsrc);
