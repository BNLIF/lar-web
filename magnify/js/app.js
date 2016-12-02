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

$.getJSON('tmp/orig.json', function(data){
    var wf_data = [ [] ];
    var channel = 30;
    var length = data.x.length;
    var x = 0;
    for (var i=0; i<length; i++) {
        if (x != data.x[i]) {
            x += 1;
            wf_data.push([]);
        }
        wf_data[x].push([data.y[i], data.value[i]]);
    }
    // console.log(wf_data);
    var wfOptions = {
        chart: {renderTo: 'waveforms'},
        series: [{
            data: wf_data[channel]
        }],
        title: {text: 'Waveform'},
        xAxis: {gridLineWidth: 1, startOnTick: true, tickPosition: 'inside', min: 0, title: "time [us]"},
        yAxis: {gridLineWidth: 1, startOnTick: true, tickPosition: 'inside', title: ''}
    };
    $.extend(true, wfOptions, options);
    u_wf = new Highcharts.Chart(wfOptions);
    // console.log(wfOptions);

    // console.log(data)
    var heatmap_data = [];
    for (var i=0; i<length; i++) {
        heatmap_data.push([data.x[i], data.y[i], data.value[i]*250]);
    }

    var highchartsOptions = {
        chart: {type: 'heatmap', renderTo: 'sig-orig'},
        title: {text: 'Time vs. Wire'},
        tooltip: {
            crosshairs: [true,true],
            formatter: function () {
                // return '<b>' + this.point.value + ' at (' + this.point.x + ', ' + this.point.y + ')</b>';
            },
            //backgroundColor: null,
            borderWidth: 0,
            borderColor: '#000000',
            distance: 10,
            shadow: false,
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
                [0, '#c4463a'],
                [0.1, '#c4463a'],
                [0.5, '#ffffff'],
                [1, '#3060cf']
            ],
            min: -25000, max: 25000,
            startOnTick: false,
            endOnTick: false
        },
        series: [{
            borderWidth: 0,
            nullColor: '#EFEFEF',
            data: heatmap_data,
            events: {
                click: function (e) {
                    var x = e.point.x;
                    channel = x;
                    u_wf.series[0].update({
                        data: wf_data[channel],
                    });
                    console.log(channel);
                }
            }
        }]
    };
    $.extend(true, highchartsOptions, options);
    var u = new Highcharts.Chart(highchartsOptions);

    $('#test_button').click(function(){
        channel += 1;
        u_wf.series[0].update({
            data: wf_data[channel],
        });
    });

});

