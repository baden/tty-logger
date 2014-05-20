var serialPort = require("serialport");

console.log('tty-port:scope');

Polymer('tty-port', {
    selected: null,
    created: function() {
        // console.log("tty-port created");
        // var option = new Option();
        // option.text = "hallo";
        // this.$.select.appendChild(option);
    },
    ready: function() {
        var that = this;
        // console.log("tty-port ready", this.$);
        // return;

        this.$.color.value = "#ff0000";

        serialPort.list(function(err, ports) {
            ports.forEach(function(port) {
                var option = new Option();
                option.text = port.comName + " (" + port.pnpId +
                    ") ";
                option.value = port.comName;
                that.$.select.appendChild(option);
                console.log(port.comName);
                console.log(port.pnpId);
                console.log(port.manufacturer);
            });
        });
    },
    enteredView: function() {
        // console.log("tty-port enteredView", this);
    },
    mousedown: function(event) {
        console.log("tty-port: clicky");
    },
    buttonClick: function(event, detail, sender) {
        console.log('connect', this.$.color.value);
    },
    buttonRemove: function(event, detail, sender) {
        this.remove();
    }

});

console.log('g-cool:init');

Polymer('g-cool', {
    created: function() {
        console.log('g-cool:created');
    },
    ready: function() {
        console.log('g-cool:ready', this.$.button);
        var click = function(event) {
            console.log('g-cool:click');
        };
        this.$.button.addEventListener('click', click);
    },
    attached: function() {
        console.log('g-cool:attached');
    },
    domReady: function() {
        console.log('g-cool:domReady');
    },
    detached: function() {
        console.log('g-cool:detached');
    },
    keypressHandler: function(event, detail, sender) {
        console.log('g-cool:keypressHandler');
    },
    buttonClick: function(event, detail, sender) {
        console.log('g-cool:buttonClick');
    }
});
