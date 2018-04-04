console.log('Main!');

// debugger;

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'

var gLat;
var gLng;


window.onload = () => {
    mapService.initMap()
    .then(
        () => {
            var url = document.querySelector('.url').value;
            var lat = +getParameterByName('lat', url);
            var lng = +getParameterByName('lng', url);
            if (lat && lng) {
                setMarkerWithCenter({ lat, lng });
                locService.getNameByCoords(lat, lng).then(loc => {
                    renderLocAndSetUrl(loc);
                });
                weatherGet(lat, lng);
            }
            else {
                getPos();
            } 
        }
    );
}

document.querySelector('.search').addEventListener('click', (ev) => {
    var address = document.querySelector('.user-address').value;
    document.querySelector('.user-address').focus();
    locService.getAddress(address).then(loc => {
        gLat = loc.coords.lat;
        gLng = loc.coords.lng;
        setMarkerWithCenter(loc.coords);
        renderLocAndSetUrl(loc.address);
        weatherGet(loc.coords.lat, loc.coords.lng);
        
    });
})

document.querySelector('.my-loc').addEventListener('click', () => {
    getPos();
    document.querySelector('.user-address').value = '';
    
})

document.querySelector('.copy-location').addEventListener('click', () => {
    var copyText = document.querySelector('.url');
    copyText.select();
    document.execCommand("Copy");
})

document.querySelector('.search').addEventListener('mouseover', (event) => {
    document.querySelector('.user-address').focus();
})


function weatherGet(lat, lng) {
    locService.getWeather(lat, lng).then(tempDetails => {
        document.querySelector('.temp').innerHTML = parseInt(tempDetails.temp);
        document.querySelector('.desc').innerHTML = tempDetails.desc;
        document.querySelector('.icon').setAttribute('src', "http://openweathermap.org/img/w/" + tempDetails.icon + ".png");
    });
}

function setMarkerWithCenter(pos) {
    mapService.addMarker(pos);
    mapService.setCenter(pos);
}

function renderLocAndSetUrl(loc) {
    document.querySelector('h2').innerHTML = loc;
    document.querySelector('.url').value = `http://127.0.0.1:5500/travel-tip-startHere/index.html?lat=${gLat}&lng=${gLng}`
}

function getPos() {
    locService.getPosition()
    .then(pos => {
        gLat = pos.coords.latitude;
        gLng = pos.coords.longitude;
        setMarkerWithCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        locService.getNameByCoords(gLat, gLng).then(loc => {
            renderLocAndSetUrl(loc);
        });
        weatherGet(gLat, gLng);
    })
    .catch(err => {
        console.log('err!!!', err);
    })
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



