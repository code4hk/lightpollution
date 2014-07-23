//RequireJs
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

define(['jquery', 'jqueryui', 'handlebars'], function($, _Handlebars, _$) {
    //     //TODO as requirejs module
    var proto = $.ui.autocomplete.prototype,
        initSource = proto._initSource;

    $.extend(proto, {
        _initSource: function() {
            if (this.options.html && $.isArray(this.options.source)) {
                this.source = function(request, response) {
                    response(filter(this.options.source, request.term));
                };
            } else {
                initSource.call(this);
            }
        },

        _renderItem: function(ul, item) {
            return $("<li></li>").data("item.autocomplete", item).append($("<a></a>")[this.options.html ? "html" : "text"](item.label)).appendTo(ul);
        }
    });



    function filter(array, term) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
        return $.grep(array, function(value) {
            return matcher.test($("<div>").html(value.label || value.value || value).text());
        });
    }

    function showFileType(_content_type) {
        if (_content_type === "text/plain") {
            return "Text File";
        }
        return "File";
    }

    //View only

    function showProvider(provider) {
        //e.g. show dropbox logo
    }
    // fields["file_attachment"]._name +

    //distinguish naming for generated or from index?
    var LABEL_TEMPLATE = '<p><strong>{{fields.file_attachment._name}}</strong>:</p><p>File Type:{{fields.file_type}}</p><p>score:{{item._score}}</p>';
    var labelTemplate = Handlebars.compile(LABEL_TEMPLATE);

    function createFileResultLabel(item) {
        var fields = item.fields;
        if (!fields) return 'error';
        var label = labelTemplate(fields);
        return label;
    }


    Handlebars.render = function(context, input) {
        var template = Handlebars.compile(input);
        return template(context);
    }

    var search_init = function() {
        // $.placeholder();
        var elastic_search_url = "http://localhost:9200/mydocs/_search";
        var searchRequest = undefined;
        var previousQueryString = "";
        // $("#search-form").submit(function() {
        // // console.log("registered search helper");
        // })

        //Less releavant. should guess by tike or so


        //the mapping should sync
        //read from a mapping
        $("#search-box").autocomplete({
            // Triggered before a search is performed, after minLength and delay are met.
            // If canceled, then no request will be started and no items suggested.
            search: function() {
                console.log("search")
                if (this.value.trim() != previousQueryString) {
                    previousQueryString = this.value.trim();
                    return true;
                }
                return false;
            },
            source: function(request, response) {
                if (searchRequest && searchRequest.readyState < 4) {
                    searchRequest.abort();
                }
                var q = request.term;
                // var re = /[^ *]/;
                searchRequest = $.ajax({
                    url: [elastic_search_url, $.param({
                            fields: "name,postDate,file_attachment",
                            size: 25,
                            q: q,
                            default_operator: "AND"
                        })].join("?"),
                    dataType: "jsonp",
                    success: function(data) {
                        response($.map(data.hits.hits, function(item) {
                            console.log("item:");
                            console.log(item);
                            var label = createFileResultLabel(item);
                            var fileUrlTemplate = Handlebars.compile('file://{{item.fields.file_attachment._name}}');
                            var filelUrl = fileUrlTemplate(item);

                            var fileName = '';
                            if ((item.fields || {})['file_attachment']) {
                                fileName = 'file://' + item.fields['file_attachment']._name;
                            }
                            return {
                                // label: '<p><strong>' + item["fields"]["file_attachment"]._name + '</strong>' + ' <em>' + $.datepicker.formatDate('yy-mm-dd', new Date(item.fields.postDate)) + '</em>' + '</p>' + '<p><small>' + item.fields.url + '</small></p>',
                                label: label,
                                value: fileName,
                                url: 'fileUrl'
                            }
                        }));
                    },
                    error: function(jqXHR, textStatus, err) {
                        console.log("error");
                        response(["shit happens"]);
                    }
                });
            },
            minLength: 2,
            html: true,
            appendTo: "#search-result",
            select: function(event, ui) {
                console.log("selected" + ui.item.value);
                event.preventDefault();
                // ui.item ? document.location.href = ui.item.url : null;

                //Generate protocols 
                // window.open(ui.item.url);
            },
            open: function() {
                // $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
            },
            close: function() {
                // $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
            }
        });
    };

    return {
        search_init: search_init
    };



});