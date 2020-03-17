

function changeDomain1(domain) {
  var current = document.getElementById("Data1").src;
// Sample URL below:
//https://weather.msfc.nasa.gov/cgi-bin/get-abi?satellite=GOESEastconusband13&lat=36&lon=-96&zoom=2&type=Animation&numframes=10&width=600&height=380&quality=80&palette=ir2.pal'
  //console.log(current.substring(64,69));
  if (current.substring(64, 69) == "conus" && current.substring(88,90) != 12) { // First check to see what the current domain is
    if (domain == "fullDisk"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(69,80);
      var lonStr     = current.substring(82,88);
      var zoomStr    = current.substring(90,96);
      var secondHalf = current.substring(97, current.length);


      var fullDiskLat = "40";
      var fullDiskLon = "70";
      var zoomFactor  = "4";

      var newURL = firstHalf + domain + latStr + fullDiskLat + lonStr + fullDiskLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if full disk

    if (domain == "Nplains"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(69,80);
      var lonStr     = current.substring(82,88);
      var zoomStr    = current.substring(90,96);
      var secondHalf = current.substring(97, current.length);

      var realDomain = "conus"
      var nplainsLat = "48";
      var nplainsLon = "99";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + nplainsLat + lonStr + nplainsLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if northern plains


    if (domain == "Splains"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(69,80);
      var lonStr     = current.substring(82,88);
      var zoomStr    = current.substring(90,96);
      var secondHalf = current.substring(97, current.length);

      var realDomain = "conus"
      var splainsLat = "33";
      var splainsLon = "96";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + splainsLat + lonStr + splainsLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if southern plains


    if (domain == "GOM"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(69,80);
      var lonStr     = current.substring(82,88);
      var zoomStr    = current.substring(90,96);
      var secondHalf = current.substring(97, current.length);

      var realDomain = "conus"
      var gomLat = "25";
      var gomLon = "90";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + gomLat + lonStr + gomLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if Gulf of Mexico


    if (domain == "Ecoast"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(69,80);
      var lonStr     = current.substring(82,88);
      var zoomStr    = current.substring(90,96);
      var secondHalf = current.substring(97, current.length);

      var realDomain = "conus"
      var ecoastLat = "37";
      var ecoastLon = "83";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + ecoastLat + lonStr + ecoastLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if east coast


    if (domain == "Wcoast"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(69,80);
      var lonStr     = current.substring(82,88);
      var zoomStr    = current.substring(90,96);
      var secondHalf = current.substring(97, current.length);

      var realDomain = "conus"
      var wcoastLat = "40";
      var wcoastLon = "120";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + wcoastLat + lonStr + wcoastLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if west coast


    if (domain == "conus"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(69,80);
      var lonStr     = current.substring(82,88);
      var zoomStr    = current.substring(90,96);
      var secondHalf = current.substring(97, current.length);

      var realDomain = "conus"
      var conusLat = "40";
      var conusLon = "96";
      var zoomFactor  = "2";

      var newURL = firstHalf + realDomain + latStr + conusLat + lonStr + conusLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if west coast

  } // End of if conus and not west coast


  else if (current.substring(64, 69) == "conus" && current.substring(88,90) == 12) { // First check to see what the current domain is
    if (domain == "fullDisk"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(69,80);
      var lonStr     = current.substring(82,88);
      var zoomStr    = current.substring(91,97);
      var secondHalf = current.substring(98, current.length);


      var fullDiskLat = "40";
      var fullDiskLon = "70";
      var zoomFactor  = "4";

      var newURL = firstHalf + domain + latStr + fullDiskLat + lonStr + fullDiskLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if full disk

    if (domain == "Nplains"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(69,80);
      var lonStr     = current.substring(82,88);
      var zoomStr    = current.substring(91,97);
      var secondHalf = current.substring(98, current.length);

      var realDomain = "conus"
      var nplainsLat = "48";
      var nplainsLon = "99";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + nplainsLat + lonStr + nplainsLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if northern plains


    if (domain == "Splains"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(69,80);
      var lonStr     = current.substring(82,88);
      var zoomStr    = current.substring(91,97);
      var secondHalf = current.substring(98, current.length);

      var realDomain = "conus"
      var splainsLat = "33";
      var splainsLon = "96";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + splainsLat + lonStr + splainsLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if southern plains


    if (domain == "GOM"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(69,80);
      var lonStr     = current.substring(82,88);
      var zoomStr    = current.substring(91,97);
      var secondHalf = current.substring(98, current.length);

      var realDomain = "conus"
      var gomLat = "25";
      var gomLon = "90";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + gomLat + lonStr + gomLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if Gulf of Mexico


    if (domain == "Ecoast"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(69,80);
      var lonStr     = current.substring(82,88);
      var zoomStr    = current.substring(91,97);
      var secondHalf = current.substring(98, current.length);

      var realDomain = "conus"
      var ecoastLat = "37";
      var ecoastLon = "83";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + ecoastLat + lonStr + ecoastLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if east coast


    if (domain == "Wcoast"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(69,80);
      var lonStr     = current.substring(82,88);
      var zoomStr    = current.substring(91,97);
      var secondHalf = current.substring(98, current.length);

      var realDomain = "conus"
      var wcoastLat = "40";
      var wcoastLon = "120";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + wcoastLat + lonStr + wcoastLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if west coast


    if (domain == "conus"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(69,80);
      var lonStr     = current.substring(82,88);
      var zoomStr    = current.substring(91,97);
      var secondHalf = current.substring(98, current.length);

      var realDomain = "conus"
      var conusLat = "40";
      var conusLon = "96";
      var zoomFactor  = "2";

      var newURL = firstHalf + realDomain + latStr + conusLat + lonStr + conusLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if west coast

  } // End of if conus and we start on the west coast


  else if (current.substring(64, 72) == "fullDisk") { // First check to see what the current domain is
    if (domain == "Nplains"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(72,83);
      var lonStr     = current.substring(85,91);
      var zoomStr    = current.substring(93,99);
      var secondHalf = current.substring(100, current.length);

      var realDomain = "conus"
      var nplainsLat = "48";
      var nplainsLon = "99";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + nplainsLat + lonStr + nplainsLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if northern plains


    if (domain == "Splains"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(72,83);
      var lonStr     = current.substring(85,91);
      var zoomStr    = current.substring(93,99);
      var secondHalf = current.substring(100, current.length);

      var realDomain = "conus"
      var splainsLat = "33";
      var splainsLon = "96";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + splainsLat + lonStr + splainsLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if southern plains


    if (domain == "GOM"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(72,83);
      var lonStr     = current.substring(85,91);
      var zoomStr    = current.substring(93,99);
      var secondHalf = current.substring(100, current.length);

      var realDomain = "conus"
      var gomLat = "25";
      var gomLon = "90";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + gomLat + lonStr + gomLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if Gulf of Mexico


    if (domain == "Ecoast"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(72,83);
      var lonStr     = current.substring(85,91);
      var zoomStr    = current.substring(93,99);
      var secondHalf = current.substring(100, current.length);

      var realDomain = "conus"
      var ecoastLat = "37";
      var ecoastLon = "83";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + ecoastLat + lonStr + ecoastLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if east coast


    if (domain == "Wcoast"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(72,83);
      var lonStr     = current.substring(85,91);
      var zoomStr    = current.substring(93,99);
      var secondHalf = current.substring(100, current.length);

      var realDomain = "conus"
      var wcoastLat = "40";
      var wcoastLon = "120";
      var zoomFactor  = "1";

      var newURL = firstHalf + realDomain + latStr + wcoastLat + lonStr + wcoastLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if west coast


    if (domain == "conus"){ // then check to see if we're switching to the full disk
      var firstHalf  = current.substring(0,64); // get the first half of the URL
      var latStr     = current.substring(72,83);
      var lonStr     = current.substring(85,91);
      var zoomStr    = current.substring(93,99);
      var secondHalf = current.substring(100, current.length);

      var realDomain = "conus"
      var conusLat = "40";
      var conusLon = "96";
      var zoomFactor  = "2";

      var newURL = firstHalf + realDomain + latStr + conusLat + lonStr + conusLon + zoomStr + zoomFactor + secondHalf;
      console.log(newURL);
      document.getElementById("satHolder").innerHTML = "<embed class='data1' id='Data1' src="+newURL+">";
    } // end if west coast

  } // End of if conus and we start on the west coast

} // end of changeSector1 function
