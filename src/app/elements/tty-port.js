var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

console.log('tty-port:scope');

function toHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return hex;
}

Polymer('tty-port', {
    // selected: null,
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

        this.logger = document.querySelector('x-logger');
        // this.SerialPort = serialPort.SerialPort;
        this.serialPort = null;

        serialport.list(function(err, ports) {
            ports.forEach(function(port) {
                var option = new Option();
                option.text = port.comName + " (" + port.pnpId +
                    ") ";
                option.value = port.comName;
                that.$.port.appendChild(option);
                console.log(port.comName);
                console.log(port.pnpId);
                console.log(port.manufacturer);
            });
        });
    },
    detach: function() {
        console.log('detach');
        if(this.serialPort) {
            this.serialPort.close();
        }
    },
    enteredView: function() {
        // console.log("tty-port enteredView", this);
    },
    changeColor: function(event, detail, sender) {
        console.log('connect', this.$.color.value);
    },
    buttonConnect: function(event, detail, sender) {
        var that = this;
        var port = that.$.port.value;
        var boudrate = that.$.boudrate.value;
        var color = that.$.color.value;
        console.log('connect', port, boudrate);
        that.logger.addline('connect to ' + port + ' at ' + boudrate, color);

        that.serialPort = new SerialPort(port, {
            baudrate: boudrate | 0,
            parser: serialport.parsers.readline("\n")
        });

        that.serialPort.on("open", function () {

        //   console.log('open');
          that.logger.addline('connected ' + port, color);
          that.serialPort.on('data', function(data) {
            // console.log('data received: ' + toHex(data));
            if((data === '\r') || (data === '')) return;
            that.logger.addline(data, that.$.color.value);
          });
        });
        that.serialPort.on("close", function () {
        //   console.log('close');
          that.logger.addline('disconnected ' + port, color);
      });

    },
    buttonDisconnect: function(event, detail, sender) {
        if(this.serialPort) {
            this.serialPort.close();
        }
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
