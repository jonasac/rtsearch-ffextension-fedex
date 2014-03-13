var searchButton = document.getElementById('search');

function getValue(field) {
    return document.getElementById(field).value;
}

function assertContent() {
    var ticketnr = getValue('ticketnr');
    var requestor = getValue('requestor');
    var subject = getValue('subject');
    var queue = getValue('queue');
    var status = getValue('status');
    var owner = getValue('owner');

    if (ticketnr !== "") {
        return true;
    }

    if (requestor !== "") {
        return true;
    }

    if (subject !== "") {
        return true;
    }

    if (queue !== "") {
        return true;
    }

    if (status !== "") {
        return true;
    }

    if (owner !== "") {
        return true;
    }

    return false;
}

function getFields() {
    var ticketnr = getValue('ticketnr');
    var requestor = getValue('requestor');
    var subject = getValue('subject');

    var queue = getValue('queue');
    var status = getValue('status');
    var owner = getValue('owner');

    if (ticketnr !== "") {
        return ticketnr;
    }

    if (subject !== "") {
        return subject;
    }

    if (requestor !== "") {
        return requestor;
    }

    var tmp = [];
    if (queue !== "") {
        tmp.push("queue:" + queue);
    }

    if (status !== "") {
        tmp.push("status:" + status);
    }

    if(owner !== "") {
        tmp.push("owner:" + owner);
    }


    return tmp.join(" ");
}
searchButton.onclick = function(event) {
    if (assertContent()) {
        self.port.emit("search", getFields());
    }
}

self.port.on("show", function(a) {
    document.getElementById("ticketnr").focus();
});

var container = document.getElementById("content");
self.port.emit("resize", {
    width: container.offsetWidth,
    height: container.offsetHeight
});

window.onkeyup = function(event) {
    if (event.keyCode == 13 && assertContent()) {
        self.port.emit("search", getFields());
    }
}
