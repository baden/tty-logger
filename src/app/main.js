/* global jQuery:true, d3:true */

(function($, d3){

    'use strict';

    var serialPort = require("serialport");
    console.log('serialPort=', serialPort);

    var logger = document.querySelector('x-logger');
    console.log('logger=', logger);

    $('#test').click(function(){
        // console.log('click');

        logger.addline('Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello ', '#0ff');

    });

    var ports = document.querySelector('#ports');
    console.log('ports=', ports);

    document.querySelector('#addtty').addEventListener('click', function(){
            console.log('add port');
            var li = document.createElement('li');
            var portelement = document.createElement('tty-port');
            li.appendChild(portelement);
            li.className = "list-group-item";
            ports.appendChild(li);

    });

    // $('#addtty').click(function(){
    //         var portelement = document.createElement('tty-port');
    //         ports.appendChild(portelement);
    // });

})(jQuery, d3);
