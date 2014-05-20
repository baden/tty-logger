/* global Polymer:true, jQuery:true, d3:true */

(function(Polymer, $, d3){

    'use strict';

    var format = d3.time.format('%H:%M:%S');
    var deltaformat = d3.format('.3f');

    var Logger = function(container) {
        this.container = container;
        this.lastdatetime = new Date();
    }

    Logger.prototype.append = function(text, color) {
        var datetime = new Date();
        var delta = (datetime - this.lastdatetime) / 1000;
        // console.log('append', text);
        $(this.container).append('<p style="color: ' + color + '"><span class="datetime">' + format(datetime) + '</span><span class="delta">' + deltaformat(delta) + '</span>' + text + '</p>');
        this.lastdatetime = datetime;
        if(true) {
            $(this.container).scrollTop(1e6);
        }
    }


Polymer('x-logger', {
    created: function() {
    },
    ready: function() {
        var container = this.$.log;
        this.logger = new Logger(container);
        console.log('x-logger', this.logger);
    },

    addline: function(text, color) {
        console.log('addline', text, color);
        this.logger.append(text, color);
    }

});

})(Polymer, jQuery, d3);
