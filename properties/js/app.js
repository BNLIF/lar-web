Vue.filter('trunc', function (value, precision) {
    if (precision==undefined) precision=4;
    try {
        return value.toFixed(precision);
    }
    catch (e) {
        console.log(e);
    }
});
// console.log('haha')
var $plotEl = null;

var vm = new Vue({
    el: '#app',
    data: {
        E: 0.5,
        T: 87.0,
        wl: 128.0,
        T_c: 150.687,
        rho_c: 0.5356, // g/cm^3
        T0: 89.0,
        T1: 87.0,
        a0: 551.6,
        a1: 7953.7,
        a2: 4440.43,
        a3: 4.29,
        a4: 43.63,
        a5: 0.2053,
        b0: 0.0075,
        b1: 742.9,
        b2: 3269.6,
        b3: 31678.2,
        wire_spacing: 3,
        wire_diameter: 0.15,
        drift_dist_max: 2.56,
        plane_gap: 3,
        perm_free_space: 8.85,
        dielec: 1.505,
        E_ratio: 1.5
    },
    computed: {
        density: function() {
            var a = 1.5004262;
            var b = -0.31381290;
            var c = 0.086461622;
            var d = -0.041477525;
            var t = (1-this.T/this.T_c);
            var rho = Math.log(this.rho_c) + a * Math.pow(t,0.334)
              + b * Math.pow(t,2./3.)
              + c * Math.pow(t,7./3.)
              + d * Math.pow(t,4.);
            return Math.exp(rho);
        },
        iof: function() {
            // index of refraction
            return this.iof_l(this.wl);
        },
        v_g: function() {
            return this._v_g(this.wl);
        },
        mu: function() {
            // return (this.a0 + this.a1*this.E + this.a2*Math.pow(this.E, 1.5) + this.a3*Math.pow(this.E, 2.5)) / (1 + this.a1/this.a0*this.E + this.a4*Math.pow(this.E, 2) + this.a5*Math.pow(this.E, 3)) * Math.pow(this.T/this.T0, -1.5);
            return this.mobility(this.E);
        },
        eps_L: function() {
            return (this.b0 + this.b1*this.E + this.b2*this.E*this.E) / (1 + this.b1/this.b0*this.E + this.b3*this.E*this.E) * this.T/this.T1;
        },
        D_L: function() {
            return this.eps_L * this.mu;
        },
        v: function() {
            return this.mu * this.E /1000; // cm / us
        },
        E_ratio_trans: function() {
            return (1+Math.PI*this.wire_diameter/this.wire_spacing) / (1-Math.PI*this.wire_diameter/this.wire_spacing);
        },
        wire_c_air: function() {
            return 5+2*Math.PI*this.perm_free_space/( (Math.PI*this.plane_gap/this.wire_spacing) - Math.log(Math.PI*this.wire_diameter/this.wire_spacing) );
        },
        wire_c_lar: function() {
            return this.dielec * this.wire_c_air;
        },
        cathod_hv: function() {
            return 100 * this.E * this.drift_dist_max;
        },
        E2: function() {
            return this.E * this.E_ratio;
        },
        E3: function() {
            return this.E2 * this.E_ratio;
        },
        mu2: function() {
            return this.mobility(this.E2);
        },
        mu3: function() {
            return this.mobility(this.E3);
        },
        v2: function() {
            return this.mu2 * this.E2 /1000; // cm / us
        },
        v3: function() {
            return this.mu3 * this.E3 /1000; // cm / us
        },
        t: function() {
            return this.drift_dist_max*100/this.v;
        },
        t2: function() {
            return this.plane_gap * 0.1 / this.v2;
        },
        t3: function() {
            return this.plane_gap * 0.1 / this.v3;
        }
    },
    methods: {
        mobility: function(E) {
            return (this.a0 + this.a1*E + this.a2*Math.pow(E, 1.5) + this.a3*Math.pow(E, 2.5)) / (1 + this.a1/this.a0*E + this.a4*Math.pow(E, 2) + this.a5*Math.pow(E, 3)) * Math.pow(this.T/this.T0, -1.5);
        },
        iof_g: function(lambda) {
            // gas index of refraction
            var c0 = 1.2055e-2;
            var a1 = 0.2075;
            var b1 = 91.012;
            var a2 = 0.0415;
            var b2 = 87.892;
            var a3 = 4.3330;
            var b3 = 214.02;
            var lambda = lambda / 1000.;
            return results = 1 + c0 *(a1/(b1-1./lambda/lambda)
                          + a2/(b2-1./lambda/lambda)
                          + a3/(b3-1./lambda/lambda));
        },
        iof_l: function(lambda) {
            // liquid index of refraction
            var nG = this.iof_g(lambda);
            var rhoG = 1.0034*0.0017840;
            var rhoL = this.density;
            return Math.sqrt((2+nG*nG)*rhoG + 2*(-1+nG*nG)*rhoL)/
              Math.sqrt((2+nG*nG)*rhoG+rhoL-nG*nG*rhoL);
        },
        _v_g: function(lambda) {
            var y = this.iof_l(lambda);
            var x = 1.*lambda;
            var dx = 0.01;
            // // calculate numerical diferential
            return 1/y + x/y/y*(this.iof_l(x+dx)-y)/dx;
        },
        plot: function(options, target) {
            // console.log($(target).parents('tr')[0]);
            if($plotEl) {$plotEl.remove();}
            $plotEl = $('<tr><td colspan="4"><div id="myPlot"></div></td></tr>').insertAfter(
                $(target).parents('tr')[0]
            );
            $plotEl.on('dblclick', function(){
                $plotEl.remove();
            })
            var myOptions = {
                chart: {renderTo: 'myPlot'},
                xAxis: {title: {text: options.xTitle}},
                yAxis: {title: {text: options.yTitle}},
                legend: {enabled: false},
                series: [{
                    // name: 'Test',
                    data: options.data
                }]
            };
            var chart = new Highcharts.Chart( myOptions );
        },
        plot_iof_l: function(event) {
            var i, x, y;
            var data = [];
            for (i=120; i<300; i++) {
                x = i*1.0
                y = this.iof_l(x);
                data.push([x,y]);
            }
            this.plot({
                xTitle: 'Wavelength [nm]',
                yTitle: 'Index of refraction',
                data: data
            }, event.target)
        },
        plot_v_g: function(event) {
            var i, x, y;
            var data = [];
            for (i=120; i<300; i++) {
                x = i*1.0;
                y = this._v_g(x);
                data.push([x,y]);
            }
            this.plot({
                xTitle: 'Wavelength [nm]',
                yTitle: 'Velocity (c)',
                data: data
            }, event.target)
        }
    }
});


// $('[data-toggle=modal]').click(function(event) {
//     event.preventDefault();
//     console.log('haha');

//     var highchartsOptions = {
//         chart: {renderTo: 'myModal'},
//         xAxis: {title: {text: 'Residual Range [cm]'}},
//         yAxis: {title: {text: 'dE/dx [Mev/cm]'}},
//         series: [{
//             name: 'Tokyo',
//             data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
//         }]
//     };

//     var chart = new Highcharts.Chart( highchartsOptions );
//     $('#myModal').modal();
// });



