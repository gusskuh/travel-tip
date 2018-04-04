import { GoogleMapsApi } from './gmap.class.js';

var map;

function initMap(lat = 32.0613739, lng = 34.7720625) {

    console.log('InitMap');

    const gmapApi = new GoogleMapsApi();
    return gmapApi.load().then(() => {
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })

        console.log('Map!', map);
    });


}
function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
};

function setCenter(loc) {
    map.setCenter(loc);
}



export default {
    initMap,
    addMarker,
    setCenter
}

