// TODO add refresh (reload time layers)
// TODO add buffer time to load layers where radar turned on

// *** BEGINNING OF RADAR MAP ***
L.Control.Surface = L.Control.extend({

    // nowcoast GOES (vis, long/short IR, WV only - but time enabled)
    SURFACE_URL: `https://nowcoast.noaa.gov/arcgis/services/nowcoast/obs_meteocean_insitu_sfc_time/MapServer/WMSServer?`,
    SURFACE_LAYER: [`24`,`25`,`26`,`27`,`28`,`29`,`30`,`31`,`32`,`33`],

    // IEM GOES (more options, but not time enabled)
    //SAT_URL: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_east.cgi',
    //SAT_LAYER: 'conus_ch13',

    isPaused: false,
    timeLayerIndex: 0,
    timeLayers: [],

    options: {
        position: `topright`,
        opacity: 1.0,
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
            `leaflet-surf-toggle`,
            this.container
        );

        this.checkbox = document.createElement(`input`);
        this.checkbox.id = `leaflet-surf-toggle`;
        this.checkbox.type = `checkbox`;
        this.checkbox.checked = false;
        this.checkbox.onclick = () => this.toggle();

        checkbox_div.appendChild(this.checkbox);

        let checkbox_label = document.createElement(`span`);
        checkbox_label.innerText = `Surface Obs`;

        checkbox_div.appendChild(checkbox_label);

        let slider_div = L.DomUtil.create(
            `div`,
            `leaflet-surf-slider`,
            this.container
        );

        this.slider = document.createElement(`input`);
        this.slider.id = `leaflet-surf-slider`;
        this.slider.type = `range`;
        this.slider.min = 0;


        slider_div.appendChild(this.slider);

        this.timestamp_div = L.DomUtil.create(
            `div`,
            `leaflet-surf-timestamp`,
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

            console.log(date);
            // Now go and request the layer
            const layerRequest = this.SURFACE_LAYER;
            console.log(this.SURFACE_LAYER);
            console.log(this.SURFACE_URL);
            const layer = L.tileLayer.wms(this.SURFACE_URL, {
                layers: layerRequest,
                //format: `image/png`,
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
  document.getElementById("leaflet-surf-toggle").click();
}
