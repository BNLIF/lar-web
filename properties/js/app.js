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
        dEdx: 2.1,  // MeV/cm
        particle_mom: 0.3,  // momemtum, GeV/c
        particle_mass: 105, // MeV
        pass_thickness: 0.3, // cm
        particle_tcut: null, // MeV
        particle_tmax: 0., // Maximum delta ray, MeV
        T0: 89.0,
        T1: 87.0,
        a0: 551.6,
        a1: 7953.7*0.9,
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
        E_ratio: 1.4,
        tlife: 10, // ms
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
        D_T: function() {
            // D_L/D_T = 1+ E/mu*(dmu/dE)
            if (this.E < 1e-4) return this.D_L;

            var dmu_dE = (this.mobility(this.E*1.001) - this.mu)/(0.001*this.E);
            // console.log(dmu_dE, this.E/this.mu)
            return this.D_L/(1+this.E/this.mu*dmu_dE);
        },
        v: function() {
            return this.mu * this.E /1000; // cm / us
        },
        E_ratio_trans: function() {
            // return (1+Math.PI*this.wire_diameter/this.wire_spacing) / (1-Math.PI*this.wire_diameter/this.wire_spacing);
            var pi = Math.PI;
            var r = this.wire_diameter/2;
            var d = this.wire_spacing;
            return 1+4*pi*r/d*(1+Math.log(d/2/pi/r)/2/pi);
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
        },
        Rc_birks: function() {
            return 0.8 / ( 1 + 0.0486 * this.dEdx / this.E / this.density );
        },
        Rc_box: function() {
            var x = 0.212 / this.E / this.density * this.dEdx;
            return Math.log(0.93+x) / x;
        },
        atten: function() {
            return Math.exp(-this.drift_dist_max/this.v *0.1 / this.tlife);
        },
        R_L: function() { // light recombination
            return 1 - 0.803* this.Rc_birks;
        },
        ka_O2: function() { // rate constant in s^-1 
            return this.attachment(this.E, 11, 39.4, 1.20062, 0, 0, 0.925794, 1.63816, 0, 0);
        },
        mpv: function() {
            var       fZ = 18;                ///< Ar atomic number
            var       fA = 39.948;            ///< Ar atomic mass (g/mol)
            var       fI = 188.00;            ///< Ar mean excitation energy (eV)
            var      fSa = 0.1956;            ///< Ar Sternheimer parameter a
            var      fSk = 3.0000;            ///< Ar Sternheimer parameter k
            var      fSx0 = 0.2000;            ///< Ar Sternheimer parameter x0
            var     fSx1 = 3.0000;            ///< Ar Sternheimer parameter x1
            var    fScbar = 5.2146;            ///< Ar Sternheimer parameter Cbar
            var K = 0.307075;     // 4 pi N_A r_e^2 m_e c^2 (MeV cm^2/mol).
            var me = 0.510998918; // Electron mass (MeV/c^2).

            var bg = this.particle_mom * 1000. / this.particle_mass;           // beta*gamma.
            var gamma = Math.sqrt(1. + bg*bg);  // gamma.
            var beta = bg / gamma;         // beta (velocity).

            var psi = K/2.*fZ/fA/beta/beta * this.density * this.pass_thickness;
            var coef = Math.log(2*me*1e6*bg*bg/fI) + Math.log(psi*1e6/fI) + 0.2 - beta*beta;
            var x = Math.log10(bg);
            var delta = 0.;
            if(x >= fSx0) {
                delta = 2. * Math.log(10.) * x - fScbar;
                if(x < fSx1) {
                    delta += fSa * Math.pow(fSx1 - x, fSk);
                }
            }
            coef -= delta;
            return psi * coef/this.pass_thickness;
        },
        eloss: function() {
            var       fZ = 18;                ///< Ar atomic number
            var       fA = 39.948;            ///< Ar atomic mass (g/mol)
            var       fI = 188.00;            ///< Ar mean excitation energy (eV)
            var      fSa = 0.1956;            ///< Ar Sternheimer parameter a
            var      fSk = 3.0000;            ///< Ar Sternheimer parameter k
            var      fSx0 = 0.2000;            ///< Ar Sternheimer parameter x0
            var     fSx1 = 3.0000;            ///< Ar Sternheimer parameter x1
            var    fScbar = 5.2146;            ///< Ar Sternheimer parameter Cbar

            var K = 0.307075;     // 4 pi N_A r_e^2 m_e c^2 (MeV cm^2/mol).
            var me = 0.510998918; // Electron mass (MeV/c^2).

            // Calculate kinematic quantities.
            var bg = this.particle_mom * 1000. / this.particle_mass;           // beta*gamma.
            var gamma = Math.sqrt(1. + bg*bg);  // gamma.
            var beta = bg / gamma;         // beta (velocity).
            // console.log(Math.sqrt(this.particle_mom*this.particle_mom*1e6 - this.particle_mass*this.particle_mass))
            var mer = 0.001 * me / this.particle_mass;   // electron mass / mass of incident particle.
            var tmax = 2.*me* bg*bg / (1. + 2.*gamma*mer + mer*mer);  // Maximum delta ray energy (MeV).
            this.particle_tmax = tmax;

            // Make sure particle_tcut does not exceed tmax.
            var tcut = this.particle_tcut;
            if(tcut < 1e-3 || tcut > tmax) { tcut = tmax; }

            // Calculate density effect correction (delta).
            var x = Math.log10(bg);
            var delta = 0.;

            if(x >= fSx0) {
              delta = 2. * Math.log(10.) * x - fScbar;
              if(x < fSx1) {
                  delta += fSa * Math.pow(fSx1 - x, fSk);
              }
            }

            // Calculate stopping number.
            var B = 0.5 * Math.log(2.*me*bg*bg*tcut / (1.e-12 * fI*fI))
                - 0.5 * beta*beta * (1. + tcut / tmax) - 0.5 * delta;
            // Don't let the stopping number become negative.
            if(B < 1.) B = 1.;

            // Calculate dE/dx.
            return this.density * K*fZ*B / (fA * beta*beta);
      }

    },
    methods: {
        mobility: function(E) {
            return (this.a0 + this.a1*E + this.a2*Math.pow(E, 1.5) + this.a3*Math.pow(E, 2.5)) / (1 + this.a1/this.a0*E + this.a4*Math.pow(E, 2) + this.a5*Math.pow(E, 3)) * Math.pow(this.T/this.T0, -1.5);
        },
        attachment: function(E, p, a1, a2, a3, a4, b1, b2, b3, b4) { 
            // arXiv:2205.06888
            return Math.pow(10, p) * (a1/b1 + a1*E +  a2*Math.pow(E, 2) + a3*Math.pow(E, 3) + a4*Math.pow(E, 4) ) / (1 + b1*E +  b2*Math.pow(E, 2) + b3*Math.pow(E, 3) + b4*Math.pow(E, 4) );
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
                exporting: {
                    fallbackToExportServer: false,
                    url: 'about:blank'
                },
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

$('.fold').click(function(e){
    e.preventDefault();
    $(this).parent().next('.section').slideToggle();
})

var showall = true;
var $allsections = $('.section');
$('#foldall').click(function(e){
    e.preventDefault();
    if (showall) {
        $allsections.slideUp();
    }
    else {
        $allsections.slideDown();
    }
    showall = !showall;
})

