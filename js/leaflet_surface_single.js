// TODO add refresh (reload time layers)
// TODO add buffer time to load layers where radar turned on

// *** BEGINNING OF RADAR MAP ***
L.Control.Surface = L.Control.extend({

    // nowcoast surface obs (winds, sky cover, and normal obs)
    SURFACE_URL: `https://nowcoast.noaa.gov/arcgis/services/nowcoast/obs_meteocean_insitu_sfc_time/MapServer/WMSServer?`,
    SURFACE_LAYERS: ['2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23',`24`,`25`,`26`,`27`,`28`,`29`,`30`,`31`,`32`,`33`],


      isPaused: false,
      timeLayerIndex: 0,
      timeLayers: [],

      options: {
          position: `topright`,
          opacity: 0.85,
          zIndex: 300,
          transitionMs: 500,
          playHTML: `&#9658;`,
          pauseHTML: `&#9616;`,
      },

      onRemove: function () {
          L.DomUtil.remove(this.container);
      },

      onAdd: function (map) {
          this.map = map;

          // setup control container
          this.container = L.DomUtil.create(`div`, "leaflet-surface");

          L.DomEvent.disableClickPropagation(this.container);
          L.DomEvent.on(this.container, `control_container`, function (e) {
              L.DomEvent.stopPropagation(e);
          });
          L.DomEvent.disableScrollPropagation(this.container);

          // add control elements within container
          checkbox_div = L.DomUtil.create(
              `div`,
              `leaflet-surface-toggle`,
              this.container
          );

          this.checkbox = document.createElement(`input`);
          this.checkbox.id = `surface-toggle`;
          this.checkbox.type = `checkbox`;
          this.checkbox.checked = false;
          this.checkbox.onclick = () => this.toggle();

          checkbox_div.appendChild(this.checkbox);

          let checkbox_label = document.createElement(`span`);
          checkbox_label.innerText = `Surface Observations`;

          checkbox_div.appendChild(checkbox_label);



          this.isPaused = false;

          return this.container;
      },

      hideLayerByIndex: function (index) {
          this.timeLayers[index].tileLayer.setOpacity(0);
          this.timestamp_div.innerHTML = ``;
      },

      showLayerByIndex: function (index) {
          this.timeLayers[index].tileLayer.setOpacity(
              this.options.opacity
          );
          this.timestamp_div.innerHTML = this.timeLayers[index].timestamp;
      },



      toggle: function () {

          if (!this.checkbox.checked) {
              this.removeLayer(layer);
              return;
          }

          layer = this.generateLayers();
  		this.addLayer(layer);
          this.timeLayerIndex = 0;
          this.isPaused = false;

      },



      setTransitionTimer: function () {
          setTimeout(() => {
              if (this.isPaused) {
                  return;
              }

              this.timeLayers.forEach(timeLayer => {
                  timeLayer.tileLayer.setOpacity(0);
                  timeLayer.tileLayer.addTo(this.map);
              });

              if (this.checkbox.checked) {

                  this.hideLayerByIndex(this.timeLayerIndex);
                  this.incrementLayerIndex();
                  this.showLayerByIndex(this.timeLayerIndex);

                  this.slider.value = `${this.timeLayerIndex}`;

                  this.setTransitionTimer();
              } else {
                  this.setDisabled(true);
                  this.removeLayers();
              }
          }, this.options.transitionMs);
      },

      incrementLayerIndex: function () {
          this.timeLayerIndex++;
          if (this.timeLayerIndex > this.timeLayers.length - 1) {
              this.timeLayerIndex = 0;
          }
      },


      removeLayer: function (layer) {
          layer.removeFrom(this.map)
      },

  	addLayer: function (layer) {
  	    layer.addTo(this.map);
  	},

      generateLayers: function () {
          const layerRequest = this.SURFACE_LAYERS;
        	console.log(layerRequest);
          console.log(this.SURFACE_URL);
          const layer = L.tileLayer.wms(this.SURFACE_URL, {
              layers: layerRequest,
              format: `image/png`,
              transparent: true,
              opacity: this.options.opacity,
              zIndex: this.options.zIndex
          });

  		return layer
       }
  });

  // *** END OF SURFACE MAP ***

  // *** BEGINNING OF RADAR MAP ***
