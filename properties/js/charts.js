var all_charts= {};

Highcharts.setOptions({
    chart: {zoomType: 'xy', animation: false,
        style: {
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '14px'
        },
        alignTicks: false,
    },
    exporting: {
        buttons: {
            contextButton: {x: 5}
        }
    },
    credits: { enabled: false },
    title: {text: ''},
    legend: {
        backgroundColor: '#FFFFFF',
        layout: 'vertical',
        floating: true,
        align: 'right',
        verticalAlign: 'top',
        x: -20,
        y: 25,
        itemMarginTop: 3,
        itemMarginBottom: 3,
        shadow: true
        // borderWidth: 0
    },
    plotOptions: {
        series: {
            animation: false
        }
    },
    xAxis: {gridLineWidth: 1, startOnTick: true, tickPosition: 'inside'},
    yAxis: {gridLineWidth: 1, startOnTick: true, tickPosition: 'inside'}
    // yAxis: { title: {text: ''}, tickPixelInterval: 24, endOnTick: false },
    // tooltip: { formatter: datetime_formatter },
    // plotOptions: {
    //     scatter: { marker: {radius: 1} }
    // }
});


function create_chart(id, options) {
    $.getJSON('data/'+id+'.json', function(series){
        var highchartsOptions = {
            chart: {renderTo: id},
            series: series
        };
        $.extend(true, highchartsOptions, options);
        all_charts[id] = new Highcharts.Chart(highchartsOptions);
        // console.log(all_charts);
    });
}

$('.list-group-item').click(function(e){
    e.preventDefault();
    var $el = $(this).next();
    var id = $el.attr('id');
    if (all_charts[id] == undefined) {
        create_chart(id, plot_dispatcher[id]);
    }
    $el.toggle();
    // console.log(id);
});

