var data_path = 'data/uboone-3493-1/0/'
var data_names = ['orig', 'nf', 'decon']
var wf_data = {};
var heatmap_data = {};
var xhr = {};
var wf_chart = null;
var heatmap_chart = {};
var vm = null;

init_data();
load_data('orig');
load_data('nf');
load_data('decon');

var xhr_all = $.when(xhr.orig, xhr.nf, xhr.decon).done(function(){
    // console.log(wf_data, heatmap_data, xhr);
})

function init_data() {
    var name = null;
    for (var i=0; i<data_names.length; i++) {
        name = data_names[i];
        wf_data[name] = [ [] ];
        heatmap_data[name] = [];
        xhr[name] = null;
        heatmap_chart[name] = null;
    }
    vm = new Vue({
        el: '#app',
        data: {
            current_wire: 50
        },
        watch: {
            current_wire: function(val, oldVal) {
                // console.log('changed.');
                for (var i=0; i<data_names.length; i++) {
                    wf_chart.series[i].update({
                        data: wf_data[data_names[i]][vm.current_wire],
                    });
                    heatmap_chart[data_names[i]].xAxis[0].removePlotLine('heatmap-line');
                    heatmap_chart[data_names[i]].xAxis[0].addPlotLine({
                        value: val,
                        color: 'black',
                        width: '1',
                        zIndex: 10,
                        id: 'heatmap-line'
                    });
                }
            }
        }
    });
}

function load_data(name) {
    var isDecon = false;
    var adcScale = 1;
    if (name == 'decon') {
        isDecon = true;
        adcScale = 1./250;
    }
    xhr[name] = $.getJSON(data_path+name+'.json', function(data){
        var length = data.x.length;

        // set waveform data
        var ch = 0;
        var waveforms = wf_data[name];
        for (var i=0; i<length; i++) {
            if (ch != data.x[i]) {
                ch += 1;
                waveforms.push([]);
            }
            waveforms[ch].push([data.y[i], data.value[i]*adcScale]);
        }

        // set heatmap data
        var heatmap = heatmap_data[name];
        if (isDecon) {
            for (var i=0; i<length; i++) {
                if (data.value[i]<0) { data.value[i] = 0; }
                heatmap.push([data.x[i], data.y[i], data.value[i]*adcScale]);
            }
        }
        else {
            for (var i=0; i<length; i++) {
                heatmap.push([data.x[i], data.y[i], data.value[i]]);
            }
        }

    });
}