L.Control.Temp = L.Control.extend({

      // nowcoast surface obs (winds, sky cover, and normal obs)
      TEMP_URL: `https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_rtma_time/MapServer/WMSServer?`,
      TEMP_LAYERS: [`17`],


        isPaused: false,
        timeLayerIndex: 0,
        timeLayers: [],

        options: {
            position: `topright`,
            opacity: 0.35,
            zIndex: 150,
            transitionMs: 500,
            playHTML: `&#9658;`,
            pauseHTML: `&#9616;`,
        },

        onRemove: function () {
            L.DomUtil.remove(this.container);
        },

        onAdd: function (map) {
            this.map = map;

            // setup control container
            this.container = L.DomUtil.create(`div`, "leaflet-temp");

            L.DomEvent.disableClickPropagation(this.container);
            L.DomEvent.on(this.container, `control_container`, function (e) {
                L.DomEvent.stopPropagation(e);
            });
            L.DomEvent.disableScrollPropagation(this.container);

            // add control elements within container
            checkbox_div = L.DomUtil.create(
                `div`,
                `leaflet-temp-toggle`,
                this.container
            );

            this.checkbox = document.createElement(`input`);
            this.checkbox.id = `temp-toggle`;
            this.checkbox.type = `checkbox`;
            this.checkbox.checked = false;
            this.checkbox.onclick = () => this.toggle();

            checkbox_div.appendChild(this.checkbox);

            let checkbox_label = document.createElement(`span`);
            checkbox_label.innerText = `RTMA Temperature (F)`;

            checkbox_div.appendChild(checkbox_label);



            this.isPaused = false;

            return this.container;
        },

        hideLayerByIndex: function (index) {
            this.timeLayers[index].tileLayer.setOpacity(0);
            this.timestamp_div.innerHTML = ``;
        },

        showLayerByIndex: function (index) {
            this.timeLayers[index].tileLayer.setOpacity(
                this.options.opacity
            );
            this.timestamp_div.innerHTML = this.timeLayers[index].timestamp;
        },



        toggle: function () {

            if (!this.checkbox.checked) {
                this.removeLayer(layer);
                return;
            }

            layer = this.generateLayers();
            this.addLayer(layer);
            this.timeLayerIndex = 0;
            this.isPaused = false;

        },



        setTransitionTimer: function () {
            setTimeout(() => {
                if (this.isPaused) {
                    return;
                }

                this.timeLayers.forEach(timeLayer => {
                    timeLayer.tileLayer.setOpacity(0);
                    timeLayer.tileLayer.addTo(this.map);
                });

                if (this.checkbox.checked) {

                    this.hideLayerByIndex(this.timeLayerIndex);
                    this.incrementLayerIndex();
                    this.showLayerByIndex(this.timeLayerIndex);

                    this.slider.value = `${this.timeLayerIndex}`;

                    this.setTransitionTimer();
                } else {
                    this.setDisabled(true);
                    this.removeLayers();
                }
            }, this.options.transitionMs);
        },

        incrementLayerIndex: function () {
            this.timeLayerIndex++;
            if (this.timeLayerIndex > this.timeLayers.length - 1) {
                this.timeLayerIndex = 0;
            }
        },


        removeLayer: function (layer) {
            layer.removeFrom(this.map)
        },

    	addLayer: function (layer) {
    	    layer.addTo(this.map);
    	},

        generateLayers: function () {
            const layerRequest = this.TEMP_LAYERS;
            const layer = L.tileLayer.wms(this.TEMP_URL, {
                layers: layerRequest,
                format: `image/png`,
                transparent: true,
                opacity: this.options.opacity,
                zIndex: this.options.zIndex
            });

    		return layer
         }
    });

    // *** END OF TEMP MAP ***


    // *** BEGINNING OF RADAR MAP ***
  L.Control.Dewp = L.Control.extend({

        // nowcoast surface obs (winds, sky cover, and normal obs)
        DEWP_URL: `https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_rtma_time/MapServer/WMSServer?`,
        DEWP_LAYERS: [`13`],


          isPaused: false,
          timeLayerIndex: 0,
          timeLayers: [],

          options: {
              position: `topright`,
              opacity: 0.35,
              zIndex: 150,
              transitionMs: 500,
              playHTML: `&#9658;`,
              pauseHTML: `&#9616;`,
          },

          onRemove: function () {
              L.DomUtil.remove(this.container);
          },

          onAdd: function (map) {
              this.map = map;

              // setup control container
              this.container = L.DomUtil.create(`div`, "leaflet-dewp");

              L.DomEvent.disableClickPropagation(this.container);
              L.DomEvent.on(this.container, `control_container`, function (e) {
                  L.DomEvent.stopPropagation(e);
              });
              L.DomEvent.disableScrollPropagation(this.container);

              // add control elements within container
              checkbox_div = L.DomUtil.create(
                  `div`,
                  `leaflet-dewp-toggle`,
                  this.container
              );

              this.checkbox = document.createElement(`input`);
              this.checkbox.id = `dewp-toggle`;
              this.checkbox.type = `checkbox`;
              this.checkbox.checked = false;
              this.checkbox.onclick = () => this.toggle();

              checkbox_div.appendChild(this.checkbox);

              let checkbox_label = document.createElement(`span`);
              checkbox_label.innerText = `RTMA Dewpoint (F)`;

              checkbox_div.appendChild(checkbox_label);



              this.isPaused = false;

              return this.container;
          },

          hideLayerByIndex: function (index) {
              this.timeLayers[index].tileLayer.setOpacity(0);
              this.timestamp_div.innerHTML = ``;
          },

          showLayerByIndex: function (index) {
              this.timeLayers[index].tileLayer.setOpacity(
                  this.options.opacity
              );
              this.timestamp_div.innerHTML = this.timeLayers[index].timestamp;
          },



          toggle: function () {

              if (!this.checkbox.checked) {
                  this.removeLayer(layer);
                  return;
              }

              layer = this.generateLayers();
      		    this.addLayer(layer);
              this.timeLayerIndex = 0;
              this.isPaused = false;

          },



          setTransitionTimer: function () {
              setTimeout(() => {
                  if (this.isPaused) {
                      return;
                  }

                  this.timeLayers.forEach(timeLayer => {
                      timeLayer.tileLayer.setOpacity(0);
                      timeLayer.tileLayer.addTo(this.map);
                  });

                  if (this.checkbox.checked) {

                      this.hideLayerByIndex(this.timeLayerIndex);
                      this.incrementLayerIndex();
                      this.showLayerByIndex(this.timeLayerIndex);

                      this.slider.value = `${this.timeLayerIndex}`;

                      this.setTransitionTimer();
                  } else {
                      this.setDisabled(true);
                      this.removeLayers();
                  }
              }, this.options.transitionMs);
          },

          incrementLayerIndex: function () {
              this.timeLayerIndex++;
              if (this.timeLayerIndex > this.timeLayers.length - 1) {
                  this.timeLayerIndex = 0;
              }
          },


          removeLayer: function (layer) {
              layer.removeFrom(this.map)
          },

      	addLayer: function (layer) {
      	    layer.addTo(this.map);
      	},

          generateLayers: function () {
              const layerRequest = this.DEWP_LAYERS;
              const layer = L.tileLayer.wms(this.DEWP_URL, {
                  layers: layerRequest,
                  format: `image/png`,
                  transparent: true,
                  opacity: this.options.opacity,
                  zIndex: this.options.zIndex
              });

      		return layer
           }
      });

