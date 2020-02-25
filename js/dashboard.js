// OpenweatherMaps key
key = 'f423a09b9ef0593db789666862433f36';

function getDateTime() {

  var today = new Date();
  var year = String(today.getUTCFullYear());
  var month = (today.getUTCMonth()+1);
  var hour = today.getUTCHours();

  if (month < 10){
      month = "0"+String(month);
      }
  else{ month = String(month);}

  if (day < 10){
      day = "0"+String(day);
      }
  else{ day = String(day);}

  if (hour < 10){
      day = "0"+String(hour);
      }
  else{ day = String(hour);}

  var finaldate = year+month+day+hour;

  return finaldate;

} // End getDateTime




function changeSPCImage() {
  var img = document.getElementById("spcOutlook");
  img.src = spcimages[x];
  x++;

  if (x >= spcimages.length) {
    x = 0;
  }

  fadeImg(img, 500, true);
  setTimeout("changeSPCImage()", 10000);
}

function changeWPCImage() {
  var img = document.getElementById("wpcQPF");
  img.src = wpcimages[w];
  w++;

  if (w >= wpcimages.length) {
    w = 0;
  }

  fadeImg(img, 500, true);
  setTimeout("changeWPCImage()", 10000);
}




function fadeImg(el, val, fade) {
  if (fade === true) {
    val--;
  } else {
    val++;
  }

  if (val > 0 && val < 100) {
    el.style.opacity = val / 100;
    setTimeout(function() {
      fadeImg(el, val, fade);
    }, 10);
  }
}




// SPC Images
var spcimages = [],
  x = 0;
spcimages[0] = "https://www.spc.noaa.gov/products/outlook/day1otlk.gif";
spcimages[1] = "https://www.spc.noaa.gov/products/outlook/day2otlk.gif";
spcimages[2] = "https://www.spc.noaa.gov/products/outlook/day3otlk.gif";
spcimages[3] = "https://www.spc.noaa.gov/products/exper/day4-8/day4prob.gif";
spcimages[4] = "https://www.spc.noaa.gov/products/exper/day4-8/day5prob.gif";



setTimeout("changeSPCImage()", 10000);



// WPC Images
var wpcimages = [],
  w = 0;
wpcimages[0] = "https://www.wpc.ncep.noaa.gov/qpf/fill_94qwbg.gif";
wpcimages[1] = "https://www.wpc.ncep.noaa.gov/qpf/fill_98qwbg.gif";
wpcimages[2] = "https://www.wpc.ncep.noaa.gov/qpf/fill_99qwbg.gif";
wpcimages[3] = "https://www.wpc.ncep.noaa.gov/qpf/95ep48iwbg_fill.gif";
wpcimages[4] = "https://www.wpc.ncep.noaa.gov/qpf/97ep48iwbg_fill.gif";

setTimeout("changeWPCImage()", 10000);




function changeSFCImage() {
  var img = document.getElementById("ucarSurface");
  img.src = sfcimages[u];
  u++;

  if (u >= sfcimages.length) {
    u = 0;
  }

  setTimeout("changeSFCImage()", 500);
}

// UCAR Images
var sfcimages = [],
  u = 0;
sfcimages[0] = getCODsfcURL(6);
sfcimages[1] = getCODsfcURL(5);
sfcimages[2] = getCODsfcURL(4);
sfcimages[3] = getCODsfcURL(3);
sfcimages[4] = getCODsfcURL(2);
sfcimages[5] = getCODsfcURL(1);
sfcimages[6] = getCODsfcURL(0);
sfcimages[7] = getCODsfcURL(0);
sfcimages[8] = getCODsfcURL(0);
sfcimages[9] = getCODsfcURL(0);

setTimeout("changeSFCImage()", 500);




// WWA Map and Radar Loops
// function changeWWAImage() {
//   var img = document.getElementById("usWWA");
//   img.src = wwaimages[r];
//   r++;
//
//   if (r >= wwaimages.length) {
//     r = 0;
//   }
//
//   setTimeout("changeWWAImage()", 10000);
// }

// WWA Images
// var wwaimages = [],
//   r = 0;
// wwaimages[0] = "https://forecast.weather.gov/wwamap/png/US.png";
// wwaimages[1] = "https://radar.weather.gov/Conus/Loop/NatLoop_Small.gif";
// wwaimages[2] = "https://radar.weather.gov/ridge/Conus/Loop/uppermissvly_loop.gif";
//
// setTimeout("changeWWAImage()", 10000);



function weatherBalloon( cityName ) {
 //var key = '{yourkey}';
 fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityName+ '&appid=' + key)
 .then(function(resp) { return resp.json() }) // Convert data to json
 .then(function(data) {
   drawWeather(data); // Call drawWeather
   setTempGauge(data); // call setTempGauge
   setHumidityGauge(data); // call setHumidityGauge
   setPressureGauge(data); // call setPressureGauge
   //setWindGauge(data); // call setWindGauge
   setTimeout(windDir(data),1000); // call windDir
  })
  console.log('https://api.openweathermap.org/data/2.5/weather?id=' + cityName+ '&appid=' + key)
 .catch(function() {
	// catch any errors
  });
}


