var eventId = 'uboone-3493-1';
var planeId = 0;
var wireId = 40;
var data_path = get_data_path(eventId, planeId);

var routes = {
    '/': initRoutes,
    '/event/:eventId': initRoutes,
    '/event/:eventId/plane/:planeId': initRoutes,
    '/event/:eventId/plane/:planeId/wire/:wireId': initRoutes
}
var router = Router(routes).configure({
    strict: false
});
router.init('/');

$('.hash-link').click(function(){
    window.location.reload();
})


function initRoutes(event, plane, wire) {
    // options.id = parseInt(eventId);
    eventId = (event == undefined ? eventId : event);
    planeId = (plane == undefined ? planeId : parseInt(plane));
    wireId  = (wire == undefined ? wireId : parseInt(wire));
    if (isNaN(planeId)) { planeId = 0; }
    if (isNaN(wireId)) { wireId = 40; }
    data_path = get_data_path(eventId, planeId);
    $('#event-label').text(eventId + ', Plane ' + planeId);
    var exp = eventId.split('-')[0];
    if (exp == 'uboone') {
        $('#event-logo').empty().append('<img src="img/uboone-logo.png" alt="" style="width: 200px;" />');
        console.log($('#event-logo'))
    }
    // console.log(data_path);
}

$('#btn-prev-plane').click(function(){
    var newPlaneId = 0;
    if (planeId==0) { newPlaneId = 2; }
    else { newPlaneId = planeId-1; }
    window.location.href = get_url(eventId, newPlaneId, wireId);
    // console.log(window.location.href)
    window.location.reload();
});

$('#btn-next-plane').click(function(){
    var newPlaneId = 0;
    if (planeId==2) { newPlaneId = 0; }
    else { newPlaneId = planeId+1; }
    window.location.href = get_url(eventId, newPlaneId, wireId);
    // console.log(window.location.href)
    window.location.reload();
});

function get_url(event, plane, wire) {
    return window.location.origin + window.location.pathname
        + '#/event/' + event
        + '/plane/' + plane
        + '/wire/' + wire;
}

function get_data_path(event, plane) {
    return 'data/' + event + '/' + plane + '/';
}