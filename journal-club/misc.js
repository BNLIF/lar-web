$(document).ready(function() {

    var enrolledDays = [
    "2014-9-4", "2014-9-11", "2014-9-18", "2014-10-2", "2014-10-16",
    "2014-11-6", "2014-11-13", "2014-11-20", "2014-12-4", "2015-1-29",
    "2015-2-12", "2015-3-26", "2015-4-2", "2015-4-9", "2015-4-23",
    "2015-4-30", "2015-5-7", "2015-6-4", "2015-6-11", "2015-6-18",
    "2015-6-25", "2015-7-2", "2015-7-9", "2015-7-16", "2015-7-23",
    "2015-9-17", "2016-6-17", "2016-6-24", "2016-7-1", "2016-7-8",
    "2016-7-15", "2016-7-29", "2016-8-5", "2017-6-15", "2017-6-22",
    "2017-6-29", "2017-7-6"
    ];

    var disabledDays = [
    "2014-11-27", "2014-12-18", "2014-12-25", "2015-1-1",
    "2015-1-15", "2015-1-22" , "2015-2-5", "2015-4-16"
    ];

    var date = new Date();

    $("#calendar").datepicker({
        dateFormat: 'yy-mm-dd',
        numberOfMonths: 3,
        beforeShowDay: function(date) {
            var m = date.getMonth(), d = date.getDate(), y = date.getFullYear();
            for (i = 0; i < enrolledDays.length; i++) {
                // console.log(y + '-' + (m+1) + '-' + d);
                if($.inArray(y + '-' + (m+1) + '-' + d,enrolledDays) != -1) {
                    //return [false];
                    // console.log(i);
                    return [true, 'ui-state-active', ''];
                }
            }
            for (i = 0; i < disabledDays.length; i++) {
                // console.log(y + '-' + (m+1) + '-' + d);
                if($.inArray(y + '-' + (m+1) + '-' + d,disabledDays) != -1) {
                    //return [false];
                    // console.log(i);
                    return [true, 'ui-state-disabled', ''];
                }
            }
            return [true];

        }
    });

    // $('#calendar').datepicker();

});