function drawWeather( d ) {
	var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);

	var RH = parseFloat(d.main.humidity);
	var pressure = parseFloat(d.main.pressure);
	var windspeed = Math.round(parseFloat(d.wind.speed));
	var winddirection = parseFloat(d.wind.deg);


	document.getElementById('description').innerHTML = jsUcfirst(d.weather[0].description);
	document.getElementById('location').innerHTML = 'Current Weather in '+d.name;
	document.getElementById('temp').innerHTML = 'Temperature </br>' + fahrenheit + '&deg;F';
	document.getElementById('humidity').innerHTML = 'Relative Humidity </br>' + RH + '%';
  document.getElementById('pressure').innerHTML = 'Pressure </br>' + pressure + ' mb';
  document.getElementById('windspeed').innerHTML = windspeed + ' knots';
	document.getElementById('winddirection').innerHTML = winddirection + '&deg;';



}

function jsUcfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}




// Controls the clock in the corner
function display_c(){
  var refresh=1000; // Refresh rate in milli seconds
  mytime=setTimeout('display_utc()',refresh)
}

function display_utc() {
  var x = new Date();

  var month=x.getUTCMonth()+1;
  var day=x.getUTCDate();
  var year=x.getFullYear();
  if (month <10 ){month='0' + month;}
  if (day <10 ){day='0' + day;}
  var x3= month+'-'+day+'-'+year;

  var hour=x.getUTCHours();
  var minute=x.getUTCMinutes();
  var second=x.getUTCSeconds();

  if (hour<10 ){hour='0'+hour;}
  if (minute<10){minute='0'+minute;}
  if (second<10){second='0'+second;}

  var x2 = x3 + ' ' + hour + ':' + minute + ':' + second;

  document.getElementById('utc').style.fontSize='32px';
  document.getElementById('utc').innerHTML = x2;
  display_c();
}

function getCODsfcURL(past){

    var current = new Date();
    current.setHours(current.getHours() - past);
    var month =current.getUTCMonth()+1;
    var day   =current.getUTCDate();
    var year  =current.getFullYear();
    var hour  =current.getUTCHours();

    if (month <10 ){month='0' + month;}
    if (day <10 ){day='0' + day;}
    if (hour<10 ){hour='0'+hour;}

    var datestring = year +  month + day + '.' + hour
    var url = 'https://climate.cod.edu/data/surface/nrnplains/contour/NGP.fronts.'+datestring+'.gif';
    return url;
}


window.onload = function() {
  //display_utc();
  weatherBalloon( 5059429 );
}

/// Controls the temperature gauge

function setTempGauge(d){
  var opts = {
    lines: 15, // The number of lines to draw
    angle: -0.05, // The length of each line
	radiusScale: 0.77,
    lineWidth: 0.44, // The line thickness
    font: "10px sans-serif",  // Specifies font
    pointer: {
      length: 0.65, // The radius of the inner circle
      strokeWidth: 0.035, // The rotation offset
      color: '#000000' // Fill color
    },

    renderTicks: {
      divisions: 7,
      divWidth: 1.1,
      divLength: 0.4,
      subDivisions: 2,
      subLength: 0.3,
      subWidth: 0.6,
    },

    colorStart: 'cyan',   // Colors
    colorStop: 'salmon',    // just experiment with them
    strokeColor: 'gray',   // to see which ones work best for you
    limitMax: 'false',
    //percentColors: [[0.0, "#4B0082"], [0.20, "#7B68EE"], [0.3, "#0000FF"], [0.4, "#008080"], [0.50, "FF6347"], [0.6, "#FF4500"], [0.7, "#FF0000"], [0.8, "#8B0000"], [1.0, "FF1493"]], // !!!!
    percentColors: [[0.0, "#0000FF"], [0.4, "#8A2BE2"], [0.8, "#800000"], [1.0, "FF1493"]], // !!!!
    generateGradient: true,
    staticLabels: {
      font: "18px sans-serif",  // Specifies font
      labels: [-20, 0, 20, 40, 60, 80, 100, 120],  // Print labels at these values
      color: "#000000",  // Optional: Label text color
      fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    }

  };

  var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
  var target = document.getElementById('tempgauge'); // your canvas element
  var gauge = new Gauge(target);
  gauge.setOptions(opts); // create sexy gauge!
  gauge.minValue = -20;
  gauge.maxValue = 120; // set max gauge value
  gauge.animationSpeed = 100; // set animation speed (32 is default value)
  gauge.set(fahrenheit); // set actual value
}


/// Controls the humidity gauge

