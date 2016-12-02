var data_path = 'data/uboone-3493-1/0/'
var wf_data = {
    'orig' : [ [] ],
    'nf' : [ [] ],
    'decon' : [ [] ]
};
var heatmap_data = {
    'orig' : [],
    'nf' : [],
    'decon' : []
}
var xhr = {
    'orig' : null,
    'nf' : null,
    'decon' : null
}
var current_ch = 50;

load_data('orig');
load_data('nf');
load_data('decon');

var xhr_all = $.when(xhr.orig, xhr.nf, xhr.decon).done(function(){
    // console.log(wf_data, heatmap_data, xhr);
})


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


