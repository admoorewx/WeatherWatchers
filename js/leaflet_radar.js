// TODO add refresh (reload time layers)
// TODO add buffer time to load layers where radar turned on

// *** BEGINNING OF RADAR MAP ***
L.Control.Radar = L.Control.extend({

    NEXRAD_URL: `https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0q.cgi`,
    NEXRAD_LAYER: `nexrad-n0q-900913`,

    // nowcoast Radar
    //NEXRAD_URL: `https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer?`,
    //NEXRAD_LAYER: `1`,

    // IEM GOES
    //NEXRAD_URL: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_east.cgi',
    //NEXRAD_LAYER: 'conus_ch13',



    isPaused: false,
    timeLayerIndex: 0,
    timeLayers: [],

    options: {
        position: `topright`,
        opacity: 0.575,
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
        this.container = L.DomUtil.create(`div`, "leaflet-radar");

        L.DomEvent.disableClickPropagation(this.container);
        L.DomEvent.on(this.container, `control_container`, function (e) {
            L.DomEvent.stopPropagation(e);
        });
        L.DomEvent.disableScrollPropagation(this.container);

        // add control elements within container
        checkbox_div = L.DomUtil.create(
            `div`,
            `leaflet-radar-toggle`,
            this.container
        );

        this.checkbox = document.createElement(`input`);
        this.checkbox.id = `leaflet-radar-toggle`;
        this.checkbox.type = `checkbox`;
        this.checkbox.checked = false;
        this.checkbox.onclick = () => this.toggle();

        checkbox_div.appendChild(this.checkbox);

        let checkbox_label = document.createElement(`span`);
        checkbox_label.innerText = `Composite Reflectivity`;

        checkbox_div.appendChild(checkbox_label);

        let slider_div = L.DomUtil.create(
            `div`,
            `leaflet-radar-slider`,
            this.container
        );

        this.slider = document.createElement(`input`);
        this.slider.id = `leaflet-radar-slider`;
        this.slider.type = `range`;
        this.slider.min = 0;


        slider_div.appendChild(this.slider);

        this.timestamp_div = L.DomUtil.create(
            `div`,
            `leaflet-radar-timestamp`,
            this.container
        );

        this.setDisabled(false);
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

    setDisabled: function (disabled) {
        this.slider.disabled = disabled;
        this.timestamp_div.innerText = ``;
    },

    toggle: function () {
        if (!this.checkbox.checked) {
            this.setDisabled(true);
            this.removeLayers();
            return;
        }

        this.setDisabled(false);

        this.timeLayers = this.generateLayers();
        this.addLayers(this.timeLayers);

        this.slider.max = `${this.timeLayers.length - 1}`;

        this.timeLayerIndex = 0;

        this.isPaused = false;

        this.slider.oninput = () => {

            this.hideLayerByIndex(this.timeLayerIndex);
            this.timeLayerIndex = +this.slider.value;
            this.showLayerByIndex(this.timeLayerIndex);

            this.isPaused = true;
        };

        this.setTransitionTimer();
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

    addLayers: function () {
        this.timeLayers.forEach(timeLayer => {
            timeLayer.tileLayer.setOpacity(0);
            timeLayer.tileLayer.addTo(this.map);
        });
    },

    removeLayers: function () {
        this.timeLayers.forEach(timeLayer =>
            timeLayer.tileLayer.removeFrom(this.map)
        );
        this.timeLayers = [];
        this.timeLayerIndex = 0;
    },

    generateLayers: function () {
        let timeLayers = [];

        const TOTAL_INTERVALS = 10;
        const INTERVAL_LENGTH_HRS = 5;

        const currentTime = new Date();

        for (let i = 0; i <= TOTAL_INTERVALS; i++) {

            const timeDiffMins =
                TOTAL_INTERVALS * INTERVAL_LENGTH_HRS -
                INTERVAL_LENGTH_HRS * i;

            const suffix = (function(time) {
                switch(time) {
                    case 0:
                        return '';
                    case 5:
                        return '-m05m';
                    default:
                        return '-m' + time + 'm';
                }
                })(timeDiffMins);

            const layerRequest = this.NEXRAD_LAYER + suffix;
            console.log(this.NEXRAD_URL)
            const layer = L.tileLayer.wms(this.NEXRAD_URL, {
                layers: layerRequest,
                format: `image/png`,
                transparent: true,
                opacity: this.options.opacity,
                zIndex: this.options.zIndex
            });

            const timeString = new Date(
                currentTime.valueOf() - timeDiffMins * 60 * 1000
            ).toLocaleTimeString();
            timeLayers.push({
                timestamp: `${timeString} (-${timeDiffMins} min)`,
                tileLayer: layer
            });
        }
        return timeLayers;
    }
});
// *** END OF RADAR MAP ***


// *** BEGINNING OF WWA MAP ***
L.Control.WWA = L.Control.extend({

	WWA_URL: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_warnings_time/MapServer/WmsServer?',
	// Refer to https://nowcoast.noaa.gov/help/#!section=wms-layer-ids for layer IDs
  WWA_LAYER: '4',
  WWA_LAYERS: ['2','3','4','5','6','7'],

    isPaused: false,
    timeLayerIndex: 0,
    timeLayers: [],

    options: {
        position: `topright`,
        opacity: 0.25,
        zIndex: 200,
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
        this.container = L.DomUtil.create(`div`, "leaflet-wwa");

        L.DomEvent.disableClickPropagation(this.container);
        L.DomEvent.on(this.container, `control_container`, function (e) {
            L.DomEvent.stopPropagation(e);
        });
        L.DomEvent.disableScrollPropagation(this.container);

        // add control elements within container
        checkbox_div = L.DomUtil.create(
            `div`,
            `leaflet-wwa-toggle`,
            this.container
        );

        this.checkbox = document.createElement(`input`);
        this.checkbox.id = `wwa-toggle`;
        this.checkbox.type = `checkbox`;
        this.checkbox.checked = false;
        this.checkbox.onclick = () => this.toggle();

        checkbox_div.appendChild(this.checkbox);

        let checkbox_label = document.createElement(`span`);
        checkbox_label.innerText = `Short Duration Hazards`;

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
            this.removeLayer(wwa_layer);
            return;
        }

        wwa_layer = this.generateLayers();
		this.addLayer(wwa_layer);
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


    removeLayer: function (wwa_layer) {
        //console.log(wwa_layer);
        wwa_layer.removeFrom(this.map);
    },

	addLayer: function (wwa_layer) {
	    wwa_layer.addTo(this.map);
	},

    generateLayers: function () {
        const layerRequest = this.WWA_LAYERS;
      	//console.log(layerRequest);
        //console.log(this.WWA_URL);
        const wwa_layer = L.tileLayer.wms(this.WWA_URL, {
            layers: layerRequest,
            format: `image/png`,
            transparent: true,
            opacity: this.options.opacity,
            zIndex: this.options.zIndex
        });

		return wwa_layer
    }
});
// *** END OF WWA MAP ***




// *** BEGINNING OF WATCH MAP ***
L.Control.WATCH = L.Control.extend({

	WATCH_URL: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_longduration_hazards_time/MapServer/WmsServer?',
	// Refer to https://nowcoast.noaa.gov/help/#!section=wms-layer-ids for layer IDs
  WATCH_LAYERS: ['2','5','8','11','14','18','21','25','28','32','35','39','42'],

  //WATCH_URL: `https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer?`,
  //WATCH_LAYERS: [`1`],

  //WATCH_URL: `https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_imagery_time/MapServer/WMSServer?`,
  //WATCH_LAYERS: [`25`],

    isPaused: false,
    timeLayerIndex: 0,
    timeLayers: [],

    options: {
        position: `topright`,
        opacity: 0.28,
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
        this.container = L.DomUtil.create(`div`, "leaflet-watch");

        L.DomEvent.disableClickPropagation(this.container);
        L.DomEvent.on(this.container, `control_container`, function (e) {
            L.DomEvent.stopPropagation(e);
        });
        L.DomEvent.disableScrollPropagation(this.container);

        // add control elements within container
        checkbox_div = L.DomUtil.create(
            `div`,
            `leaflet-watch-toggle`,
            this.container
        );

        this.checkbox = document.createElement(`input`);
        this.checkbox.id = `watch-toggle`;
        this.checkbox.type = `checkbox`;
        this.checkbox.checked = false;
        this.checkbox.onclick = () => this.toggle();

        checkbox_div.appendChild(this.checkbox);

        let checkbox_label = document.createElement(`span`);
        checkbox_label.innerText = `Long Duration Hazards`;

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
            //console.log(layer)
            this.removeLayer(watch_layer);
            return;
        }

        watch_layer = this.generateLayers();
		    this.addLayer(watch_layer);
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


    removeLayer: function (watch_layer) {
        console.log(watch_layer);
        watch_layer.removeFrom(this.map);
    },

	addLayer: function (watch_layer) {
	    watch_layer.addTo(this.map);
	},

    generateLayers: function () {
        const layerRequest = this.WATCH_LAYERS;
      	//console.log(layerRequest);
        //console.log(this.WATCH_URL);
        const watch_layer = L.tileLayer.wms(this.WATCH_URL, {
            layers: layerRequest,
            format: `image/png`,
            //time: '2020-02-08-T23:15:00.000Z',
            transparent: true,
            opacity: this.options.opacity,
            zIndex: this.options.zIndex
        });

		return watch_layer
     }
});

// *** END OF WATCH MAP ***






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



L.control.radar = function (options) {
    return new L.Control.Radar(options);
};

L.control.wwa = function (options) {
    return new L.Control.WWA(options);
};

L.control.watch = function (options) {
    return new L.Control.WATCH(options);
};

function onPageLoad_ClickRadar() {
  document.getElementById("leaflet-radar-toggle").click();
}

function onPageLoad_ClickWWA() {
  document.getElementById(`wwa-toggle`).click();
}

function onPageLoad_ClickWATCH() {
  document.getElementById(`watch-toggle`).click();
}
