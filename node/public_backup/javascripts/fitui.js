/*
* TODO refactor as a search module
*
*/

// var $ = require("jquery");
/*
* jQuery UI Autocomplete HTML Extension
*
* Copyright 2010, Scott Gonz‡lez (http://scottgonzalez.com)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* http://github.com/scottgonzalez/jquery-ui-extensions
*/

//Allow render autocomplete as HTML
(function($) {

    var proto = $.ui.autocomplete.prototype, initSource = proto._initSource;

    function filter(array, term) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
        return $.grep(array, function(value) {
            return matcher.test($("<div>").html(value.label || value.value || value).text());
        });
    }


    $.extend(proto, {
        _initSource : function() {
            if(this.options.html && $.isArray(this.options.source)) {
                this.source = function(request, response) {
                    response(filter(this.options.source, request.term));
                };
            } else {
                initSource.call(this);
            }
        },

        _renderItem : function(ul, item) {
            return $("<li></li>").data("item.autocomplete", item).append($( "<a></a>" )[ this.options.html ? "html" : "text" ](item.label)).appendTo(ul);
        }
    });

})($);

var search_init = function() {
    // $.placeholder();
    var elastic_search_url = "http://localhost:9200/mydocs/_search";
    var searchRequest = undefined;
    var previousQueryString = "";
    // $("#search-form").submit(function() {
    // // console.log("registered search helper");
    // })
    $("#search-box").autocomplete({
        // Triggered before a search is performed, after minLength and delay are met.
        // If canceled, then no request will be started and no items suggested.
        search : function() {
            console.log("search")
            if(this.value.trim() != previousQueryString) {
                previousQueryString = this.value.trim();
                return true;
            }
            return false;
        },

        source : function(request, response) {
            if(searchRequest && searchRequest.readyState < 4) {
                searchRequest.abort();
            }
            var q = request.term;
            // var re = /[^ *]/;
            searchRequest = $.ajax({
                url : [elastic_search_url, $.param({
                    fields : "name,postDate",
                    size : 25,
                    q : q,
                    default_operator : "AND"
                })].join("?"),
                dataType : "jsonp",
                success : function(data) {
                    response($.map(data.hits.hits, function(item) {
                        console.log("item:");
                        console.log(item);
                        return {
                            label : '<p><strong>' + item.fields.name + '</strong>' + ' <em>' + $.datepicker.formatDate('yy-mm-dd', new Date(item.fields.postDate)) + '</em>' + '</p>' + '<p><small>' + item.fields.url + '</small></p>',
                            value : 'file:/' + item.fields.name,
                            url : item.fields.name
                        }
                    }));
                },
                error : function(jqXHR, textStatus, err) {
                    console.log("error");
                    response(["shit happens"]);
                }
            });
        },
        minLength : 2,
        html : true,
        appendTo : "#search-result",
        select : function(event, ui) {
            console.log("selected" + ui.item.value);
            event.preventDefault();
            // ui.item ? document.location.href = ui.item.url : null;
            
            //Generate protocols 
            // window.open(ui.item.url);
        },
        open : function() {
            // $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close : function() {
            // $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });
};
