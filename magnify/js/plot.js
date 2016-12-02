
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
    plotOptions: {
        series: {
            animation: false
        }
    },
    credits: { enabled: false }
    // legend: {layout: 'vertical', align: 'right', verticalAlign: 'middle'}
}

var wf_chart = null
var heatmap_chart = null

$.when(xhr_all).done(function(){
    var wfOptions = {
        chart: {renderTo: 'waveforms'},
        series: [
            {
                name: 'Original',
                data: wf_data['orig'][current_ch]
            },
            {
                name: 'After noise filter',
                data: wf_data['nf'][current_ch]
            },
            {
                name: 'After deconvolution',
                color: 'red',
                data: wf_data['decon'][current_ch]
            }
        ],
        title: {text: 'TPC Wire Waveform'},
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

    var heatmapOptions = {
        chart: {type: 'heatmap', renderTo: 'heatmap-orig'},
        title: {text: 'Time vs. Wire'},
        tooltip: {
            crosshairs: [true,true],
            formatter: function () {
                // return '<b>' + this.point.value + ' at (' + this.point.x + ', ' + this.point.y + ')</b>';
            },
            borderWidth: 0, borderColor: '#000000', distance: 10, shadow: false,
            useHTML: true,
            style: {
                padding: 0,
                color: 'black'
            }
        },
        xAxis: {min: 0, max: 110,
            labels: {
                rotation: 90
            },
        },
        yAxis: {title: {text: null}, min: 0, max: 265,
            endOnTick: false
        },
        colorAxis: {
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
        series: [{
            borderWidth: 0,
            nullColor: '#EFEFEF',
            data: heatmap_data['orig'],
            events: {
                click: function (e) {
                    current_ch = e.point.x;
                    wf_chart.series[0].update({
                        data: wf_data['orig'][current_ch],
                    });
                    wf_chart.series[1].update({
                        data: wf_data['nf'][current_ch],
                    });
                    wf_chart.series[2].update({
                        data: wf_data['decon'][current_ch],
                    });
                    // console.log(channel);
                }
            }
        }]
    };
    var options_orig = $.extend(true, heatmapOptions, options);
    heatmap_chart_orig = new Highcharts.Chart(options_orig);

    var options_nf = $.extend(true, {}, options_orig);
    options_nf.chart.renderTo = 'heatmap-nf';
    options_nf.series[0].data = heatmap_data['nf'];
    heatmap_chart_nf = new Highcharts.Chart(options_nf);

    var options_decon = $.extend(true, {}, options_orig);
    options_decon.chart.renderTo = 'heatmap-decon';
    options_decon.series[0].data = heatmap_data['decon'];
    heatmap_chart_decon = new Highcharts.Chart(options_decon);

    $('#btn-orig').click(function(){
        $('#heatmap-nf').hide();
        $('#heatmap-decon').hide();
        $('#heatmap-orig').show();
    });
    $('#btn-nf').click(function(){
        $('#heatmap-orig').hide();
        $('#heatmap-decon').hide();
        $('#heatmap-nf').show();
    });
    $('#btn-decon').click(function(){
        $('#heatmap-orig').hide();
        $('#heatmap-nf').hide();
        $('#heatmap-decon').show();
    });

})