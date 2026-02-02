var all_charts= {};

Highcharts.setOptions({
    global: {
        canvasToolsURL: 'js/highcharts/modules/canvas-tools.js'
    },
    chart: {zoomType: 'xy', animation: false,
        style: {
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '14px'
        },
        alignTicks: false,
    },
    exporting: {
        url: 'about:blank',
        buttons: {
            contextButton: {
                x: 5,
                menuItems: [
                    { textKey: 'printChart', onclick: function () { this.print(); } },
                    { separator: true },
                    { textKey: 'downloadPNG', onclick: function () { this.exportChartLocal(); } },
                    { textKey: 'downloadSVG', onclick: function () { this.exportChartLocal({ type: 'image/svg+xml' }); } }
                ]
            }
        },
        fallbackToExportServer: false,         
        error: function (options, err) {
            console.error("Offline export failed:", err);
            alert("Export failed locally. Check console for details.");
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