////////////////////////////////////////////////////////////////////////////////

var owsrootUrl = 'https://mesonet.agron.iastate.edu/wfs';

var defaultParameters = {
    service : 'WFS',
    version : '2.0',
    request : 'GetFeature',
    typeName : '<WORKSPACE:WW>',
    outputFormat : 'text/javascript',
    format_options : 'callback:getJson',
    SrsName : 'EPSG:4326'
};

var parameters = L.Util.extend(defaultParameters);
var URL = owsrootUrl + L.Util.getParamString(parameters);

var WFSLayer = null;
var ajax = $.ajax({
    url : URL,
    dataType : 'jsonp',
    jsonpCallback : 'getJson',
    success : function (response) {
        WFSLayer = L.geoJson(response, {
            style: function (feature) {
                return {
                    stroke: false,
                    fillColor: 'FFFFFF',
                    fillOpacity: 0
                };
            },
            onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 200};
                layer.bindPopup("Popup text, access attributes with feature.properties.ATTRIBUTE_NAME"
                    ,popupOptions);
            }
        }).addTo(map);
    }
});

////////////////////////////////////////////////////////////////////////////////



L.control.surface = function (options) {
    return new L.Control.Surface(options);
};

function onPageLoad_ClickSurface() {
  document.getElementById("surface-toggle").click();
}

L.control.temp = function (options) {
    return new L.Control.Temp(options);
};

function onPageLoad_ClickTemp() {
  document.getElementById("temp-toggle").click();
}

L.control.dewp = function (options) {
    return new L.Control.Dewp(options);
};

function onPageLoad_ClickDewp() {
  document.getElementById("dewp-toggle").click();
}
