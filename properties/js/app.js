Vue.filter('trunc', function (value, precision) {
    if (precision==undefined) precision=4;
    try {
        return value.toFixed(precision);
    }
    catch (e) {
        console.log(e);
    }
});

var vm = new Vue({
    el: '#app',
    data: {
        E: 0.5,
        T: 87.0,
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
        }
    }
});


