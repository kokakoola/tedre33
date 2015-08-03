// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*!
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see http://creativecommons.org/licenses/by/3.0/.
 */

// See the Getting Started docs for more information:
// http://getbootstrap.com/getting-started/#support-ie10-width

(function () {
    'use strict';
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style')
        msViewportStyle.appendChild(
            document.createTextNode(
                '@-ms-viewport{width:auto!important}'
                )
            )
        document.querySelector('head').appendChild(msViewportStyle)
    }
})();

var appartmentNr;

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    initSpreadsheet();
    createPageNr();
});

function initSpreadsheet() {
  Tabletop.init( { 
    key: '1zY_w5nVHgh8D2GcVyV8v055gkFjTsqt13FGXMzKaqeM',
    callback: displayPricelist,
    simpleSheet: true } );
}

function displayPricelist(data, tabletop) {
    var i,
    dataLength = data.length;

    if($("#tableData").length) {
        for (i=0; i<dataLength; i++) {

            $('#tableData').append(
                $('<tr class="clickable-row" data-url="hinnad/krt-' + data[i].krtnr + '.html">
                    <th scope="row">' + data[i].krtnr +'</th>
                    <td>' + data[i].korrus +'</td>
                    <td>' + data[i].suurus +'</td>
                    <td>' + data[i].tube +'</td>
                    <td>' + data[i].rodu +'</td>
                    <td>' + data[i].terrass +'</td>
                    <td>' + data[i].mhind +'</td>
                    <td>' + data[i].hind +'</td>
                    <td>' + data[i].lisainfo +'</td>
                    <td>' + data[i].staatus +'</td>
                    </tr>'
                )
            );
        }

        $(".clickable-row").click(function() {
            window.document.location = $(this).data('url');
        }); 
    }
    else if ($("#appartmentDetailTable").length) {
        var apartmentNr = getApartmentNr();
        var dataApartment = data[apartmentNr-1];

        $('#appartmentDetailTable').append(
            $('<tr class="clickable-row" data-url="hinnad/krt-' + dataApartment.krtnr + '.html">
                <th scope="row">' + dataApartment.hind +'</th>
                <td>' + dataApartment.krtnr +'</td>
                </tr>'
            )
        );
    }
}

function createPageNr() {
    var apartmentNr = getApartmentNr();
    $('#appartmentDetailHead').append(
        $('<h1> Krt nr on ' + apartmentNr + '</h1>'
        )
    );
}

function getApartmentNr() {
    var href = $(window.document.location).attr("href");
    var lastSegment = href.split('/').pop();
    var removeHtml = lastSegment.split('.').shift();
    return removeHtml.split('-').pop();
}



