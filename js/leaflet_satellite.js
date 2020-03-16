// TODO add refresh (reload time layers)
// TODO add buffer time to load layers where radar turned on

function changeDomain1(domain) {
  var current = document.getElementById("Data1").src;
//https://weather.msfc.nasa.gov/cgi-bin/get-abi?satellite=GOESEastconusband13&lat=36&lon=-96&zoom=2&type=Animation&numframes=10&width=600&height=380&quality=80&palette=ir2.pal'
  if current.substring(65, 70) == "conus" {
    console.log("TRUE");
  }


}


//function changeSector1(sector) {}
