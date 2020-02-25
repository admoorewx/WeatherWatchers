
var rotateFreq = 7000; // milliseconds - how fast the images change.

//////////////////////////////////////////////////////////////////////////////
function changeMesoImage() {
  var img = document.getElementById("mesoimage");
  img.src = mesoimages[x];
  x++;

  if (x >= mesoimages.length) {
    x = 0;
  }

  fadeImg(img, 500, true);
  setTimeout("changeMesoImage()", rotateFreq);
}


// SPC Images
var mesoimages = [],
  x = 0;
mesoimages[0] = "https://www.spc.noaa.gov/exper/mesoanalysis/s19/300mb/300mb.gif";
mesoimages[1] = "https://www.spc.noaa.gov/exper/mesoanalysis/s19/500mb/500mb.gif";
mesoimages[2] = "https://www.spc.noaa.gov/exper/mesoanalysis/s19/700mb/700mb.gif";
mesoimages[3] = "https://www.spc.noaa.gov/exper/mesoanalysis/s19/850mb/850mb.gif";
mesoimages[4] = "https://www.spc.noaa.gov/exper/mesoanalysis/s19/925mb/925mb.gif";
mesoimages[5] = "https://www.spc.noaa.gov/exper/mesoanalysis/s19/ttd/ttd.gif";
setTimeout("changeMesoImage()", rotateFreq);
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
function changeMesoImage2() {
  var img2 = document.getElementById("mesoimage2");
  img2.src = mesoimages2[y];
  y++;

  if (y >= mesoimages2.length) {
    y = 0;
  }

  fadeImg(img2, 500, true);
  setTimeout("changeMesoImage2()", rotateFreq);
}


// SPC Images
var mesoimages2 = [],
  y = 0;
mesoimages2[0] = "https://www.spc.noaa.gov/exper/mesoanalysis/s19/padv/padv.gif";
mesoimages2[1] = "https://www.spc.noaa.gov/exper/mesoanalysis/s19/500mb_chg/500mb_chg.gif";
mesoimages2[2] = "https://www.spc.noaa.gov/exper/mesoanalysis/s19/7tad/7tad.gif";
mesoimages2[3] = "https://www.spc.noaa.gov/exper/mesoanalysis/s19/pwtr2/pwtr2.gif?";
mesoimages2[4] = "https://www.spc.noaa.gov/exper/mesoanalysis/s19/tadv_925/tadv_925.gif";
mesoimages2[5] = "https://www.spc.noaa.gov/exper/mesoanalysis/s19/mxth/mxth.gif";


setTimeout("changeMesoImage2()", rotateFreq);
//////////////////////////////////////////////////////////////////////////////



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
