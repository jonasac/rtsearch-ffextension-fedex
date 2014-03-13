var data = require("sdk/self").data;
var tabs = require("sdk/tabs");

var instanceLocation = require("sdk/simple-prefs").prefs['instanceLocation'];

var rtpanel = require("sdk/panel").Panel({
    width: 215,
    height: 308,
    contentURL: data.url("rtsearch.html"),
    contentScriptFile: data.url("rtsearch.js")
});

require("sdk/widget").Widget({
    id: "open-rtsearch-btn",
    label: "rtsearch",
    contentURL: "https://rt.uio.no/NoAuth/images/favicon.png",
    panel: rtpanel
});

rtpanel.on("show", function() {
    rtpanel.port.emit("show");
});

rtpanel.port.on("search", function(text) {
    var url = instanceLocation + "/Search/Simple.html?q=";
    tabs.open(url + encodeURIComponent(text));
    rtpanel.hide();
});

rtpanel.port.on("resize", function(obj) {
    rtpanel.resize(obj.width, obj.height);
});
