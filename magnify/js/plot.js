
var $statusbar = $('#statusbar');
var $current_wire = $('#current-wire');
var $heatmap_label = $('#heatmap-label');
var options = {
    chart: {
        zoomType: 'xy',
        animation: false,
        style: {
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '14px'
        },
        alignTicks: false
    },
    credits: { enabled: false },
    exporting: { enabled: false } // heatmap too large
}



$.when(xhr_all).done(function(){
    var wfOptions = {
        chart: {type: 'line', renderTo: 'waveforms'},
        series: [
            {
                name: 'Original',
                color: '#7570b3',
                data: wf_data['orig'][vm.current_wire]
            },
            {
                name: 'After noise filter',
                color: '#1b9e77',
                data: wf_data['nf'][vm.current_wire]
            },
            {
                name: 'After deconvolution',
                color: '#d95f02',
                data: wf_data['decon'][vm.current_wire]
            }
        ],
        title: {text: 'TPC Wire Waveform', align: 'left', x:30},
        legend: {
            verticalAlign: 'top',
            align: 'right'
        },
        xAxis: {gridLineWidth: 1, startOnTick: true, tickPosition: 'inside',
            min: 0,
            title: {text: "x3 microseconds", align: 'high'}
        },
        yAxis: {gridLineWidth: 1, startOnTick: true, tickPosition: 'inside',
            title: {text: "ADC"}
        }
    };
    // console.log(wfOptions);
    $.extend(true, wfOptions, options);
    wf_chart = new Highcharts.Chart(wfOptions);
    $current_wire.val(vm.current_wire);

    var heatmapOptions = {
        chart: {type: 'heatmap', renderTo: 'heatmap-orig'},
        title: {text: ''},
        tooltip: {
            crosshairs: [true,true],
            formatter: function () {
                // return '<b>' + this.point.value + ' at (' + this.point.x + ', ' + this.point.y + ')</b>';
            },
            borderWidth: 0, borderColor: '#000000', distance: 10, shadow: false,
            useHTML: true,
            style: {
                padding: 0,
                color: 'black',
            }
        },
        xAxis: {min: 0, max: 110,
            title: {text: 'Wire number'},
            // crosshair: {zIndex: 3}, // interferes with click event
            events: {
                afterSetExtremes: function (e) {
                    if(e.trigger == 'zoom') {
                        for (var i=0; i<data_names.length; i++) {
                            if (data_names[i] == this.chart.renderTo.id.substring(8, 12)) {continue;}
                            // console.log('called');
                            heatmap_chart[data_names[i]].xAxis[0].setExtremes(e.min, e.max);
                        }
                    }
                }
            }
        },
        yAxis: {title: {text: 'x3 microseconds'}, min: 0, max: 265,
            endOnTick: false,
            events: {
                afterSetExtremes: function (e) {
                    if (e.trigger == 'zoom') {
                       for (var i=0; i<data_names.length; i++) {
                           if (data_names[i] == this.chart.renderTo.id.substring(8, 12)) {continue;}
                           // console.log('called');
                           heatmap_chart[data_names[i]].yAxis[0].setExtremes(e.min, e.max);
                       }
                   }
                }
            }
        },
        colorAxis: {
            title: {text: 'ADC'},
            stops: [
                [0, '#3060cf'],
                [0.5, '#ffffff'],
                [0.9, '#c4463a'],
                [1, '#c4463a']
            ],
            min: -100, max: 100,
            startOnTick: false,
            endOnTick: false
        },
        legend: {
            align: "right",
        },
        plotOptions: {
            series: {animation: false,
                point: {
                    events: {
                        mouseOver: function (e) {
                            $statusbar.text(this.value + ' @(' + this.x + ', ' + this.y + ')');
                            wf_chart.xAxis[0].removePlotLine('plot-line');
                            wf_chart.xAxis[0].addPlotLine({
                                value: this.y,
                                color: 'black',
                                width: '1',
                                id: 'plot-line'
                            });
                        }
                    }
                }
            }
        },
        series: [{
            borderWidth: 0,
            nullColor: '#EFEFEF',
            data: heatmap_data['orig'],
            events: {
                click: function (e) {
                    vm.current_wire = e.point.x;
                }
            }
        }]
    };
    var options_orig = $.extend(true, heatmapOptions, options);
    heatmap_chart['orig'] = new Highcharts.Chart(options_orig);

    var options_nf = $.extend(true, {}, options_orig);
    // options_nf.title.text = 'After Noise Filter';
    options_nf.chart.renderTo = 'heatmap-nf';
    options_nf.series[0].data = heatmap_data['nf'];
    heatmap_chart['nf'] = new Highcharts.Chart(options_nf);

    var options_decon = $.extend(true, {}, options_orig);
    // options_decon.title.text = 'After Deconvolution';
    options_decon.chart.renderTo = 'heatmap-decon';
    options_decon.series[0].data = heatmap_data['decon'];
    heatmap_chart['decon'] = new Highcharts.Chart(options_decon);

    $('#btn-orig').click(function(){
        $('#heatmap-nf').hide();
        $('#heatmap-decon').hide();
        $('#heatmap-orig').show();
        $heatmap_label.text('Orignal');
        // wf_chart.series[0].zIndex = 3;
        // wf_chart.series[1].zIndex = 1;
        // wf_chart.series[2].zIndex = 2;
        // wf_chart.redraw();
    });
    $('#btn-nf').click(function(){
        $('#heatmap-orig').hide();
        $('#heatmap-decon').hide();
        $('#heatmap-nf').show();
        $heatmap_label.text('After noise filter');
    });
    $('#btn-decon').click(function(){
        $('#heatmap-orig').hide();
        $('#heatmap-nf').hide();
        $('#heatmap-decon').show();
        $heatmap_label.text('After Deconvolution');
    });

    $('#btn-prev').click(function(){
        vm.current_wire--;
    });
    $('#btn-next').click(function(){
        vm.current_wire++;
    });

    $('#btn-clean').click(function(){
        for (var i=0; i<data_names.length; i++) {
            heatmap_chart[data_names[i]].xAxis[0].removePlotLine('heatmap-line');
        }
        $statusbar.text('');
    })

})