function setHumidityGauge(d){
  var opts = {
    lines: 15, // The number of lines to draw
    angle: -0.05, // The length of each line
	radiusScale: 0.77,
    lineWidth: 0.44, // The line thickness
    font: "10px sans-serif",  // Specifies font
    pointer: {
      length: 0.65, // The radius of the inner circle
      strokeWidth: 0.035, // The rotation offset
      color: '#000000' // Fill color
    },

    renderTicks: {
      divisions: 5,
      divWidth: 1.1,
      divLength: 0.4,
      subDivisions: 2,
      subLength: 0.3,
      subWidth: 0.6,
    },

    colorStart: 'cyan',   // Colors
    colorStop: 'salmon',    // just experiment with them
    strokeColor: 'gray',   // to see which ones work best for you
    limitMax: 'false',
    percentColors: [[0.0, "#A52A2A"], [0.4, "#808000"], [0.8, "#008000"], [1.0, "9400D3"]], // !!!!
    generateGradient: true,
    staticLabels: {
      font: "18px sans-serif",  // Specifies font
      labels: [0, 20, 40, 60, 80, 100],  // Print labels at these values
      color: "#000000",  // Optional: Label text color
      fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    }

  };

  var RH = parseFloat(d.main.humidity);
  var target = document.getElementById('humiditygauge'); // your canvas element
  var gauge = new Gauge(target);
  gauge.setOptions(opts); // create sexy gauge!
  gauge.minValue = 0;
  gauge.maxValue = 100; // set max gauge value
  gauge.animationSpeed = 100; // set animation speed (32 is default value)
  gauge.set(RH); // set actual value
}


/// Controls the pressure gauge

function setPressureGauge(d){
  var opts = {
    lines: 15, // The number of lines to draw
    angle: -0.05, // The length of each line
	radiusScale: 0.77,
    lineWidth: 0.24, // The line thickness
    font: "10px sans-serif",  // Specifies font
    pointer: {
      length: 0.65, // The radius of the inner circle
      strokeWidth: 0.035, // The rotation offset
      color: '#000000' // Fill color
    },

    renderTicks: {
      divisions: 3,
      divWidth: 1.1,
      divLength: 0.4,
      subDivisions: 2,
      subLength: 0.3,
      subWidth: 0.6,
    },

    colorStart: 'cyan',   // Colors
    colorStop: 'salmon',    // just experiment with them
    strokeColor: 'gray',   // to see which ones work best for you
    limitMax: 'false',
    percentColors: [[0.0, "#0000FF"], [1.0, "#B22222"]], // !!!!
    generateGradient: true,
    staticLabels: {
      font: "12px sans-serif",  // Specifies font
      labels: [980, 1000, 1020, 1040],  // Print labels at these values
      color: "#000000",  // Optional: Label text color
      fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    }

  };

  var pressure = parseFloat(d.main.pressure);
  var target = document.getElementById('pressuregauge'); // your canvas element
  var gauge = new Gauge(target);
  gauge.setOptions(opts); // create sexy gauge!
  gauge.setMinValue(980);
  gauge.maxValue = 1040; // set max gauge value
  gauge.animationSpeed = 100; // set animation speed (32 is default value)
  gauge.set(pressure); // set actual value
  console.log("HERE")
}

/// Controls the wind direction compass
/*
function setWindGauge(d){
  var opts = {
    lines: 5, // The number of lines to draw
    angle: -5, // The length of each line
	radiusScale: 0.1,
    lineWidth: 0.01, // The line thickness
    font: "10px sans-serif",  // Specifies font
    pointer: {
      length: 0.1, // The radius of the inner circle
      strokeWidth: 0.035, // The rotation offset
      color: '#000000' // Fill color
    },

    renderTicks: {
      divisions: 3,
      divWidth: 1.1,
      divLength: 0.4,
      subDivisions: 2,
      subLength: 0.3,
      subWidth: 0.6,
    },

    colorStart: 'cyan',   // Colors
    colorStop: 'salmon',    // just experiment with them
    strokeColor: 'gray',   // to see which ones work best for you
    limitMax: 'false',
    staticLabels: {
      font: "10px sans-serif",  // Specifies font
      labels: [0, 90, 180, 360],  // Print labels at these values
      color: "#000000",  // Optional: Label text color
      fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    }

  };

  var winddirection = parseFloat(d.wind.deg);
  var target = document.getElementById('windgauge'); // your canvas element
  var gauge = new Gauge(target);
  gauge.setOptions(opts); // create sexy gauge!
  gauge.setMinValue(0);
  gauge.maxValue = 360; // set max gauge value
  gauge.animationSpeed = 100; // set animation speed (32 is default value)
  gauge.set(winddirection); // set actual value
}
*/


var degrees = 0;
function windDir(d) {
  img = document.getElementById('windArrow');
  var winddirection = parseFloat(d.wind.deg) + 180;

  while (degrees < winddirection) {
    img.style.transform = 'rotate('+winddirection+'deg)';
    degrees++;
  }

}
