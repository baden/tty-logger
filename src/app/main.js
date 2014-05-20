/* global jQuery:true, d3:true */

(function($, d3){

    'use strict';

    var format = d3.time.format('%H:%M:%S');
    var deltaformat = d3.format('.3f');

    var Logger = function(container) {
        this.container = $(container);
        this.lastdatetime = new Date();
    }

    Logger.prototype.append = function(text) {
        var datetime = new Date();
        var delta = (datetime - this.lastdatetime) / 1000;
        // console.log('append', text);
        this.container.append('<p><a></a><span class="datetime">' + format(datetime) + '</span><span class="delta">' + deltaformat(delta) + '</span>' + text + '</p>');
        this.lastdatetime = datetime;
        if(true) {
            this.container.scrollTop(1e6);
        }
    }

    var logger = new Logger('pre#log');

    $('#test').click(function(){
        // console.log('click');

        logger.append('Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello ');


        // var n = $("#tail");
        // console.log('n=', n);
        // var t = $(logwindow).scrollTop() - $("#log").offset().top;
        // console.log('t=', t);
        // var e = $("#log").height() - $("#tail").height()+5
        // console.log('e=', e);

        // function(){
        //     var e,t,n;
        //     n=$("#tail");
        //     if(n.length===0)return;
        //     t = $(window).scrollTop() - $("#log").offset().top;
        //     e = $("#log").height() - $("#tail").height()+5
        //     t>e&&(t=e),t>0?n.css({top:t-2}):n.css({top:0})
        // }

    });


})(jQuery, d3);
