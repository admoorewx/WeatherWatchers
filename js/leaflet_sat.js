// TODO add refresh (reload time layers)
// TODO add buffer time to load layers where radar turned on

// *** BEGINNING OF RADAR MAP ***
L.Control.Sat = L.Control.extend({

    // nowcoast GOES (vis, long/short IR, WV only - but time enabled)
    SAT_URL: `https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_imagery_time/MapServer/WMSServer?`,
    SAT_LAYER: `17`,

    // IEM GOES (more options, but not time enabled)
    //SAT_URL: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_east.cgi',
    //SAT_LAYER: 'conus_ch13',

    isPaused: false,
    timeLayerIndex: 0,
    timeLayers: [],

    options: {
        position: `topright`,
        opacity: 0.75,
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
        this.container = L.DomUtil.create(`div`, "leaflet-sat");

        L.DomEvent.disableClickPropagation(this.container);
        L.DomEvent.on(this.container, `control_container`, function (e) {
            L.DomEvent.stopPropagation(e);
        });
        L.DomEvent.disableScrollPropagation(this.container);

        // add control elements within container
        checkbox_div = L.DomUtil.create(
            `div`,
            `leaflet-sat-toggle`,
            this.container
        );

        this.checkbox = document.createElement(`input`);
        this.checkbox.id = `leaflet-sat-toggle`;
        this.checkbox.type = `checkbox`;
        this.checkbox.checked = false;
        this.checkbox.onclick = () => this.toggle();

        checkbox_div.appendChild(this.checkbox);

        let checkbox_label = document.createElement(`span`);
        checkbox_label.innerText = `GOES-R IR Longwave`;

        checkbox_div.appendChild(checkbox_label);

        let slider_div = L.DomUtil.create(
            `div`,
            `leaflet-sat-slider`,
            this.container
        );

        this.slider = document.createElement(`input`);
        this.slider.id = `leaflet-sat-slider`;
        this.slider.type = `range`;
        this.slider.min = 0;


        slider_div.appendChild(this.slider);

        this.timestamp_div = L.DomUtil.create(
            `div`,
            `leaflet-sat-timestamp`,
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

        const TOTAL_INTERVALS = 5; // how many timesteps
        const INTERVAL_LENGTH_HRS = 10; // how long between each time step (min)

        // Get UTC time
        const now = new Date();
        const currentUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        // Loop through each interval
        for (let i = TOTAL_INTERVALS; i >= 0; i--) {
            // Get UTC time
            const now = new Date();
            const currentUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            // Get the timestamp for the request and a date/time to display
            var datetime = currentUTC
            datetime.setMinutes(currentUTC.getUTCMinutes() - (i * INTERVAL_LENGTH_HRS));
            //formatTime = datetime.getUTCFullYear() + '-' + datetime.getUTCMonth() +'-'+ datetime.getUTCDate() +'-T'+ datetime.getUTCHours()+':'+datetime.getUTCMinutes()+':00.000Z';

            var date = new Date(datetime.getTime() - datetime.getTimezoneOffset()*60*1000).toISOString().substr(0,23).replace('T', '-T');

            //console.log(times[0].substr(0,10)+'-'+times[0].substr(10,23));
            // Now go and request the layer
            const layerRequest = this.SAT_LAYER;
            //console.log(this.SAT_LAYER);
            //console.log(this.SAT_URL);
            const layer = L.tileLayer.wms(this.SAT_URL, {
                layers: layerRequest,
                format: `image/png`,
                //time: '2020-02-08-T23:15:00.000Z',
                time: date,
                //2020-02-09T03:03:49.000Z
                transparent: false,
                opacity: this.options.opacity,
                zIndex: this.options.zIndex
            });

            //const timeString = times[1].toLocaleTimeString();
            const timeString = datetime.toString().substr(0,21);
            timeLayers.push({
                timestamp: `${timeString}` + ' UTC',
                tileLayer: layer
            });
        }
        return timeLayers;
    }
});
// *** END OF SAT MAP ***

////////////////////////////////////////////////////////////////////////////////

L.Control.GLM = L.Control.extend({

    // nowcoast GOES (Lightning- time enabled)
    GLM_URL: `https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer/WMSServer?`,
    GLM_LAYER: `1`,

    // IEM GOES (more options, but not time enabled)
    //SAT_URL: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_east.cgi',
    //SAT_LAYER: 'conus_ch13',

    isPaused: false,
    timeLayerIndex: 0,
    timeLayers: [],

    options: {
        position: `topright`,
        opacity: 0.95,
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
        this.container = L.DomUtil.create(`div`, "leaflet-glm");

        L.DomEvent.disableClickPropagation(this.container);
        L.DomEvent.on(this.container, `control_container`, function (e) {
            L.DomEvent.stopPropagation(e);
        });
        L.DomEvent.disableScrollPropagation(this.container);

        // add control elements within container
        checkbox_div = L.DomUtil.create(
            `div`,
            `leaflet-glm-toggle`,
            this.container
        );

        this.checkbox = document.createElement(`input`);
        this.checkbox.id = `leaflet-glm-toggle`;
        this.checkbox.type = `checkbox`;
        this.checkbox.checked = false;
        this.checkbox.onclick = () => this.toggle();

        checkbox_div.appendChild(this.checkbox);

        let checkbox_label = document.createElement(`span`);
        checkbox_label.innerText = `GOES-R GLM`;

        checkbox_div.appendChild(checkbox_label);

        let slider_div = L.DomUtil.create(
            `div`,
            `leaflet-glm-slider`,
            this.container
        );

        this.slider = document.createElement(`input`);
        this.slider.id = `leaflet-glm-slider`;
        this.slider.type = `range`;
        this.slider.min = 0;


        slider_div.appendChild(this.slider);

        this.timestamp_div = L.DomUtil.create(
            `div`,
            `leaflet-glm-timestamp`,
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

        const TOTAL_INTERVALS = 5; // how many timesteps
        const INTERVAL_LENGTH_HRS = 10; // how long between each time step (min)

        // Get UTC time
        const now = new Date();
        const currentUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        // Loop through each interval
        for (let i = TOTAL_INTERVALS; i >= 0; i--) {
            // Get UTC time
            const now = new Date();
            const currentUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            // Get the timestamp for the request and a date/time to display
            var datetime = currentUTC
            datetime.setMinutes(currentUTC.getUTCMinutes() - (i * INTERVAL_LENGTH_HRS));
            //formatTime = datetime.getUTCFullYear() + '-' + datetime.getUTCMonth() +'-'+ datetime.getUTCDate() +'-T'+ datetime.getUTCHours()+':'+datetime.getUTCMinutes()+':00.000Z';

            var date = new Date(datetime.getTime() - datetime.getTimezoneOffset()*60*1000).toISOString().substr(0,23).replace('T', '-T');

            //console.log(times[0].substr(0,10)+'-'+times[0].substr(10,23));
            // Now go and request the layer
            const layerRequest = this.GLM_LAYER;
            //console.log(this.SAT_LAYER);
            //console.log(this.SAT_URL);
            const layer = L.tileLayer.wms(this.GLM_URL, {
                layers: layerRequest,
                format: `image/png`,
                //time: '2020-02-08-T23:15:00.000Z',
                time: date,
                //2020-02-09T03:03:49.000Z
                transparent: true,
                opacity: this.options.opacity,
                zIndex: this.options.zIndex
            });

            //const timeString = times[1].toLocaleTimeString();
            const timeString = datetime.toString().substr(0,21);
            timeLayers.push({
                timestamp: `${timeString}` + ' UTC',
                tileLayer: layer
            });
        }
        return timeLayers;
    }
});
// *** END OF Lightning MAP ***


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



L.control.sat = function (options) {
    return new L.Control.Sat(options);
};

L.control.glm = function (options) {
    return new L.Control.GLM(options);
};

function onPageLoad_ClickSat() {
  document.getElementById("leaflet-sat-toggle").click();
}

function onPageLoad_ClickGLM() {
  document.getElementById("leaflet-glm-toggle").click();
}
