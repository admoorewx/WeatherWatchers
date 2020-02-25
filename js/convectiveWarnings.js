// TODO add refresh (reload time layers)
// TODO add buffer time to load layers where radar turned on

// *** BEGINNING OF Severe T-storm Warning ***
L.Control.WWA = L.Control.extend({

  //WWA_URL: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_warnings_time/MapServer/WMSServer?request=GetCapabilities&service=WMS&version=1.3.0',
	WWA_URL: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_warnings_time/MapServer/WmsServer?',
	//WWA_LAYER: 'wwa_meteoceanhydro_shortduration_hazards_warnings_time',
  WWA_LAYER: '4',
	//WWA_URL: `https://mesonet.agron.iastate.edu/wfs/ww.php?`,
	//WWA_LAYER: 'warnings_c',

    isPaused: false,
    timeLayerIndex: 0,
    timeLayers: [],

    options: {
        position: `topright`,
        opacity: 0.3,
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
        this.container = L.DomUtil.create(`div`, "svrWarn");

        L.DomEvent.disableClickPropagation(this.container);
        L.DomEvent.on(this.container, `control_container`, function (e) {
            L.DomEvent.stopPropagation(e);
        });
        L.DomEvent.disableScrollPropagation(this.container);

        // add control elements within container
        checkbox_div = L.DomUtil.create(
            `div`,
            `leaflet-svrWarn-toggle`,
            this.container
        );

        this.checkbox = document.createElement(`input`);
        this.checkbox.id = `svrWarn-toggle`;
        this.checkbox.type = `checkbox`;
        this.checkbox.checked = false;
        this.checkbox.onclick = () => this.toggle();

        checkbox_div.appendChild(this.checkbox);

        let checkbox_label = document.createElement(`span`);
        checkbox_label.innerText = `Severe T-storm Warnings`;

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
        const layerRequest = this.WWA_LAYER;
      	console.log(this.WWA_URL);
        const layer = L.tileLayer.wms(this.WWA_URL, {
            layers: layerRequest,
            //format: `image/png`,
            transparent: false,
            opacity: this.options.opacity,
            zIndex: this.options.zIndex
        });

		return layer
     }
});

// *** END OF Severe T-storm Warning ***


// *** BEGINNING OF Tornado Warning ***
L.Control.WWA = L.Control.extend({

  //WWA_URL: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_warnings_time/MapServer/WMSServer?request=GetCapabilities&service=WMS&version=1.3.0',
	WWA_URL: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_warnings_time/MapServer/WmsServer?',
	//WWA_LAYER: 'wwa_meteoceanhydro_shortduration_hazards_warnings_time',
  WWA_LAYER: '6',
	//WWA_URL: `https://mesonet.agron.iastate.edu/wfs/ww.php?`,
	//WWA_LAYER: 'warnings_c',

    isPaused: false,
    timeLayerIndex: 0,
    timeLayers: [],

    options: {
        position: `topright`,
        opacity: 0.3,
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
        checkbox_label.innerText = `Current Hazards`;

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
        const layerRequest = this.WWA_LAYER;
      	console.log(this.WWA_URL);
        const layer = L.tileLayer.wms(this.WWA_URL, {
            layers: layerRequest,
            //format: `image/png`,
            transparent: false,
            opacity: this.options.opacity,
            zIndex: this.options.zIndex
        });

		return layer
     }
});

// *** END OF WWA MAP ***



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

function onPageLoad_ClickRadar() {
  document.getElementById("leaflet-radar-toggle").click();
}

function onPageLoad_ClickWWA() {
  document.getElementById(`wwa-toggle`).click();
}
